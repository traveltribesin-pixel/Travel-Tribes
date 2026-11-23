import fs from 'fs'
import os from 'os'
import path from 'path'
import { trips as baseStaticTrips, type Trip, type TripPricingOption, isWeekendTrip } from './travel-data'
import { TRIP_THRIVIA_EVENTS } from './thrivia-events'

export interface TripPlacements {
  showOnHome: boolean
  homeSection: 'upcoming' | 'international' | 'trending' | 'festive' | 'none'
  homeOrder?: number
  showOnUpcoming: boolean
  showOnWeekend: boolean
  showOnDomestic: boolean
  showOnInternational: boolean
  showOnFestive: boolean
  showOnCorporate: boolean
  isFeatured?: boolean
}

export interface AdminTrip extends Trip {
  status: 'published' | 'draft' | 'archived'
  placements: TripPlacements
  originalPrice?: string
  thriviaEventId?: string
  createdAt?: string
  updatedAt?: string
  isCustomOrAdminCreated?: boolean
}

const DATA_DIR = path.join(process.cwd(), 'data')
const ITINERARIES_FILE = path.join(DATA_DIR, 'itineraries.json')
const TMP_ITINERARIES_FILE = path.join(os.tmpdir(), 'traveltribes-itineraries.json')

function ensureDataDir(): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    return true
  } catch {
    return false
  }
}

function readJsonFileSafe(filePath: string): AdminTrip[] {
  try {
    if (!fs.existsSync(filePath)) return []
    const raw = fs.readFileSync(filePath, 'utf-8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed?.itineraries) ? parsed.itineraries : []
  } catch {
    return []
  }
}

/**
 * Calculates smart default placement routing for a static trip
 */
export function getDefaultPlacementsForTrip(trip: Trip): TripPlacements {
  const isWeekend = isWeekendTrip(trip)
  const isIntl = trip.region === 'International'
  const isFestive =
    trip.tag?.toLowerCase().includes('festive') ||
    trip.tag?.toLowerCase().includes('xmas') ||
    trip.tag?.toLowerCase().includes('new year') ||
    trip.title?.toLowerCase().includes('xmas') ||
    trip.title?.toLowerCase().includes('new year') ||
    trip.slug?.toLowerCase().includes('xmas') ||
    trip.slug?.toLowerCase().includes('new-year')

  let homeSection: TripPlacements['homeSection'] = 'upcoming'
  if (isIntl) {
    homeSection = 'international'
  } else if (isFestive) {
    homeSection = 'festive'
  }

  return {
    showOnHome: true,
    homeSection,
    homeOrder: 10,
    showOnUpcoming: true,
    showOnWeekend: isWeekend,
    showOnDomestic: !isIntl && !isWeekend,
    showOnInternational: isIntl,
    showOnFestive: isFestive,
    showOnCorporate: false,
    isFeatured: isFestive || isIntl
  }
}

/**
 * Seeds store from baseStaticTrips in travel-data.ts
 */
function createInitialSeed(): AdminTrip[] {
  return baseStaticTrips.map((t, idx) => ({
    ...t,
    status: 'published' as const,
    placements: getDefaultPlacementsForTrip(t),
    thriviaEventId: TRIP_THRIVIA_EVENTS[t.slug] || TRIP_THRIVIA_EVENTS[t.id] || undefined,
    createdAt: new Date(Date.now() - (baseStaticTrips.length - idx) * 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
    isCustomOrAdminCreated: false
  }))
}

/**
 * Merges files, prioritizing the newest update
 */
function mergeTrips(lists: AdminTrip[][]): AdminTrip[] {
  const byId = new Map<string, AdminTrip>()
  for (const list of lists) {
    for (const item of list) {
      if (!item || (!item.id && !item.slug)) continue
      const key = (item.id || item.slug).toLowerCase()
      const existing = byId.get(key)
      if (!existing) {
        byId.set(key, item)
      } else {
        const existingTs = new Date(existing.updatedAt || existing.createdAt || 0).getTime()
        const candidateTs = new Date(item.updatedAt || item.createdAt || 0).getTime()
        if (candidateTs >= existingTs) {
          byId.set(key, item)
        }
      }
    }
  }
  return Array.from(byId.values())
}

/**
 * Loads all admin trips from persistent storage (repo file -> tmp fallback -> seed)
 */
export function getAllAdminTrips(): AdminTrip[] {
  try {
    const repoList = readJsonFileSafe(ITINERARIES_FILE)
    const tmpList = readJsonFileSafe(TMP_ITINERARIES_FILE)
    let merged = mergeTrips([repoList, tmpList])

    if (merged.length === 0) {
      merged = createInitialSeed()
      // Persist the initial seed so it is ready for future operations
      saveAdminTripsStore(merged)
    }

    return merged
  } catch (err) {
    console.error('Error reading admin trips store:', err)
    return createInitialSeed()
  }
}

/**
 * Saves all trips to file and tmp fallback
 */
export function saveAdminTripsStore(itineraries: AdminTrip[]): { fileSaved: boolean; tmpSaved: boolean } {
  let tmpSaved = false
  let fileSaved = false

  const data = JSON.stringify({ itineraries, updatedAt: new Date().toISOString() }, null, 2)

  // 1. Try OS temp dir first (always writable)
  try {
    fs.writeFileSync(TMP_ITINERARIES_FILE, data, 'utf-8')
    tmpSaved = true
  } catch (err) {
    console.error('Error writing to tmp itineraries store:', err)
  }

  // 2. Try repo data dir
  try {
    if (ensureDataDir()) {
      fs.writeFileSync(ITINERARIES_FILE, data, 'utf-8')
      fileSaved = true
    }
  } catch (err) {
    console.error('Error writing to repo itineraries store:', err)
  }

  return { fileSaved, tmpSaved }
}

/**
 * Finds a single trip by ID or Slug
 */
export function getAdminTripByIdOrSlug(idOrSlug: string): AdminTrip | null {
  if (!idOrSlug) return null
  const tripsList = getAllAdminTrips()
  const lower = idOrSlug.trim().toLowerCase()
  return tripsList.find((t) => t.id.toLowerCase() === lower || t.slug.toLowerCase() === lower) || null
}

/**
 * Saves (Create or Update) an itinerary with validation & defaults
 */
export function saveAdminTrip(tripInput: Partial<AdminTrip>): {
  success: boolean
  trip: AdminTrip
  isNew: boolean
  error?: string
} {
  try {
    const list = getAllAdminTrips()
    const nowIso = new Date().toISOString()

    const rawSlug = (tripInput.slug || tripInput.title || 'untitled-trip')
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const id = tripInput.id || rawSlug
    const existingIndex = list.findIndex(
      (t) => t.id.toLowerCase() === id.toLowerCase() || t.slug.toLowerCase() === rawSlug.toLowerCase()
    )

    const isNew = existingIndex === -1

    // Default placements
    const defaultPlacements: TripPlacements = {
      showOnHome: true,
      homeSection: tripInput.region === 'International' ? 'international' : 'upcoming',
      homeOrder: 10,
      showOnUpcoming: true,
      showOnWeekend: tripInput.region === 'Weekend',
      showOnDomestic: tripInput.region === 'Domestic',
      showOnInternational: tripInput.region === 'International',
      showOnFestive: tripInput.region === 'Xmas & New Year',
      showOnCorporate: false,
      isFeatured: false
    }

    const mergedPlacements: TripPlacements = {
      ...defaultPlacements,
      ...(existingIndex >= 0 ? list[existingIndex].placements : {}),
      ...(tripInput.placements || {})
    }

    const completeTrip: AdminTrip = {
      id,
      slug: tripInput.slug || rawSlug,
      title: tripInput.title?.trim() || 'Untitled Trip',
      location: tripInput.location?.trim() || 'India',
      region: (tripInput.region as any) || 'Domestic',
      date: tripInput.date || tripInput.dates?.[0] || 'Upcoming',
      dates: tripInput.dates && tripInput.dates.length > 0 ? tripInput.dates : [tripInput.date || 'Upcoming'],
      duration: tripInput.duration?.trim() || '3N/4D',
      price: tripInput.price?.trim() || '₹9,999',
      originalPrice: tripInput.originalPrice?.trim() || undefined,
      image: tripInput.image?.trim() || '/image/travel-tribes-og-group.jpg',
      alt: tripInput.alt?.trim() || `${tripInput.title || 'Trip'} Cover Image`,
      tag: tripInput.tag?.trim() || 'Backpacking Trip',
      description: tripInput.description?.trim() || '',
      spots: tripInput.spots?.trim() || 'Available',
      bookingAmount: tripInput.bookingAmount?.trim() || '₹4,000 / person',
      pdfUrl: tripInput.pdfUrl?.trim() || undefined,
      thriviaEventId: tripInput.thriviaEventId?.trim() || undefined,
      isWeekend: Boolean(tripInput.isWeekend ?? tripInput.region === 'Weekend'),
      status: tripInput.status || 'published',
      placements: mergedPlacements,

      // Arrays & Lists
      highlights: tripInput.highlights || [],
      itinerary: tripInput.itinerary || [],
      inclusions: tripInput.inclusions || [],
      exclusions: tripInput.exclusions || [],
      thingsToCarry: tripInput.thingsToCarry || [],
      policies: tripInput.policies || [],
      gallery: tripInput.gallery || [],
      reviews: tripInput.reviews || [],

      // Packages
      regularPackages: tripInput.regularPackages || [],
      festivePackages: tripInput.festivePackages || [],
      longWeekendPackages: tripInput.longWeekendPackages || [],
      pricingOptions: tripInput.pricingOptions || [],
      doubleSharingRate: typeof tripInput.doubleSharingRate === 'number' ? tripInput.doubleSharingRate : 1500,
      festiveDoubleSharingRate: tripInput.festiveDoubleSharingRate,

      // SEO
      seoDescription: tripInput.seoDescription?.trim() || undefined,
      seoKeywords: tripInput.seoKeywords || [],

      // Metadata
      createdAt: isNew ? nowIso : list[existingIndex].createdAt || nowIso,
      updatedAt: nowIso,
      isCustomOrAdminCreated: isNew ? true : list[existingIndex].isCustomOrAdminCreated ?? true
    }

    if (isNew) {
      list.unshift(completeTrip)
    } else {
      list[existingIndex] = completeTrip
    }

    saveAdminTripsStore(list)

    return {
      success: true,
      trip: completeTrip,
      isNew
    }
  } catch (err: any) {
    console.error('Error saving admin trip:', err)
    return {
      success: false,
      trip: tripInput as AdminTrip,
      isNew: false,
      error: err.message || 'Failed to save itinerary'
    }
  }
}

/**
 * Deletes or archives a trip
 */
export function deleteAdminTrip(idOrSlug: string): { success: boolean; deletedSlug?: string } {
  try {
    const list = getAllAdminTrips()
    const lower = idOrSlug.trim().toLowerCase()
    const idx = list.findIndex((t) => t.id.toLowerCase() === lower || t.slug.toLowerCase() === lower)

    if (idx === -1) {
      return { success: false }
    }

    const [deleted] = list.splice(idx, 1)
    saveAdminTripsStore(list)

    return { success: true, deletedSlug: deleted.slug }
  } catch (err) {
    console.error('Error deleting trip:', err)
    return { success: false }
  }
}

/**
 * Clones/Duplicates a trip with a "-copy" slug and "(Copy)" title
 */
export function duplicateAdminTrip(idOrSlug: string): { success: boolean; trip?: AdminTrip } {
  try {
    const orig = getAdminTripByIdOrSlug(idOrSlug)
    if (!orig) return { success: false }

    const newSlug = `${orig.slug}-copy-${Date.now().toString().slice(-4)}`
    const newTitle = `${orig.title} (Copy)`

    const duplicated: Partial<AdminTrip> = {
      ...orig,
      id: newSlug,
      slug: newSlug,
      title: newTitle,
      status: 'draft', // defaults to draft so admin can edit before publishing
      isCustomOrAdminCreated: true
    }

    const res = saveAdminTrip(duplicated)
    return { success: res.success, trip: res.trip }
  } catch (err) {
    console.error('Error duplicating trip:', err)
    return { success: false }
  }
}

/**
 * Toggles a trip's status between 'published' and 'draft'
 */
export function toggleAdminTripStatus(idOrSlug: string): { success: boolean; status?: string } {
  try {
    const trip = getAdminTripByIdOrSlug(idOrSlug)
    if (!trip) return { success: false }

    const newStatus = trip.status === 'published' ? 'draft' : 'published'
    trip.status = newStatus
    trip.updatedAt = new Date().toISOString()

    const list = getAllAdminTrips()
    const idx = list.findIndex((t) => t.id === trip.id)
    if (idx !== -1) {
      list[idx] = trip
      saveAdminTripsStore(list)
    }

    return { success: true, status: newStatus }
  } catch (err) {
    console.error('Error toggling trip status:', err)
    return { success: false }
  }
}

/**
 * Resolves published public trips for any specific page and section on the website
 */
export function getPublicTripsForPage(
  pageKey:
    | 'home-upcoming'
    | 'home-international'
    | 'home-festive'
    | 'upcoming'
    | 'domestic'
    | 'international'
    | 'weekend'
    | 'festive'
    | 'corporate'
    | 'all'
): AdminTrip[] {
  const all = getAllAdminTrips().filter((t) => t.status === 'published')

  switch (pageKey) {
    case 'home-upcoming':
      return all
        .filter((t) => t.placements?.showOnHome !== false && t.placements?.homeSection === 'upcoming')
        .sort((a, b) => (a.placements?.homeOrder ?? 10) - (b.placements?.homeOrder ?? 10))

    case 'home-international':
      return all
        .filter((t) => t.placements?.showOnHome !== false && (t.placements?.homeSection === 'international' || t.region === 'International'))
        .sort((a, b) => (a.placements?.homeOrder ?? 10) - (b.placements?.homeOrder ?? 10))

    case 'home-festive':
      return all
        .filter((t) => t.placements?.showOnHome !== false && (t.placements?.homeSection === 'festive' || t.placements?.showOnFestive))
        .sort((a, b) => (a.placements?.homeOrder ?? 10) - (b.placements?.homeOrder ?? 10))

    case 'upcoming':
      return all.filter((t) => t.placements?.showOnUpcoming !== false)

    case 'domestic':
      return all.filter((t) => t.placements?.showOnDomestic !== false && t.region !== 'International')

    case 'international':
      return all.filter((t) => t.placements?.showOnInternational !== false && t.region === 'International')

    case 'weekend':
      return all.filter((t) => t.placements?.showOnWeekend || isWeekendTrip(t))

    case 'festive':
      return all.filter((t) => t.placements?.showOnFestive || t.region === 'Xmas & New Year')

    case 'corporate':
      return all.filter((t) => t.placements?.showOnCorporate)

    case 'all':
    default:
      return all
  }
}

/**
 * Gets a single published public trip by slug (dynamic store first, fallback to baseStaticTrips)
 */
export function getStoredTripBySlug(slug: string): AdminTrip | null {
  if (!slug) return null
  const tripsList = getAllAdminTrips()
  const lower = slug.trim().toLowerCase()
  const found = tripsList.find((t) => t.slug.toLowerCase() === lower)
  if (found && found.status === 'published') return found
  if (found) return found // Allow preview even if draft for testing
  return null
}

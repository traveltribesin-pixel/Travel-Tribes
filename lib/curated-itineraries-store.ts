import fs from 'fs'
import path from 'path'
import { slugify } from '@/lib/utils'
import {
  CuratedItinerary,
  TripType,
  MEGHALAYA_CANVA_SEED,
  DEFAULT_POINTS_TO_BE_NOTED,
  DEFAULT_WHY_TRAVEL_TRIBES
} from './curated-itinerary-constants'

export { slugify }
export type { CuratedItinerary, TripType }
export { DEFAULT_POINTS_TO_BE_NOTED, DEFAULT_WHY_TRAVEL_TRIBES }

export const SEED_ITINERARIES: CuratedItinerary[] = [MEGHALAYA_CANVA_SEED]

interface CuratedStoreData {
  itineraries: CuratedItinerary[]
}

const DATA_DIR = path.join(process.cwd(), 'data')
const CURATED_FILE = path.join(DATA_DIR, 'curated-itineraries.json')

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function loadCuratedStore(): CuratedStoreData {
  try {
    ensureDataDir()
    if (!fs.existsSync(CURATED_FILE)) {
      const initial: CuratedStoreData = { itineraries: SEED_ITINERARIES }
      fs.writeFileSync(CURATED_FILE, JSON.stringify(initial, null, 2), 'utf-8')
      return initial
    }
    const raw = fs.readFileSync(CURATED_FILE, 'utf-8')
    const parsed = JSON.parse(raw)
    if (!parsed.itineraries || !Array.isArray(parsed.itineraries)) {
      return { itineraries: SEED_ITINERARIES }
    }

    // Ensure the Meghalaya flagship template is present
    if (!parsed.itineraries.some((it: any) => it.slug === 'meghalaya-backpacking-trip')) {
      parsed.itineraries.unshift(MEGHALAYA_CANVA_SEED)
      saveCuratedStore(parsed)
    }

    return parsed
  } catch (err) {
    console.error('Error reading curated itineraries store:', err)
    return { itineraries: SEED_ITINERARIES }
  }
}

export function saveCuratedStore(store: CuratedStoreData): void {
  try {
    ensureDataDir()
    fs.writeFileSync(CURATED_FILE, JSON.stringify(store, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error saving curated itineraries store:', err)
  }
}

export function getCuratedItineraryBySlug(slug: string): CuratedItinerary | null {
  if (!slug) return null
  const cleanSlug = String(slug).trim().toLowerCase()
  const store = loadCuratedStore()
  return store.itineraries.find(it => it.slug.toLowerCase() === cleanSlug) || null
}

export function getAllCuratedItineraries(): CuratedItinerary[] {
  const store = loadCuratedStore()
  return store.itineraries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function saveCuratedItinerary(data: Omit<CuratedItinerary, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): CuratedItinerary {
  const store = loadCuratedStore()
  const now = new Date().toISOString()

  let finalSlug = slugify(data.slug || data.title)
  if (!finalSlug) {
    finalSlug = `itinerary-${Date.now().toString().slice(-6)}`
  }

  // If existing record being updated
  if (data.id) {
    const index = store.itineraries.findIndex(it => it.id === data.id)
    if (index !== -1) {
      const existing = store.itineraries[index]
      const updated: CuratedItinerary = {
        ...existing,
        ...data,
        id: existing.id,
        slug: finalSlug,
        updatedAt: now
      }
      store.itineraries[index] = updated
      saveCuratedStore(store)
      return updated
    }
  }

  // Ensure unique slug for new items
  let uniqueSlug = finalSlug
  let counter = 1
  while (store.itineraries.some(it => it.slug === uniqueSlug && it.id !== data.id)) {
    uniqueSlug = `${finalSlug}-${counter}`
    counter++
  }

  const id = data.id || `curated-${Date.now().toString().slice(-8)}`
  const newItinerary: CuratedItinerary = {
    ...data,
    id,
    slug: uniqueSlug,
    createdAt: now,
    updatedAt: now
  }

  store.itineraries.unshift(newItinerary)
  saveCuratedStore(store)
  return newItinerary
}

export function deleteCuratedItinerary(id: string): boolean {
  const store = loadCuratedStore()
  const initialLen = store.itineraries.length
  store.itineraries = store.itineraries.filter(it => it.id !== id)
  if (store.itineraries.length !== initialLen) {
    saveCuratedStore(store)
    return true
  }
  return false
}

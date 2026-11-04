import type { Trip } from '@/lib/travel-data'
import type { CuratedItinerary, AvailableBatchOption } from '@/lib/curated-itinerary-constants'
import {
  DEFAULT_BANK_ACCOUNT,
  DEFAULT_POINTS_TO_BE_NOTED,
  DEFAULT_WHY_TRAVEL_TRIBES
} from '@/lib/curated-itinerary-constants'
import { generateProfessionalDayTitle } from '@/lib/day-title-generator'
import { getLuxuryImagesForDestination } from '@/lib/itinerary-images'

export interface ConvertTripOptions {
  clientName?: string
  clientPhone?: string
  clientEmail?: string
}

/**
 * Converts any standard Trip into a CuratedItinerary object
 * with ALL available batch dates, exact prices, and destination-accurate images.
 */
export function convertTripToCuratedItinerary(trip: Trip, options?: ConvertTripOptions): CuratedItinerary {
  const totalDays = trip.itinerary?.length || 1
  const destMedia = getLuxuryImagesForDestination(trip.location || trip.title)

  // Strictly use this trip's images or destination-specific media (NEVER random fallbacks)
  let galleryImages = (trip.gallery || []).map((g) => g.image).filter(Boolean)
  if (galleryImages.length === 0 && destMedia.gallery && destMedia.gallery.length > 0) {
    galleryImages = destMedia.gallery
  }

  const mappedDays = (trip.itinerary || []).map((d) => {
    const narrativeTitle = generateProfessionalDayTitle({
      dayNumber: d.day,
      totalDays,
      customTitle: d.title,
      destination: trip.location
    })

    const dayImg =
      trip.gallery?.[d.day - 1]?.image ||
      (galleryImages.length > 0 ? galleryImages[(d.day - 1) % galleryImages.length] : trip.image)

    return {
      day: d.day,
      title: narrativeTitle,
      guidedTour: true,
      points: d.activities || [],
      meals: ['Breakfast', 'Dinner'],
      stayHotel: 'Handpicked Boutique Stay',
      stayCity: trip.location,
      stay: trip.location,
      image: dayImg
    }
  })

  const locationGlimpses = (trip.gallery && trip.gallery.length > 0)
    ? trip.gallery.slice(0, 4).map((g, i) => ({
        name: g.alt || `${trip.location} Highlight ${i + 1}`,
        image: g.image
      }))
    : galleryImages.slice(0, 4).map((img, i) => ({
        name: `${trip.location} Highlight ${i + 1}`,
        image: img
      }))

  const rawPrice = trip.price ? trip.price.replace(/[^\d]/g, '') : '20999'
  const basePriceFormatted = trip.price || '₹20,999'

  // Build ALL available batch dates with specific pricing
  const availableBatches: AvailableBatchOption[] = []

  if (trip.dates && trip.dates.length > 0) {
    trip.dates.forEach((dateStr) => {
      let bPrice = basePriceFormatted
      let bNote = ''

      const isFestive =
        dateStr.toLowerCase().includes('new year') ||
        dateStr.toLowerCase().includes('christmas') ||
        dateStr.toLowerCase().includes('xmas') ||
        dateStr.toLowerCase().includes('special')

      if (isFestive && trip.festivePackages && trip.festivePackages.length > 0) {
        bPrice = trip.festivePackages[0].price
        bNote = 'Festive Special Batch'
      } else if (trip.regularPackages && trip.regularPackages.length > 0) {
        bPrice = trip.regularPackages[0].price
      }

      const match = dateStr.match(/\((.*?)\)/)
      if (match) {
        bNote = match[1]
      }

      const cleanDate = dateStr.replace(/\(.*?\)/, '').trim()

      availableBatches.push({
        date: cleanDate,
        price: bPrice,
        note: bNote || 'Confirmed Batch'
      })
    })
  } else if (trip.date) {
    availableBatches.push({
      date: trip.date,
      price: basePriceFormatted,
      note: 'Upcoming Batch'
    })
  }

  // Pricing Options (e.g. Triple Sharing, Double Sharing)
  const pricingOptionsList = (trip.pricingOptions || trip.regularPackages || []).map((p) => ({
    label: p.label,
    price: p.price,
    note: p.note
  }))

  const primaryBatchDates = availableBatches.map((b) => b.date)

  // Standard circuit route cleanly formatted without any "Day 1:" or "Day 2:" prefixes
  const cleanCircuitRoute = (trip.location || '')
    .replace(/Day\s*\d+\s*[:\-➔→]?\s*/gi, '')
    .replace(/[•·—–\u2014\u2013\u2022\u00B7]/g, ' • ')
    .replace(/\s*->\s*/g, ' • ')
    .replace(/\s*➔\s*/g, ' • ')
    .replace(/\s*→\s*/g, ' • ')
    .replace(/\s*[•·]+\s*/g, ' • ')
    .replace(/\s+/g, ' ')
    .replace(/^[•·\s]+|[•·\s]+$/g, '')
    .trim() || trip.location

  return {
    id: trip.id,
    slug: trip.slug,
    tripType: 'group',
    title: trip.title,
    subtitle: `${trip.region?.toUpperCase() || 'COMMUNITY'} EXPEDITION • WHERE WANDERERS BECOME TRIBE`,
    destination: trip.location,
    duration: trip.duration,
    routeText: cleanCircuitRoute,
    bannerImage: trip.image || destMedia.hero,
    overview: trip.description,
    highlights: trip.highlights || [],
    highlightImages: galleryImages.slice(0, 4),
    locationGlimpses: locationGlimpses,
    clientName: options?.clientName || 'Valued Tribe Explorer',
    clientPhone: options?.clientPhone,
    clientEmail: options?.clientEmail,
    travelDates: trip.dates && trip.dates.length > 1 ? undefined : (trip.date || trip.dates?.[0]),
    batchDates: primaryBatchDates,
    availableBatches: availableBatches,
    mealPlan: 'Breakfast & Dinner Included as per Itinerary Plan',
    hotels: [
      {
        id: 'h1',
        city: trip.location,
        hotelName: 'Handpicked Verified Premium Stay',
        nights: trip.duration,
        roomType: 'Double / Triple Sharing',
        starRating: 'Verified Comfort'
      }
    ],
    cityWiseStay: [
      {
        city: trip.location,
        nights: trip.duration
      }
    ],
    transport: {
      vehicleType: 'Comfortable AC Tempo Traveller / SUV as per group size',
      pickupDrop: 'Dedicated Internal Transfers & Sightseeing',
      includedFeatures: [
        'All Tolls, Parking & Fuel',
        'State Border Taxes & Permits',
        'Experienced Mountain Chauffeur'
      ]
    },
    days: mappedDays,
    inclusions: trip.inclusions && trip.inclusions.length > 0
      ? trip.inclusions
      : [
          'Dedicated AC Group Vehicle with Chauffeur',
          'Handpicked Verified Accommodations',
          'Daily Breakfast & Dinner as per itinerary',
          'Trip Captain / Experienced Local Tour Guide',
          'All Tolls, Parking & Driver Allowances'
        ],
    exclusions: trip.exclusions && trip.exclusions.length > 0
      ? trip.exclusions
      : [
          'Flight / Train tickets to base location',
          'Personal expenses, laundry & room service',
          'Monument entry fees, camera tickets & safari charges',
          'Any adventure activities not mentioned in itinerary',
          '5% GST as applicable on travel packages'
        ],
    quotation: {
      tripleSharingPrice: rawPrice,
      pricePerPerson: rawPrice,
      advanceAmount: trip.bookingAmount ? trip.bookingAmount.replace(/[^\d]/g, '') : '5000',
      balancePendingAmount: 'To be paid 7 days prior to departure',
      pricingOptions: pricingOptionsList
    },
    accountDetails: DEFAULT_BANK_ACCOUNT,
    pointsToBeNoted: trip.policies && trip.policies.length > 0
      ? trip.policies
      : DEFAULT_POINTS_TO_BE_NOTED,
    whyTravelTribes: DEFAULT_WHY_TRAVEL_TRIBES,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}

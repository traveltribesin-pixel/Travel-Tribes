import type { Trip } from '@/lib/travel-data'
import type { CuratedItinerary } from '@/lib/curated-itinerary-constants'
import {
  DEFAULT_BANK_ACCOUNT,
  DEFAULT_POINTS_TO_BE_NOTED,
  DEFAULT_WHY_TRAVEL_TRIBES
} from '@/lib/curated-itinerary-constants'
import { generateProfessionalDayTitle } from '@/lib/day-title-generator'

export interface ConvertTripOptions {
  clientName?: string
  clientPhone?: string
  clientEmail?: string
}

/**
 * Converts any standard Trip into a CuratedItinerary object
 * so it renders in the exact same luxury proposal template as /curate-itinerary.
 */
export function convertTripToCuratedItinerary(trip: Trip, options?: ConvertTripOptions): CuratedItinerary {
  const totalDays = trip.itinerary?.length || 1

  const mappedDays = (trip.itinerary || []).map((d) => {
    const narrativeTitle = generateProfessionalDayTitle({
      dayNumber: d.day,
      totalDays,
      customTitle: d.title,
      destination: trip.location
    })

    return {
      day: d.day,
      title: narrativeTitle,
      guidedTour: true,
      points: d.activities || [],
      meals: ['Breakfast', 'Dinner'],
      stayHotel: 'Handpicked Boutique Stay',
      stayCity: trip.location,
      stay: trip.location,
      image: trip.gallery?.[d.day - 1]?.image || trip.image
    }
  })

  const galleryImages = (trip.gallery || []).slice(0, 4).map((g) => g.image)
  const locationGlimpses = (trip.gallery || []).slice(0, 4).map((g, i) => ({
    name: g.alt || `Highlight ${i + 1}`,
    image: g.image
  }))

  const rawPrice = trip.price ? trip.price.replace(/[^\d]/g, '') : '20999'

  return {
    id: trip.id,
    slug: trip.slug,
    tripType: 'group',
    title: trip.title,
    subtitle: `${trip.region?.toUpperCase() || 'COMMUNITY'} EXPEDITION • WHERE WANDERERS BECOME TRIBE`,
    destination: trip.location,
    duration: trip.duration,
    routeText: trip.itinerary?.map((d) => d.title.split('➔')[0].trim()).slice(0, 4).join(' • ') || trip.location,
    bannerImage: trip.image,
    overview: trip.description,
    highlights: trip.highlights || [],
    highlightImages: galleryImages,
    locationGlimpses: locationGlimpses,
    clientName: options?.clientName || 'Valued Tribe Explorer',
    clientPhone: options?.clientPhone,
    clientEmail: options?.clientEmail,
    travelDates: trip.date || trip.dates?.[0] || 'Upcoming Fixed Batches',
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
      advanceAmount: trip.bookingAmount ? trip.bookingAmount.replace(/[^\d]/g, '') : '3000',
      balancePendingAmount: 'To be paid 7 days prior to departure'
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

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { trips } from '@/lib/travel-data'
import { getCuratedItineraryBySlug } from '@/lib/curated-itineraries-store'
import { TripContent } from './trip-content'
import { CuratedItineraryView } from '@/components/curated-itinerary-view'
import { PageFrame } from '@/components/site-shell'

export const dynamicParams = true

export function generateStaticParams() {
  return trips.map((trip) => ({
    slug: trip.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  // 1. Check curated store first
  const curated = getCuratedItineraryBySlug(slug)
  if (curated) {
    const isCustom = curated.tripType === 'customized'
    const title = isCustom
      ? `${curated.title} — Proposal for ${curated.clientName || 'Valued Traveller'} | Travel Tribes`
      : `${curated.title} (${curated.duration}) | Travel Tribes`
    const description = curated.overview
      ? curated.overview.slice(0, 160)
      : `Personalized travel itinerary for ${curated.destination}. Curated stays, transfers, and day-by-day plan by Travel Tribes.`

    const curatedImage = curated.bannerImage
      ? (curated.bannerImage.startsWith('http') ? curated.bannerImage : encodeURI(curated.bannerImage.startsWith('/') ? curated.bannerImage : `/${curated.bannerImage}`))
      : '/image/travel-tribes-og-group.jpg'

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://traveltribes.in/itinerary/${curated.slug}`,
        siteName: 'Travel Tribes',
        images: [
          {
            url: curatedImage,
            width: 1200,
            height: 630,
            alt: curated.title
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [curatedImage]
      }
    }
  }

  // 2. Check standard travel data trips
  const trip = trips.find((t) => t.slug === slug)
  if (!trip) return {}

  const title = `${trip.title} (${trip.duration}) | Travel Tribes`
  const description = trip.seoDescription
    ? trip.seoDescription
    : (trip.description
      ? trip.description.slice(0, 160)
      : `Join Travel Tribes for an epic ${trip.duration} group trip to ${trip.location}. Curated stays, transfers, guide & like-minded travellers.`)

  const keywords = trip.seoKeywords && trip.seoKeywords.length > 0
    ? trip.seoKeywords
    : [trip.title, `${trip.location} tour`, 'group trip', 'Travel Tribes']

  // Dynamically resolve the specific trip's group photo / hero image
  const tripImage = trip.image
    ? (trip.image.startsWith('http') ? trip.image : encodeURI(trip.image.startsWith('/') ? trip.image : `/${trip.image}`))
    : '/image/travel-tribes-og-group.jpg'

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://traveltribes.in/itinerary/${trip.slug}`,
      siteName: 'Travel Tribes',
      images: [
        {
          url: tripImage,
          width: 1200,
          height: 630,
          alt: `${trip.title} — Travel Tribes Group Trip`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [tripImage]
    }
  }
}

export default async function ItineraryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  // 1. Check curated itineraries
  const curated = getCuratedItineraryBySlug(slug)
  if (curated) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-3 border-[#00b4d8] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-semibold text-slate-400">Loading custom itinerary proposal...</p>
            </div>
          </div>
        }
      >
        <CuratedItineraryView itinerary={curated} />
      </Suspense>
    )
  }

  // 2. Fall back to standard trips
  const trip = trips.find((t) => t.slug === slug)
  if (!trip) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: trip.title,
    description: trip.seoDescription || trip.description,
    touristType: ['Solo Travellers', 'Couples', 'Groups'],
    offers: {
      '@type': 'Offer',
      price: trip.price.replace(/[^\d]/g, '') || '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://traveltribes.in/itinerary/${trip.slug}`
    },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: trip.itinerary?.map((day, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: day.title,
        description: day.activities.join(' ')
      })) || []
    }
  }

  return (
    <PageFrame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#f7fbfd] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-3 border-[var(--sky)] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-semibold text-slate-500">Loading trip details...</p>
            </div>
          </div>
        }
      >
        <TripContent trip={trip} />
      </Suspense>
    </PageFrame>
  )
}

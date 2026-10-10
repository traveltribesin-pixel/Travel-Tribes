import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { trips } from '@/lib/travel-data'
import { TripContent } from './trip-content'
import { PageFrame } from '@/components/site-shell'

export function generateStaticParams() {
  return trips.map((trip) => ({
    slug: trip.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const trip = trips.find((t) => t.slug === resolvedParams.slug)
  if (!trip) return {}

  const title = `${trip.title} (${trip.duration}) | Travel Tribes`
  const description = trip.description
    ? trip.description.slice(0, 160)
    : `Join Travel Tribes for an epic ${trip.duration} group trip to ${trip.location}. Curated stays, transfers, guide & like-minded travellers.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://traveltribes.in/itinerary/${trip.slug}`,
      siteName: 'Travel Tribes',
      images: [
        {
          url: '/image/Logowithbg.png',
          width: 800,
          height: 800,
          alt: trip.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/image/Logowithbg.png']
    }
  }
}

export default async function ItineraryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const trip = trips.find((t) => t.slug === resolvedParams.slug)
  
  if (!trip) {
    notFound()
  }

  return (
    <PageFrame>
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


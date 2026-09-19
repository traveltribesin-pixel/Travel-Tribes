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


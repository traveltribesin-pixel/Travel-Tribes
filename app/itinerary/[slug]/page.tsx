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
      <TripContent trip={trip} />
    </PageFrame>
  )
}


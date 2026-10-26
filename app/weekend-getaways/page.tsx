import type { Metadata } from 'next'
import { TripsPage } from '@/app/trips-page'
import { trips, type Trip, isWeekendTrip } from '@/lib/travel-data'

export const metadata: Metadata = {
  title: 'Weekend Getaways & Short Trips from Mumbai & Pune | Travel Tribes',
  description: 'Quick 2-3 day weekend escapes from Mumbai and Pune. Explore Bhandardara lakeside camping, beach treks, and scenic road trips with Travel Tribes.',
  openGraph: {
    title: 'Weekend Getaways & Short Trips from Mumbai & Pune | Travel Tribes',
    description: 'Quick 2-3 day weekend escapes from Mumbai and Pune. Explore Bhandardara lakeside camping, beach treks, and scenic road trips with Travel Tribes.',
    images: ['/image/travel-tribes-og-group.jpg']
  }
}

export default function Page() {
  const weekendTrips: Trip[] = trips.filter((t) => isWeekendTrip(t))
  return (
    <TripsPage
      eyebrow="A little time away"
      title="Weekend getaways."
      intro="Short on days, never on feeling. Quick 1–3 day lakeside escapes, stargazing camping adventures, and scenic getaways from Mumbai & Pune."
      image="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=2200&q=88"
      trips={weekendTrips}
      categories={[]}
    />
  )
}

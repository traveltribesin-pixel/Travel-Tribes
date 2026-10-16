import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { TripsPage } from '@/app/trips-page'
import { trips, type Trip } from '@/lib/travel-data'

export const metadata: Metadata = {
  title: 'Weekend Getaways & Short Trips from Mumbai & Pune | Travel Tribes',
  description: 'Quick 2-3 day weekend escapes from Mumbai and Pune. Explore Gokarna beach treks, Hampi heritage, Coorg coffee trails and Kolad rafting with Travel Tribes.',
  openGraph: {
    title: 'Weekend Getaways & Short Trips from Mumbai & Pune | Travel Tribes',
    description: 'Quick 2-3 day weekend escapes from Mumbai and Pune. Explore Gokarna beach treks, Hampi heritage, Coorg coffee trails and Kolad rafting with Travel Tribes.',
    images: ['/image/Logowithbg.png']
  }
}

export default function Page() {
  redirect('/upcoming-trips')
  const weekendTrips: Trip[] = trips.filter(
    (t) =>
      t.region === 'Weekend' ||
      t.tag?.toLowerCase().includes('weekend') ||
      t.duration?.includes('2D') ||
      t.duration?.includes('3D') ||
      t.duration?.includes('4D')
  )
  return (
    <TripsPage
      eyebrow="A little time away"
      title="Weekend getaways."
      intro="Short on days, never on feeling. Exciting new weekend itineraries and short escapes are dropping soon!"
      image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=88"
      trips={weekendTrips}
      categories={[]}
    />
  )
}

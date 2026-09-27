import { TripsPage } from '@/app/trips-page'
import type { Trip } from '@/lib/travel-data'

export default function Page() {
  const weekendTrips: Trip[] = []
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

import { TripsPage } from '@/app/trips-page'
import { trips } from '@/lib/travel-data'

const categories = [
  { value: 'All', title: 'All' },
  { value: 'Xmas & New Year', title: 'Xmas & New Year' },
]

export default function Page() {
  const weekendTrips = trips.filter(
    (t) => t.region === 'Weekend' || t.tag?.toLowerCase().includes('weekend') || t.duration.includes('3D') || t.duration.includes('4D')
  )
  return (
    <TripsPage
      eyebrow="A little time away"
      title="Weekend getaways."
      intro="Short on days, never on feeling. These are compact escapes made for a reset, a first trip or a spontaneous yes."
      image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=88"
      trips={weekendTrips}
      categories={categories}
    />
  )
}

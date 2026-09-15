import { TripsPage } from '@/app/trips-page'
import { trips } from '@/lib/travel-data'

const categories = [
  { value: 'All', title: 'All' },
  { value: 'Xmas & New Year', title: 'Xmas & New Year' },
]

export default function Page() {
  const internationalTrips = trips.filter(t => t.region === 'International')
  return (
    <TripsPage
      eyebrow="Go further, together"
      title="International trips."
      intro="New cultures, familiar laughter and the kind of perspective you only get by stepping outside the everyday."
      image="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2200&q=88"
      trips={internationalTrips}
      categories={categories}
    />
  )
}

import { TripsPage } from '@/app/trips-page'
import { trips } from '@/lib/travel-data'

const categories = [
  { value: 'All', title: 'All' },
  { value: 'Weekend', title: 'Weekend' },
  { value: 'Xmas & New Year', title: 'Xmas & New Year' },
]

export default function Page() {
  const domesticTrips = trips.filter(t => t.region !== 'International')
  return (
    <TripsPage
      eyebrow="Closer than you think"
      title="Domestic trips."
      intro="From mountain mornings to coastlines that keep going. See the country slowly, thoughtfully and with good company."
      image="https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=2200&q=88"
      trips={domesticTrips}
      categories={categories}
    />
  )
}

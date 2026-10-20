import type { Metadata } from 'next'
import { TripsPage } from '@/app/trips-page'
import { trips } from '@/lib/travel-data'

export const metadata: Metadata = {
  title: 'Domestic Group Trips & Backpacking in India | Travel Tribes',
  description: 'Explore the best of India with Travel Tribes. Curated group tours to Meghalaya, Spiti Valley, Gokarna, Kerala, Rajasthan and more with like-minded travellers.',
  openGraph: {
    title: 'Domestic Group Trips & Backpacking in India | Travel Tribes',
    description: 'Explore the best of India with Travel Tribes. Curated group tours to Meghalaya, Spiti Valley, Gokarna, Kerala, Rajasthan and more with like-minded travellers.',
    images: ['/image/travel-tribes-og-group.jpg']
  }
}

const categories = [
  { value: 'All', title: 'All' },
  { value: 'Xmas & New Year', title: 'Xmas & New Year' },
]

export default function Page() {
  const isJawai = (slug: string) => slug.toLowerCase().includes('jawai')
  const isEndedTrip = (slug: string) => {
    const s = slug.toLowerCase()
    return s.includes('hampi') || s === 'spiti-valley-chandrataal'
  }
  const activeDomesticTrips = trips.filter(
    (t) => t.region !== 'International' && !isEndedTrip(t.slug) && !isJawai(t.slug)
  )
  const endedDomesticTrips = trips.filter(
    (t) => t.region !== 'International' && isEndedTrip(t.slug) && !isJawai(t.slug)
  )
  const jawaiTrips = trips.filter(
    (t) => t.region !== 'International' && isJawai(t.slug)
  )
  const domesticTrips = [...activeDomesticTrips, ...endedDomesticTrips, ...jawaiTrips]

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

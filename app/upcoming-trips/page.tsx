import type { Metadata } from 'next'
import { TripsPage } from '@/app/trips-page'
import { trips } from '@/lib/travel-data'

export const metadata: Metadata = {
  title: 'Upcoming Group Trips in India and Abroad | Travel with Strangers | Travel Tribes',
  description: 'Join curated group trips across India and international with Travel Tribes. Meet like-minded travellers, explore amazing destinations and create unforgettable memories.',
  openGraph: {
    title: 'Upcoming Group Trips in India and Abroad | Travel with Strangers | Travel Tribes',
    description: 'Join curated group trips across India and international with Travel Tribes. Meet like-minded travellers, explore amazing destinations and create unforgettable memories.',
    images: ['/image/Logowithbg.png']
  }
}

const categories = [
  { value: 'All', title: 'All' },
  { value: 'Domestic', title: 'Domestic' },
  { value: 'International', title: 'International' },
  { value: 'Weekend', title: 'Weekend' },
  { value: 'Xmas & New Year', title: 'Xmas & New Year' },
]

export default function Page() {
  return (
    <TripsPage
      eyebrow="The calendar"
      title="Upcoming trips."
      intro="The next places we are going, and the people you could go with. Pick a date, then let the anticipation begin."
      image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=88"
      trips={trips}
      categories={categories}
    />
  )
}

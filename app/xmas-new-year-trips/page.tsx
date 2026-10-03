import { TripsPage } from '@/app/trips-page'
import { xmasNewYearTrips } from '@/lib/travel-data'

const categories = [
  { value: 'All', title: 'All' },
  { value: 'Domestic', title: 'Domestic' },
  { value: 'International', title: 'International' },
  { value: 'Weekend', title: 'Weekend' },
]

export default function Page() {
  return (
    <TripsPage
      eyebrow="Holiday Celebrations 🎉"
      title="Xmas & New Year Trips."
      intro="Ring in 2027 with unforgettable beach countdowns, snowy mountain bonfires, starry desert camps, and your favorite travel tribe."
      image="https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=2200&q=88"
      trips={xmasNewYearTrips}
      categories={categories}
    />
  )
}


import type { Metadata } from 'next'
import { PlanTripContent } from './plan-trip-content'

export const metadata: Metadata = {
  title: 'Plan a Custom Trip | Tailored Group & Private Itineraries | Travel Tribes',
  description: 'Customize your dream vacation with Travel Tribes. Tell us your dates, group size and destinations for a personalized travel plan across India & abroad.',
  openGraph: {
    title: 'Plan a Custom Trip | Tailored Group & Private Itineraries | Travel Tribes',
    description: 'Customize your dream vacation with Travel Tribes. Tell us your dates, group size and destinations for a personalized travel plan across India & abroad.',
    images: ['/image/Logowithbg.png']
  }
}

export default function PlanATripPage() {
  return <PlanTripContent />
}

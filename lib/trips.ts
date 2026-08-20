import { trips as originalTrips } from './travel-data'

export interface Trip {
  id: string
  title: string
  destination: string
  category: string
  duration: number
  type: 'weekend' | 'domestic' | 'international'
  description: string
  highlights: string[]
}

export const SAMPLE_TRIPS: Trip[] = originalTrips.map((t) => ({
  id: t.slug,
  title: t.title,
  destination: t.location.split(' · ')[0] || t.location,
  category: t.region,
  duration: parseInt(t.duration) || 5,
  type: t.region === 'Weekend' ? 'weekend' : (t.region === 'International' ? 'international' : 'domestic'),
  description: t.description || '',
  highlights: t.tag ? [t.tag] : []
}))

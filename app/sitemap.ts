import { MetadataRoute } from 'next'
import { trips } from '@/lib/travel-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://traveltribes.in'

  const staticRoutes = [
    '',
    '/upcoming-trips',
    '/domestic-trips',
    '/international-trips',
    '/xmas-new-year-trips',
    '/corporate-trips',
    '/plan-a-trip',
    '/why-us',
    '/about',
    '/contact',
    '/book'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8
  }))

  const itineraryRoutes = trips.map((trip) => ({
    url: `${baseUrl}/itinerary/${trip.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }))

  return [...staticRoutes, ...itineraryRoutes]
}

import { MetadataRoute } from 'next'
import { trips, blogs } from '@/lib/travel-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://traveltribes.in'

  const staticRoutes = [
    '',
    '/upcoming-trips',
    '/domestic-trips',
    '/international-trips',
    '/weekend-getaways',
    '/xmas-new-year-trips',
    '/corporate-trips',
    '/plan-a-trip',
    '/why-us',
    '/about',
    '/contact',
    '/book',
    '/blog',
    '/privacy-policy',
    '/terms'
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

  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))

  return [...staticRoutes, ...itineraryRoutes, ...blogRoutes]
}

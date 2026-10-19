import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Itinerary Curator | Travel Tribes (Internal)',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CurateItineraryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

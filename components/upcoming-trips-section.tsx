'use client'

import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { TripCard } from '@/components/trip-card'
import { trips } from '@/lib/travel-data'

export function UpcomingTripsSection() {
  return (
    <section
      className="py-12 sm:py-16 bg-white"
      style={{
        paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
        paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
      }}
    >
      <SectionHeading
        eyebrow="YOUR NEXT ADVENTURE"
        title="Upcoming Trips."
        text="Good places. Great people. Zero boring itineraries."
        href="/upcoming-trips"
        center
      />
      <HorizontalRail label="Upcoming trips">
        {trips.map(t => (
          <TripCard key={t.slug} trip={t} featured />
        ))}
      </HorizontalRail>
    </section>
  )
}

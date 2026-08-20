'use client'

import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { TripCard } from '@/components/trip-card'
import { trips } from '@/lib/travel-data'

export function UpcomingTripsSection() {
  return (
    <section 
      className="py-[110px] max-[850px]:py-[75px] bg-white"
      style={{
        paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
        paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
      }}
    >
      <SectionHeading 
        eyebrow="Your next chapter" 
        title="Upcoming trips." 
        text="The places we are dreaming about right now. Small groups, considered itineraries and a little room for magic." 
        href="/upcoming-trips" 
      />
      <HorizontalRail label="Upcoming trips">
        {trips.slice(0, 4).map(t => (
          <TripCard key={t.slug} trip={t} featured />
        ))}
      </HorizontalRail>
    </section>
  )
}

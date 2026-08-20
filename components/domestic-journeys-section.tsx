'use client'

import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { TripCard } from '@/components/trip-card'
import { trips } from '@/lib/travel-data'

export function DomesticJourneysSection() {
  return (
    <section className="w-full max-w-[1280px] py-[110px] max-[850px]:py-[75px] px-[5vw] mx-auto editorial-section">
      <SectionHeading 
        eyebrow="Stay close to home" 
        title="Domestic journeys." 
        href="/domestic-trips" 
      />
      <HorizontalRail label="Domestic trips">
        {trips
          .filter(t => t.region === 'Domestic')
          .map(t => (
            <TripCard key={t.slug} trip={t} />
          ))}
      </HorizontalRail>
    </section>
  )
}

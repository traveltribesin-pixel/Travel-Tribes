'use client'

import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { TripCard } from '@/components/trip-card'
import { trips } from '@/lib/travel-data'

export function InternationalTripsSection() {
  return (
    <section 
      className="py-[110px] max-[850px]:py-[40px] bg-[var(--sky-pale)]"
      style={{
        paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
        paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
      }}
    >
      <SectionHeading 
        eyebrow="Further, together" 
        title="International trips." 
        text="Explore the world with our carefully curated international adventures. Discover new cultures, stunning landscapes, and unforgettable moments."
        href="/international-trips" 
        center
      />
      <HorizontalRail label="International trips">
        {trips
          .filter(t => t.region === 'International')
          .map(t => (
            <TripCard key={t.slug} trip={t} />
          ))}
      </HorizontalRail>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { TripCard } from '@/components/trip-card'
import { trips } from '@/lib/travel-data'

export function InternationalTripsSection() {
  return (
    <section 
      className="py-12 sm:py-16 bg-[var(--sky-pale)]"
      style={{
        paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
        paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
      }}
    >
      <SectionHeading 
        eyebrow="Further, together" 
        title="International trips." 
        center
      />
      <HorizontalRail label="International trips">
        {trips
          .filter(t => t.region === 'International')
          .map(t => (
            <TripCard key={t.slug} trip={t} />
          ))}
      </HorizontalRail>

      {/* Centered Glow Button Below Cards */}
      <div className="mt-8 sm:mt-10 flex justify-center">
        <Link
          href="/international-trips"
          className="glow-btn inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold rounded-full shadow-lg !text-white cursor-pointer"
        >
          <span>See all international trips</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}

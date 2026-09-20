'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { TripCard } from '@/components/trip-card'
import { trips } from '@/lib/travel-data'

export function UpcomingTripsSection() {
  return (
    <section
      className="py-8 sm:py-10 bg-white"
      style={{
        paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
        paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
      }}
    >
      <SectionHeading
        eyebrow="YOUR NEXT ADVENTURE"
        title="Upcoming Trips."
        center
      />
      <HorizontalRail label="Upcoming trips">
        {trips.map(t => (
          <TripCard key={t.slug} trip={t} featured />
        ))}
      </HorizontalRail>

      {/* Centered Glow Button Below Cards */}
      <div className="mt-8 sm:mt-10 flex justify-center">
        <Link
          href="/upcoming-trips"
          className="glow-btn inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold rounded-full shadow-lg !text-white cursor-pointer"
        >
          <span>See all trips</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}

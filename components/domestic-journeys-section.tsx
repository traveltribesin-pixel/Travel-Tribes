'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { TripCard } from '@/components/trip-card'
import { trips } from '@/lib/travel-data'

export function DomesticJourneysSection() {
  return (
    <section className="w-full max-w-[1280px] py-8 sm:py-10 px-[5vw] mx-auto editorial-section">
      <SectionHeading 
        eyebrow="Stay close to home" 
        title="Domestic journeys." 
        center
      />
      <HorizontalRail label="Domestic trips">
        {trips
          .filter(t => t.region === 'Domestic')
          .map(t => (
            <TripCard key={t.slug} trip={t} />
          ))}
      </HorizontalRail>

      {/* Centered Glow Button Below Cards */}
      <div className="mt-8 sm:mt-10 flex justify-center">
        <Link
          href="/domestic-trips"
          className="glow-btn inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold rounded-full shadow-lg !text-white cursor-pointer"
        >
          <span>See all domestic trips</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}

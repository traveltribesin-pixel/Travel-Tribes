'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { TripCard } from '@/components/trip-card'
import { xmasNewYearTrips } from '@/lib/travel-data'

export function XmasNewYearSection() {
  if (!xmasNewYearTrips || xmasNewYearTrips.length === 0) return null

  return (
    <section 
      className="py-8 sm:py-10 bg-gradient-to-b from-amber-50/40 via-white to-[#f7fbfd]"
      style={{
        paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
        paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
      }}
    >
      <SectionHeading 
        eyebrow="Holiday Celebrations 🎉" 
        title="Xmas & New Year Trips." 
        text="Ring in 2027 with beach countdowns, snowy mountain bonfires, starry desert camps, and your travel tribe."
        center
      />
      <HorizontalRail label="Xmas & New Year trips">
        {xmasNewYearTrips.map(t => (
          <TripCard key={t.slug} trip={t} featured />
        ))}
      </HorizontalRail>

      {/* Centered Glow Button Below Cards */}
      <div className="mt-8 sm:mt-10 flex justify-center">
        <Link
          href="/xmas-new-year-trips"
          className="glow-btn inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold rounded-full shadow-lg !text-white cursor-pointer bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700"
        >
          <Sparkles className="w-4 h-4" />
          <span>See all Xmas & New Year trips ({xmasNewYearTrips.length})</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  )
}

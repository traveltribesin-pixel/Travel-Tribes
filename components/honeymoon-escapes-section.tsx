'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { TripCard } from '@/components/trip-card'
import { honeymoonTrips } from '@/lib/travel-data'

export function HoneymoonEscapesSection() {
  return (
    <section 
      className="py-12 sm:py-16 bg-[var(--sky-pale)]"
      style={{
        paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
        paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
      }}
    >
      <SectionHeading 
        eyebrow="For your next chapter" 
        title="Honeymoon escapes." 
        text="Unhurried days, beautiful stays and places made for celebrating two." 
        href="/contact" 
        label="Plan something personal" 
        center
      />
      <HorizontalRail label="Honeymoon trips">
        {honeymoonTrips.map(t => (
          <TripCard key={t.slug} trip={t} featured />
        ))}
        <Link 
          className="discover-card group relative bg-[var(--navy)] rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(11,41,64,0.1)] w-[280px] min-h-[410px] shrink-0 border border-white/5 no-underline"
          href="/contact"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <span className="font-sans font-bold text-[28px] text-white leading-tight tracking-tight mt-4 group-hover:text-[var(--sun)] transition-colors block">
            Tell us what you are dreaming of
          </span>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[var(--sun)] self-start mt-8 group-hover:bg-white group-hover:text-[var(--navy)] transition-all duration-300">
            <ArrowRight size={18} />
          </div>
        </Link>
      </HorizontalRail>
    </section>
  )
}

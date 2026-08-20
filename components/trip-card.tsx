'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CalendarDays, Clock3, MapPin } from 'lucide-react'
import type { Trip } from '@/lib/travel-data'

export function TripCard({ trip, featured = false }: { trip: Trip; featured?: boolean }) {
  return (
    <article className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(11,41,64,0.06)] flex flex-col w-[310px] shrink-0">
      
      {/* Image Container with tag overlays */}
      <Link href={`/contact?trip=${trip.slug}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-50">
        <Image 
          src={trip.image} 
          alt={trip.alt} 
          fill 
          sizes="(max-width: 700px) 84vw, 33vw" 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Featured Tag (top left) */}
        {trip.tag && (
          <span className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border border-slate-100">
            {trip.tag}
          </span>
        )}
        {/* Floating Arrow Indicator (bottom right) */}
        <span className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center text-slate-800 shadow-md transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <ArrowRight size={15} />
        </span>
      </Link>

      {/* Card Details Body */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Location Badge */}
        <div className="text-[10px] font-extrabold text-[var(--sky)] uppercase tracking-widest flex items-center gap-1.5 leading-none">
          <MapPin size={11} className="shrink-0" />
          <span>{trip.location}</span>
        </div>

        {/* Title */}
        <h3 className="font-sans font-bold text-[17px] text-slate-800 group-hover:text-[var(--sky)] transition-colors mt-3 mb-2 leading-snug">
          <Link href={`/contact?trip=${trip.slug}`}>{trip.title}</Link>
        </h3>

        {/* Description Snippet */}
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 min-h-[32px] mb-4">
          {trip.description}
        </p>

        {/* Divider line */}
        <div className="w-full h-[1px] bg-slate-100 mt-auto mb-4" />

        {/* Calendar and Clock Meta details */}
        <div className="flex items-center gap-4 text-slate-400 text-[11px] font-medium mb-4">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} className="text-slate-300" />
            {trip.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 size={13} className="text-slate-300" />
            {trip.duration}
          </span>
        </div>

        {/* Pricing and spot indicator row */}
        <div className="flex items-center justify-between mt-auto">
          <strong className="text-slate-800 text-[17px] font-black tracking-tight">
            {trip.price}
          </strong>
          {trip.spots && (
            <span className="bg-amber-50 text-amber-600 text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-md border border-amber-100">
              {trip.spots}
            </span>
          )}
        </div>
      </div>

    </article>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CalendarDays, Clock3, MapPin } from 'lucide-react'
import type { Trip } from '@/lib/travel-data'

export function TripCard({ trip, featured = false }: { trip: Trip; featured?: boolean }) {
  return (
    <Link href={`/itinerary/${trip.slug}`} className="group relative bg-white rounded-3xl overflow-hidden border border-[var(--sky-pale)] hover:border-[var(--sky)] shadow-[0_4px_16px_rgba(67,169,209,0.08)] hover:shadow-[0_14px_30px_rgba(67,169,209,0.2)] transition-all duration-300 hover:-translate-y-1 flex flex-col w-full h-full block">

      {/* Image Container with tag overlays */}
      <div className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-50">
        <Image
          src={trip.image}
          alt={trip.alt}
          fill
          sizes="(max-width: 700px) 90vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Featured Tag (top left) */}
        {trip.tag && (
          <span className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border border-slate-100">
            {trip.tag}
          </span>
        )}

      </div>

      {/* Card Details Body */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Location Badge */}
        <div className="text-[10px] font-extrabold text-[var(--sky)] uppercase tracking-widest flex items-center gap-1.5 leading-none">
          <MapPin size={11} className="shrink-0" />
          <span>{trip.location}</span>
        </div>

        {/* Title */}
        <h3 className="font-sans font-bold text-[17px] text-slate-800 group-hover:text-[var(--sky)] transition-colors mt-3 mb-2 leading-snug">
          {trip.title}
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
          <span className="bg-[var(--sky-pale)] text-[var(--sky)] text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full group-hover:bg-[var(--sky)] group-hover:text-white transition-colors duration-300 flex items-center gap-1">
            View Details <ArrowRight size={12} />
          </span>
        </div>
      </div>

    </Link>
  )
}

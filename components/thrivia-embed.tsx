'use client'

import React from 'react'
import { getThriviaEventId, getThriviaEventUrl } from '@/lib/thrivia-events'
import { Sparkles, ArrowRight } from 'lucide-react'

export interface ThriviaEmbedProps {
  /**
   * The Thrivia Event ID (e.g. 6af34e899b85caba6f0ec468)
   */
  eventId?: string
  /**
   * Optional trip slug to automatically look up mapped event ID.
   */
  tripSlug?: string
  /**
   * Embed mode:
   * - 'button': single Book now button with overlay checkout
   * - 'card': full card with price, dates, venue & Book now button
   * - 'sticky': pinned bottom booking bar
   * - 'events-list': list of all upcoming events from your Thrivia account
   */
  mode?: 'button' | 'card' | 'sticky' | 'events-list' | 'full'
  /**
   * Custom label for the fallback link before hydration
   */
  label?: string
  /**
   * Custom CSS classes for the container
   */
  className?: string
  /**
   * If true, renders a branded Travel Tribes / Thrivia button style wrapper
   */
  styled?: boolean
}

/**
 * Universal Thrivia Event Embed Component
 * 
 * Works with Thrivia Embed SDK v1 loaded in layout.tsx.
 * Only renders if a valid event ID is provided/mapped (or if in events-list mode).
 */
export function ThriviaEmbed({
  eventId,
  tripSlug,
  mode = 'button',
  label = 'Instant Book (Thrivia)',
  className = '',
  styled = false
}: ThriviaEmbedProps) {
  const isEventsList = mode === 'events-list'
  const resolvedEventId = eventId || getThriviaEventId(tripSlug)

  // If this trip does not have a Thrivia event ID yet, do not render a mismatched button!
  if (!resolvedEventId && !isEventsList) {
    return null
  }

  const eventUrl = resolvedEventId ? getThriviaEventUrl(resolvedEventId) : 'https://www.thrivia.io'

  return (
    <div className={`thrivia-embed-wrapper ${styled ? 'inline-block w-full' : ''}`}>
      <div
        className={`thrivia-embed ${className}`}
        {...(resolvedEventId ? { 'data-thrivia-event': resolvedEventId } : {})}
        data-thrivia-mode={mode}
      >
        <a
          href={eventUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={
            styled
              ? 'glow-btn w-full inline-flex items-center justify-center gap-2 py-3 lg:py-3.5 rounded-full font-bold text-[13px] lg:text-sm text-white shadow-md transition-all hover:scale-[1.01]'
              : 'text-sm font-semibold underline text-[var(--sky)] hover:text-[var(--navy)]'
          }
        >
          {label}
        </a>
      </div>
    </div>
  )
}

/**
 * Dedicated Instant Booking Button for Trip Itinerary pages & Booking Flow.
 * Gracefully returns null if no eventId is mapped for this trip.
 */
export function ThriviaBookingButton({
  tripSlug,
  eventId,
  label = '⚡ Instant Book via Thrivia',
  className = ''
}: {
  tripSlug?: string
  eventId?: string
  label?: string
  className?: string
}) {
  const resolvedEventId = eventId || getThriviaEventId(tripSlug)

  // Only render if a valid event ID exists for this trip!
  if (!resolvedEventId) {
    return null
  }

  const eventUrl = getThriviaEventUrl(resolvedEventId)

  return (
    <div className={`w-full ${className}`}>
      <div
        className="thrivia-embed w-full"
        data-thrivia-event={resolvedEventId}
        data-thrivia-mode="button"
      >
        <a
          href={eventUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Sparkles size={15} className="shrink-0 text-amber-200" />
          <span>{label}</span>
          <ArrowRight size={14} className="shrink-0 opacity-80" />
        </a>
      </div>
      <p className="text-[10px] text-center text-slate-400 mt-1">
        🔒 100% Secure Checkout powered by Thrivia
      </p>
    </div>
  )
}

/**
 * Embedded Event Card for detailed trip sections.
 * Gracefully returns null if no eventId is mapped for this trip.
 */
export function ThriviaEventCard({
  tripSlug,
  eventId,
  className = ''
}: {
  tripSlug?: string
  eventId?: string
  className?: string
}) {
  const resolvedEventId = eventId || getThriviaEventId(tripSlug)

  // Only render if a valid event ID exists for this trip!
  if (!resolvedEventId) {
    return null
  }

  const eventUrl = getThriviaEventUrl(resolvedEventId)

  return (
    <div className={`bg-white rounded-3xl p-5 border border-slate-200 shadow-sm ${className}`}>
      <div
        className="thrivia-embed"
        data-thrivia-event={resolvedEventId}
        data-thrivia-mode="card"
      >
        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Instant Confirmation</div>
            <div className="text-sm font-extrabold text-[var(--navy)]">Reserve Your Slot via Thrivia</div>
          </div>
          <a
            href={eventUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-[var(--sky)] text-white text-xs font-bold hover:bg-[var(--navy)] transition-colors"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  )
}

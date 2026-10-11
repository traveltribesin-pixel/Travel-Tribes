'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Bus, CalendarDays, Camera, Clock3, Hotel, MapPin, UserCheck, Utensils } from 'lucide-react'
import type { Trip } from '@/lib/travel-data'
import { getTripPrimaryDate } from '@/lib/date-utils'

/**
 * Calculates visual strikethrough price with +₹3,000 markup exclusively for card display.
 */
function getCutPrice(priceStr?: string): string {
  if (!priceStr) return '₹ 11,499'
  const match = priceStr.match(/(\d[\d,]*)/)
  if (!match) return '₹ 11,499'
  const numeric = parseInt(match[1].replace(/,/g, ''), 10)
  if (isNaN(numeric) || numeric <= 0) return '₹ 11,499'
  const cutPrice = numeric + 3000
  return `₹ ${cutPrice.toLocaleString('en-IN')}`
}

/**
 * Resolves Start-to-End city and full trip route for clean card display
 */
function getTripRouteInfo(trip: Trip): { startEnd: string; fullRoute: string } {
  const slug = trip.slug || trip.id

  const ROUTE_MAP: Record<string, { startEnd: string; fullRoute: string }> = {
    'coorg-mysore-new-year': {
      startEnd: 'Mumbai - Mumbai',
      fullRoute: 'Mumbai-Mangalore-Coorg-Mysore-Mumbai',
    },
    'hampi-backpacking': {
      startEnd: 'Mumbai - Mumbai',
      fullRoute: 'Mumbai-Hospete-Hampi-Sanapur-Mumbai',
    },
    'hampi-backpacking-xmas-new-year': {
      startEnd: 'Mumbai - Mumbai',
      fullRoute: 'Mumbai-Hospete-Hampi-Sanapur-Mumbai',
    },
    'gokarna-backpacking': {
      startEnd: 'Mumbai - Mumbai',
      fullRoute: 'Mumbai-Gokarna-Murdeshwar-Honnavar-Mumbai',
    },
    'gokarna-xmas-new-year': {
      startEnd: 'Mumbai - Mumbai',
      fullRoute: 'Mumbai-Murdeshwar-Honnavar-Gokarna-Mumbai',
    },
    'coorg-backpacking': {
      startEnd: 'Mumbai - Mumbai',
      fullRoute: 'Mumbai-Mangalore-Coorg-Madikeri-Mumbai',
    },
    'coorg-backpacking-xmas-new-year': {
      startEnd: 'Mumbai - Mumbai',
      fullRoute: 'Mumbai-Mangalore-Coorg-Madikeri-Mumbai',
    },
    'udaipur-backpacking': {
      startEnd: 'Mumbai - Mumbai',
      fullRoute: 'Mumbai-Udaipur-Kumbhalgarh-Bahubali-Mumbai',
    },
    'udaipur-xmas-new-year': {
      startEnd: 'Mumbai - Mumbai',
      fullRoute: 'Mumbai-Udaipur-Fateh Sagar-Pichola-Mumbai',
    },
    'meghalaya-backpacking': {
      startEnd: 'Guwahati - Guwahati',
      fullRoute: 'Guwahati-Shillong-Cherrapunjee-Dawki-Guwahati',
    },
    'meghalaya-backpacking-xmas-new-year': {
      startEnd: 'Guwahati - Guwahati',
      fullRoute: 'Guwahati-Shillong-Cherrapunjee-Dawki-Guwahati',
    },
    'meghalaya-with-kaziranga': {
      startEnd: 'Guwahati - Guwahati',
      fullRoute: 'Guwahati-Shillong-Cherrapunjee-Kaziranga-Guwahati',
    },
    'meghalaya-with-kaziranga-xmas-new-year': {
      startEnd: 'Guwahati - Guwahati',
      fullRoute: 'Guwahati-Shillong-Cherrapunjee-Kaziranga-Guwahati',
    },
    'sri-lanka-island-escape': {
      startEnd: 'Colombo - Colombo',
      fullRoute: 'Colombo-Kandy-Sigiriya-Ella-Mirissa-Colombo',
    },
    'sri-lanka-island-escape-xmas-new-year': {
      startEnd: 'Colombo - Colombo',
      fullRoute: 'Colombo-Kandy-Sigiriya-Ella-Mirissa-Colombo',
    },
    'bali-gili-islands': {
      startEnd: 'Bali - Bali',
      fullRoute: 'Bali-Seminyak-Nusa Penida-Gili-Ubud-Bali',
    },
    'bali-gili-islands-xmas-new-year': {
      startEnd: 'Bali - Bali',
      fullRoute: 'Bali-Seminyak-Nusa Penida-Gili-Ubud-Bali',
    },
    'bhutan-backpacking': {
      startEnd: 'Bagdogra - Bagdogra',
      fullRoute: 'Bagdogra-Phuentsholing-Thimphu-Punakha-Paro-Bagdogra',
    },
    'bhutan-tshechu-festival': {
      startEnd: 'Bagdogra - Bagdogra',
      fullRoute: 'Bagdogra-Phuentsholing-Thimphu-Paro-Bagdogra',
    },
    'vietnam-phu-quoc': {
      startEnd: 'Phu Quoc - Hanoi',
      fullRoute: 'Phu Quoc-Da Nang-Hoi An-Halong Bay-Hanoi',
    },
    'vietnam-phu-quoc-xmas-new-year': {
      startEnd: 'Phu Quoc - Hanoi',
      fullRoute: 'Phu Quoc-Da Nang-Hoi An-Halong Bay-Hanoi',
    },
    'vietnam-classic': {
      startEnd: 'Ho Chi Minh - Hanoi',
      fullRoute: 'Ho Chi Minh-Da Nang-Hoi An-Halong Bay-Hanoi',
    },
    'vietnam-classic-xmas-new-year': {
      startEnd: 'Ho Chi Minh - Hanoi',
      fullRoute: 'Ho Chi Minh-Da Nang-Hoi An-Halong Bay-Hanoi',
    },
    'vietnam-sapa': {
      startEnd: 'Ho Chi Minh - Hanoi',
      fullRoute: 'Ho Chi Minh-Da Nang-Hoi An-Halong Bay-Sapa-Hanoi',
    },
    'vietnam-sapa-xmas-new-year': {
      startEnd: 'Ho Chi Minh - Hanoi',
      fullRoute: 'Ho Chi Minh-Da Nang-Hoi An-Halong Bay-Sapa-Hanoi',
    },
    'konkan-coastal-roadtrip': {
      startEnd: 'Mumbai - Mumbai',
      fullRoute: 'Mumbai-Ratnagiri-Ganpatipule-Kasheli-Mumbai',
    },
    'konkan-coastal-roadtrip-xmas-new-year': {
      startEnd: 'Mumbai - Mumbai',
      fullRoute: 'Mumbai-Ratnagiri-Ganpatipule-Kasheli-Mumbai',
    },
    'spiti-valley-chandrataal': {
      startEnd: 'Delhi - Delhi',
      fullRoute: 'Delhi-Shimla-Chitkul-Tabo-Kaza-Chandrataal-Manali-Delhi',
    },
    'spiti-winter-expedition': {
      startEnd: 'Delhi - Delhi',
      fullRoute: 'Delhi-Shimla-Chitkul-Tabo-Kaza-Key-Kalpa-Delhi',
    },
    'spiti-winter-expedition-xmas-new-year': {
      startEnd: 'Delhi - Delhi',
      fullRoute: 'Delhi-Shimla-Chitkul-Tabo-Kaza-Key-Kalpa-Delhi',
    },
    'jawai-leopard-safari': {
      startEnd: 'Mumbai - Mumbai',
      fullRoute: 'Mumbai-Jawai-Bera-Jawai Dam-Mumbai',
    },
    'jawai-leopard-safari-xmas-new-year': {
      startEnd: 'Mumbai - Mumbai',
      fullRoute: 'Mumbai-Jawai-Bera-Jawai Dam-Mumbai',
    },
  }

  if (ROUTE_MAP[slug]) {
    return ROUTE_MAP[slug]
  }

  // Fallback: Parse from trip.location
  if (trip.location) {
    const parts = trip.location.split(/[·\-,]/).map((s) => s.trim()).filter(Boolean)
    if (parts.length >= 2) {
      return {
        startEnd: `${parts[0]} - ${parts[parts.length - 1]}`,
        fullRoute: parts.join('-'),
      }
    }
    return {
      startEnd: `${parts[0]} - ${parts[0]}`,
      fullRoute: trip.location,
    }
  }

  return {
    startEnd: 'Mumbai - Mumbai',
    fullRoute: trip.title,
  }
}

export function TripCard({ trip, featured = false }: { trip: Trip; featured?: boolean }) {
  const isFestive = Boolean(
    trip.tag?.toLowerCase().includes('new year') ||
    trip.tag?.toLowerCase().includes('xmas') ||
    trip.region === 'Xmas & New Year'
  )
  const itineraryUrl = `/itinerary/${trip.slug}${isFestive ? '?festive=1' : ''}`
  const routeInfo = getTripRouteInfo(trip)

  return (
    <Link
      href={itineraryUrl}
      className="group relative bg-white rounded-3xl overflow-hidden border-2 border-[#72c3e4] hover:border-[var(--sky)] shadow-[0_4px_18px_rgba(67,169,209,0.12)] hover:shadow-[0_14px_32px_rgba(67,169,209,0.22)] transition-all duration-300 hover:-translate-y-1 flex flex-col w-full h-full block select-none"
    >
      {/* Image Container with tag overlay */}
      <div className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-50">
        <Image
          src={trip.image}
          alt={trip.alt}
          fill
          sizes="(max-width: 700px) 90vw, (max-width: 1024px) 50vw, 33vw"
          quality={75}
          loading="lazy"
          className="object-cover object-balanced transition-transform duration-500 group-hover:scale-105"
        />
        {/* Featured Tag (top left) */}
        {trip.tag && (
          <span className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm border border-slate-100">
            {trip.tag}
          </span>
        )}
      </div>

      {/* Card Details Body */}
      <div className="p-4 sm:p-5 flex-grow flex flex-col">
        {/* Start-to-End Location Badge (Above Heading) */}
        <div className="text-[12px] sm:text-[13px] font-bold text-[var(--sky)] flex items-center gap-1.5 leading-none mb-1">
          <MapPin size={13} className="shrink-0 text-[var(--sky)]" />
          <span>{routeInfo.startEnd}</span>
        </div>

        {/* Heading Title */}
        <h3 className="font-sans font-extrabold text-[15px] sm:text-[18px] text-slate-800 group-hover:text-[var(--sky)] transition-colors mt-1 mb-2 leading-[1.3] min-h-[44px] sm:min-h-[46px] line-clamp-2">
          {trip.title}
        </h3>

        {/* Complete Full Route (Below Heading - Complete, not hidden or truncated) */}
        <p className="text-slate-700 font-semibold text-[12.5px] sm:text-[13px] leading-snug mb-3 break-words">
          {routeInfo.fullRoute}
        </p>

        {/* Inclusions / Offerings Icons Row (5 Items: Stay, Meals, Transfers, Sightseeing, Guide) */}
        <div className="grid grid-cols-5 gap-0.5 sm:gap-1 py-1 mb-3 text-center w-full">
          <div className="flex flex-col items-center justify-center gap-1 min-w-0">
            <Hotel size={15} className="text-[var(--sky)] shrink-0" />
            <span className="text-[9.5px] min-[380px]:text-[10px] sm:text-[11px] font-semibold text-slate-600 leading-none whitespace-nowrap">
              Stay
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 min-w-0">
            <Utensils size={15} className="text-[var(--sky)] shrink-0" />
            <span className="text-[9.5px] min-[380px]:text-[10px] sm:text-[11px] font-semibold text-slate-600 leading-none whitespace-nowrap">
              Meals
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 min-w-0">
            <Bus size={15} className="text-[var(--sky)] shrink-0" />
            <span className="text-[9.5px] min-[380px]:text-[10px] sm:text-[11px] font-semibold text-slate-600 leading-none whitespace-nowrap">
              Transfers
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 min-w-0">
            <Camera size={15} className="text-[var(--sky)] shrink-0" />
            <span className="text-[9px] min-[380px]:text-[9.5px] sm:text-[11px] font-semibold text-slate-600 leading-none whitespace-nowrap tracking-tighter">
              Sightseeing
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 min-w-0">
            <UserCheck size={15} className="text-[var(--sky)] shrink-0" />
            <span className="text-[9.5px] min-[380px]:text-[10px] sm:text-[11px] font-semibold text-slate-600 leading-none whitespace-nowrap">
              Guide
            </span>
          </div>
        </div>

        {/* Divider line */}
        <div className="w-full h-[1px] bg-slate-100 mt-auto mb-3" />

        {/* Calendar and Clock Meta details */}
        <div className="flex items-center justify-between text-slate-500 text-[11.5px] font-medium mb-3 gap-2">
          <span className="flex items-center gap-1.5 truncate">
            <CalendarDays size={14} className={getTripPrimaryDate(trip) === 'No Upcoming Trips' ? 'text-amber-500 shrink-0' : 'text-[var(--sky)] shrink-0'} />
            <span className={`truncate ${getTripPrimaryDate(trip) === 'No Upcoming Trips' ? 'text-amber-600 font-bold' : ''}`}>
              {getTripPrimaryDate(trip)}
            </span>
          </span>
          <span className="flex items-center gap-1 shrink-0 font-bold text-slate-500">
            <Clock3 size={14} className="text-[var(--sky)] shrink-0" />
            <span>{trip.duration}</span>
          </span>
        </div>

        {/* Pricing and Action Button Row (Stacked Price + View more) */}
        <div className="flex items-end justify-between mt-auto pt-1 gap-2">
          {/* Price Box: Cut Price on top, Live Price on bottom */}
          <div className="flex flex-col min-w-0 leading-none">
            <span className="line-through text-slate-400 text-[11px] sm:text-[12px] font-semibold decoration-rose-500/80 decoration-[1.5px] mb-1 leading-none">
              {getCutPrice(trip.price)}
            </span>
            <div className="flex items-baseline gap-1 leading-none">
              <strong className="text-slate-900 text-[16px] sm:text-[18px] font-black tracking-tight leading-none">
                {trip.price}
              </strong>
              <span className="text-[11px] sm:text-[12px] font-bold text-slate-600 leading-none">
                /Person
              </span>
            </div>
          </div>

          {/* View More Button without arrow */}
          <span className="bg-[#e1f3fa] text-[var(--sky)] text-[11.5px] sm:text-[12px] font-bold px-3.5 sm:px-4 py-2 rounded-full group-hover:bg-[var(--sky)] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs leading-none">
            View more
          </span>
        </div>
      </div>
    </Link>
  )
}

'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

export interface ExploreCategory {
  id: string
  title: string
  href: string
  image: string
  badge?: string
  alt: string
}

export const EXPLORE_CATEGORIES: ExploreCategory[] = [
  {
    id: 'xmas-new-year',
    title: 'Xmas & New Year',
    href: '/xmas-new-year-trips',
    image: '/new-year-trip-images/10.png',
    badge: 'Festive',
    alt: 'Xmas and New Year Trips',
  },
  {
    id: 'domestic-trips',
    title: 'Domestic Trips',
    href: '/domestic-trips',
    image: '/Card Image/meghalaya_6_days.jpg',
    alt: 'Domestic Group Trips',
  },
  {
    id: 'international-trips',
    title: 'International Trips',
    href: '/international-trips',
    image: '/Card Image/vietnam.png',
    alt: 'International Group Trips',
  },
  {
    id: 'weekend-trips',
    title: 'Weekend Trips',
    href: '/weekend-getaways',
    image: '/Card Image/coorg.jpg',
    alt: 'Weekend Getaways',
  },
  {
    id: 'corporate-trips',
    title: 'Corporate Trips',
    href: '/corporate-trips',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    alt: 'Corporate Offsites and Team Trips',
  },
  {
    id: 'honeymoon-trips',
    title: 'Honeymoon Trips',
    href: '/plan-a-trip?category=Honeymoon',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=600&q=80',
    alt: 'Romantic Honeymoon Escapes',
  },
  {
    id: 'events-festivals',
    title: 'Events & Festivals',
    href: '/upcoming-trips',
    image: '/Card Image/Full_Moon_Party_Trip.webp',
    badge: 'Trending',
    alt: 'Events and Festivals Trips',
  },
  {
    id: 'adventure-treks',
    title: 'Adventure Treks',
    href: '/domestic-trips',
    image: '/Card Image/winter_spiti.jpg',
    alt: 'Adventure Treks and Expeditions',
  },
  {
    id: 'personalised-trips',
    title: 'Personalised Trips',
    href: '/plan-a-trip',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
    alt: 'Custom and Personalised Trips',
  },
]

export function ExploreCategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 4)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4)
    }
  }

  useEffect(() => {
    checkScroll()
    const container = scrollRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll, { passive: true })
    }
    window.addEventListener('resize', checkScroll)
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll)
      }
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section
      className="py-5 sm:py-7 bg-white relative"
      style={{
        paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
        paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
      }}
    >
      {/* Header with Title and Scroll Controls */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-4 px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-black text-slate-900 tracking-tight">
            Explore
          </h2>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left categories"
            className="w-7 h-7 rounded-full border border-slate-200 bg-white shadow-2xs flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right categories"
            className="w-7 h-7 rounded-full border border-slate-200 bg-white shadow-2xs flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Rail of Category Cards */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-3 sm:gap-3.5 overflow-x-auto scrollbar-none snap-x snap-mandatory py-1 px-1 -mx-1"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {EXPLORE_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group flex-shrink-0 w-[114px] sm:w-[126px] md:w-[134px] snap-start rounded-2xl border border-slate-200/90 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col no-underline"
          >
            {/* Card Top Image */}
            <div className="relative w-full h-[84px] sm:h-[94px] overflow-hidden bg-slate-100 rounded-t-2xl">
              <Image
                src={cat.image}
                alt={cat.alt}
                fill
                sizes="(max-width: 640px) 114px, (max-width: 768px) 126px, 134px"
                className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />

              {/* Subtle bottom vignette to blend nicely */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

              {/* Optional Badge */}
              {cat.badge && (
                <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs">
                  {cat.badge}
                </span>
              )}
            </div>

            {/* Card Bottom Label */}
            <div className="min-h-[44px] sm:min-h-[48px] px-1.5 py-2 flex items-center justify-center text-center bg-white rounded-b-2xl">
              <span className="text-[11.5px] sm:text-[12.5px] font-bold text-slate-800 group-hover:text-[var(--sky)] transition-colors leading-[1.25] line-clamp-2">
                {cat.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

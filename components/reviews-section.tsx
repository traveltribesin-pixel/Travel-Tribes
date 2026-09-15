'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react'
import { testimonials } from '@/lib/travel-data'
import { ReviewCard } from '@/components/trip-components'

export function ReviewsSection() {
  const [selectedDestination, setSelectedDestination] = useState<string>('All')
  const [isPaused, setIsPaused] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const filterTabs = [
    { label: 'All Reviews', value: 'All', count: testimonials.length },
    { label: 'Gokarna', value: 'Gokarna', count: testimonials.filter(t => t.detail?.includes('Gokarna')).length },
    { label: 'Coorg', value: 'Coorg', count: testimonials.filter(t => t.detail?.includes('Coorg')).length },
    { label: 'Udaipur', value: 'Udaipur', count: testimonials.filter(t => t.detail?.includes('Udaipur')).length },
  ]

  const filteredReviews = useMemo(() => {
    if (selectedDestination === 'All') return testimonials
    return testimonials.filter(t => t.detail?.toLowerCase().includes(selectedDestination.toLowerCase()))
  }, [selectedDestination])

  const slide = useCallback((direction: 'left' | 'right') => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const item = container.querySelector('.review-slide-item') as HTMLElement
    const scrollAmount = item ? item.offsetWidth + 24 : container.clientWidth
    if (direction === 'right') {
      const maxScroll = container.scrollWidth - container.clientWidth
      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    } else {
      if (container.scrollLeft <= 20) {
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      }
    }
  }, [])

  // Auto-scroll every 3 seconds, paused on hover
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      slide('right')
    }, 3000)
    return () => clearInterval(interval)
  }, [isPaused, slide])

  return (
    <section
      className="py-12 sm:py-16 bg-[var(--sky-pale)] relative overflow-hidden"
      style={{
        paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
        paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
      }}
    >
      {/* Header with Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-2">
            <MessageSquareQuote size={16} className="text-[var(--sky)]" />
            <span>Real Feedback from Real Travellers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--navy)] leading-tight">
            Loved by 10,000+ Tribe Explorers
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
            Read real verified reviews from solo travellers, groups, and friends who explored Gokarna, Coorg, and Udaipur with us.
          </p>
        </div>

        {/* Google Reviews Badge */}
        <div className="flex items-center gap-3 bg-white border border-white/80 px-5 py-3 rounded-2xl shadow-[0_6px_20px_rgba(11,41,64,0.08)] self-start md:self-auto shrink-0">
          <div className="text-amber-400 flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-amber-400" />
            ))}
          </div>
          <div>
            <div className="text-sm font-black text-[var(--navy)] leading-none">4.9 / 5.0 Rating</div>
            <span className="text-[10px] text-slate-400 font-medium">100% Verified Google Reviews</span>
          </div>
        </div>
      </div>

      {/* Destination Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
        {filterTabs.map(tab => {
          const isActive = selectedDestination === tab.value
          return (
            <button
              key={tab.value}
              onClick={() => {
                setSelectedDestination(tab.value)
                sliderRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-[var(--navy)] text-white shadow-md'
                  : 'bg-white/80 text-slate-600 hover:bg-white hover:text-[var(--navy)] border border-slate-200/60'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Horizontal Auto-scrolling Review Slider: 3 on Desktop, 2 on Tablet, 1 on Mobile */}
      <div className="relative group/slider">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={() => slide('left')}
          className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 hover:border-[var(--sky)] hover:bg-[var(--sky)] hover:text-white text-[var(--navy)] flex items-center justify-center transition-all duration-300 shadow-[0_6px_20px_rgba(11,41,64,0.18)] active:scale-95 cursor-pointer"
          aria-label="Previous review"
        >
          <ChevronLeft size={22} className="stroke-[2.5]" />
        </button>

        {/* Slider Track */}
        <div
          ref={sliderRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto scroll-smooth py-4 no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredReviews.map((t, idx) => (
            <div
              key={`${t.name}-${idx}`}
              className="review-slide-item flex-none w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] snap-start shrink-0 flex flex-col"
            >
              <ReviewCard {...t} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={() => slide('right')}
          className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 hover:border-[var(--sky)] hover:bg-[var(--sky)] hover:text-white text-[var(--navy)] flex items-center justify-center transition-all duration-300 shadow-[0_6px_20px_rgba(11,41,64,0.18)] active:scale-95 cursor-pointer"
          aria-label="Next review"
        >
          <ChevronRight size={22} className="stroke-[2.5]" />
        </button>
      </div>

      {/* Auto-scroll status hint */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-500 animate-pulse'}`} />
          <span className="text-[11px] font-medium">
            {isPaused ? 'Paused (Reading review)' : 'Auto-scrolling every 3s'}
          </span>
        </div>
        <span className="text-[11px] hidden sm:inline text-slate-400 font-medium">
          Hover to pause • Swipe or click left/right arrows to browse
        </span>
      </div>
    </section>
  )
}

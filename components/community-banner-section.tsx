'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BANNER_SLIDES = [
  {
    id: 1,
    image: '/Banner/1.png',
    alt: 'Bali with Gili Community Trip Banner',
    link: '/itinerary/bali-gili-islands'
  },
  {
    id: 2,
    image: '/Banner/2.png',
    alt: 'Sri Lanka Island Escape Community Trip Banner',
    link: '/itinerary/sri-lanka-island-escape'
  },
  {
    id: 3,
    image: '/Banner/3.png',
    alt: 'Vietnam Backpacking Community Trip Banner',
    link: '/itinerary/vietnam-backpacking'
  },
  {
    id: 4,
    image: '/Banner/4.png',
    alt: 'Bhutan Road Trip Community Trip Banner',
    link: '/itinerary/bhutan-road-trip'
  },
  {
    id: 5,
    image: '/Banner/5.png',
    alt: 'Thailand Full Moon Party Community Trip Banner',
    link: '/itinerary/phuket-krabi-thailand'
  },
  {
    id: 6,
    image: '/Banner/6.png',
    alt: 'Spiti Valley Winter Expedition Banner',
    link: '/itinerary/spiti-winter-expedition'
  },
  {
    id: 7,
    image: '/Banner/Bali & Gili.png',
    alt: 'Christmas and New Year Special Trips Banner',
    link: '/xmas-new-year-trips'
  }
]

export function CommunityBannerSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)
  }, [])

  // Auto-slide every 3 seconds (3000ms) with smooth sliding animation
  useEffect(() => {
    if (isHovered) return

    const timer = setInterval(() => {
      goToNext()
    }, 3000)

    return () => clearInterval(timer)
  }, [isHovered, goToNext])

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 40
    const isRightSwipe = distance < -40

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrev()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <section className="py-4 sm:py-7 bg-[#f7fbfd]">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 lg:px-8">
        <div
          className="relative group rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(11,41,64,0.12)] border border-slate-200/80 bg-slate-950 select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Continuous Sliding Horizontal Track (True Slide Effect) */}
          <div className="w-full overflow-hidden relative">
            <motion.div
              className="flex w-full"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
            >
              {BANNER_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="min-w-full relative aspect-[21/9] sm:aspect-[2.8/1] md:aspect-[3.2/1] lg:aspect-[3.4/1] shrink-0"
                >
                  <Link
                    href={slide.link}
                    className="block w-full h-full relative cursor-pointer group/link"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority={idx === 0 || idx === 1}
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 95vw, 1200px"
                      className="object-cover object-center w-full h-full transition-transform duration-500 group-hover/link:scale-[1.01]"
                      draggable={false}
                    />
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrow - Left */}
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous Banner"
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Navigation Arrow - Right */}
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next Banner"
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Dot Pagination Indicators */}
          <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
            {BANNER_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to banner slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-gradient-to-r from-[var(--sky)] to-white shadow-sm'
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/90'
                  }`}
                />
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

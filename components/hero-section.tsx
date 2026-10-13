'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Users, Compass, Search, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { SAMPLE_TRIPS, type Trip } from '@/lib/trips'
import { SearchModal } from './search-modal'

const HERO_IMAGES = [
  '/Hero%20section/1000004663.jpg',
  '/Hero%20section/20241021_200540_D98AB8.jpeg',
  '/Hero%20section/20251009_200654_C3F41C.jpeg',
  '/Hero%20section/20260904_212930_73DB89.jpeg',
  '/Hero%20section/20260906_162928_7A440F.jpeg',
  '/Hero%20section/IMG_1034.JPEG',
  '/Hero%20section/IMG_1192.JPEG',
  '/Hero%20section/IMG_8960.JPEG',
  '/Hero%20section/Must%20Do%20Experiences.png',
]

const DOMESTIC_SCENERY_IMAGES = [
  { name: 'Spiti Valley', loc: 'Spiti Valley', tag: 'Domestic', img: '/Card Image/Spiti_with_chandrataal.png' },
  { name: 'Meghalaya', loc: 'Meghalaya', tag: 'Domestic', img: '/Card Image/meghalaya_6_days.jpg' },
  { name: 'Gokarna', loc: 'Gokarna', tag: 'Domestic', img: '/Card Image/Gokarna.jpg' },
  { name: 'Hampi', loc: 'Hampi', tag: 'Domestic', img: '/image/Hampi/hampi_img.jpeg' },
  { name: 'Coorg', loc: 'Coorg', tag: 'Domestic', img: '/Card Image/coorg.jpg' },
  { name: 'Udaipur', loc: 'Udaipur', tag: 'Domestic', img: '/Card Image/udaipur.jpg' },
  { name: 'Kokan', loc: 'Kokan', tag: 'Domestic', img: '/Card Image/kokan.png' },
]

const INTERNATIONAL_SCENERY_IMAGES = [
  { name: 'Vietnam', loc: 'Vietnam', tag: 'International', img: '/Card Image/vietnam.png' },
  { name: 'Bali & Gili', loc: 'Bali & Gili', tag: 'International', img: '/Card Image/bali_with_gili.png' },
  { name: 'Bhutan', loc: 'Bhutan', tag: 'International', img: '/Card Image/Bhutan.png' },
  { name: 'Sri Lanka', loc: 'Sri Lanka', tag: 'International', img: '/Card Image/srilanka.png' },
  { name: 'Thailand', loc: 'Thailand', tag: 'International', img: '/Card Image/Phuket_&_Krabi_Thailand_.png' },
]

const ROTATING_WORDS = ['Gokarna', 'Spiti', 'Coorg', 'Udaipur', 'Meghalaya', 'Kerala', 'Rajasthan', 'Ladakh']

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchInitialQuery, setSearchInitialQuery] = useState('')
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  const handleOpenSearch = (initialText: string = '') => {
    setSearchInitialQuery(initialText)
    setIsSearchOpen(true)
  }

  return (
    <section className="min-h-[80vh] sm:min-h-[85vh] md:min-h-[80vh] pt-24 sm:pt-28 lg:pt-15 pb-36 sm:pb-36 md:pb-28 lg:pb-24 relative overflow-visible flex items-center bg-primary z-20">
      {/* CSS Styles for the Infinite Scrolling scenery tracks */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll-up {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, -50%, 0); }
        }
        @keyframes scroll-down {
          0% { transform: translate3d(0, -50%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-scroll-up {
          animation: scroll-up 26s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        .animate-scroll-down {
          animation: scroll-down 24s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        .animate-scroll-up:hover, .animate-scroll-down:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Background Slideshow (Clipped to hero section bounds) */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[currentImage]}
              alt="Travel Tribes Background"
              fill
              priority={currentImage === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        {/* Balanced readability overlay: keeps background imagery visible while text remains high contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35" />
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Booking Content */}
          <div className="lg:col-span-7 text-left text-white">
            <span className="inline-block px-3.5 py-1.5 bg-accent/25 backdrop-blur-md text-accent-foreground rounded-full text-[11px] sm:text-xs md:text-sm font-bold border border-accent/25 mb-4 sm:mb-6 uppercase tracking-wider">
              ✨ WHERE ADVENTURE MEETS COMMUNITY
            </span>

            {/* Embedded Rotating Word inside the Header Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight tracking-tight text-white drop-shadow-md">
              Travel with your <br />
              Tribe to{' '}
              <span className="text-[#0cc0df] inline-block relative overflow-hidden h-[1.25em] align-bottom min-w-[160px] sm:min-w-[240px] md:min-w-[340px] lg:min-w-[420px] pr-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: '65%', opacity: 0, rotateX: 45 }}
                    animate={{ y: '0%', opacity: 1, rotateX: 0 }}
                    exit={{ y: '-65%', opacity: 0, rotateX: -45 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    style={{ originY: 0.5 }}
                    className="absolute left-0 whitespace-nowrap"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Client Headline and Sub-text */}
            <div className="mb-6 sm:mb-8 max-w-xl">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 leading-snug drop-shadow-sm">
                Group trips for people who don&apos;t do boring.
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed font-normal drop-shadow-sm">
                Meet new people, explore incredible places and make memories worth coming back for.
              </p>
            </div>

            {/* Compact Interactive Search Trigger Box */}
            <div className="max-w-[360px] sm:max-w-md w-full relative z-40 mb-3 sm:mb-4">
              <button
                type="button"
                onClick={() => handleOpenSearch('')}
                className="w-full flex items-center justify-between bg-white/95 hover:bg-white backdrop-blur-md rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.25)] p-1 sm:p-1.5 border border-white/50 hover:border-[var(--sky)] transition-all duration-300 group cursor-pointer text-left"
              >
                <div className="flex items-center flex-grow pl-3 sm:pl-3.5 min-w-0 gap-2 sm:gap-2.5">
                  <Search size={15} className="text-slate-400 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-slate-600 font-semibold text-xs sm:text-[13px] truncate">
                      Where do you want to go?
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="glow-btn inline-flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-extrabold rounded-full shrink-0 shadow-sm">
                    Search
                  </div>
                </div>
              </button>

              {/* Quick Popular Destination Tags below Search Bar */}
              {/* <div className="flex items-center gap-1.5 sm:gap-2 mt-3 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider shrink-0 flex items-center gap-1">
                  Popular:
                </span>
                {['Spiti', 'Vietnam', 'Bali', 'Gokarna', 'Meghalaya'].map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => handleOpenSearch(dest)}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/15 hover:bg-white hover:text-slate-900 text-white backdrop-blur-sm border border-white/20 transition-all duration-200 shrink-0 cursor-pointer shadow-xs"
                  >
                    {dest}
                  </button>
                ))}
              </div> */}
            </div>

            {/* Render the Professional Pop-up Search Modal */}
            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              initialQuery={searchInitialQuery}
            />

            <span className="text-[11px] sm:text-xs text-white/70 block font-medium mt-2">
              Guided group tours & customizable packages
            </span>
          </div>

          {/* Right Column: Sliding Scenery Images (Col 1: Domestic, Col 2: International) */}
          <div className="lg:col-span-5 hidden lg:block h-[450px] relative overflow-hidden select-none">
            <div className="grid grid-cols-2 gap-4 h-full">

              {/* Column 1: Domestic Trips Scenery (Upward scrolling) */}
              <div className="h-full overflow-hidden relative">
                <div className="flex flex-col gap-4 animate-scroll-up">
                  {/* Loop list */}
                  {[...DOMESTIC_SCENERY_IMAGES, ...DOMESTIC_SCENERY_IMAGES].map((item, idx) => (
                    <div
                      key={`dom-${idx}`}
                      className="relative rounded-2xl overflow-hidden group shadow-lg border border-white/10 h-52 shrink-0 bg-slate-900"
                    >
                      <Image
                        src={item.img}
                        alt={`${item.name} scenery`}
                        fill
                        sizes="220px"
                        quality={65}
                        loading="lazy"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Bottom overlay for destination */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3.5 flex items-end">
                        <span className="text-[13px] font-extrabold text-white tracking-wide leading-tight drop-shadow-md z-10">
                          {item.loc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: International Trips Scenery (Downward scrolling) */}
              <div className="h-full overflow-hidden relative">
                <div className="flex flex-col gap-4 animate-scroll-down">
                  {/* Loop list */}
                  {[...INTERNATIONAL_SCENERY_IMAGES, ...INTERNATIONAL_SCENERY_IMAGES].map((item, idx) => (
                    <div
                      key={`intl-${idx}`}
                      className="relative rounded-2xl overflow-hidden group shadow-lg border border-white/10 h-52 shrink-0 bg-slate-900"
                    >
                      <Image
                        src={item.img}
                        alt={`${item.name} scenery`}
                        fill
                        sizes="220px"
                        quality={65}
                        loading="lazy"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Bottom overlay for destination */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3.5 flex items-end">
                        <span className="text-[13px] font-extrabold text-white tracking-wide leading-tight drop-shadow-md z-10">
                          {item.loc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Statistics Row */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-xl border-t border-white/15 py-2.5 sm:py-3.5 z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 text-white items-center divide-y-0 md:divide-x divide-white/10">

            {/* Stat 1: Google Review */}
            <div className="text-center px-1 sm:px-4 py-0.5 sm:py-1">
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-0.5">
                <span className="text-base sm:text-2xl lg:text-3xl font-black text-amber-400">
                  4.9
                </span>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} className="fill-amber-400 sm:w-3.5 sm:h-3.5" />
                  ))}
                </div>
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
                Google Review
              </div>
            </div>

            {/* Stat 2: Happy Traveller */}
            <div className="text-center px-1 sm:px-4 py-0.5 sm:py-1">
              <div className="text-base sm:text-2xl lg:text-3xl font-black text-[var(--sky)] mb-0.5">
                10,000+
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
                Happy Travellers
              </div>
            </div>

            {/* Stat 3: 5+ Year Experience */}
            <div className="text-center px-1 sm:px-4 py-0.5 sm:py-1">
              <div className="text-base sm:text-2xl lg:text-3xl font-black text-[var(--sun)] mb-0.5">
                5+ Years
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
                Experience
              </div>
            </div>

            {/* Stat 4: 1000+ Trips Serve */}
            <div className="text-center px-1 sm:px-4 py-0.5 sm:py-1">
              <div className="text-base sm:text-2xl lg:text-3xl font-black text-emerald-400 mb-0.5">
                1,000+
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
                Trips Served
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}

export { Hero as HeroSection }

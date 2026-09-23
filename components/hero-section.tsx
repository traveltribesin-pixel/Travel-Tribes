'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Users, Compass, Search, Star } from 'lucide-react'
import Link from 'next/link'
import { SAMPLE_TRIPS, type Trip } from '@/lib/trips'

const HERO_IMAGES = [
  '/image/Spiti/spiti_img.JPEG',
  '/image/Meghalaya/meghalaya_img.JPEG',
  '/image/Gokarna/gokarna_img.jpeg',
  '/image/Hampi/hampi_img.jpeg',
  '/image/Coorg/coorg_img.JPEG',
  '/image/Udaipur/udaipur_img.JPEG',
]

const CLIENT_IMAGES_COL1 = [
  { name: 'Gokarna Tribe', loc: 'Gokarna', img: '/image/Gokarna/IMG_4170.JPG' },
  { name: 'Meghalaya Tribe', loc: 'Meghalaya', img: '/image/Meghalaya/IMG_0857.JPEG' },
  { name: 'Spiti Tribe', loc: 'Spiti Valley', img: '/image/Spiti/IMG_5483.jpg' },
  { name: 'Hampi Tribe', loc: 'Hampi', img: '/image/Hampi/IMG_9698.JPEG' },
]

const CLIENT_IMAGES_COL2 = [
  { name: 'Coorg Tribe', loc: 'Coorg', img: '/image/Coorg/IMG_5499.JPEG' },
  { name: 'Udaipur Tribe', loc: 'Udaipur', img: '/image/Udaipur/IMG_4003.JPG' },
  { name: 'Gokarna Friends', loc: 'Gokarna', img: '/image/Gokarna/IMG_8908_Original.JPEG' },
  { name: 'Hampi Sunset', loc: 'Hampi', img: '/image/Hampi/IMG_6658.JPG' },
]

const ROTATING_WORDS = ['Gokarna', 'Spiti', 'Coorg', 'Udaipur', 'Meghalaya', 'Kerala', 'Rajasthan', 'Ladakh']

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Trip[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    if (value.trim().length >= 1) {
      const query = value.trim().toLowerCase()
      const matches = SAMPLE_TRIPS.filter((trip) =>
        trip.title.toLowerCase().includes(query) ||
        trip.destination.toLowerCase().includes(query) ||
        trip.category.toLowerCase().includes(query)
      ).slice(0, 5)
      setSuggestions(matches)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = searchQuery.trim().toLowerCase()
    if (query) {
      //  Find a matching trip dynamically in the dataset
      const matchedTrip = SAMPLE_TRIPS.find((trip) =>
        trip.title.toLowerCase().includes(query) ||
        trip.destination.toLowerCase().includes(query) ||
        trip.category.toLowerCase().includes(query) ||
        trip.description.toLowerCase().includes(query) ||
        trip.highlights.some(h => h.toLowerCase().includes(query))
      )

      if (matchedTrip) {
        window.location.href = `/itinerary/${matchedTrip.id}`
      } else {
        alert('Sorry, no trips found for this location. Please try another destination.')
      }
    }
  }

  return (
    <section className="min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] pt-16 sm:pt-20 md:pt-14 pb-40 sm:pb-36 md:pb-28 lg:pb-24 relative overflow-visible flex items-center bg-primary z-20">
      {/* CSS Styles for the Infinite Scrolling client tracks */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-scroll-up {
          animation: scroll-up 18s linear infinite;
        }
        .animate-scroll-down {
          animation: scroll-down 18s linear infinite;
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
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentImage]})` }}
          />
        </AnimatePresence>
        {/* Dark readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
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

            {/* Sub-Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs md:text-sm font-bold text-accent-foreground mb-4 sm:mb-6 uppercase tracking-wider">
              <span>GROUP TRIPS</span>
              <span className="text-white/40">•</span>
              <span>SOLO FRIENDLY</span>
              <span className="text-white/40">•</span>
              <span>REAL EXPERIENCES</span>
            </div>

            {/* Client Headline and Sub-text */}
            <div className="mb-6 sm:mb-8 max-w-xl">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 leading-snug">
                Group trips for people who don&apos;t do boring.
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-white/85 leading-relaxed font-normal">
                Meet new people, explore incredible places and make memories worth coming back for.
              </p>
            </div>

            {/* Search Input Box */}
            <div ref={searchRef} className="max-w-md w-full relative z-40 mb-4 sm:mb-6">
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full shadow-2xl p-1.5 border border-white/20">
                  <div className="flex items-center flex-grow pl-3 sm:pl-4 min-w-0">
                    <Search className="text-muted-foreground mr-2 shrink-0" size={16} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Where do you want to go?"
                      className="w-full py-1.5 sm:py-2 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-xs sm:text-sm md:text-base font-medium min-w-0"
                    />
                  </div>
                  <button
                    type="submit"
                    className="glow-btn inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold rounded-full cursor-pointer transition-all duration-300 shrink-0"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto no-scrollbar"
                  >
                    {suggestions.map((trip) => (
                      <Link href={`/itinerary/${trip.id}`} key={trip.id} className="block no-underline">
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 hover:bg-accent/5 transition-colors border-b border-gray-100 last:border-0 group cursor-pointer">
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                              <Compass size={15} />
                            </div>
                            <div className="text-left min-w-0">
                              <p className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-accent transition-colors line-clamp-1">
                                {trip.title}
                              </p>
                              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-gray-500 font-medium mt-0.5">
                                <MapPin size={9} className="text-accent shrink-0" />
                                <span className="truncate">{trip.destination}</span>
                                <span className="mx-1">•</span>
                                <span className="shrink-0">{trip.duration} {trip.duration === 1 ? 'Day' : 'Days'}</span>
                              </div>
                            </div>
                          </div>
                          <span className="bg-gray-100 text-gray-600 font-bold text-[8.5px] sm:text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ml-2">
                            {trip.category}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span className="text-[11px] sm:text-xs text-white/70 block font-medium">
              Guided group tours & customizable packages
            </span>
          </div>

          {/* Right Column: Sliding Client Travel Images (Dual-Track Infinite Scroll) */}
          <div className="lg:col-span-5 hidden lg:block h-[450px] relative overflow-hidden select-none">
            <div className="grid grid-cols-2 gap-4 h-full">

              {/* Column 1: Upward scrolling */}
              <div className="h-full overflow-hidden relative">
                <div className="flex flex-col gap-4 animate-scroll-up">
                  {/* Map twice for loop */}
                  {[...CLIENT_IMAGES_COL1, ...CLIENT_IMAGES_COL1].map((client, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-2xl overflow-hidden group shadow-lg border border-white/10 h-52 shrink-0"
                    >
                      <img
                        src={client.img}
                        alt={`${client.name} in ${client.loc}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Left bottom overlay for destination */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 flex items-end">
                        <span className="text-[13px] font-extrabold text-white tracking-wide leading-tight drop-shadow-md">
                          {client.loc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Downward scrolling */}
              <div className="h-full overflow-hidden relative">
                <div className="flex flex-col gap-4 animate-scroll-down">
                  {/* Map twice for loop */}
                  {[...CLIENT_IMAGES_COL2, ...CLIENT_IMAGES_COL2].map((client, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-2xl overflow-hidden group shadow-lg border border-white/10 h-52 shrink-0"
                    >
                      <img
                        src={client.img}
                        alt={`${client.name} in ${client.loc}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Left bottom overlay for destination */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 flex items-end">
                        <span className="text-[13px] font-extrabold text-white tracking-wide leading-tight drop-shadow-md">
                          {client.loc}
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

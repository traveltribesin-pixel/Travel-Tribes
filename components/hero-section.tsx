'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Users, Compass, Search, Star } from 'lucide-react'
import Link from 'next/link'
import { SAMPLE_TRIPS, type Trip } from '@/lib/trips'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=900&fit=crop', // Mountain road trip
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop', // Beach sunset
  'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&h=900&fit=crop', // Safari wildlife
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&h=900&fit=crop', // Yosemite valley
  'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1600&h=900&fit=crop'  // Mountain climbing
]

const CLIENT_IMAGES_COL1 = [
  { name: 'Sarah', loc: 'Kerala', img: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=400&q=80' },
  { name: 'Emma', loc: 'Meghalaya', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80' },
  { name: 'Michael', loc: 'Spiti Valley', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80' },
]

const CLIENT_IMAGES_COL2 = [
  { name: 'David', loc: 'Iceland', img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sophia', loc: 'Patagonia', img: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=400&q=80' },
  { name: 'James', loc: 'Bali', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
]

const ROTATING_WORDS = ['Ladakh', 'Spiti', 'Kashmir', 'Meghalaya', 'Kerala', 'Rajasthan']

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
    }, 8000)
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
      // Find a matching trip dynamically in the dataset
      const matchedTrip = SAMPLE_TRIPS.find((trip) =>
        trip.title.toLowerCase().includes(query) ||
        trip.destination.toLowerCase().includes(query) ||
        trip.category.toLowerCase().includes(query) ||
        trip.description.toLowerCase().includes(query) ||
        trip.highlights.some(h => h.toLowerCase().includes(query))
      )

      if (matchedTrip) {
        if (matchedTrip.type === 'weekend') {
          window.location.href = `/weekend-getaways?search=${encodeURIComponent(searchQuery.trim())}`
        } else {
          window.location.href = `/domestic-trips?search=${encodeURIComponent(searchQuery.trim())}`
        }
      } else {
        //  Default fallback: search in domestic-trips
        window.location.href = `/domestic-trips?search=${encodeURIComponent(searchQuery.trim())}`
      }
    } else {
      window.location.href = '/domestic-trips'
    }
  }

  return (
    <section className="min-h-screen pt-10 pb-36 relative overflow-hidden flex items-center bg-primary">
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

      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentImage]})` }}
          />
        </AnimatePresence>
        {/* Dark readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Booking Content */}
          <div className="lg:col-span-7 text-left text-white">
            <span className="inline-block px-3 py-1.5 bg-accent/25 backdrop-blur-md text-accent-foreground rounded-full text-xs sm:text-sm font-semibold border border-accent/25 mb-6">
              ✨ Where Adventure Meets Community
            </span>

            {/* Embedded Oval Image inside the Header Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-md">
              Book Your <br className="hidden sm:inline" />
              Trip to
              <span className="text-[#0cc0df] sm:ml-[1.4vw] sm:mb-2 inline-block  relative overflow-hidden h-[1.12em] align-bottom min-w-[300px] sm:min-w-[400px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: '65%', opacity: 0, rotateX: 45 }}
                    animate={{ y: '0%', opacity: 1, rotateX: 0 }}
                    exit={{ y: '-65%', opacity: 0, rotateX: -45 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    style={{ originY: 0.5 }}
                    className="absolute left-0"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Sub-Badges styled after JustWravel */}
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm font-bold text-accent-foreground mb-6 uppercase tracking-wider">
              <span>Wander</span>
              <span className="text-white/40">|</span>
              <span>Travel</span>
              <span className="text-white/40">|</span>
              <span>Connect</span>
              <span className="text-white/40">|</span>
              <span>Repeat</span>
            </div>

            <p className="text-base sm:text-lg text-white/80 max-w-xl mb-8 leading-relaxed">
              Curated journeys to the world&apos;s most exotic destinations. Travel with purpose, explore with like-minded explorers.
            </p>

            {/* Search Input Box styled after JustWravel */}
            <div ref={searchRef} className="max-w-md w-full relative mb-6">
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full shadow-2xl p-1.5 border border-white/20">
                  <div className="flex items-center flex-grow pl-4">
                    <Search className="text-muted-foreground mr-2.5 flex-shrink-0" size={18} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Plan Your Next Trip..."
                      className="w-full py-2 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-sm sm:text-base font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 sm:px-8 sm:py-3 bg-[#0cc0df] hover:bg-[#0aa6c2] text-white font-semibold rounded-full transition-colors duration-200 flex items-center gap-1.5 text-sm cursor-pointer"
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
                    className="absolute top-full left-0 right-0 mt-2 z-30 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto no-scrollbar"
                  >
                    {suggestions.map((trip) => (
                      <Link href={`/trip/${trip.id}`} key={trip.id} className="block no-underline">
                        <div className="flex items-center justify-between px-5 py-3.5 hover:bg-accent/5 transition-colors border-b border-gray-100 last:border-0 group cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                              <Compass size={16} />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-bold text-gray-900 group-hover:text-accent transition-colors line-clamp-1">
                                {trip.title}
                              </p>
                              <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium mt-0.5">
                                <MapPin size={10} className="text-accent" />
                                <span>{trip.destination}</span>
                                <span className="mx-1">•</span>
                                <span>{trip.duration} {trip.duration === 1 ? 'Day' : 'Days'}</span>
                              </div>
                            </div>
                          </div>
                          <span className="bg-gray-100 text-gray-600 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0">
                            {trip.category}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span className="text-xs text-white/50 block font-medium">
              Guided group tours & customizable packages
            </span>
          </div>

          {/* Right Column: Sliding Client Travel Images (Dual-Track Infinite Scroll) */}
          <div className="lg:col-span-5 hidden lg:block h-[450px] relative overflow-hidden select-none">
            {/* Soft gradient fade on top and bottom of tracks */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-primary to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-primary to-transparent z-10 pointer-events-none" />

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

      {/* Absolute Bottom Stats Row styled after the design screenshot */}
      {/* <div className="absolute bottom-0 left-0 right-0 bg-black/65 backdrop-blur-md border-t border-white/10 py-5 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
            <div className="text-center md:border-r border-white/10 last:border-0">
              <div className="text-xl sm:text-2xl font-bold text-accent">10000+</div>
              <div className="text-[10px] sm:text-xs text-white/70 font-semibold tracking-wider uppercase mt-0.5">Reviews</div>
            </div>
            <div className="text-center md:border-r border-white/10 last:border-0">
              <div className="text-xl sm:text-2xl font-bold text-accent">80000+</div>
              <div className="text-[10px] sm:text-xs text-white/70 font-semibold tracking-wider uppercase mt-0.5">Satisfied Seekers</div>
            </div>
            <div className="text-center md:border-r border-white/10 last:border-0">
              <div className="text-xl sm:text-2xl font-bold text-accent">50+</div>
              <div className="text-[10px] sm:text-xs text-white/70 font-semibold tracking-wider uppercase mt-0.5">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-accent">12 Years+</div>
              <div className="text-[10px] sm:text-xs text-white/70 font-semibold tracking-wider uppercase mt-0.5">Experience</div>
            </div>
          </div>
        </div>
      </div> */}

    </section>
  )
}

export { Hero as HeroSection }

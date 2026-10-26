'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Search, 
  X, 
  MapPin, 
  Compass, 
  CalendarDays, 
  Clock3, 
  ArrowRight 
} from 'lucide-react'
import { trips, isWeekendTrip, type Trip } from '@/lib/travel-data'
import { getTripPrimaryDate } from '@/lib/date-utils'

const CATEGORIES = [
  { label: 'All Trips', value: 'All' },
  { label: 'Domestic', value: 'Domestic' },
  { label: 'International', value: 'International' },
  { label: 'Xmas & New Year 🎉', value: 'Xmas & New Year' },
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  initialQuery?: string
}

export function SearchModal({ isOpen, onClose, initialQuery = '' }: SearchModalProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sync initial query when opened
  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        setQuery(initialQuery)
      }
      setActiveIndex(0)
      // Focus input on open
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      // Prevent body scrolling
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, initialQuery])

  // Filtered trips
  const filteredTrips = useMemo(() => {
    const trimmed = query.trim().toLowerCase()

    return trips.filter((trip) => {
      // Category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Xmas & New Year') {
          const isFestive = Boolean(
            trip.region === 'Xmas & New Year' ||
            trip.tag?.toLowerCase().includes('new year') ||
            trip.tag?.toLowerCase().includes('xmas')
          )
          if (!isFestive) return false
        } else if (trip.region !== selectedCategory) {
          return false
        }
      }

      // Query filter
      if (!trimmed) return true

      const titleMatch = trip.title.toLowerCase().includes(trimmed)
      const locationMatch = trip.location.toLowerCase().includes(trimmed)
      const regionMatch = trip.region.toLowerCase().includes(trimmed)
      const tagMatch = trip.tag ? trip.tag.toLowerCase().includes(trimmed) : false
      const descMatch = trip.description ? trip.description.toLowerCase().includes(trimmed) : false
      const highlightMatch = trip.highlights ? trip.highlights.some(h => h.toLowerCase().includes(trimmed)) : false
      const seoDescMatch = trip.seoDescription ? trip.seoDescription.toLowerCase().includes(trimmed) : false
      const keywordMatch = trip.seoKeywords ? trip.seoKeywords.some(k => k.toLowerCase().includes(trimmed)) : false

      return titleMatch || locationMatch || regionMatch || tagMatch || descMatch || highlightMatch || seoDescMatch || keywordMatch
    })
  }, [query, selectedCategory])

  // Reset active index when filtered results change
  useEffect(() => {
    setActiveIndex(0)
  }, [filteredTrips.length, query, selectedCategory])

  // Keyboard navigation (Esc, ArrowDown, ArrowUp, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => (prev < filteredTrips.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredTrips.length - 1))
      } else if (e.key === 'Enter') {
        if (filteredTrips.length > 0 && filteredTrips[activeIndex]) {
          e.preventDefault()
          const targetTrip = filteredTrips[activeIndex]
          const isFestive = Boolean(
            targetTrip.tag?.toLowerCase().includes('new year') ||
            targetTrip.tag?.toLowerCase().includes('xmas') ||
            targetTrip.region === 'Xmas & New Year'
          )
          window.open(`/itinerary/${targetTrip.slug}${isFestive ? '?festive=1' : ''}`, '_blank', 'noopener,noreferrer')
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredTrips, activeIndex, router, onClose])

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.children[activeIndex] as HTMLElement
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }
  }, [activeIndex])

  const handleSelectTrip = (trip: Trip) => {
    const isFestive = Boolean(
      trip.tag?.toLowerCase().includes('new year') ||
      trip.tag?.toLowerCase().includes('xmas') ||
      trip.region === 'Xmas & New Year'
    )
    window.open(`/itinerary/${trip.slug}${isFestive ? '?festive=1' : ''}`, '_blank', 'noopener,noreferrer')
    onClose()
  }

  const handleClear = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-modal-title"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#05131d]/80 backdrop-blur-md z-[999999]"
            onClick={onClose}
          />

          {/* Modal Card Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.6)] border border-slate-200/90 overflow-hidden flex flex-col max-h-[85vh] z-[1000000] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Search Bar Header */}
            <div className="p-3.5 sm:p-5 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white">
              <div className="flex items-center gap-3 bg-white rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 border-2 border-slate-200 focus-within:border-[var(--sky)] focus-within:shadow-[0_0_0_4px_rgba(67,169,209,0.15)] transition-all">
                <div className="w-8 h-8 rounded-xl bg-[var(--sky)]/10 text-[var(--sky)] flex items-center justify-center shrink-0">
                  <Search size={18} className="stroke-[2.5]" />
                </div>
                
                <input
                  ref={inputRef}
                  id="search-modal-title"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Where do you want to explore? (e.g. Spiti, Bali, Gokarna...)"
                  className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm sm:text-base font-semibold focus:outline-none min-w-0"
                  autoComplete="off"
                />

                {query && (
                  <button
                    onClick={handleClear}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                    title="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors shrink-0 cursor-pointer"
                  title="Press Escape to close"
                >
                  <kbd className="font-mono">ESC</kbd>
                </button>

                <button
                  onClick={onClose}
                  className="sm:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 shrink-0 cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pt-3 sm:pt-4">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.value
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--navy)] text-white shadow-sm scale-100'
                          : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                      }`}
                    >
                      {cat.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Modal Body / Results */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 max-h-[58vh] sm:max-h-[60vh]">
              
              {/* Search Results / Featured & Upcoming Escapes List */}
              <div>
                <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 px-1">
                  <span>
                    {query ? `Matching Trips (${filteredTrips.length})` : 'Featured & Upcoming Escapes'}
                  </span>
                  {selectedCategory !== 'All' && (
                    <span className="text-[11px] text-[var(--sky)] font-bold">
                      in {selectedCategory}
                    </span>
                  )}
                </div>

                {filteredTrips.length > 0 ? (
                  <div ref={listRef} className="flex flex-col gap-2">
                    {filteredTrips.map((trip, idx) => {
                      const isActive = idx === activeIndex
                      const isFestive = Boolean(
                        trip.tag?.toLowerCase().includes('new year') ||
                        trip.tag?.toLowerCase().includes('xmas') ||
                        trip.region === 'Xmas & New Year'
                      )

                      return (
                        <div
                          key={trip.id || trip.slug}
                          onClick={() => handleSelectTrip(trip)}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all duration-200 border ${
                            isActive
                              ? 'bg-sky-50/80 border-[var(--sky)]/60 shadow-sm translate-x-1'
                              : 'bg-white hover:bg-slate-50/90 border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                            {/* Trip Image Thumbnail */}
                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                              <Image
                                src={trip.image}
                                alt={trip.alt || trip.title}
                                fill
                                sizes="60px"
                                className="object-cover"
                              />
                            </div>

                            {/* Trip Info */}
                            <div className="min-w-0 text-left">
                              <h4 className={`text-xs sm:text-sm font-bold line-clamp-1 transition-colors ${
                                isActive ? 'text-[var(--navy)]' : 'text-slate-800'
                              }`}>
                                {trip.title}
                              </h4>

                              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-medium mt-1">
                                <span className="inline-flex items-center gap-1 text-[var(--sky)] font-semibold truncate max-w-[120px] sm:max-w-[160px]">
                                  <MapPin size={11} className="shrink-0" />
                                  <span className="truncate">{trip.location}</span>
                                </span>
                                
                                <span className="text-slate-300">•</span>
                                
                                <span className="inline-flex items-center gap-1 text-slate-500 shrink-0">
                                  <Clock3 size={11} className="text-slate-400 shrink-0" />
                                  {trip.duration}
                                </span>

                                <span className="hidden sm:inline-block text-slate-300">•</span>

                                <span className="hidden sm:inline-flex items-center gap-1 text-slate-500 shrink-0">
                                  <CalendarDays size={11} className={isWeekendTrip(trip) ? 'text-[var(--sky)] shrink-0' : 'text-slate-400 shrink-0'} />
                                  <span className={isWeekendTrip(trip) ? 'text-slate-800 font-bold' : ''}>
                                    {isWeekendTrip(trip) ? 'Every Saturday' : getTripPrimaryDate(trip)}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right Side: Category Badge & Price / Action */}
                          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-3 shrink-0 pl-2">
                            <div className="text-right">
                              <span className={`inline-block text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                                isFestive 
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                                  : trip.region === 'International'
                                    ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                    : 'bg-sky-100 text-sky-800 border border-sky-200'
                              }`}>
                                {trip.region}
                              </span>
                              <div className="text-xs sm:text-sm font-extrabold text-slate-800 mt-0.5">
                                {trip.price}
                              </div>
                            </div>

                            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                              isActive 
                                ? 'bg-[var(--sky)] text-white shadow-sm' 
                                : 'bg-slate-100 text-slate-400'
                            }`}>
                              <ArrowRight size={14} className={isActive ? 'translate-x-0.5 transition-transform' : ''} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="text-center py-10 px-4">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-3 border border-amber-100">
                      <Compass size={28} className="animate-spin" style={{ animationDuration: '10s' }} />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1">
                      No trips found for "{query}"
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                      We couldn&apos;t find any itinerary matching this search. Try searching for destinations like <strong>Spiti</strong>, <strong>Bali</strong>, <strong>Gokarna</strong>, or <strong>Vietnam</strong>.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={handleClear}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Clear Filters
                      </button>
                      <Link
                        href="/plan-a-trip"
                        onClick={onClose}
                        className="px-4 py-2 bg-[var(--sky)] hover:bg-[var(--navy)] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                      >
                        Plan Custom Trip
                      </Link>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
              <div className="hidden sm:flex items-center gap-3 text-[11px] font-medium text-slate-400">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px] text-slate-600 shadow-2xs">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px] text-slate-600 shadow-2xs">↓</kbd>
                  <span>to navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px] text-slate-600 shadow-2xs">↵ Enter</kbd>
                  <span>to select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px] text-slate-600 shadow-2xs">ESC</kbd>
                  <span>to close</span>
                </span>
              </div>

              <div className="text-center sm:text-right w-full sm:w-auto">
                <Link
                  href="/plan-a-trip"
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-[var(--sky)] font-bold hover:text-[var(--navy)] transition-colors text-xs"
                >
                  <span>Can&apos;t find your dream destination? Make your own</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

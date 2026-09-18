'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock3, CalendarDays, CheckCircle2, XCircle, Users, Star, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowRight, ShieldAlert, Sparkles, Compass, Camera, Images, Maximize2, X } from 'lucide-react'
import { trips } from '@/lib/travel-data'
import type { Trip } from '@/lib/travel-data'
import { useSearchParams } from 'next/navigation'
import { getTripPrimaryDate, filterUpcomingDates, isFestiveDate } from '@/lib/date-utils'
import { TripCard } from '@/components/trip-card'
import { ReviewCard } from '@/components/trip-components'

export function TripContent({ trip }: { trip: Trip }) {
  const searchParams = useSearchParams()
  const isFestiveParam = searchParams.get('festive') === '1' || searchParams.get('festive') === 'true'
  const [activeTab, setActiveTab] = useState('overview')
  const [guests, setGuests] = useState(2)
  const [openDay, setOpenDay] = useState<number | null>(1)

  const primaryDate = useMemo(() => getTripPrimaryDate(trip), [trip])
  const upcomingDates = useMemo(() => {
    if (trip.dates && trip.dates.length > 0) {
      const filtered = filterUpcomingDates(trip.dates)
      if (filtered.length > 0) return filtered
    }
    return [primaryDate]
  }, [trip, primaryDate])

  const initialDate = useMemo(() => {
    if (isFestiveParam && trip.dates && trip.dates.length > 0) {
      const festiveUpcoming = filterUpcomingDates(trip.dates).filter(isFestiveDate)
      if (festiveUpcoming.length > 0) return festiveUpcoming[0]
      const allFestive = trip.dates.filter(isFestiveDate)
      if (allFestive.length > 0) return allFestive[0]
    }
    return primaryDate
  }, [isFestiveParam, trip.dates, primaryDate])

  const [selectedDate, setSelectedDate] = useState(initialDate)
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  useEffect(() => {
    setSelectedDate(initialDate)
  }, [initialDate])

  // Dynamic price resolving based on selected date (automatically adjusts for New Year / Xmas batches)
  const displayPrice = useMemo(() => {
    if (isFestiveDate(selectedDate) && trip.pricingOptions && trip.pricingOptions.length > 0) {
      const festiveOpt = trip.pricingOptions.find(
        (opt) =>
          opt.label.toLowerCase().includes('xmas') ||
          opt.label.toLowerCase().includes('new year') ||
          opt.label.toLowerCase().includes('festive')
      )
      if (festiveOpt) {
        if (festiveOpt.price.startsWith('+')) {
          const baseNum = parseInt(trip.price.replace(/[^\d]/g, ''), 10) || 0
          const addNum = parseInt(festiveOpt.price.replace(/[^\d]/g, ''), 10) || 1000
          return `₹${(baseNum + addNum).toLocaleString('en-IN')}`
        } else {
          const optNum = parseInt(festiveOpt.price.replace(/[^\d]/g, ''), 10) || 0
          return `₹${optNum.toLocaleString('en-IN')}`
        }
      }
    }
    return trip.price
  }, [selectedDate, trip])

  const galleryImages = useMemo(() => {
    if (trip.gallery && trip.gallery.length > 0) return trip.gallery
    return [{ image: trip.image, alt: trip.alt }]
  }, [trip])

  // Keyboard navigation for photo lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null))
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, galleryImages.length])

  const reviewsSliderRef = useRef<HTMLDivElement>(null)
  const [isReviewsPaused, setIsReviewsPaused] = useState(false)

  const slideReviews = useCallback((direction: 'left' | 'right') => {
    if (!reviewsSliderRef.current) return
    const container = reviewsSliderRef.current
    const item = container.querySelector('.itinerary-review-item') as HTMLElement
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

  // Auto-scroll every 3 seconds, paused on hover/touch
  useEffect(() => {
    if (!trip.reviews || trip.reviews.length === 0 || isReviewsPaused) return

    const interval = setInterval(() => {
      slideReviews('right')
    }, 3000)

    return () => clearInterval(interval)
  }, [trip.reviews, isReviewsPaused, slideReviews])

  // Find related trips prioritizing the same region/category
  const relatedTrips = useMemo(() => {
    const sameRegion = trips.filter((t) => t.slug !== trip.slug && t.region === trip.region)
    const others = trips.filter((t) => t.slug !== trip.slug && t.region !== trip.region)
    return [...sameRegion, ...others].slice(0, 3)
  }, [trip.slug, trip.region])

  const availableTabs = [
    { id: 'overview', label: 'Overview' },
    ...(trip.itinerary && trip.itinerary.length > 0 ? [{ id: 'itinerary', label: 'Itinerary' }] : []),
    ...(trip.inclusions && trip.inclusions.length > 0 ? [{ id: 'inclusions', label: 'Inclusive/Exclusive' }] : []),
    ...(galleryImages.length > 0 ? [{ id: 'gallery', label: `Gallery (${galleryImages.length})` }] : []),
    ...(trip.reviews && trip.reviews.length > 0 ? [{ id: 'reviews', label: `Reviews (${trip.reviews.length})` }] : []),
    ...(trip.policies && trip.policies.length > 0 ? [{ id: 'policy', label: 'Policy' }] : [])
  ]

  // Scrollspy logic
  useEffect(() => {
    const sections = availableTabs.map(t => t.id)
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const intersectingEntry = entries.find((entry) => entry.isIntersecting)
        if (intersectingEntry) {
          setActiveTab(intersectingEntry.target.id)
        }
      },
      { rootMargin: '-150px 0px -50% 0px' }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [availableTabs])

  // Force scroll to top on mount (fixes Next.js router scroll issues)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Auto-scroll active tab into view horizontally on mobile
  useEffect(() => {
    const activeBtn = document.getElementById(`tab-${activeTab}`)
    const container = document.getElementById('tabs-container')
    if (activeBtn && container) {
      const scrollLeft = activeBtn.offsetLeft - (container.offsetWidth / 2) + (activeBtn.offsetWidth / 2)
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeTab])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">

      {/* 1. Hero Gallery */}
      <section className="pt-4 lg:pt-4 pb-8 max-w-[1160px] mx-auto px-6 lg:px-8">
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-1 aspect-[3/2] md:aspect-[24/9] overflow-hidden rounded-3xl mb-8 group/hero">
          <div
            onClick={() => setLightboxIndex(0)}
            className="col-span-1 md:col-span-3 relative h-full group overflow-hidden cursor-pointer"
          >
            <Image
              src={trip.image}
              alt={trip.alt}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="hidden md:flex flex-col gap-1 col-span-1 h-full">
            {(galleryImages.length > 1 ? galleryImages.slice(1, 3) : galleryImages.slice(0, 2)).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx + 1 < galleryImages.length ? idx + 1 : 0)}
                className="relative flex-1 overflow-hidden group cursor-pointer"
              >
                <Image
                  src={img.image}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          {/* Floating "View All Photos" Pill */}
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="absolute bottom-4 right-4 bg-slate-950/75 hover:bg-slate-900 backdrop-blur-md text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 border border-white/20 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer z-10"
          >
            <Camera size={15} className="text-[var(--sun)]" />
            <span>View All Photos ({galleryImages.length})</span>
          </button>
        </div>

        {/* 2. Title & Metadata */}
        <div>
          <div className="flex items-center gap-2 text-[var(--sky)] font-bold text-xs tracking-wider uppercase mb-1">
            <MapPin size={14} />
            <span>{trip.location}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[var(--navy)] mb-3 leading-tight">
            {trip.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium text-sm">
            <span className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              <Clock3 size={16} className="text-[var(--sky)]" /> {trip.duration}
            </span>
            <span className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              <CalendarDays size={16} className="text-[var(--sky)]" /> {primaryDate}
            </span>
            <span className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              <Users size={16} className="text-[var(--sky)]" /> {trip.spots}
            </span>
          </div>
        </div>
      </section>

      {/* Sticky Tabs */}
      <div className="sticky top-[68px] min-[560px]:top-[78px] z-30 bg-[#f7fbfd]/95 backdrop-blur-md border-y border-[var(--border)] shadow-sm">
        <div id="tabs-container" className="max-w-[1160px] mx-auto px-6 lg:px-8 flex gap-8 overflow-x-auto no-scrollbar scroll-smooth">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => scrollTo(tab.id)}
              className={`py-3 px-2 text-[12px]! font-bold uppercase tracking-wider whitespace-nowrap transition-colors relative ${activeTab === tab.id ? 'text-[var(--sky)]' : 'text-slate-500 hover:text-[var(--navy)]'
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[var(--sky)] z-10"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1160px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">

            {/* 3. Overview */}
            <section id="overview" className="scroll-mt-40">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--navy)] mb-4">Overview</h2>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-8">
                {trip.description} This carefully curated journey takes you through the heart of {trip.location}, offering a perfect blend of adventure, culture, and relaxation.
              </p>

              {trip.highlights && trip.highlights.length > 0 && (
                <div className="bg-white rounded-3xl p-8 border border-[var(--sky-pale)] hover:border-[var(--sky)] transition-all duration-300 shadow-[0_4px_10px_rgba(67,169,209,0.2)] hover:shadow-[0_10px_15px_rgba(67,169,209,0.2)] mb-8">
                  <h3 className="text-xl font-bold text-[var(--navy)] mb-4">Trip Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {trip.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Star size={18} className="text-[var(--sun)] mt-0.5 shrink-0" fill="currentColor" />
                        <span className="text-[14px] text-slate-600 leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {trip.pricingOptions && trip.pricingOptions.length > 0 && (
                <div className="bg-white rounded-3xl p-8 border border-[var(--sky-pale)] hover:border-[var(--sky)] transition-all duration-300 shadow-[0_4px_10px_rgba(67,169,209,0.2)] hover:shadow-[0_10px_15px_rgba(67,169,209,0.2)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                    <h3 className="text-xl font-bold text-[var(--navy)]">Pricing Packages</h3>
                    {trip.bookingAmount && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--sky)] bg-[var(--sky-pale)] px-3.5 py-1.5 rounded-full w-fit">
                        Booking Advance: {trip.bookingAmount}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trip.pricingOptions.map((opt, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between">
                        <span className="text-xs text-slate-500 font-medium mb-1.5">{opt.label}</span>
                        <span className="text-lg font-extrabold text-[var(--navy)]">{opt.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 4. Detailed Itinerary (Accordion) */}
            {trip.itinerary && trip.itinerary.length > 0 && (
              <>
                <hr className="border-[var(--border)]" />
                <section id="itinerary" className="scroll-mt-40">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--navy)] mb-4">Detailed Itinerary</h2>
                  <div className="space-y-4">
                    {trip.itinerary.map((day, idx) => {
                      const isOpen = openDay === day.day
                      return (
                        <div key={idx} className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? 'border-[var(--sky)] shadow-[0_4px_15px_rgba(67,169,209,0.2)]' : 'border-[var(--sky-pale)] hover:border-[var(--sky)] shadow-[0_4px_10px_rgba(67,169,209,0.2)] hover:shadow-[0_10px_15px_rgba(67,169,209,0.2)]'}`}>
                          <button
                            onClick={() => setOpenDay(isOpen ? null : day.day)}
                            className="w-full flex items-center justify-between p-5 text-left"
                          >
                            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                              <span className={`px-3 py-1.5 leading-none rounded-full text-[12px] font-bold uppercase tracking-wider transition-colors w-fit ${isOpen ? 'bg-[var(--sky)] text-white' : 'bg-[var(--sky-pale)] text-[var(--sky)]'}`}>
                                Day {day.day}
                              </span>
                              <span className={`text-lg sm:text-xl font-bold transition-colors ${isOpen ? 'text-[var(--navy)]' : 'text-slate-700'}`}>
                                {day.title}
                              </span>
                            </div>
                            <div className="shrink-0 ml-4">
                              {isOpen ? (
                                <ChevronUp className="text-[var(--sky)]" />
                              ) : (
                                <ChevronDown className="text-slate-400" />
                              )}
                            </div>
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-6 pt-2 border-t border-slate-100 mt-2">
                                  <ul className="space-y-3">
                                    {day.activities.map((activity, actIdx) => (
                                      <li key={actIdx} className="flex items-start gap-3 text-[15px] text-slate-600">
                                        <span className="text-[var(--sky)] mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--sky)]" />
                                        <span>{activity}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>
                </section>
              </>
            )}

            {/* 5. Inclusions & Exclusions */}
            {((trip.inclusions && trip.inclusions.length > 0) || (trip.exclusions && trip.exclusions.length > 0)) && (
              <>
                <hr className="border-[var(--border)]" />
                <section id="inclusions" className="scroll-mt-40">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--navy)] mb-4">Inclusive & Exclusive</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Included */}
                    {trip.inclusions && trip.inclusions.length > 0 && (
                      <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100 transition-all duration-300 shadow-[0_4px_10px_rgba(100,100,100,0.2)] hover:shadow-[0_10px_15px_rgba(100,100,100,0.2)]">
                        <h3 className="text-lg font-bold text-[var(--navy)] mb-4 flex items-center gap-2">
                          <CheckCircle2 className="text-emerald-500" size={20} /> What's Included
                        </h3>
                        <ul className="space-y-4">
                          {trip.inclusions.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-[14px] text-slate-600">
                              <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Excluded */}
                    {trip.exclusions && trip.exclusions.length > 0 && (
                      <div className="bg-rose-50/50 rounded-3xl p-8 border border-rose-100 transition-all duration-300 shadow-[0_4px_10px_rgba(100,100,100,0.2)] hover:shadow-[0_10px_15px_rgba(100,100,100,0.2)]">
                        <h3 className="text-lg font-bold text-[var(--navy)] mb-4 flex items-center gap-2">
                          <XCircle className="text-rose-400" size={20} /> What's Excluded
                        </h3>
                        <ul className="space-y-4">
                          {trip.exclusions.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-[14px] text-slate-600">
                              <XCircle size={18} className="text-rose-400 mt-0.5 shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}


            {/* 5. Destination Photo Gallery */}
            {galleryImages.length > 0 && (
              <>
                <hr className="border-[var(--border)]" />
                <section id="gallery" className="scroll-mt-40">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--navy)] flex items-center gap-3">
                        <Camera className="text-[var(--sky)]" size={28} /> Destination Photo Gallery
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Authentic glimpses & moments from {trip.title} ({galleryImages.length} photos)
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[var(--sky-pale)] hover:border-[var(--sky)] transition-all duration-300 shadow-[0_4px_10px_rgba(67,169,209,0.2)] hover:shadow-[0_10px_15px_rgba(67,169,209,0.2)]">
                    {/* Responsive Modern Photo Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                      {(showAllPhotos ? galleryImages : galleryImages.slice(0, 8)).map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => setLightboxIndex(idx)}
                          className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer bg-slate-100 border border-slate-200/60 hover:border-[var(--sky)] transition-all shadow-sm"
                        >
                          <Image
                            src={item.image}
                            alt={item.alt || `${trip.title} photo ${idx + 1}`}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                            <span className="text-white text-[11px] font-medium line-clamp-1 flex items-center gap-1.5">
                              <Maximize2 size={12} className="shrink-0 text-[var(--sun)]" />
                              {item.alt}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Show More / Show Less Toggle Button */}
                    {galleryImages.length > 8 && (
                      <div className="mt-6 text-center">
                        <button
                          type="button"
                          onClick={() => setShowAllPhotos(!showAllPhotos)}
                          className="px-6 py-2.5 rounded-full border border-[var(--sky)] text-[var(--sky)] hover:bg-[var(--sky)] hover:text-white font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm inline-flex items-center gap-2 cursor-pointer"
                        >
                          <Images size={16} />
                          <span>{showAllPhotos ? 'Show Less Photos' : `View All ${galleryImages.length} Photos`}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}

            {/* 6. Policy */}
            {trip.policies && trip.policies.length > 0 && (
              <>
                <hr className="border-[var(--border)]" />
                <section id="policy" className="scroll-mt-40">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--navy)] mb-4 flex items-center gap-3">
                    <ShieldAlert className="text-slate-400" size={28} /> Policies
                  </h2>
                  <div className="bg-slate-100/50 rounded-3xl p-8 border border-slate-200 transition-all duration-300 shadow-[0_4px_10px_rgba(100,100,100,0.2)] hover:shadow-[0_10px_15px_rgba(100,100,100,0.2)]">
                    <ul className="space-y-4">
                      {trip.policies.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[14px] text-slate-600">
                          <div className="w-2 h-2 rounded-full bg-slate-400 mt-[7px] shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </>
            )}

          </div>

          {/* Right Column / Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="fixed bottom-0 left-0 w-full z-40 lg:z-20 lg:sticky lg:top-[144px] bg-white lg:rounded-3xl px-6 py-4 lg:p-6 xl:p-7 border-t lg:border border-[var(--border)] lg:border-[var(--sky-pale)] transition-all duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] lg:shadow-[0_4px_10px_rgba(67,169,209,0.2)] lg:hover:shadow-[0_10px_15px_rgba(67,169,209,0.2)] flex flex-row lg:flex-col items-center lg:items-stretch justify-between lg:justify-start gap-4 lg:gap-0 lg:max-h-[calc(100vh-165px)] lg:overflow-y-auto no-scrollbar">
              <div className="lg:mb-5 lg:pb-5 lg:border-b border-[var(--border)] flex flex-col">
                <span className="hidden lg:block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Starting from</span>
                <span className="lg:hidden text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Price</span>
                <div className="flex items-end gap-1 lg:gap-2">
                  <span className="text-xl lg:text-3xl font-black text-[var(--navy)]">{displayPrice}</span>
                  <span className="hidden lg:inline-block text-slate-500 font-medium pb-1 text-sm">/ person</span>
                </div>
              </div>

              <div className="hidden lg:block space-y-3.5 mb-5">
                {/* Date Selector */}
                <div className="relative">
                  <div
                    onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                    className="border border-[var(--border)] rounded-xl p-3.5 flex justify-between items-center cursor-pointer hover:border-[var(--sky)] transition-colors group"
                  >
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Select Date</div>
                      <div className="font-medium text-[var(--navy)] text-xs">{selectedDate}</div>
                    </div>
                    <ChevronDown size={16} className={`text-slate-300 group-hover:text-[var(--sky)] transition-all ${isDateDropdownOpen ? 'rotate-180 text-[var(--sky)]' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {isDateDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[var(--border)] shadow-[0_4px_20px_rgba(67,169,209,0.12)] overflow-hidden z-30 max-h-60 overflow-y-auto review-scroll"
                      >
                        {upcomingDates.map((d, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setSelectedDate(d);
                              setIsDateDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs hover:bg-[var(--sky-pale)] hover:text-[var(--sky)] transition-colors ${selectedDate === d ? 'bg-[var(--sky-pale)] text-[var(--sky)] font-medium' : 'text-slate-600'}`}
                          >
                            {d}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Guests Selector */}
                <div className="border border-[var(--border)] rounded-xl p-3.5 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Guests</div>
                    <div className="font-medium text-[var(--navy)] text-xs">{guests} People</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-7 h-7 rounded-full bg-[var(--sky-pale)] flex items-center justify-center text-[var(--sky)] hover:bg-[var(--sky)] hover:text-white transition-colors text-sm font-bold">-</button>
                    <button onClick={() => setGuests(guests + 1)} className="w-7 h-7 rounded-full bg-[var(--sky-pale)] flex items-center justify-center text-[var(--sky)] hover:bg-[var(--sky)] hover:text-white transition-colors text-sm font-bold">+</button>
                  </div>
                </div>
              </div>

              {/* Package Pricing Options */}
              {trip.pricingOptions && trip.pricingOptions.length > 0 && (
                <div className="hidden lg:block bg-slate-50/90 rounded-2xl p-3.5 border border-slate-200/80 mb-5 space-y-1.5">
                  {/* <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Package Options</div> */}
                  {/* <div className="space-y-1">
                    {trip.pricingOptions.map((opt, i) => (
                      <div key={i} className="flex justify-between items-center text-[11px] py-0.5 border-b border-slate-200/60 last:border-0">
                        <span className="text-slate-600 font-medium truncate pr-2">{opt.label}</span>
                        <span className="font-bold text-[var(--navy)] shrink-0">{opt.price}</span>
                      </div>
                    ))}
                  </div> */}
                  {trip.bookingAmount && (
                    <div className="mt-2 pt-2 border-t border-dashed border-slate-300 flex justify-between items-center text-[11px]">
                      <span className="text-[var(--sky)] font-bold">Advance Booking</span>
                      <span className="font-bold text-[var(--sky)]">{trip.bookingAmount}</span>
                    </div>
                  )}
                  <div className="mt-2 p-2 bg-emerald-50/80 border border-emerald-200/80 rounded-xl flex items-center justify-between text-[11px] text-emerald-800 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={12} className="text-emerald-600 shrink-0" />
                      Full Payment Discount
                    </span>
                    <span className="text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200 text-[10px] font-black">
                      ₹1,000 OFF
                    </span>
                  </div>
                </div>
              )}

              {/* Animated Button */}
              <div className="w-[160px] lg:w-full">
                <Link
                  href={`/book?trip=${trip.slug}&date=${encodeURIComponent(selectedDate)}&guests=${guests}`}
                  className="block w-full"
                >
                  <button className="glow-btn w-full inline-flex items-center justify-center gap-2 py-3 lg:py-3.5 rounded-full font-bold text-[13px] lg:text-sm">
                    Book Now <ArrowRight size={16} className="hidden lg:block" />
                  </button>
                </Link>
                <p className="hidden lg:block text-center text-[10px] text-slate-400 mt-2.5">
                  Instant confirmation • 100% Safe
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* RELATED TRIPS SECTION */}
        {relatedTrips.length > 0 && (
          <section className="mt-20 pt-16 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-2">
                  <Compass size={15} className="text-[var(--sky)]" />
                  <span>More Adventures To Explore</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--navy)]">
                  Related Trips You Might Love
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
                  Discover more unforgettable getaways, scenic trails, and tribe journeys tailored for wanderers like you.
                </p>
              </div>

              <Link
                href="/upcoming-trips"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--sky)] hover:text-[var(--navy)] transition-colors shrink-0"
              >
                <span>View All Upcoming Trips</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 3-Column Responsive Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedTrips.map((relatedTrip) => (
                <div key={relatedTrip.slug} className="h-full flex flex-col">
                  <TripCard trip={relatedTrip} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* DESTINATION-SPECIFIC REVIEWS SLIDER (AUTO-SCROLL EVERY 3 SECONDS) */}
        {trip.reviews && trip.reviews.length > 0 && (
          <section id="reviews" className="mt-20 pt-16 border-t border-[var(--border)] scroll-mt-32">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-2">
                  <Star size={15} className="text-amber-400 fill-amber-400" />
                  <span>Real Feedback from Past {trip.title.replace(' Trip', '')} Batches</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--navy)]">
                  Traveller Reviews for {trip.title}
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
                  Showing {trip.reviews.length} authentic experiences from travellers who explored {trip.location.split(' · ')[0]}.
                </p>
              </div>

              {/* Rating Badge */}
              <div className="flex items-center gap-2.5 bg-white border border-[var(--sky-pale)] px-4 py-2.5 rounded-2xl shadow-sm self-start sm:self-auto">
                <div className="text-amber-400 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400" />
                  ))}
                </div>
                <div className="text-xs font-black text-[var(--navy)]">4.9 / 5.0</div>
                <span className="text-[10px] text-slate-400 border-l border-slate-200 pl-2">Google</span>
              </div>
            </div>

            {/* Horizontal Auto-scrolling Review Rail with Left & Right Positioned Navigation Arrows */}
            <div className="relative group/slider">
              {/* Left Navigation Arrow */}
              <button
                type="button"
                onClick={() => slideReviews('left')}
                className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 hover:border-[var(--sky)] hover:bg-[var(--sky)] hover:text-white text-[var(--navy)] flex items-center justify-center transition-all duration-300 shadow-[0_6px_20px_rgba(11,41,64,0.18)] active:scale-95 cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft size={22} className="stroke-[2.5]" />
              </button>

              {/* Slider Track */}
              <div
                ref={reviewsSliderRef}
                onMouseEnter={() => setIsReviewsPaused(true)}
                onMouseLeave={() => setIsReviewsPaused(false)}
                onTouchStart={() => setIsReviewsPaused(true)}
                onTouchEnd={() => setIsReviewsPaused(false)}
                className="flex gap-6 overflow-x-auto scroll-smooth py-4 no-scrollbar snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {trip.reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="itinerary-review-item flex-none w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] snap-start shrink-0 flex flex-col"
                  >
                    <ReviewCard {...rev} detail={rev.detail || trip.title} />
                  </div>
                ))}
              </div>

              {/* Right Navigation Arrow */}
              <button
                type="button"
                onClick={() => slideReviews('right')}
                className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 hover:border-[var(--sky)] hover:bg-[var(--sky)] hover:text-white text-[var(--navy)] flex items-center justify-center transition-all duration-300 shadow-[0_6px_20px_rgba(11,41,64,0.18)] active:scale-95 cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight size={22} className="stroke-[2.5]" />
              </button>
            </div>

            {/* Slider status & hint */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isReviewsPaused ? 'bg-amber-400' : 'bg-emerald-500 animate-pulse'}`} />
                <span className="text-[11px]">
                  {isReviewsPaused ? 'Paused (Reading review)' : 'Auto-scrolling every 3s'}
                </span>
              </div>
              <span className="text-[11px] hidden sm:inline text-slate-400">
                Hover to pause • Swipe or use arrows to navigate
              </span>
            </div>
          </section>
        )}
        {/* FULLSCREEN PHOTO LIGHTBOX MODAL */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Top Bar (Counter + Close Button) */}
              <div
                className="w-full max-w-5xl flex items-center justify-between z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white/10 text-white text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                  {lightboxIndex + 1} / {galleryImages.length}
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main Image Stage */}
              <div
                className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Previous Button */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)
                    }
                    className="absolute left-0 sm:-left-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm shadow-xl"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                {/* Photo */}
                <div className="relative w-full h-[65vh] sm:h-[75vh] max-w-4xl">
                  <Image
                    src={galleryImages[lightboxIndex].image}
                    alt={galleryImages[lightboxIndex].alt}
                    fill
                    priority
                    className="object-contain"
                  />
                </div>

                {/* Next Button */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryImages.length)}
                    className="absolute right-0 sm:-right-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm shadow-xl"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>

              {/* Bottom Caption */}
              <div
                className="w-full max-w-xl text-center z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-white/90 text-sm font-medium">
                  {galleryImages[lightboxIndex].alt}
                </p>
                <span className="text-white/50 text-xs mt-1 block">
                  {trip.title} · Click anywhere to close or use arrow keys
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

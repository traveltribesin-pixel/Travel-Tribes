'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock3, CalendarDays, CheckCircle2, XCircle, Users, Star, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowRight, ShieldAlert, Sparkles, Compass, Camera, Images, Maximize2, X, FileDown, Download, Check, Loader2, Phone, Mail, User } from 'lucide-react'
import { trips } from '@/lib/travel-data'
import type { Trip } from '@/lib/travel-data'
import { useSearchParams } from 'next/navigation'
import { getTripPrimaryDate, filterUpcomingDates, isFestiveDate } from '@/lib/date-utils'
import { TripCard } from '@/components/trip-card'
import { ReviewCard } from '@/components/trip-components'
import { generateItineraryPDF } from '@/lib/generate-itinerary-pdf'
import { PicturePerfectGallery } from '@/components/picture-perfect-gallery'

import { resolveTripDynamicPackages } from '@/lib/pricing-calculator'

/**
 * Calculates visual strikethrough price with +₹3,000 markup matching trip cards.
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

export function TripContent({ trip }: { trip: Trip }) {
  const searchParams = useSearchParams()
  const isFestiveParam = searchParams.get('festive') === '1' || searchParams.get('festive') === 'true'
  const [activeTab, setActiveTab] = useState('overview')
  const [guests, setGuests] = useState(2)
  const [openDay, setOpenDay] = useState<number | null>(1)

  // PDF Lead Capture Modal State
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false)
  const [pdfFormData, setPdfFormData] = useState({ fullName: '', phone: '', email: '' })
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [pdfSuccess, setPdfSuccess] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)

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

  const handleDownloadPdfSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPdfError(null)

    const name = pdfFormData.fullName.trim()
    const phone = pdfFormData.phone.trim()
    const email = pdfFormData.email.trim()

    if (!name || !phone || !email) {
      setPdfError('Please fill in your Full Name, WhatsApp Number, and Email.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setPdfError('Please enter a valid email address.')
      return
    }

    const digits = phone.replace(/[^\d]/g, '')
    if (digits.length < 10) {
      setPdfError('Please enter a valid 10-digit phone/WhatsApp number.')
      return
    }

    setIsGeneratingPdf(true)

    try {
      // Record lead in backend
      fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formSource: 'Itinerary PDF Download Form',
          fullName: name,
          phone,
          email,
          tripSlug: trip.slug,
          tripTitle: trip.title
        })
      }).catch((err) => console.error('Lead error:', err))

      // Generate & download PDF
      await generateItineraryPDF(trip, { fullName: name, phone, email })
      setPdfSuccess(true)
      setTimeout(() => {
        setIsPdfModalOpen(false)
        setPdfSuccess(false)
      }, 2000)
    } catch (err) {
      console.error(err)
      setPdfError('Could not generate PDF. Please try again.')
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  // Authoritative dynamic price resolving based on selected departure date (Long Weekend, Xmas/NY, Regular)
  const dynamicPricingInfo = useMemo(() => {
    return resolveTripDynamicPackages(trip, selectedDate)
  }, [trip, selectedDate])

  const displayPrice = useMemo(() => {
    if (dynamicPricingInfo.packages && dynamicPricingInfo.packages.length > 0) {
      const primaryPkg = dynamicPricingInfo.packages[0]
      const priceText = primaryPkg.price.split(' ')[0]
      return priceText.startsWith('₹') ? priceText : `₹${priceText}`
    }
    return trip.price
  }, [dynamicPricingInfo, trip.price])

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
    ...(trip.policies && trip.policies.length > 0 ? [{ id: 'policy', label: 'Policy' }] : []),
    ...(galleryImages.length > 0 ? [{ id: 'gallery', label: 'Pictures Perfect Moments' }] : []),
    ...(trip.reviews && trip.reviews.length > 0 ? [{ id: 'reviews', label: `Reviews (${trip.reviews.length})` }] : [])
  ]

  // Scrollspy logic
  useEffect(() => {
    const sections = availableTabs.map(t => t.id)
    const observer = new IntersectionObserver(
      (entries) => {
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

  // Force scroll to top on mount
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
              className="object-cover object-balanced group-hover:scale-105 transition-transform duration-700"
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
                  className="object-cover object-balanced group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>

          {/* Floating "View All Photos" Pill */}
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-slate-950/75 hover:bg-slate-900 backdrop-blur-md text-white text-[10.5px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex items-center gap-1.5 border border-white/20 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer z-10"
          >
            <Camera size={13} className="text-[var(--sun)] shrink-0" />
            <span>View All Photos</span>
          </button>
        </div>

        {/* 2. Title & Metadata */}
        <div>
          {/* Location Bar (Above Title) */}
          <div className="flex items-center gap-1.5 text-[var(--sky)] font-bold text-[11px] sm:text-xs tracking-wider uppercase mb-1.5">
            <MapPin size={13} className="shrink-0" />
            <span className="truncate">{trip.location}</span>
          </div>

          {/* Heading Title (Proportional & Clean on mobile & desktop) */}
          <h1 className="text-[20px] sm:text-2xl lg:text-4xl font-extrabold text-[var(--navy)] mb-3 leading-snug tracking-tight">
            {trip.title}
          </h1>

          {/* 4 Compact Header Badges in a Balanced 2x2 Grid (Mobile) / Flex Row (Desktop) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 text-slate-600 font-semibold text-[11.5px] sm:text-xs">
            <span className="flex items-center justify-center sm:justify-start gap-1.5 bg-white border border-slate-200/90 px-3 py-2 rounded-xl shadow-xs">
              <Clock3 size={14} className="text-[var(--sky)] shrink-0" />
              <span className="truncate">{trip.duration}</span>
            </span>

            <span className="flex items-center justify-center sm:justify-start gap-1.5 bg-white border border-slate-200/90 px-3 py-2 rounded-xl shadow-xs truncate">
              <CalendarDays size={14} className="text-[var(--sky)] shrink-0" />
              <span className="truncate">{primaryDate}</span>
            </span>

            <span className="flex items-center justify-center sm:justify-start gap-1.5 bg-white border border-slate-200/90 px-3 py-2 rounded-xl shadow-xs">
              <Users size={14} className="text-[var(--sky)] shrink-0" />
              <span className="truncate">{trip.spots}</span>
            </span>

            <button
              type="button"
              onClick={() => setIsPdfModalOpen(true)}
              className="flex items-center justify-center gap-1.5 bg-[var(--sky-pale)] hover:bg-[var(--sky)] text-[var(--sky)] hover:text-white border border-sky-200 hover:border-[var(--sky)] px-3 py-2 rounded-xl text-[11.5px] sm:text-xs font-bold transition-all duration-200 shadow-xs cursor-pointer truncate"
            >
              <FileDown size={14} className="shrink-0" />
              <span className="truncate">Download PDF</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Tabs (Properly offset below Primary & Secondary Sub-Navbar) */}
      <div className="sticky-itinerary-nav bg-[#f7fbfd]/95 backdrop-blur-md border-y border-[var(--border)] shadow-sm transition-all duration-200">
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
      <div className="max-w-[1160px] mx-auto px-5 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">

            {/* 1. Overview */}
            <section id="overview" className="itinerary-scroll-target space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--navy)]">About the Trip</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                {trip.description}
              </p>

              {/* PDF Download Highlight Banner */}
              <div className="bg-gradient-to-r from-sky-50 via-blue-50/50 to-sky-50 border border-[var(--sky-pale)] rounded-2xl p-2 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-white text-[var(--sky)] flex items-center justify-center shadow-sm shrink-0 border border-[var(--sky-pale)]">
                    <FileDown size={22} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[var(--navy)]">Detailed Trip Brochure & Day-by-Day Plan</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">Download complete inclusions, pricing, route & packing list in PDF format.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(true)}
                  className="px-4 py-2.5 rounded-full bg-[var(--sky)] text-white font-bold text-xs hover:bg-[var(--navy)] transition-colors shadow-sm inline-flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Download size={14} /> Get Itinerary PDF
                </button>
              </div>

              {/* Highlights */}
              {trip.highlights && trip.highlights.length > 0 && (
                <div className="bg-slate-50/80 rounded-3xl p-4 sm:p-8 border border-slate-200">
                  <h3 className="text-lg font-bold text-[var(--navy)] mb-4 flex items-center gap-2">
                    <Sparkles className="text-[var(--sun)]" size={20} /> Highlights
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {trip.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-[var(--sun)] shrink-0 mt-0.5" />
                        <span className="leading-snug">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* 2. Itinerary */}
            {trip.itinerary && trip.itinerary.length > 0 && (
              <>
                <hr className="border-[var(--border)]" />
                <section id="itinerary" className="itinerary-scroll-target">
                  <div className="flex items-center justify-center mb-6">
                    <h2 className="text-xl sm:text-3xl font-extrabold text-[var(--navy)]">Day Wise Itinerary</h2>
                    {/* <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{trip.duration}</span> */}
                  </div>

                  <div className="space-y-4">
                    {trip.itinerary.map((dayPlan) => (
                      <div
                        key={dayPlan.day}
                        className="bg-white rounded-2xl border border-slate-200 transition-all duration-300 shadow-[0_4px_10px_rgba(67,169,209,0.1)] hover:shadow-[0_10px_15px_rgba(67,169,209,0.1)] overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenDay(openDay === dayPlan.day ? null : dayPlan.day)}
                          className="w-full text-left p-3 sm:p-6 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <span className="px-3 py-2 rounded-md bg-[var(--sky-pale)] text-[var(--sky)] font-extrabold text-sm flex items-center justify-center shrink-0">
                              Day{dayPlan.day}
                            </span>
                            <span className="font-bold text-[var(--navy)] text-sm sm:text-base leading-snug">
                              {dayPlan.title}
                            </span>
                          </div>
                          {openDay === dayPlan.day ? (
                            <ChevronUp className="text-slate-400 shrink-0" size={20} />
                          ) : (
                            <ChevronDown className="text-slate-400 shrink-0" size={20} />
                          )}
                        </button>

                        <AnimatePresence>
                          {openDay === dayPlan.day && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600 space-y-3">
                                {dayPlan.activities.map((act, i) => (
                                  <div key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--sky)] mt-2 shrink-0" />
                                    <p className="leading-relaxed">{act}</p>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* 3. Inclusions & Exclusions */}
            {((trip.inclusions && trip.inclusions.length > 0) || (trip.exclusions && trip.exclusions.length > 0)) && (
              <>
                <hr className="border-[var(--border)]" />
                <section id="inclusions" className="itinerary-scroll-target">
                  <h2 className="text-xl sm:text-3xl font-extrabold text-[var(--navy)] mb-6">What&apos;s Included & Excluded</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Inclusions */}
                    {trip.inclusions && trip.inclusions.length > 0 && (
                      <div className="bg-emerald-50/50 rounded-3xl p-6 sm:p-7 border border-emerald-100 transition-all duration-300 shadow-[0_4px_10px_rgba(16,185,129,0.15)] hover:shadow-[0_10px_15px_rgba(16,185,129,0.15)]">
                        <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                          <CheckCircle2 className="text-emerald-600" size={18} /> Inclusions
                        </h3>
                        <ul className="space-y-3">
                          {trip.inclusions.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950/80">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Exclusions */}
                    {trip.exclusions && trip.exclusions.length > 0 && (
                      <div className="bg-rose-50/50 rounded-3xl p-6 sm:p-7 border border-rose-100 transition-all duration-300 shadow-[0_4px_10px_rgba(244,63,94,0.15)] hover:shadow-[0_10px_15px_rgba(244,63,94,0.15)]">
                        <h3 className="font-bold text-rose-900 mb-4 flex items-center gap-2">
                          <XCircle className="text-rose-600" size={18} /> Exclusions
                        </h3>
                        <ul className="space-y-3">
                          {trip.exclusions.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-950/80">
                              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
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


            {/* 4. Policy */}
            {trip.policies && trip.policies.length > 0 && (
              <>
                <hr className="border-[var(--border)]" />
                <section id="policy" className="itinerary-scroll-target">
                  <h2 className="text-xl sm:text-3xl font-extrabold text-[var(--navy)] mb-4 flex items-center gap-3">
                    <ShieldAlert className="text-slate-400" size={28} /> Policies
                  </h2>
                  <div className="bg-slate-100/50 rounded-3xl p-5 border border-slate-200 transition-all duration-300 shadow-[0_4px_10px_rgba(100,100,100,0.2)] hover:shadow-[0_10px_15px_rgba(100,100,100,0.2)]">
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
            <div className="fixed bottom-0 left-0 w-full z-40 lg:z-20 lg:sticky sticky-sidebar-offset bg-white lg:rounded-3xl px-4 sm:px-6 py-3 sm:py-4 lg:p-6 xl:p-7 border-t lg:border border-[var(--border)] lg:border-[var(--sky-pale)] transition-all duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] lg:shadow-[0_4px_10px_rgba(67,169,209,0.2)] lg:hover:shadow-[0_10px_15px_rgba(67,169,209,0.2)] flex flex-row lg:flex-col items-center lg:items-stretch justify-between lg:justify-start gap-3 lg:gap-0 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto no-scrollbar">
              <div className="lg:mb-5 lg:pb-5 lg:border-b border-[var(--border)] flex flex-col min-w-0 leading-none">
                <span className="line-through text-slate-400 text-[11px] sm:text-[12px] font-semibold decoration-rose-500/80 decoration-[1.5px] mb-1 leading-none">
                  {getCutPrice(displayPrice)}
                </span>
                <div className="flex items-baseline gap-1 leading-none">
                  <span className="text-[19px] sm:text-2xl lg:text-3xl font-black text-[var(--navy)] tracking-tight leading-none">
                    {displayPrice}
                  </span>
                  <span className="text-slate-500 font-bold text-[11px] sm:text-xs lg:text-sm leading-none">
                    / person
                  </span>
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

              {/* Dynamic Package Options strictly for Selected Date */}
              {dynamicPricingInfo.packages && dynamicPricingInfo.packages.length > 0 && (
                <div className="hidden lg:block bg-slate-50/90 rounded-2xl p-3.5 border border-slate-200/80 mb-5 space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Packages for {selectedDate}
                  </div>
                  <div className="space-y-1.5">
                    {dynamicPricingInfo.packages.map((pkg, i) => (
                      <div key={i} className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-700">{pkg.label}</span>
                        <span className="font-extrabold text-[var(--navy)]">{pkg.price.split(' ')[0]}</span>
                      </div>
                    ))}
                    {dynamicPricingInfo.doubleSharingRate > 0 &&
                    !dynamicPricingInfo.packages.some((p) => p.label.toLowerCase().includes('double')) && (
                      <div className="pt-1.5 border-t border-dashed border-slate-200 flex justify-between items-center text-[11px] text-amber-900">
                        <span>Double Sharing Room Add-on</span>
                        <span className="font-bold">+₹{dynamicPricingInfo.doubleSharingRate.toLocaleString('en-IN')} / person</span>
                      </div>
                    )}
                  </div>
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

              {/* Action Buttons */}
              <div className="w-[160px] lg:w-full space-y-2.5">
                <Link
                  href={`/book?trip=${trip.slug}&date=${encodeURIComponent(selectedDate)}&guests=${guests}`}
                  className="block w-full"
                >
                  <button className="glow-btn w-full inline-flex items-center justify-center gap-2 py-3 lg:py-3.5 rounded-full font-bold text-[13px] lg:text-sm">
                    Book Now <ArrowRight size={16} className="hidden lg:block" />
                  </button>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(true)}
                  className="hidden lg:inline-flex w-full items-center justify-center gap-2 py-2.5 rounded-full font-bold text-xs border border-slate-200 hover:border-[var(--sky)] hover:bg-[var(--sky-pale)] text-slate-700 hover:text-[var(--sky)] transition-colors cursor-pointer"
                >
                  <FileDown size={15} /> Download Itinerary PDF
                </button>

                <p className="hidden lg:block text-center text-[10px] text-slate-400 mt-1">
                  Instant confirmation • 100% Safe
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* PICTURES PERFECT MOMENTS - 3D CURVED PANORAMIC GALLERY SECTION */}
        {galleryImages.length > 0 && (
          <section id="gallery" className="itinerary-scroll-target mt-16 sm:mt-20 pt-8 sm:pt-12 border-t border-[var(--border)]">
            <PicturePerfectGallery
              images={galleryImages}
              tripTitle={trip.title}
              location={trip.location}
            />
          </section>
        )}

        {/* 1. DESTINATION-SPECIFIC REVIEWS SLIDER (COMES FIRST BEFORE RELATED TRIPS) */}
        {trip.reviews && trip.reviews.length > 0 && (
          <section id="reviews" className="itinerary-scroll-target mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-2">
                  <Star size={15} className="text-amber-400 fill-amber-400" />
                  <span>Real Feedback from Past {trip.title.replace(' Trip', '')} Batches</span>
                </div>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--navy)]">
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

        {/* 2. RELATED TRIPS SECTION (HORIZONTAL SLIDER ON MOBILE, GRID ON DESKTOP) */}
        {relatedTrips.length > 0 && (
          <section id="related-trips" className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-[var(--border)]">
            <div className="mb-8 sm:mb-10 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-2">
                <Compass size={15} className="text-[var(--sky)]" />
                <span>More Adventures To Explore</span>
              </div>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--navy)]">
                Related Trips You Might Love
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed mx-auto sm:mx-0">
                Discover more unforgettable getaways, scenic trails, and tribe journeys tailored for wanderers like you.
              </p>
            </div>

            {/* Mobile Horizontal Carousel / Desktop 3-Column Grid */}
            <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 pb-4 md:pb-0">
              {relatedTrips.map((relatedTrip) => (
                <div
                  key={relatedTrip.slug}
                  className="min-w-[285px] max-w-[320px] w-[82vw] sm:w-auto md:min-w-0 md:max-w-none md:w-auto snap-start h-full flex flex-col shrink-0 md:shrink"
                >
                  <TripCard trip={relatedTrip} />
                </div>
              ))}
            </div>

            {/* Centered Glow Button Below Cards (Same as Home Page) */}
            <div className="mt-8 sm:mt-10 flex justify-center">
              <Link
                href="/upcoming-trips"
                className="glow-btn inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold rounded-full shadow-lg !text-white cursor-pointer"
              >
                <span>View All Upcoming Trips</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>
        )}

        {/* FULLSCREEN PHOTO LIGHTBOX MODAL (CLEAN WITHOUT CAPTION TEXT) */}
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
                <div className="relative w-full h-[68vh] sm:h-[80vh] max-w-4xl">
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

              {/* Clean Bottom Hint */}
              <div
                className="w-full max-w-xl text-center z-10 pb-2"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-white/40 text-xs">
                  Click anywhere outside or press Esc to close • Use arrow keys to navigate
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LEAD CAPTURE MODAL FOR PDF DOWNLOAD */}
        <AnimatePresence>
          {isPdfModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
              onClick={() => setIsPdfModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 15 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(false)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--sky-pale)] text-[var(--sky)] flex items-center justify-center mx-auto mb-3">
                    <FileDown size={24} />
                  </div>
                  <h3 className="text-xl font-extrabold text-[var(--navy)]">
                    Download Itinerary PDF
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Enter your details to instantly get the full {trip.title} day-by-day plan & inclusions.
                  </p>
                </div>

                {pdfSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center space-y-3"
                  >
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <Check size={28} />
                    </div>
                    <h4 className="font-bold text-base text-[var(--navy)]">PDF Downloaded Successfully!</h4>
                    <p className="text-xs text-slate-500">Your itinerary PDF has started downloading. See you on the trip!</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleDownloadPdfSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          required
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={pdfFormData.fullName}
                          onChange={(e) => setPdfFormData({ ...pdfFormData, fullName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* WhatsApp Phone */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        WhatsApp / Contact Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          required
                          type="tel"
                          placeholder="+91 99758 22023"
                          value={pdfFormData.phone}
                          onChange={(e) => setPdfFormData({ ...pdfFormData, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          required
                          type="email"
                          placeholder="rahul@gmail.com"
                          value={pdfFormData.email}
                          onChange={(e) => setPdfFormData({ ...pdfFormData, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {pdfError && (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
                        {pdfError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isGeneratingPdf}
                      className="glow-btn w-full py-3.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 mt-2 cursor-pointer"
                    >
                      {isGeneratingPdf ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Generating Itinerary PDF...</span>
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          <span>Download PDF Now</span>
                        </>
                      )}
                    </button>

                    <p className="text-center text-[10px] text-slate-400 mt-2">
                      🔒 Your details are 100% safe with Travel Tribes. No spam.
                    </p>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

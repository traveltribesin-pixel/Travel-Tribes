'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock3, CalendarDays, CheckCircle2, XCircle, Users, Star, ChevronDown, ChevronUp, ArrowRight, Backpack, ShieldAlert } from 'lucide-react'
import type { Trip } from '@/lib/travel-data'

export function TripContent({ trip }: { trip: Trip }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [guests, setGuests] = useState(2)
  const [openDay, setOpenDay] = useState<number | null>(1)
  const [selectedDate, setSelectedDate] = useState(trip.date)
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)

  // Scrollspy logic
  useEffect(() => {
    const sections = ['overview', 'itinerary', 'inclusions', 'carry', 'policy']
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
  }, [])

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 aspect-[3/2] md:aspect-[24/9] overflow-hidden rounded-3xl mb-8">
          <div className="col-span-1 md:col-span-3 relative h-full group overflow-hidden">
            <Image
              src={trip.image}
              alt={trip.alt}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="hidden md:flex flex-col gap-1 col-span-1 h-full">
            {trip.gallery?.slice(0, 2).map((img, idx) => (
              <div key={idx} className="relative flex-1 overflow-hidden group">
                <Image src={img.image} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            )) || (
                <div className="relative flex-1 overflow-hidden group">
                  <Image src={trip.image} alt={trip.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              )}
          </div>
        </div>

        {/* 2. Title & Metadata */}
        <div>
          <div className="flex items-center gap-2 text-[var(--sky)] font-bold text-xs tracking-wider uppercase mb-1">
            <MapPin size={14} />
            <span>{trip.location}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif text-[var(--navy)] mb-3 leading-tight">
            {trip.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium text-sm">
            <span className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              <Clock3 size={16} className="text-[var(--sky)]" /> {trip.duration}
            </span>
            <span className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              <CalendarDays size={16} className="text-[var(--sky)]" /> {trip.date}
            </span>
            <span className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
              <Users size={16} className="text-[var(--sky)]" /> {trip.spots}
            </span>
          </div>
        </div>
      </section>

      {/* Sticky Tabs */}
      <div className="sticky top-[68px] min-[560px]:top-[78px] z-10 bg-[#f7fbfd]/95 backdrop-blur-md border-y border-[var(--border)] shadow-sm">
        <div id="tabs-container" className="max-w-[1160px] mx-auto px-6 lg:px-8 flex gap-8 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'itinerary', label: 'Itinerary' },
            { id: 'inclusions', label: 'Inclusive/Exclusive' },
            { id: 'carry', label: 'Things to Carry' },
            { id: 'policy', label: 'Policy' }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => scrollTo(tab.id)}
              className={`py-4 px-2 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors relative ${activeTab === tab.id ? 'text-[var(--sky)]' : 'text-slate-500 hover:text-[var(--navy)]'
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
              <h2 className="text-3xl font-serif text-[var(--navy)] mb-4">Overview</h2>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-8">
                {trip.description} This carefully curated journey takes you through the heart of {trip.location}, offering a perfect blend of adventure, culture, and relaxation.
              </p>

              {trip.highlights && (
                <div className="bg-white rounded-3xl p-8 border border-[var(--sky-pale)] hover:border-[var(--sky)] transition-all duration-300 shadow-[0_4px_10px_rgba(67,169,209,0.2)] hover:shadow-[0_10px_15px_rgba(67,169,209,0.2)]">
                  <h3 className="text-xl font-serif text-[var(--navy)] mb-4">Trip Highlights</h3>
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
            </section>

            <hr className="border-[var(--border)]" />

            {/* 4. Detailed Itinerary (Accordion) */}
            <section id="itinerary" className="scroll-mt-40">
              <h2 className="text-3xl font-serif text-[var(--navy)] mb-4">Detailed Itinerary</h2>
              <div className="space-y-4">
                {trip.itinerary?.map((day, idx) => {
                  const isOpen = openDay === day.day
                  return (
                    <div key={idx} className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? 'border-[var(--sky)] shadow-[0_4px_15px_rgba(67,169,209,0.2)]' : 'border-[var(--sky-pale)] hover:border-[var(--sky)] shadow-[0_4px_10px_rgba(67,169,209,0.2)] hover:shadow-[0_10px_15px_rgba(67,169,209,0.2)]'}`}>
                      <button
                        onClick={() => setOpenDay(isOpen ? null : day.day)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                          <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-colors w-fit ${isOpen ? 'bg-[var(--sky)] text-white' : 'bg-[var(--sky-pale)] text-[var(--sky)]'}`}>
                            Day {day.day}
                          </span>
                          <span className={`text-xl font-serif transition-colors ${isOpen ? 'text-[var(--navy)]' : 'text-slate-700'}`}>
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

            <hr className="border-[var(--border)]" />

            {/* 5. Inclusions & Exclusions */}
            <section id="inclusions" className="scroll-mt-40">
              <h2 className="text-3xl font-serif text-[var(--navy)] mb-4">Inclusive & Exclusive</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Included */}
                <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100 transition-all duration-300 shadow-[0_4px_10px_rgba(100,100,100,0.2)] hover:shadow-[0_10px_15px_rgba(100,100,100,0.2)]">
                  <h3 className="text-lg font-serif text-[var(--navy)] mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-500" size={20} /> What's Included
                  </h3>
                  <ul className="space-y-4">
                    {trip.inclusions?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[14px] text-slate-600">
                        <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Excluded */}
                <div className="bg-rose-50/50 rounded-3xl p-8 border border-rose-100 transition-all duration-300 shadow-[0_4px_10px_rgba(100,100,100,0.2)] hover:shadow-[0_10px_15px_rgba(100,100,100,0.2)]">
                  <h3 className="text-lg font-serif text-[var(--navy)] mb-4 flex items-center gap-2">
                    <XCircle className="text-rose-400" size={20} /> What's Excluded
                  </h3>
                  <ul className="space-y-4">
                    {trip.exclusions?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[14px] text-slate-600">
                        <XCircle size={18} className="text-rose-400 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <hr className="border-[var(--border)]" />

            {/* 6. Things to Carry */}
            <section id="carry" className="scroll-mt-40">
              <h2 className="text-3xl font-serif text-[var(--navy)] mb-4 flex items-center gap-3">
                <Backpack className="text-[var(--sun)]" size={28} /> Things to Carry
              </h2>
              <div className="bg-white rounded-3xl p-8 border border-[var(--sky-pale)] hover:border-[var(--sky)] transition-all duration-300 shadow-[0_4px_10px_rgba(67,169,209,0.2)] hover:shadow-[0_10px_15px_rgba(67,169,209,0.2)]">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {trip.thingsToCarry?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[14px] text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-[var(--sun)] mt-[7px] shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <hr className="border-[var(--border)]" />

            {/* 7. Policy */}
            <section id="policy" className="scroll-mt-40">
              <h2 className="text-3xl font-serif text-[var(--navy)] mb-4 flex items-center gap-3">
                <ShieldAlert className="text-slate-400" size={28} /> Policies
              </h2>
              <div className="bg-slate-100/50 rounded-3xl p-8 border border-slate-200 transition-all duration-300 shadow-[0_4px_10px_rgba(100,100,100,0.2)] hover:shadow-[0_10px_15px_rgba(100,100,100,0.2)]">
                <ul className="space-y-4">
                  {trip.policies?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[14px] text-slate-600">
                      <div className="w-2 h-2 rounded-full bg-slate-400 mt-[7px] shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

          </div>

          {/* Right Column / Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-[160px] bg-white rounded-3xl p-8 border border-[var(--sky-pale)] hover:border-[var(--sky)] transition-all duration-300 shadow-[0_4px_10px_rgba(67,169,209,0.2)] hover:shadow-[0_10px_15px_rgba(67,169,209,0.2)]">
              <div className="mb-6 pb-6 border-b border-[var(--border)]">
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Starting from</span>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-serif text-[var(--navy)]">{trip.price}</span>
                  <span className="text-slate-500 font-medium pb-1 text-sm">/ person</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {/* Date Selector */}
                <div className="relative">
                  <div
                    onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                    className="border border-[var(--border)] rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-[var(--sky)] transition-colors group"
                  >
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Select Date</div>
                      <div className="font-medium text-[var(--navy)] text-sm">{selectedDate}</div>
                    </div>
                    <ChevronDown size={18} className={`text-slate-300 group-hover:text-[var(--sky)] transition-all ${isDateDropdownOpen ? 'rotate-180 text-[var(--sky)]' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {isDateDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[var(--border)] shadow-[0_4px_20px_rgba(67,169,209,0.08)] overflow-hidden z-20"
                      >
                        {[trip.date, 'Nov 12–16, 2026', 'Dec 05–09, 2026', 'Jan 15–19, 2027'].map((d, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setSelectedDate(d);
                              setIsDateDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm hover:bg-[var(--sky-pale)] hover:text-[var(--sky)] transition-colors ${selectedDate === d ? 'bg-[var(--sky-pale)] text-[var(--sky)] font-medium' : 'text-slate-600'}`}
                          >
                            {d}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Guests Selector */}
                <div className="border border-[var(--border)] rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Guests</div>
                    <div className="font-medium text-[var(--navy)] text-sm">{guests} People</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full bg-[var(--sky-pale)] flex items-center justify-center text-[var(--sky)] hover:bg-[var(--sky)] hover:text-white transition-colors">-</button>
                    <button onClick={() => setGuests(guests + 1)} className="w-8 h-8 rounded-full bg-[var(--sky-pale)] flex items-center justify-center text-[var(--sky)] hover:bg-[var(--sky)] hover:text-white transition-colors">+</button>
                  </div>
                </div>
              </div>

              {/* Animated Button */}
              <Link href={`/contact?trip=${trip.slug}`} className="block w-full">
                <button className="glow-btn w-full inline-flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm">
                  Continue Booking <ArrowRight size={16} />
                </button>
              </Link>

              <p className="text-center text-[11px] text-slate-400 mt-4">
                You won't be charged yet.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Printer,
  Copy,
  Check,
  PhoneCall,
  Clock,
  MapPin,
  Car,
  Hotel,
  Calendar,
  CheckCircle2,
  XCircle,
  Star,
  Globe,
  Sparkles,
  CreditCard,
  ShieldCheck,
  Compass,
  ArrowRight,
  ChevronDown,
  Navigation,
  X
} from 'lucide-react'
import {
  DEFAULT_POINTS_TO_BE_NOTED,
  DEFAULT_WHY_TRAVEL_TRIBES,
  DEFAULT_BANK_ACCOUNT
} from '@/lib/curated-itinerary-constants'
import type { CuratedItinerary } from '@/lib/curated-itinerary-constants'

interface CuratedItineraryViewProps {
  itinerary: CuratedItinerary
}

export function CuratedItineraryView({ itinerary }: CuratedItineraryViewProps) {
  const [copied, setCopied] = useState(false)
  const [collapsedDays, setCollapsedDays] = useState<Record<number, boolean>>({})
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null)

  const toggleDay = (dayNum: number) => {
    setCollapsedDays(prev => ({
      ...prev,
      [dayNum]: !prev[dayNum]
    }))
  }

  const isCustomized = itinerary.tripType === 'customized'
  const clientName = itinerary.clientName || 'Valued Traveller'

  const pointsToNote = itinerary.pointsToBeNoted && itinerary.pointsToBeNoted.length > 0
    ? itinerary.pointsToBeNoted
    : DEFAULT_POINTS_TO_BE_NOTED

  const whyTribes = itinerary.whyTravelTribes && itinerary.whyTravelTribes.length > 0
    ? itinerary.whyTravelTribes
    : DEFAULT_WHY_TRAVEL_TRIBES

  const bank = {
    ...DEFAULT_BANK_ACCOUNT,
    ...(itinerary.accountDetails || {})
  }

  // Price calculations for sticky bottom booking bar
  const quotation = itinerary.quotation || {}
  const startingPrice = isCustomized
    ? (quotation.totalPackagePrice || quotation.pricePerPerson || 41998)
    : (quotation.tripleSharingPrice || quotation.pricePerPerson || 20999)
  const tokenAdvance = quotation.advanceAmount || 5000

  // 4 trip images for showcase below the summary (robust collector from glimpses, highlights, or day photos)
  const summaryImages = (() => {
    const list: { label: string; url: string }[] = []
    if (itinerary.locationGlimpses && itinerary.locationGlimpses.length > 0) {
      itinerary.locationGlimpses.forEach(g => {
        if (g.image && list.length < 4) {
          list.push({ label: g.name || 'Trip Highlight', url: g.image })
        }
      })
    }
    if (list.length < 4 && itinerary.highlightImages && itinerary.highlightImages.length > 0) {
      itinerary.highlightImages.forEach((img, i) => {
        if (img && list.length < 4) {
          list.push({ label: `Scenic Glimpse ${i + 1}`, url: img })
        }
      })
    }
    if (list.length < 4 && itinerary.days && itinerary.days.length > 0) {
      itinerary.days.forEach(d => {
        if (d.image && list.length < 4) {
          list.push({ label: d.title ? d.title.split('➔')[0].trim() : `Day ${d.day}`, url: d.image })
        }
      })
    }
    const defaultFallbacks = [
      { label: 'Umiam Lake', url: '/image/Meghalaya/IMG_1034.JPEG' },
      { label: 'Laitlum Canyons', url: '/image/Meghalaya/IMG_0884.JPEG' },
      { label: 'Living Root Bridge', url: '/image/Meghalaya/IMG_0857.JPEG' },
      { label: 'Krang Suri Falls', url: '/image/Meghalaya/IMG_1048.JPEG' }
    ]
    while (list.length < 4) {
      list.push(defaultFallbacks[list.length])
    }
    return list.slice(0, 4)
  })()

  // Format concise stay text for compact summary: e.g. "Shillong (2N) • Cherrapunji (2N) • Dawki (1N)"
  const staySummaryText = (itinerary.cityWiseStay && itinerary.cityWiseStay.length > 0)
    ? itinerary.cityWiseStay
        .map(s => `${s.city.split('/')[0].trim()} (${s.nights.replace(/nights?/i, 'N').trim()})`)
        .join(' • ')
    : 'Shillong (2N) • Cherrapunji (2N) • Dawki (1N)'

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  // Pre-filled WhatsApp link
  const waPhone = '919975822023'
  const waBookingMessage = isCustomized
    ? `Hi Travel Tribes! 👋 I want to confirm my booking for the personalized itinerary prepared for *${clientName}* (${itinerary.title}). Please share the token payment details!`
    : `Hi Travel Tribes! 👋 I want to BOOK my seat for the *${itinerary.title}* group expedition (${itinerary.duration}). Please share the batch availability & payment details!`
  const waBookingUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waBookingMessage)}`

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 font-sans selection:bg-[#00b4d8] selection:text-slate-950 pb-24 sm:pb-28 print:bg-white print:p-0 print:pb-0">
      {/* Print CSS Stylesheet */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          html, body {
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 10pt !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .print-break-page {
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            margin-bottom: 0 !important;
          }
          .print-avoid-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .print-card {
            border: 1px solid #cbd5e1 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* Floating Web Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-2 sm:px-4 py-2 shadow-sm no-print">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <Image
              src="/image/Logoblack.png"
              alt="Travel Tribes"
              width={105}
              height={30}
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 truncate">
            <span className="text-slate-400 font-semibold">Itinerary:</span>
            <span className="font-bold text-[#0077b6] truncate">
              {itinerary.title} ({itinerary.duration})
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
              title="Copy shareable link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0077b6] hover:bg-[#005f92] text-white font-bold text-xs shadow-sm transition-all hover:scale-102"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PDF / Print</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container: Compact horizontal padding for mobile, generous on desktop */}
      <main className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8 print:p-0 print:m-0 print:max-w-none print:space-y-6">

        {/* ========================================================= */}
        {/* PAGE 1: INTRO / COVER PAGE (COMPACT HERO BANNER)          */}
        {/* ========================================================= */}
        <section className="print-break-page relative w-full min-h-[380px] sm:min-h-[440px] md:min-h-[480px] print:min-h-[960px] bg-slate-950 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between border border-slate-300/80">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={itinerary.bannerImage || '/image/Meghalaya/IMG_0857.JPEG'}
              alt={itinerary.title}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/85" />
          </div>

          {/* Top Logo */}
          <div className="relative z-10 pt-4 sm:pt-6 px-4 flex justify-center">
            <Image
              src="/image/Logowhite.png"
              alt="Travel Tribes"
              width={130}
              height={40}
              className="h-8 sm:h-10 w-auto object-contain drop-shadow-md"
            />
          </div>

          {/* Center Titles */}
          <div className="relative z-10 text-center px-3 py-4 sm:py-6 my-auto">
            {isCustomized && (
              <span className="inline-block px-3 py-0.5 rounded-full bg-[#ffde59] text-slate-950 text-xs sm:text-sm font-black tracking-widest uppercase mb-2 shadow-md">
                Exclusive Proposal For {clientName}
              </span>
            )}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#ffde59] tracking-tight uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {itinerary.title}
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-widest uppercase mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {itinerary.subtitle || (isCustomized ? 'CUSTOM GETAWAY' : 'BACKPACKING')}
            </p>
          </div>

          {/* Bottom Info & Route */}
          <div className="relative z-10 text-center pb-4 sm:pb-6">
            <div className="text-xl sm:text-2xl font-black text-[#ffde59] tracking-wide mb-0.5 drop-shadow-md">
              {itinerary.duration}
            </div>
            <div className="text-xs sm:text-sm font-bold text-white tracking-wide px-3 drop-shadow-md">
              {itinerary.routeText || `${itinerary.destination} Circuit`}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PAGE 2: TRIP SUMMARY, 4 TRIP IMAGES & HIGHLIGHTS          */}
        {/* ========================================================= */}
        <section className="print-break-page relative w-full bg-white text-slate-800 rounded-2xl shadow-md overflow-hidden border border-slate-200">
          <div className="p-3.5 sm:p-5 md:p-6 space-y-4">
            {/* Header with Black Logo */}
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] sm:text-xs font-bold text-[#0077b6] uppercase tracking-wider block">
                  Complete Expedition Blueprint
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-slate-950 uppercase tracking-tight mt-0.5">
                  Trip Summary & Overview
                </h2>
              </div>
              <Image
                src="/image/Logoblack.png"
                alt="Travel Tribes"
                width={105}
                height={30}
                className="h-6 sm:h-7 w-auto object-contain hidden sm:block"
              />
            </div>

            {/* 1. Trip Summary Details (Clean, open, spacious, stacked one below the other) */}
            <div className="py-2 space-y-3.5 sm:space-y-4 text-slate-800">
              {/* Total Duration */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0077b6] flex items-center justify-center shrink-0 border border-sky-100 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 text-sm sm:text-base leading-relaxed">
                  <span className="font-extrabold text-slate-950">Total Duration: </span>
                  <span className="font-semibold text-slate-800">{itinerary.duration}</span>
                </div>
              </div>

              {/* City-Wise Stay Breakdown */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100 mt-0.5">
                  <Hotel className="w-4 h-4" />
                </div>
                <div className="flex-1 text-sm sm:text-base leading-relaxed">
                  <span className="font-extrabold text-slate-950">Stay Details: </span>
                  <span className="font-semibold text-slate-800">
                    {itinerary.cityWiseStay && itinerary.cityWiseStay.length > 0
                      ? itinerary.cityWiseStay.map(s => `${s.city} (${s.nights})`).join('  •  ')
                      : staySummaryText}
                  </span>
                </div>
              </div>

              {/* Trip Route Circuit */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0077b6] flex items-center justify-center shrink-0 border border-sky-100 mt-0.5">
                  <Navigation className="w-4 h-4" />
                </div>
                <div className="flex-1 text-sm sm:text-base leading-relaxed">
                  <span className="font-extrabold text-slate-950">Trip Route: </span>
                  <span className="font-semibold text-slate-800">
                    {itinerary.routeText || `${itinerary.destination} Circuit`}
                  </span>
                </div>
              </div>

              {/* Allotted Vehicle */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100 mt-0.5">
                  <Car className="w-4 h-4" />
                </div>
                <div className="flex-1 text-sm sm:text-base leading-relaxed">
                  <span className="font-extrabold text-slate-950">Vehicle & Transit: </span>
                  <span className="font-semibold text-slate-800">
                    {itinerary.transport.vehicleType}
                    {itinerary.transport.note ? ` (${itinerary.transport.note})` : ''}
                  </span>
                </div>
              </div>

              {/* Pickup & Drop */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 border border-rose-100 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 text-sm sm:text-base leading-relaxed">
                  <span className="font-extrabold text-slate-950">Pickup & Drop: </span>
                  <span className="font-semibold text-slate-800">
                    {itinerary.transport.pickupDrop}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. 4 Trip Photos (Part of Summary, NO separate heading, NO text overlay on images) */}
            <div className="pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {summaryImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveLightboxImage(img.url)}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200/90 shadow-xs group cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <Image
                      src={img.url}
                      alt={img.label || `Trip Image ${idx + 1}`}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Structured Trip Highlights */}
            <div className="pt-1 border-t border-slate-200/80">
              <div className="flex items-center gap-1.5 mb-2">
                <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-wide">
                  Key Trip Highlights
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {itinerary.highlights.slice(0, 12).map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2 transition-colors hover:bg-sky-50/50"
                  >
                    <div className="w-5 h-5 rounded-md bg-[#0077b6] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      {idx + 1}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-800 font-medium leading-snug">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: DAY-WISE DETAILED ITINERARY (LIGHT THEME)      */}
        {/* ========================================================= */}
        <div className="space-y-4 sm:space-y-5">
          <div className="flex items-center justify-between px-1 no-print">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#0077b6]" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
                Day-by-Day Detailed Schedule
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                const allCollapsed = itinerary.days.every(d => collapsedDays[d.day])
                if (allCollapsed) {
                  setCollapsedDays({}) // Expand all
                } else {
                  const newCollapsed: Record<number, boolean> = {}
                  itinerary.days.forEach(d => { newCollapsed[d.day] = true })
                  setCollapsedDays(newCollapsed) // Collapse all
                }
              }}
              className="text-xs font-bold text-[#0077b6] hover:text-[#005f92] hover:underline flex items-center gap-1 transition-colors"
            >
              <span>{itinerary.days.every(d => collapsedDays[d.day]) ? 'Expand All Days' : 'Collapse All Days'}</span>
            </button>
          </div>

          {itinerary.days.map((day) => {
            const dayImage = day.image || (day.photos && day.photos[0]) || '/image/Meghalaya/IMG_1034.JPEG'
            const stayDisplay = day.stayHotel
              ? `${day.stayHotel}${day.stayCity ? `, ${day.stayCity}` : ''}`
              : (day.stay || 'Standard Hotel Stay')
            const mealsText = day.meals && day.meals.length > 0 ? day.meals.join(' & ') : 'Not Included'
            const isDayOpen = !collapsedDays[day.day]

            return (
              <section
                key={day.day}
                className="print-break-page relative w-full bg-white text-slate-800 rounded-2xl shadow-md overflow-hidden border border-slate-200 transition-all"
              >
                {/* Day Header Bar: Clickable Dropdown Trigger with Full Complete Heading */}
                <button
                  type="button"
                  onClick={() => toggleDay(day.day)}
                  className="w-full bg-[#0077b6] hover:bg-[#00689f] p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-xs text-left cursor-pointer transition-colors"
                  aria-expanded={isDayOpen}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <span className="px-3 py-1 rounded-full bg-white/20 border border-white/35 text-white font-black text-xs sm:text-sm shrink-0 shadow-xs">
                      Day {day.day}
                    </span>
                    <h3 className="text-xs sm:text-base font-extrabold text-white uppercase tracking-tight break-words leading-snug drop-shadow-xs">
                      {day.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {day.date && (
                      <span className="text-[11px] sm:text-xs font-semibold text-white/90 bg-white/15 px-2 py-0.5 rounded-md hidden sm:inline">
                        {day.date}
                      </span>
                    )}
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
                      <ChevronDown
                        className={`w-4 h-4 text-white transition-transform duration-200 ${
                          isDayOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Day Content: Collapsible on web, always visible in print */}
                <div
                  className={`p-3.5 sm:p-6 md:p-7 flex-col md:flex-row gap-4 md:gap-6 items-start ${
                    isDayOpen ? 'flex' : 'hidden print:flex'
                  }`}
                >
                  {/* Left Column: Schedule, Distance, Meals & Stay */}
                  <div className="flex-1 w-full space-y-3">
                    {/* Date Subtitle */}
                    {day.date && (
                      <div className="text-xs sm:text-sm font-black text-amber-700 tracking-wide flex items-center gap-1.5 uppercase">
                        <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{day.date}</span>
                      </div>
                    )}

                    {/* Approx Travel Distance in km & hrs */}
                    {day.travelDistance && (
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-xs font-bold text-sky-900">
                        <Car className="w-3.5 h-3.5 text-[#0077b6] shrink-0" />
                        <span>Approx. Travel Distance: {day.travelDistance}</span>
                      </div>
                    )}

                    {/* Bullet Points of Schedule */}
                    <div className="space-y-1.5 pt-1">
                      <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                        {(day.points && day.points.length > 0
                          ? day.points
                          : day.description ? day.description.split('. ').filter(Boolean) : []
                        ).map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-[#00b4d8] font-black text-base shrink-0 leading-none mt-0.5">•</span>
                            <span>{point.endsWith('.') ? point : `${point}.`}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Meals & Stay Block */}
                    <div className="pt-3 border-t border-slate-200 space-y-1.5">
                      {/* Meals */}
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <span className="font-bold text-[#0077b6] uppercase tracking-wide shrink-0">Meals:</span>
                        <span className="font-semibold text-slate-900">{mealsText}</span>
                      </div>

                      {/* Stay: Hotel name, city */}
                      <div className="flex items-start gap-2 text-xs sm:text-sm">
                        <span className="font-bold text-amber-700 uppercase tracking-wide shrink-0">Stay:</span>
                        <span className="font-bold text-slate-950">{stayDisplay}</span>
                      </div>
                    </div>
                  </div>

                  {/* Image: Right side on desktop / Below Stay on mobile */}
                  <div className="w-full md:w-5/12 shrink-0">
                    <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                      <Image
                        src={dayImage}
                        alt={`Day ${day.day} - ${day.title}`}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )
          })}
        </div>

        {/* ========================================================= */}
        {/* SECTION 4: HOTELS TABLE (LIGHT THEME)                     */}
        {/* ========================================================= */}
        <section className="print-break-page relative w-full bg-white text-slate-800 rounded-2xl shadow-md overflow-hidden border border-slate-200">
          <div className="p-3.5 sm:p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Hotel className="w-5 h-5 text-amber-600" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
                  Accommodations & Hotels
                </h2>
              </div>
              <span className="text-xs font-bold text-[#0077b6] uppercase">
                Verified Stays
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600">
              Handpicked properties verified for hygiene, scenic surroundings, and top comfort.
            </p>

            {/* Structured Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#00b4d8] text-slate-950 font-black uppercase text-[11px] tracking-wider">
                    <th className="py-2.5 px-3 sm:px-4">City / Destination</th>
                    <th className="py-2.5 px-3 sm:px-4">Hotel / Stay Name</th>
                    <th className="py-2.5 px-3 sm:px-4">Hotel Category</th>
                    <th className="py-2.5 px-3 sm:px-4">Stay Duration</th>
                    <th className="py-2.5 px-3 sm:px-4 hidden sm:table-cell">Room Type & Inclusions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {itinerary.hotels.map((hotel, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 sm:px-4 font-bold text-[#0077b6]">{hotel.city}</td>
                      <td className="py-3 px-3 sm:px-4 font-bold text-slate-950">{hotel.hotelName}</td>
                      <td className="py-3 px-3 sm:px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold">
                          {hotel.starRating || 'Comfort Stay'}
                        </span>
                      </td>
                      <td className="py-3 px-3 sm:px-4 font-semibold text-slate-700">{hotel.nights}</td>
                      <td className="py-3 px-3 sm:px-4 text-xs text-slate-600 hidden sm:table-cell">
                        {hotel.roomType || 'Standard Room with Breakfast'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: INCLUSIONS & EXCLUSIONS (LIGHT THEME)          */}
        {/* ========================================================= */}
        <section className="print-break-page grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 print:grid-cols-2">
          {/* Inclusions */}
          <div className="bg-white text-slate-900 rounded-2xl shadow-md overflow-hidden border border-slate-200 p-4 sm:p-6 space-y-3">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <h3 className="text-lg sm:text-xl font-black text-slate-950 uppercase tracking-wide">
                Inclusions
              </h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
              {itinerary.inclusions.map((inc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="bg-white text-slate-900 rounded-2xl shadow-md overflow-hidden border border-slate-200 p-4 sm:p-6 space-y-3">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
              <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <h3 className="text-lg sm:text-xl font-black text-slate-950 uppercase tracking-wide">
                Exclusions
              </h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
              {itinerary.exclusions.map((exc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: COSTING & COMMERCIALS (LIGHT THEME)            */}
        {/* ========================================================= */}
        <section className="print-break-page relative w-full bg-white text-slate-900 rounded-2xl shadow-md overflow-hidden flex flex-col justify-between border border-slate-200">
          <div className="p-3.5 sm:p-6 md:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[11px] sm:text-xs font-bold text-[#0077b6] uppercase tracking-wider block">
                  Official Package Commercials
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mt-0.5">
                  {isCustomized ? 'Customized Trip Quotation' : 'Pricing Per Person'}
                </h2>
              </div>
              <div className="text-xs text-amber-700 font-bold">
                +5% GST Applicable
              </div>
            </div>

            {/* Pricing Cards */}
            {!isCustomized ? (
              <div className="space-y-4 max-w-xl mx-auto">
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  {/* Triple Sharing */}
                  <div className="border-2 border-slate-200 rounded-2xl overflow-hidden text-center bg-slate-50/70 shadow-xs">
                    <div className="bg-[#ffde59] text-slate-950 font-black text-xs sm:text-sm py-2 uppercase tracking-wide">
                      TRIPLE SHARING
                    </div>
                    <div className="p-3 sm:p-4">
                      <div className="text-2xl sm:text-3xl font-black text-slate-950">
                        ₹ {Number(itinerary.quotation.tripleSharingPrice || 20999).toLocaleString('en-IN')}/-
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        ({itinerary.departureCity || 'Guwahati to Guwahati'})
                      </div>
                      <div className="text-[10px] text-amber-700 font-bold mt-1">
                        +5% GST Extra
                      </div>
                    </div>
                  </div>

                  {/* Double Sharing */}
                  <div className="border-2 border-slate-200 rounded-2xl overflow-hidden text-center bg-slate-50/70 shadow-xs">
                    <div className="bg-[#ffde59] text-slate-950 font-black text-xs sm:text-sm py-2 uppercase tracking-wide">
                      DOUBLE SHARING
                    </div>
                    <div className="p-3 sm:p-4">
                      <div className="text-2xl sm:text-3xl font-black text-slate-950">
                        ₹ {Number(itinerary.quotation.doubleSharingPrice || 22999).toLocaleString('en-IN')}/-
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        ({itinerary.departureCity || 'Guwahati to Guwahati'})
                      </div>
                      <div className="text-[10px] text-amber-700 font-bold mt-1">
                        +5% GST Extra
                      </div>
                    </div>
                  </div>
                </div>

                {/* Festive Pricing If Available */}
                {itinerary.quotation.xmasTripleSharingPrice && (
                  <div className="space-y-1.5 pt-1">
                    <h4 className="text-center text-xs font-black text-slate-900 uppercase tracking-wider">
                      Christmas & New Year Special Batch Pricing
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
                      <div className="border border-slate-200 rounded-xl p-2.5 text-center bg-slate-50">
                        <span className="text-[10px] text-slate-500 font-bold block">Triple Sharing</span>
                        <span className="text-base sm:text-lg font-black text-slate-950">
                          ₹ {Number(itinerary.quotation.xmasTripleSharingPrice).toLocaleString('en-IN')}/-
                        </span>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-2.5 text-center bg-slate-50">
                        <span className="text-[10px] text-slate-500 font-bold block">Double Sharing</span>
                        <span className="text-base sm:text-lg font-black text-slate-950">
                          ₹ {Number(itinerary.quotation.xmasDoubleSharingPrice || 24499).toLocaleString('en-IN')}/-
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Customized Trip Costing */
              <div className="max-w-md mx-auto text-center p-4 sm:p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 shadow-xs">
                <span className="text-xs text-amber-700 font-bold uppercase">Proposal For {clientName}</span>
                <div className="text-3xl sm:text-4xl font-black text-slate-950 mt-1">
                  ₹ {Number(itinerary.quotation.totalPackagePrice || 0).toLocaleString('en-IN')}/-
                </div>
                {itinerary.quotation.pricePerPerson && (
                  <p className="text-xs text-slate-600 mt-1">
                    (₹ {Number(itinerary.quotation.pricePerPerson).toLocaleString('en-IN')}/- per person for {itinerary.quotation.numberOfGuests || 'your group'})
                  </p>
                )}
              </div>
            )}

            {/* Token Advance Note & BOOK NOW CTA */}
            <div className="text-center space-y-3 pt-1">
              <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50 border border-amber-300 max-w-lg mx-auto">
                <p className="text-xs sm:text-sm text-amber-950 font-black leading-snug">
                  Confirm your booking with just ₹{Number(itinerary.quotation.advanceAmount || 5000).toLocaleString('en-IN')}/- token per seat and pay the rest later according to payment policy!
                </p>
              </div>

              <div className="no-print pt-2">
                <a
                  href={waBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 sm:px-14 py-3 rounded-full bg-[#ffde59] hover:bg-amber-300 text-slate-950 font-black text-lg sm:text-2xl uppercase tracking-wider shadow-md transition-transform hover:scale-105 active:scale-95"
                >
                  BOOK NOW 👆
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: OFFICIAL BANK ACCOUNT DETAILS (LIGHT THEME)     */}
        {/* ========================================================= */}
        <section className="print-break-page relative w-full bg-white text-slate-900 rounded-2xl shadow-md overflow-hidden border border-slate-200">
          <div className="p-3.5 sm:p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#0077b6]" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
                  Official Bank & Payment Details
                </h2>
              </div>
              <span className="text-xs font-bold text-emerald-700 uppercase">
                Direct NEFT / IMPS / UPI
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600">
              Please transfer the booking token advance of ₹{Number(itinerary.quotation.advanceAmount || 5000).toLocaleString('en-IN')}/- to the official Travel Tribes current account below.
            </p>

            {/* Bank Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Account Details Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="text-xs font-bold text-[#0077b6] uppercase">Bank Account Information</div>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Account / Beneficiary Name:</span>
                    <strong className="text-slate-950 font-bold">{bank.beneficiaryName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Bank Name:</span>
                    <strong className="text-slate-900">{bank.bankName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Account Number:</span>
                    <strong className="text-slate-950 font-mono text-base sm:text-lg font-black tracking-wider block mt-0.5">
                      {bank.accountNumber}
                    </strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <div>
                      <span className="text-slate-500 block text-[11px]">IFSC Code:</span>
                      <strong className="text-slate-950 font-mono font-bold">{bank.ifscCode}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px]">Account Type:</span>
                      <strong className="text-slate-900">{bank.accountType}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* UPI & Verification Note Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-xs font-bold text-emerald-700 uppercase">UPI Payment Option</div>
                  <div className="mt-2 p-2.5 rounded-lg bg-white border border-emerald-200">
                    <span className="text-[11px] text-slate-500 block">Official UPI VPA:</span>
                    <span className="text-sm sm:text-base font-black text-emerald-700 font-mono">
                      {bank.upiId}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-sky-50 border border-sky-200 text-xs text-sky-950 leading-snug">
                  <strong>Verification Step:</strong> After transferring the token, please share the payment screenshot on WhatsApp at <strong>+91 9975822023</strong> to receive your instant booking voucher.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 8: REMAINING DETAILS (GUIDELINES & POLICIES)       */}
        {/* ========================================================= */}
        <section className="print-break-page bg-white text-slate-800 rounded-2xl shadow-md overflow-hidden border border-slate-200 p-4 sm:p-6 md:p-8 space-y-3">
          <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg sm:text-xl font-black text-slate-950 uppercase tracking-wide">
              Points To Be Noted (Guidelines)
            </h2>
          </div>

          <ol className="space-y-1.5 text-[11px] sm:text-xs text-slate-700 leading-relaxed">
            {pointsToNote.slice(0, 15).map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-bold text-[#0077b6] shrink-0">{idx + 1}.</span>
                <span>{pt}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ========================================================= */}
        {/* SECTION 9: WHY TRAVEL TRIBES & CANCELLATION (LIGHT THEME)  */}
        {/* ========================================================= */}
        <section className="print-break-page grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 print:grid-cols-2">
          {/* Why Travel Tribes */}
          <div className="bg-white text-slate-800 rounded-2xl shadow-md overflow-hidden border border-slate-200 p-4 sm:p-6 space-y-3">
            <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-wider pb-2 border-b border-slate-200">
              Why Travel Tribes
            </h3>
            <div className="space-y-2.5 text-xs">
              {whyTribes.map((item, idx) => (
                <div key={idx}>
                  <strong className="text-slate-950 block">{item.title}</strong>
                  <span className="text-slate-600 leading-snug block">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-white text-slate-800 rounded-2xl shadow-md overflow-hidden border border-slate-200 p-4 sm:p-6 space-y-3">
            <h3 className="text-base sm:text-lg font-black text-slate-950 uppercase tracking-wider pb-2 border-b border-slate-200">
              Cancellation Policy
            </h3>
            <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <p>• The booking token amount is non-refundable upon cancellation.</p>
              <p>• <strong>50% Deducted</strong> if cancelled between 30 to 15 days before the departure.</p>
              <p>• <strong>100% Deducted (No Refund)</strong> if cancelled within 14 days of departure.</p>
              <p>• In case of company cancellation due to weather/landslides, 100% refund or free date shift is offered.</p>
              <p>• Date rescheduling must be informed at least 15 days prior to the original departure batch.</p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 10: CONNECT WITH US / BACK COVER (LIGHT THEME)    */}
        {/* ========================================================= */}
        <section className="print-break-page relative w-full bg-white text-slate-900 rounded-2xl shadow-md overflow-hidden border border-slate-200 p-4 sm:p-8 flex flex-col items-center justify-between text-center space-y-5">
          <div>
            <Image
              src="/image/Logoblack.png"
              alt="Travel Tribes"
              width={160}
              height={50}
              className="h-10 sm:h-12 w-auto object-contain mx-auto mb-1"
            />
            <p className="font-extrabold text-slate-950 text-xs sm:text-sm tracking-wide">
              Tribe Hai Toh Vibe Hai
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <p className="text-xs sm:text-sm font-bold text-[#0077b6] leading-relaxed">
              This trip can be customized for private groups (Family, Corporate, Friends etc.) & quotation will be shared according to your requirement. For customization you can get in touch with us.
            </p>
          </div>

          <div className="w-full max-w-md space-y-3">
            <h3 className="text-xl sm:text-2xl font-black text-[#00b4d8] tracking-wider uppercase">
              CONNECT WITH US
            </h3>

            <div className="grid grid-cols-2 gap-2.5 text-xs sm:text-sm font-bold">
              {/* Google Review */}
              <a
                href="https://g.page/r/traveltribes"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full bg-white text-slate-900 border border-slate-300 shadow-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors"
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <span>Google Review</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/traveltribes.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full bg-slate-950 text-white shadow-xs flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-colors"
              >
                <svg className="w-4 h-4 text-rose-400 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@traveltribes.in</span>
              </a>

              {/* Visit Website */}
              <Link
                href="/"
                className="p-2.5 sm:p-3 rounded-full bg-[#0077b6] text-white shadow-xs flex items-center justify-center gap-1.5 hover:bg-[#0096c7] transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Website</span>
              </Link>

              {/* WhatsApp Call */}
              <a
                href="https://wa.me/919975822023"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full bg-[#10b981] text-white shadow-xs flex items-center justify-center gap-1.5 hover:bg-emerald-600 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>9975822023</span>
              </a>
            </div>
          </div>

          {/* Group Photo */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden shadow-xs border border-slate-200 mt-1">
            <Image
              src="/image/Meghalaya/IMG_0857.JPEG"
              alt="Travel Tribes Community"
              fill
              className="object-cover"
            />
          </div>
        </section>
      </main>

      {/* Sticky Bottom Booking Bar with Starting Price & Book Now Button */}
      <aside
        aria-label="Booking Bar"
        className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_24px_rgba(0,0,0,0.09)] py-2 sm:py-2.5 px-3 sm:px-6 no-print"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Price & Plan Information */}
          <div className="flex flex-col justify-center min-w-0">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block leading-none">
              {isCustomized ? 'Proposal Quote' : 'Starting From'}
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                ₹{Number(startingPrice).toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500">
                {isCustomized
                  ? (itinerary.quotation?.numberOfGuests ? `(${itinerary.quotation.numberOfGuests})` : 'Total')
                  : '/ person'}
              </span>
            </div>
            {tokenAdvance && (
              <span className="text-[10px] text-amber-700 font-bold leading-none hidden xs:inline-block">
                Token: ₹{Number(tokenAdvance).toLocaleString('en-IN')}/- only
              </span>
            )}
          </div>

          {/* Action Buttons: Contact + Book Now */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/919975822023"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>Questions?</span>
            </a>

            <a
              href={waBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl bg-[#ffde59] hover:bg-amber-300 active:scale-98 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
            >
              <PhoneCall className="w-4 h-4 fill-current shrink-0" />
              <span>Book Now</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Full-Screen Lightbox Modal for Trip Visuals */}
      {activeLightboxImage && (
        <div
          onClick={() => setActiveLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 cursor-pointer no-print animate-in fade-in duration-200"
        >
          <div
            className="relative max-w-3xl w-full max-h-[85vh] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white transition-colors"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full">
              <Image
                src={activeLightboxImage}
                alt="Trip Visual Preview"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

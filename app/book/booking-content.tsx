'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarDays,
  Users,
  MapPin,
  Clock3,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  PhoneCall,
  Download,
  Share2,
  ChevronDown,
  Sparkles,
  CreditCard,
  Building2,
  Smartphone
} from 'lucide-react'
import { trips } from '@/lib/travel-data'
import type { Trip } from '@/lib/travel-data'

export function BookingContent() {
  const searchParams = useSearchParams()
  const tripParam = searchParams.get('trip')
  const dateParam = searchParams.get('date')
  const guestsParam = searchParams.get('guests')

  // Find selected trip or default to first
  const initialTrip = trips.find((t) => t.slug === tripParam) || trips[0]
  const [selectedTrip, setSelectedTrip] = useState<Trip>(initialTrip)

  // Dates
  const availableDates = useMemo(() => {
    const defaultDate = selectedTrip.date || 'Oct 18–22, 2026'
    const list = [
      defaultDate,
      'Nov 14–18, 2026',
      'Dec 05–09, 2026',
      'Dec 24–28, 2026 (New Year Special)',
      'Jan 16–20, 2027',
      'Feb 12–16, 2027'
    ]
    return Array.from(new Set(list))
  }, [selectedTrip])

  const [selectedDate, setSelectedDate] = useState<string>(
    dateParam ? decodeURIComponent(dateParam) : availableDates[0]
  )

  // Guests
  const [guests, setGuests] = useState<number>(
    guestsParam ? Math.max(1, parseInt(guestsParam, 10) || 1) : 2
  )

  // Package options
  const [selectedPackageIndex, setSelectedPackageIndex] = useState<number>(0)
  const [isDoubleSharing, setIsDoubleSharing] = useState<boolean>(false)

  // Payment choice: 'advance' or 'full'
  const [paymentType, setPaymentType] = useState<'advance' | 'full'>('advance')

  // Traveller Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    specialRequest: ''
  })

  // Booking state
  const [isProcessing, setIsProcessing] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [bookingId, setBookingId] = useState('')

  // Calculate pricing
  const basePricePerPerson = useMemo(() => {
    if (selectedTrip.pricingOptions && selectedTrip.pricingOptions[selectedPackageIndex]) {
      const pStr = selectedTrip.pricingOptions[selectedPackageIndex].price
      const num = parseInt(pStr.replace(/[^\d]/g, ''), 10)
      return isNaN(num) ? 8499 : num
    }
    const num = parseInt(selectedTrip.price.replace(/[^\d]/g, ''), 10)
    return isNaN(num) ? 8499 : num
  }, [selectedTrip, selectedPackageIndex])

  const doubleSharingAddon = isDoubleSharing ? 1500 : 0
  const totalPerPerson = basePricePerPerson + doubleSharingAddon
  const subtotal = totalPerPerson * guests
  const gstAmount = Math.round(subtotal * 0.05)
  const grandTotal = subtotal + gstAmount

  const advancePerPerson = useMemo(() => {
    if (selectedTrip.bookingAmount) {
      const num = parseInt(selectedTrip.bookingAmount.replace(/[^\d]/g, ''), 10)
      return isNaN(num) ? 4000 : num
    }
    return 4000
  }, [selectedTrip])

  const advanceTotal = advancePerPerson * guests
  const amountToPayToday = paymentType === 'advance' ? advanceTotal : grandTotal
  const remainingBalance = grandTotal - amountToPayToday

  const handleTripChange = (slug: string) => {
    const found = trips.find((t) => t.slug === slug)
    if (found) {
      setSelectedTrip(found)
      setSelectedDate(found.date || 'Oct 18–22, 2026')
      setSelectedPackageIndex(0)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill all required fields (Name, Email, WhatsApp Number).')
      return
    }

    setIsProcessing(true)

    // Simulate instant payment gateway & voucher generation
    setTimeout(() => {
      const randomId = `TT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      setBookingId(randomId)
      setIsProcessing(false)
      setIsBooked(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1800)
  }

  return (
    <div className="bg-[#f7fbfd] min-h-screen py-8 lg:py-14 text-slate-800">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-[var(--sky)] uppercase tracking-wider mb-1">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href={`/itinerary/${selectedTrip.slug}`} className="hover:underline">{selectedTrip.title}</Link>
              <span>/</span>
              <span className="text-slate-400">Checkout</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[var(--navy)]">
              {isBooked ? 'Booking Confirmed! 🎉' : 'Complete Your Booking'}
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>100% Safe & Verified</span>
          </div>
        </div>

        {/* BOOKED CONFIRMATION VOUCHER SCREEN */}
        {isBooked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[var(--sky-pale)] shadow-[0_15px_40px_rgba(67,169,209,0.15)]"
          >
            <div className="text-center pb-6 border-b border-slate-100">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--sky)] bg-[var(--sky-pale)] px-3 py-1 rounded-full">
                Booking ID: {bookingId}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[var(--navy)] mt-3">
                Pack Your Bags, {formData.fullName.split(' ')[0]}!
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                Your slot is officially confirmed. A booking summary and receipt has been generated.
              </p>
            </div>

            {/* Voucher Details Card */}
            <div className="my-6 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Trip Name</span>
                <span className="font-bold text-[var(--navy)] text-right">{selectedTrip.title}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Departure Date</span>
                <span className="font-semibold text-slate-800">{selectedDate}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Number of Travellers</span>
                <span className="font-semibold text-slate-800">{guests} {guests > 1 ? 'Persons' : 'Person'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Primary Contact</span>
                <span className="font-semibold text-slate-800">{formData.fullName} ({formData.phone})</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Amount Paid Today</span>
                <span className="font-bold text-emerald-600 text-base">₹{amountToPayToday.toLocaleString('en-IN')}</span>
              </div>
              {remainingBalance > 0 && (
                <div className="flex justify-between items-center pt-1 text-slate-600 text-xs">
                  <span>Balance Due (Before Departure)</span>
                  <span className="font-semibold">₹{remainingBalance.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/919975822023?text=${encodeURIComponent(
                  `Hi Travel Tribes! I just booked *${selectedTrip.title}* for *${selectedDate}* (${guests} Guests). My Booking ID is *${bookingId}*. Please share the group chat link and preparation guide!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Smartphone size={18} /> Connect on WhatsApp for Trip Updates
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => window.print()}
                  className="py-3 px-4 border border-slate-200 rounded-full font-semibold text-xs text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download size={15} /> Save Receipt
                </button>
                <Link
                  href="/"
                  className="py-3 px-4 bg-[var(--sky-pale)] text-[var(--sky)] rounded-full font-bold text-xs hover:bg-[var(--sky)] hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  Explore More Trips <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          /* MAIN TWO-COLUMN CHECKOUT FORM */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT COLUMN: Booking Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">

              {/* Step 1: Trip & Dates Selection */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--border)] shadow-[0_4px_20px_rgba(67,169,209,0.06)]">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <span className="w-8 h-8 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] font-bold text-sm flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h2 className="text-lg font-serif text-[var(--navy)]">Select Dates & Travellers</h2>
                    <p className="text-xs text-slate-400">Confirm your batch and group size</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Change Trip Selector (if needed) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Selected Trip
                    </label>
                    <div className="relative">
                      <select
                        value={selectedTrip.slug}
                        onChange={(e) => handleTripChange(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[var(--navy)] appearance-none cursor-pointer focus:outline-none focus:border-[var(--sky)]"
                      >
                        {trips.map((t) => (
                          <option key={t.slug} value={t.slug}>
                            {t.title} ({t.duration}) - Starting {t.price}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Travel Dates */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CalendarDays size={14} className="text-[var(--sky)]" /> Select Departure Date
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {availableDates.map((dateStr, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            selectedDate === dateStr
                              ? 'border-[var(--sky)] bg-[var(--sky-pale)] text-[var(--navy)] font-bold shadow-sm'
                              : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <span>{dateStr}</span>
                          {selectedDate === dateStr && (
                            <CheckCircle2 size={16} className="text-[var(--sky)] shrink-0 ml-1.5" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Number of People */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Users size={14} className="text-[var(--sky)]" /> Number of Travellers
                    </label>
                    <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                      <div>
                        <span className="font-bold text-[var(--navy)] text-sm">{guests} People</span>
                        <p className="text-[11px] text-slate-400">Total participants travelling</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-[var(--sky-pale)] hover:text-[var(--sky)] transition-colors font-bold text-base shadow-sm"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-bold text-base text-[var(--navy)]">{guests}</span>
                        <button
                          type="button"
                          onClick={() => setGuests(guests + 1)}
                          className="w-9 h-9 rounded-full bg-[var(--sky)] text-white flex items-center justify-center hover:bg-[var(--navy)] transition-colors font-bold text-base shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Package Option Selector (if trip has pricing options) */}
                  {selectedTrip.pricingOptions && selectedTrip.pricingOptions.length > 0 && (
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Choose Travel Package Tier
                      </label>
                      <div className="space-y-2">
                        {selectedTrip.pricingOptions
                          .filter((opt) => !opt.label.toLowerCase().includes('double sharing'))
                          .map((opt, idx) => (
                            <button
                              type="button"
                              key={idx}
                              onClick={() => setSelectedPackageIndex(idx)}
                              className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-center justify-between transition-all ${
                                selectedPackageIndex === idx
                                  ? 'border-[var(--sky)] bg-gradient-to-r from-sky-50 to-white font-bold text-[var(--navy)] shadow-sm'
                                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                    selectedPackageIndex === idx
                                      ? 'border-[var(--sky)] bg-[var(--sky)]'
                                      : 'border-slate-300'
                                  }`}
                                >
                                  {selectedPackageIndex === idx && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </div>
                                <span>{opt.label}</span>
                              </div>
                              <span className="font-bold text-[var(--navy)]">{opt.price}</span>
                            </button>
                          ))}
                      </div>

                      {/* Double Sharing Checkbox Add-on */}
                      <div className="mt-3 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between cursor-pointer"
                        onClick={() => setIsDoubleSharing(!isDoubleSharing)}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isDoubleSharing}
                            onChange={(e) => setIsDoubleSharing(e.target.checked)}
                            className="w-4 h-4 accent-[var(--sky)] cursor-pointer"
                          />
                          <div>
                            <span className="text-xs font-bold text-amber-950">Add Double Sharing Room</span>
                            <p className="text-[10px] text-amber-800/80">Private room for 2 persons (+₹1,500/person)</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-amber-900">+₹1,500</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Step 2: Traveller Details Form */}
              <form onSubmit={handleFormSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--border)] shadow-[0_4px_20px_rgba(67,169,209,0.06)]">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <span className="w-8 h-8 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] font-bold text-sm flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h2 className="text-lg font-serif text-[var(--navy)]">Lead Traveller Details</h2>
                    <p className="text-xs text-slate-400">We’ll send trip vouchers & updates to these details</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="rahul@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        WhatsApp Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 99758 22023"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* City & Special Request */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Departure City / State
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai / Pune / Delhi"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Special Notes / Dietary
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Pure Veg, travelling solo"
                        value={formData.specialRequest}
                        onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Pay CTA inside form */}
                <div className="mt-8 pt-6 border-t border-slate-100 lg:hidden">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="glow-btn w-full py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Processing Secure Payment...
                      </span>
                    ) : (
                      <>Pay Here • ₹{amountToPayToday.toLocaleString('en-IN')} <ArrowRight size={18} /></>
                    )}
                  </button>
                </div>
              </form>

            </div>

            {/* RIGHT COLUMN: Summary & Payment Box (5 cols) */}
            <div className="lg:col-span-5 space-y-6">

              {/* Trip Overview Card */}
              <div className="bg-white rounded-3xl p-6 border border-[var(--border)] shadow-[0_4px_20px_rgba(67,169,209,0.06)]">
                <div className="flex gap-4 items-start pb-5 border-b border-slate-100">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                    <Image
                      src={selectedTrip.image}
                      alt={selectedTrip.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[var(--sky)] uppercase tracking-wider flex items-center gap-1">
                      <MapPin size={11} /> {selectedTrip.location.split(' · ')[0]}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[var(--navy)] leading-snug mt-1">
                      {selectedTrip.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 font-medium">
                      <span className="flex items-center gap-1"><Clock3 size={13} className="text-[var(--sky)]" /> {selectedTrip.duration}</span>
                      <span>•</span>
                      <span>{selectedTrip.spots}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Option Toggle: Advance vs Full */}
                <div className="pt-5">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Payment Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setPaymentType('advance')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                        paymentType === 'advance'
                          ? 'bg-[var(--sky)] text-white shadow-sm'
                          : 'text-slate-600 hover:text-[var(--navy)]'
                      }`}
                    >
                      Pay Advance Only (₹{advanceTotal.toLocaleString('en-IN')})
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentType('full')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                        paymentType === 'full'
                          ? 'bg-[var(--sky)] text-white shadow-sm'
                          : 'text-slate-600 hover:text-[var(--navy)]'
                      }`}
                    >
                      Pay Full Amount
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="pt-5 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 mt-5">
                  <div className="flex justify-between">
                    <span>Base Package (₹{basePricePerPerson.toLocaleString('en-IN')} × {guests})</span>
                    <span className="font-semibold text-slate-800">₹{(basePricePerPerson * guests).toLocaleString('en-IN')}</span>
                  </div>
                  {isDoubleSharing && (
                    <div className="flex justify-between text-amber-700 font-medium">
                      <span>Double Sharing Addon (₹1,500 × {guests})</span>
                      <span>+₹{(1500 * guests).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100 text-sm">
                    <span className="font-serif font-bold text-[var(--navy)]">Total Trip Cost</span>
                    <span className="font-serif font-bold text-[var(--navy)]">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Amount to Pay Today Highlight Box */}
                <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50/60 border border-[var(--sky-pale)]">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Amount To Pay Now</span>
                    <span className="text-2xl font-serif font-black text-[var(--sky)]">
                      ₹{amountToPayToday.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {paymentType === 'advance' && (
                    <p className="text-[11px] text-slate-500">
                      Remaining ₹{remainingBalance.toLocaleString('en-IN')} can be paid before departure.
                    </p>
                  )}
                </div>

                {/* Desktop Pay Here Button */}
                <div className="hidden lg:block mt-6">
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    disabled={isProcessing}
                    className="glow-btn w-full py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Processing Secure Payment...
                      </span>
                    ) : (
                      <>Pay Here • ₹{amountToPayToday.toLocaleString('en-IN')} <ArrowRight size={18} /></>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-3 flex items-center justify-center gap-1.5">
                    <Lock size={12} className="text-emerald-500" /> 256-Bit Bank-Grade SSL Encrypted
                  </p>
                </div>

                {/* Payment Methods Accepted Icons */}
                <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                    Accepted Payment Methods
                  </span>
                  <div className="flex items-center justify-center gap-3 text-xs text-slate-500 font-semibold flex-wrap">
                    <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">UPI (GPay/PhonePe)</span>
                    <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">Credit/Debit Cards</span>
                    <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">NetBanking</span>
                  </div>
                </div>

              </div>

              {/* Need Assistance card */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] flex items-center justify-center shrink-0">
                    <PhoneCall size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--navy)]">Have Questions Before Booking?</div>
                    <div className="text-[11px] text-slate-400">Talk to our friendly trip coordinators</div>
                  </div>
                </div>
                <a
                  href="tel:+919975822023"
                  className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[var(--sky)] hover:text-white text-slate-700 text-xs font-bold transition-colors shrink-0"
                >
                  Call Now
                </a>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}

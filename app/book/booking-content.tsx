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
  Smartphone,
  AlertCircle,
  Tag,
  X
} from 'lucide-react'
import { trips } from '@/lib/travel-data'
import type { Trip } from '@/lib/travel-data'
import { calculateBookingPricing, sanitizeGuests, validateCoupon, MAX_GUESTS, MIN_GUESTS } from '@/lib/pricing-calculator'
import { getTripPrimaryDate, filterUpcomingDates, isDateUpcoming } from '@/lib/date-utils'

export function BookingContent() {
  const searchParams = useSearchParams()
  const tripParam = searchParams.get('trip')
  const dateParam = searchParams.get('date')
  const guestsParam = searchParams.get('guests')

  // Find selected trip or default to first
  const initialTrip = trips.find((t) => t.slug === tripParam) || trips[0]
  const [selectedTrip, setSelectedTrip] = useState<Trip>(initialTrip)

  // Dates - Filtered exclusively for upcoming active departures
  const availableDates = useMemo(() => {
    if (selectedTrip.dates && selectedTrip.dates.length > 0) {
      const filtered = filterUpcomingDates(selectedTrip.dates)
      if (filtered.length > 0) return filtered
    }
    const primary = getTripPrimaryDate(selectedTrip)
    return [primary]
  }, [selectedTrip])

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    if (dateParam) {
      const decoded = decodeURIComponent(dateParam)
      if (isDateUpcoming(decoded)) return decoded
    }
    return availableDates[0]
  })

  // Guests - rigorously sanitized
  const [guests, setGuests] = useState<number>(() => sanitizeGuests(guestsParam || 2))

  // Package options
  const [selectedPackageIndex, setSelectedPackageIndex] = useState<number>(0)
  const [isDoubleSharing, setIsDoubleSharing] = useState<boolean>(false)

  // Payment choice: 'advance' or 'full'
  const [paymentType, setPaymentType] = useState<'advance' | 'full'>('advance')

  // Coupon state
  const [couponInput, setCouponInput] = useState<string>('')
  const [appliedCoupon, setAppliedCoupon] = useState<string>('')
  const [couponError, setCouponError] = useState<string | null>(null)
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null)

  // Traveller Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    city: '',
    specialRequest: ''
  })

  // Booking state
  const [isProcessing, setIsProcessing] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Rigorous Anti-Tamper Pricing Engine Calculation
  const pricing = useMemo(() => {
    return calculateBookingPricing({
      tripSlug: selectedTrip.slug,
      packageIndex: selectedPackageIndex,
      guests,
      isDoubleSharing,
      paymentType,
      couponCode: appliedCoupon
    })
  }, [selectedTrip.slug, selectedPackageIndex, guests, isDoubleSharing, paymentType, appliedCoupon])

  const {
    basePricePerPerson,
    subtotal,
    gstAmount,
    grandTotal,
    advanceTotal,
    fullPaymentDiscount,
    couponCode,
    couponDiscount,
    couponDescription,
    amountToPayToday,
    remainingBalance,
    isFullPayment
  } = pricing

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    setCouponError(null)
    setCouponSuccess(null)
    const clean = couponInput.trim().toUpperCase()
    if (!clean) {
      setCouponError('Please enter a coupon code.')
      return
    }
    const res = validateCoupon(clean)
    if (res.valid) {
      setAppliedCoupon(res.cleanCode || clean)
      setCouponSuccess(`Coupon ${res.cleanCode} applied! ₹${res.discount} discount savings.`)
      setCouponInput('')
    } else {
      setCouponError('Invalid coupon code. Please check and try again.')
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon('')
    setCouponInput('')
    setCouponError(null)
    setCouponSuccess(null)
  }

  const handleTripChange = (slug: string) => {
    const found = trips.find((t) => t.slug === slug)
    if (found) {
      setSelectedTrip(found)
      const primary = getTripPrimaryDate(found)
      setSelectedDate(primary)
      setSelectedPackageIndex(0)
    }
  }

  const updateGuests = (nextVal: number) => {
    setGuests(sanitizeGuests(nextVal))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    const trimmedName = formData.fullName.trim()
    const trimmedEmail = formData.email.trim()
    const trimmedPhone = formData.phone.trim()
    const ageNum = parseInt(formData.age.trim(), 10)

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !formData.age.trim()) {
      setErrorMessage('Please fill all required fields (Name, Email, WhatsApp Number, and Age).')
      return
    }

    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setErrorMessage('Please enter a valid traveller age between 1 and 120.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('Please provide a valid email address.')
      return
    }

    const phoneDigits = trimmedPhone.replace(/[^\d]/g, '')
    if (phoneDigits.length < 10) {
      setErrorMessage('Please enter a valid 10-digit WhatsApp/phone number.')
      return
    }

    setIsProcessing(true)

    try {
      // Call secure server-side booking endpoint which strictly verifies and recalculates prices
      const response = await fetch('/api/create-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripSlug: selectedTrip.slug,
          packageIndex: selectedPackageIndex,
          guests,
          isDoubleSharing,
          paymentType,
          couponCode: appliedCoupon,
          date: selectedDate,
          fullName: trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          age: ageNum,
          city: formData.city.trim(),
          specialRequest: formData.specialRequest.trim()
        })
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Booking verification failed. Please try again.')
      }

      setBookingId(result.bookingId)
      setIsProcessing(false)
      setIsBooked(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Payment connection failed. Please retry.'
      setErrorMessage(msg)
      setIsProcessing(false)
    }
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
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--navy)]">
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
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--navy)] mt-3">
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
                <span className="font-semibold text-slate-800">
                  {formData.fullName} ({formData.phone}) {formData.age ? `• Age: ${formData.age}` : ''}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Payment Option</span>
                <span className="font-bold text-[var(--navy)]">
                  {isFullPayment ? 'Full Payment (Discount Applied)' : 'Advance Booking'}
                </span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1.5"><Tag size={14} className="text-emerald-600" /> Promo Code ({couponCode})</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {isFullPayment && (
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1.5"><Sparkles size={14} className="text-emerald-600" /> Full Payment Discount</span>
                  <span>-₹1,000</span>
                </div>
              )}
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Amount Paid Today</span>
                <span className="font-bold text-emerald-600 text-base">₹{amountToPayToday.toLocaleString('en-IN')}</span>
              </div>
              {remainingBalance > 0 ? (
                <div className="flex justify-between items-center pt-1 text-slate-600 text-xs">
                  <span>Balance Due (Before Departure)</span>
                  <span className="font-semibold">₹{remainingBalance.toLocaleString('en-IN')}</span>
                </div>
              ) : (
                <div className="flex justify-between items-center pt-1 text-emerald-700 text-xs font-bold">
                  <span>Booking Status</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[11px]">100% Fully Paid</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/919975822023?text=${encodeURIComponent(
                  `Hi Travel Tribes! I just booked *${selectedTrip.title}* for *${selectedDate}* (${guests} Guests, Lead: ${formData.fullName}, Age: ${formData.age}). My Booking ID is *${bookingId}*. Payment Mode: ${isFullPayment ? `Full Payment (₹{amountToPayToday.toLocaleString('en-IN')})` : `Advance Payment (₹{amountToPayToday.toLocaleString('en-IN')})`}${couponDiscount > 0 ? ` [Coupon ${couponCode}: ₹${couponDiscount} off]` : ''}. Please share the group chat link and preparation guide!`
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
                  className="py-3 px-4 border border-slate-200 rounded-full font-semibold text-xs text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download size={15} /> Save Receipt
                </button>
                <Link
                  href="/"
                  className="py-3 px-4 bg-[var(--sky-pale)] text-[var(--sky)] rounded-full font-bold text-xs hover:bg-[var(--sky)] hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  Explore More Trips
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT COLUMN: Booking Config & Traveller Info (7 cols) */}
            <div className="lg:col-span-7 space-y-6">

              {/* Step 1: Trip & Departure Selection */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[var(--border)] shadow-[0_4px_20px_rgba(67,169,209,0.06)]">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <span className="w-8 h-8 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] font-bold text-sm flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--navy)]">Trip & Departure Details</h2>
                    <p className="text-xs text-slate-400">Select your destination, batch date, and party size</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Select Destination */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Destination Trip
                    </label>
                    <div className="relative">
                      <select
                        value={selectedTrip.slug}
                        onChange={(e) => handleTripChange(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[var(--navy)] font-semibold focus:outline-none focus:border-[var(--sky)] focus:bg-white appearance-none cursor-pointer transition-all"
                      >
                        {trips.map((t) => (
                          <option key={t.slug} value={t.slug}>
                            {t.title} ({t.duration}) — from {t.price}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Date & Guests Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Batch Date Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Departure Batch
                      </label>
                      <div className="relative">
                        <select
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[var(--navy)] font-semibold focus:outline-none focus:border-[var(--sky)] focus:bg-white appearance-none cursor-pointer transition-all"
                        >
                          {availableDates.map((d, i) => (
                            <option key={i} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <CalendarDays size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Guest Counter */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Travellers Count
                      </label>
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 justify-between">
                        <button
                          type="button"
                          onClick={() => updateGuests(guests - 1)}
                          disabled={guests <= MIN_GUESTS}
                          className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <div className="flex items-center gap-1.5 text-sm font-extrabold text-[var(--navy)]">
                          <Users size={16} className="text-[var(--sky)]" />
                          <span>{guests} {guests > 1 ? 'Guests' : 'Guest'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateGuests(guests + 1)}
                          disabled={guests >= MAX_GUESTS}
                          className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Package Tier Options (e.g. Sleeper / 3AC / Quad / Triple) */}
                  {selectedTrip.pricingOptions && selectedTrip.pricingOptions.length > 0 && (
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-slate-600 mb-2">
                        Select Travel / Room Package
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedTrip.pricingOptions
                          .filter((opt) => !opt.label.toLowerCase().includes('add-on') && !opt.price.startsWith('+'))
                          .map((opt, idx) => {
                            const isSelected = selectedPackageIndex === idx
                            return (
                              <div
                                key={idx}
                                onClick={() => setSelectedPackageIndex(idx)}
                                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                                  isSelected
                                    ? 'border-[var(--sky)] bg-[var(--sky-pale)]/50 shadow-sm'
                                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100/80'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-[var(--navy)]">{opt.label}</span>
                                  {isSelected && <CheckCircle2 size={16} className="text-[var(--sky)]" />}
                                </div>
                                <div className="mt-2 flex items-baseline justify-between">
                                  <span className="text-sm font-extrabold text-[var(--navy)]">{opt.price}</span>
                                  {opt.note && <span className="text-[10px] text-slate-400 font-medium">{opt.note}</span>}
                                </div>
                              </div>
                            )
                          })}
                      </div>

                      {/* Double Sharing Room Addon Checkbox */}
                      {(() => {
                        const dsOpt = selectedTrip.pricingOptions.find(
                          (o) =>
                            o.label.toLowerCase().includes('double sharing') &&
                            (o.label.toLowerCase().includes('add-on') || o.price.startsWith('+'))
                        )
                        if (!dsOpt) return null
                        const dsPriceStr = dsOpt.price
                        return (
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
                                <p className="text-[10px] text-amber-800/80">Private room for 2 persons ({dsPriceStr})</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-amber-900">{dsPriceStr.replace('/ person', '').trim()}</span>
                          </div>
                        )
                      })()}
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
                    <h2 className="text-lg font-bold text-[var(--navy)]">Lead Traveller Details</h2>
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

                  {/* Age & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        Age <span className="text-rose-500">*</span>
                      </label>
                      <input
                        required
                        type="number"
                        min="1"
                        max="120"
                        placeholder="e.g. 24"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                      />
                    </div>
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
                  </div>

                  {/* Special Request */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Special Notes / Dietary
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pure Veg, travelling solo, early check-in"
                      value={formData.specialRequest}
                      onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-700 font-semibold animate-in fade-in duration-200">
                    <AlertCircle size={16} className="text-rose-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Mobile Pay CTA inside form */}
                <div className="mt-8 pt-6 border-t border-slate-100 lg:hidden">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="glow-btn w-full py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
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
                    <h3 className="font-bold text-lg text-[var(--navy)] leading-snug mt-1">
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
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Payment Preference
                    </label>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles size={11} className="text-emerald-600" /> ₹1,000 OFF on Full Payment
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setPaymentType('advance')}
                      className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between cursor-pointer ${
                        paymentType === 'advance'
                          ? 'bg-[var(--sky)] text-white shadow-sm'
                          : 'bg-white/70 hover:bg-white text-slate-600 hover:text-[var(--navy)] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold">Pay Advance Only</span>
                        {paymentType === 'advance' && <CheckCircle2 size={15} className="text-white shrink-0" />}
                      </div>
                      <span className={`text-[11px] mt-1 font-semibold ${paymentType === 'advance' ? 'text-sky-100' : 'text-slate-500'}`}>
                        ₹{advanceTotal.toLocaleString('en-IN')}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentType('full')}
                      className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between relative overflow-hidden cursor-pointer ${
                        paymentType === 'full'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-white/70 hover:bg-white text-slate-700 hover:text-[var(--navy)] border border-emerald-200/80'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold">Pay Full Amount</span>
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                            paymentType === 'full' ? 'bg-white text-emerald-700' : 'bg-emerald-600 text-white'
                          }`}>
                            ₹1,000 OFF
                          </span>
                        </div>
                        {paymentType === 'full' && <CheckCircle2 size={15} className="text-white shrink-0" />}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className={`text-[11px] line-through ${paymentType === 'full' ? 'text-emerald-200/80' : 'text-slate-400'}`}>
                          ₹{grandTotal.toLocaleString('en-IN')}
                        </span>
                        <span className={`text-xs font-bold ${paymentType === 'full' ? 'text-white' : 'text-emerald-700'}`}>
                          ₹{Math.max(0, grandTotal - 1000).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* DISCOUNT COUPON CODE SECTION */}
                <div className="pt-5 mt-5 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-[var(--navy)] flex items-center gap-1.5">
                      <Tag size={13} className="text-[var(--sky)]" />
                      <span>Have a Discount Coupon?</span>
                    </label>
                  </div>

                  {appliedCoupon ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between animate-in fade-in duration-200">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center font-bold text-xs">
                          ✓
                        </div>
                        <div>
                          <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                            <span>{appliedCoupon}</span>
                            <span className="text-[10px] bg-emerald-200/80 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                              -₹{couponDiscount} OFF
                            </span>
                          </div>
                          {couponDescription && (
                            <p className="text-[10px] text-emerald-700">{couponDescription}</p>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-xs text-slate-400 hover:text-rose-600 font-bold px-2 py-1 rounded hover:bg-rose-50 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Remove coupon"
                      >
                        <X size={14} /> Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponInput}
                            onChange={(e) => {
                              setCouponInput(e.target.value)
                              if (couponError) setCouponError(null)
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-3 py-2.5 text-xs text-[var(--navy)] font-semibold uppercase placeholder:normal-case placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2.5 rounded-xl bg-[var(--navy)] hover:bg-[var(--navy)]/90 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                        >
                          Apply
                        </button>
                      </div>

                      {couponError && (
                        <p className="text-[11px] text-rose-600 font-medium pl-1">{couponError}</p>
                      )}
                    </form>
                  )}
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

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                      <span className="flex items-center gap-1"><Tag size={12} /> Coupon ({couponCode})</span>
                      <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-1 border-t border-slate-100">
                    <span className="text-slate-600">Total Price</span>
                    <span className={`font-semibold ${isFullPayment ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {isFullPayment && (
                    <div className="flex justify-between items-center bg-emerald-50 text-emerald-700 font-bold px-3 py-2 rounded-xl text-xs border border-emerald-200/80 animate-in fade-in duration-300">
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={14} className="text-emerald-600 shrink-0" />
                        Full Payment Instant Discount
                      </span>
                      <span>-₹1,000</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2 border-t border-slate-100 text-sm">
                    <span className="font-bold text-[var(--navy)]">
                      {isFullPayment ? 'Final Total (After Discount)' : 'Total Trip Cost'}
                    </span>
                    <span className="font-extrabold text-[var(--navy)]">
                      ₹{(isFullPayment ? Math.max(0, grandTotal - fullPaymentDiscount) : grandTotal).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Amount to Pay Today Highlight Box */}
                <div className={`mt-5 p-4 rounded-2xl border transition-all duration-300 ${
                  isFullPayment
                    ? 'bg-gradient-to-br from-emerald-50 via-teal-50/40 to-emerald-50/20 border-emerald-200 shadow-sm'
                    : 'bg-gradient-to-br from-sky-50 to-blue-50/60 border-[var(--sky-pale)]'
                }`}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Amount To Pay Now</span>
                    <div className="text-right">
                      {isFullPayment && (
                        <span className="text-xs text-slate-400 line-through mr-2 font-medium">
                          ₹{grandTotal.toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className={`text-2xl font-black ${isFullPayment ? 'text-emerald-600' : 'text-[var(--sky)]'}`}>
                        ₹{amountToPayToday.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  {paymentType === 'advance' ? (
                    <div className="space-y-1.5 mt-2">
                      <p className="text-[11px] text-slate-500">
                        Remaining ₹{remainingBalance.toLocaleString('en-IN')} can be paid before departure.
                      </p>
                      <button
                        type="button"
                        onClick={() => setPaymentType('full')}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Sparkles size={12} className="text-emerald-600" /> Pay full amount & save ₹1,000 instantly!
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-white/90 py-1.5 px-3 rounded-lg border border-emerald-200">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                      <span>🎉 Flat ₹1,000 automatic discount applied!</span>
                    </div>
                  )}
                </div>

                {/* Right Column Error Banner */}
                {errorMessage && (
                  <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700 font-semibold animate-in fade-in duration-200">
                    <AlertCircle size={15} className="text-rose-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Desktop Pay Here Button */}
                <div className="hidden lg:block mt-6">
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    disabled={isProcessing}
                    className="glow-btn w-full py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
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

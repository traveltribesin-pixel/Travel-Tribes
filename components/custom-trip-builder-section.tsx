'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  MapPin,
  Calendar,
  Users,
  Compass,
  FileText,
  User,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Loader2,
  BookOpen,
  Settings,
  Globe2,
  ChevronDown,
  Plane,
  ShieldCheck,
  Zap
} from 'lucide-react'

const TRIP_FEATURES = [
  { id: 'solo', label: 'Solo Escape', icon: User },
  { id: 'friends', label: "Friends' Trip", icon: Users },
  { id: 'couple', label: 'Couple Getaway', icon: HeartHandshake },
  { id: 'family', label: 'Family Holiday', icon: Users },
  { id: 'group', label: 'Private Group', icon: Users },
]

export function CustomTripBuilderSection() {
  // Client Form States
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [destination, setDestination] = useState('')
  const [travelDates, setTravelDates] = useState('')
  const [groupType, setGroupType] = useState('Friends')
  const [tripVibe, setTripVibe] = useState('Adventure')
  const [notes, setNotes] = useState('')

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!fullName.trim() || !phone.trim() || !email.trim() || !destination.trim()) {
      setError('Please fill in your Full Name, Contact Number, Email id, and Destination.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/custom-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formSource: 'Homepage Custom Trip Builder',
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          destination: destination.trim(),
          travelDates: travelDates || 'Flexible dates',
          groupType,
          tripVibe,
          notes: notes.trim()
        })
      })

      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Could not submit your request. Please try again.')
      }
    } catch (err) {
      console.error('Custom trip submission error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-16 overflow-hidden bg-slate-900 select-none">
      {/* Background Image with Crisp Light Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2200&q=88"
          alt="Scenic Mountain Sunset Adventure"
          fill
          priority
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/95 to-[#f8fafc]/75 lg:from-[#f8fafc] lg:via-[#f8fafc]/90 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Client Specified Copy */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 text-xs font-black uppercase tracking-widest text-slate-500">
              <span>CUSTOM TRIPS</span>
              <span className="w-12 h-[1.5px] bg-slate-400 inline-block rounded-full" />
            </div>

            {/* Main Heading: CAN'T FIND YOUR TRIP? MAKE YOUR OWN. */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--navy)] leading-[1.12] tracking-tight uppercase">
              Can&apos;t find your trip? <br />
              <span className="text-[#e07a5f] font-serif italic font-normal normal-case">Make your own.</span>
            </h2>

            {/* Subheading: Your destination. Your dates. Your people. Your rules. */}
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              Your destination. Your dates. Your people. Your rules.
            </p>

            {/* Description: Tell us what you're imagining and we'll build a personalised trip around it. */}
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed font-normal">
              Tell us what you&apos;re imagining and we&apos;ll build a personalised trip around it.
            </p>

            {/* 5 Static Category Icons */}
            <div className="pt-2">
              <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-lg">
                {TRIP_FEATURES.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.id} className="flex flex-col items-center text-center space-y-2">
                      <div className="w-10 h-10 flex items-center justify-center text-slate-800">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-tight">
                        {item.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Punchline Stamp: You dream it. We plan it. */}
            <div className="pt-4 sm:pt-6">
              <div className="inline-block transform -rotate-2">
                <p className="font-serif italic font-extrabold text-2xl sm:text-3xl text-[var(--navy)] leading-tight">
                  You dream it. <br />
                  <span className="text-[#e07a5f]">We plan it.</span>
                </p>
                <div className="w-28 h-1 bg-[#e07a5f] rounded-full mt-1.5 opacity-90" />
              </div>
            </div>

          </div>

          {/* Right Column: LET'S BUILD YOUR NEXT ADVENTURE Card */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(11,41,64,0.12)] border border-slate-100 relative">

              {/* Top-Right Badge */}
              <div className="absolute top-5 right-5 sm:top-6 sm:right-6 text-right select-none pointer-events-none">
                <div className="inline-flex items-center gap-1.5 font-serif italic text-xs font-bold text-[#e07a5f] bg-orange-50/90 px-3 py-1 rounded-full border border-orange-200/80 shadow-sm">
                  <span>Custom Trips Happier Stories</span>
                  <Sparkles size={13} className="text-amber-500" />
                </div>
              </div>

              {/* Card Title & Subtitle */}
              <div className="mb-5 pr-28 sm:pr-32">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--navy)] tracking-tight uppercase">
                  Let&apos;s Build Your Next Adventure
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-normal">
                  We&apos;ll get back to you with a personalised plan.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-extrabold text-[var(--navy)]">Custom Trip Request Received! 🎉</h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you <strong>{fullName}</strong>. Our custom trip architects are designing your personalized <strong>{destination}</strong> itinerary. We will connect with you within 24 hours on WhatsApp / Email!
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setFullName('')
                        setPhone('')
                        setEmail('')
                        setDestination('')
                        setNotes('')
                      }}
                      className="px-5 py-2 text-xs font-bold text-[var(--sky)] hover:underline cursor-pointer"
                    >
                      Plan another destination ➔
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">

                  {/* Row 1: Full name & Contact Number (2-Column) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User size={16} />
                        </div>
                        <input
                          required
                          type="text"
                          placeholder="Enter Your name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          style={{ paddingLeft: '2.4rem' }}
                          className="w-full h-11 pr-3.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone size={16} />
                        </div>
                        <input
                          required
                          type="tel"
                          placeholder="Enter Your Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{ paddingLeft: '2.4rem' }}
                          className="w-full h-11 pr-3.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Email id (Full Width) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email id <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail size={16} />
                      </div>
                      <input
                        required
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ paddingLeft: '2.4rem' }}
                        className="w-full h-11 pr-3.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 3: Where do you want to go? */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Where do you want to go? <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <MapPin size={17} />
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="Enter destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        style={{ paddingLeft: '2.5rem' }}
                        className="w-full h-11 pr-4 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 4: When do you want to travel? & Who's coming? (2-Column) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* When do you want to travel? */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        When do you want to travel?
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Calendar size={17} />
                        </div>
                        <input
                          type="text"
                          placeholder="Select dates"
                          value={travelDates}
                          onChange={(e) => setTravelDates(e.target.value)}
                          style={{ paddingLeft: '2.5rem' }}
                          className="w-full h-11 pr-4 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Who's coming? */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Who&apos;s coming?
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Users size={17} />
                        </div>
                        <select
                          value={groupType}
                          onChange={(e) => setGroupType(e.target.value)}
                          style={{ paddingLeft: '2.5rem' }}
                          className="w-full h-11 pr-9 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium appearance-none cursor-pointer"
                        >
                          <option value="Couple">Couple</option>
                          <option value="Friends">Friends</option>
                          <option value="Family">Family</option>
                          <option value="Group">Group</option>
                          <option value="Corporate">Corporate</option>
                          <option value="College trip">College trip</option>
                          <option value="School trip">School trip</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 5: What kind of trip are you looking for? */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      What kind of trip are you looking for?
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Compass size={17} />
                      </div>
                      <select
                        value={tripVibe}
                        onChange={(e) => setTripVibe(e.target.value)}
                        style={{ paddingLeft: '2.5rem' }}
                        className="w-full h-11 pr-9 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium appearance-none cursor-pointer"
                      >
                        <option value="Adventure">Adventure</option>
                        <option value="Relaxed">Relaxed</option>
                        <option value="Backpacking">Backpacking</option>
                        <option value="Honeymoon">Honeymoon</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Row 6: Anything else we should know? */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Anything else we should know?
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                        <FileText size={17} />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Tell us about your ideal trip…"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        style={{ paddingLeft: '2.5rem' }}
                        className="w-full py-2.5 pr-4 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium resize-none"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
                      {error}
                    </div>
                  )}

                  {/* Row 7: CREATE MY TRIP → Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="glow-btn w-full h-12 rounded-xl bg-[var(--navy)] hover:bg-[var(--navy)]/90 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-60 uppercase tracking-wider"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          <span>Building Your Trip...</span>
                        </>
                      ) : (
                        <>
                          <span>CREATE MY TRIP</span>
                          <ArrowRight size={17} />
                        </>
                      )}
                    </button>

                    {/* Client Footer note */}
                    <p className="text-center text-xs text-slate-500 mt-2.5 font-medium">
                      We&apos;ll get back to you with a personalised plan.
                    </p>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] text-slate-400 mt-2 font-medium">
                      <span className="flex items-center gap-1">
                        <Zap size={12} className="text-amber-500" />
                        100% Personalised
                      </span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="flex items-center gap-1">
                        <Sparkles size={12} className="text-[var(--sky)]" />
                        Free Itinerary
                      </span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="flex items-center gap-1">
                        <ShieldCheck size={12} className="text-emerald-500" />
                        Quick Response
                      </span>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Bottom Horizontal Value Bar */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-slate-300/40 flex flex-col md:flex-row items-center justify-between gap-6 text-[var(--navy)] text-xs sm:text-sm font-bold">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-8 text-slate-700">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[var(--sky)]" />
              <span>Personalised Itineraries</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full" />
            <div className="flex items-center gap-2">
              <Settings size={16} className="text-[var(--sky)]" />
              <span>End-to-End Planning</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full" />
            <div className="flex items-center gap-2">
              <Users size={16} className="text-[var(--sky)]" />
              <span>For Any Group Size</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full" />
            <div className="flex items-center gap-2">
              <Globe2 size={16} className="text-[var(--sky)]" />
              <span>Domestic & International</span>
            </div>
          </div>

          {/* Airplane Doodle & Stamp */}
          <div className="flex items-center gap-2 font-serif italic text-xs sm:text-sm text-slate-600">
            <Plane size={15} className="text-amber-500 transform -rotate-45" />
            <span className="tracking-wide">Your next adventure starts here.</span>
          </div>

        </div>

      </div>
    </section>
  )
}


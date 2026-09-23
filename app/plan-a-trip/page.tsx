'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
  Zap,
  Star,
  Hotel,
  Car,
  Utensils,
  Waves,
  Wallet,
  Clock,
  ChevronLeft,
  ChevronRight,
  Heart,
  Briefcase
} from 'lucide-react'
import { PageFrame } from '@/components/site-shell'

// 1. Travel Vibe Categories
const TRAVEL_VIBES = [
  {
    id: 'friends',
    label: 'Friends Trip',
    emoji: '👯',
    title: 'Your people. Your playlist. Your adventure.',
    description: "From weekend escapes to international adventures, we'll build a trip your entire group will actually enjoy.",
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=85',
    cta: 'Plan a Friends Trip'
  },
  {
    id: 'honeymoon',
    label: 'Honeymoon',
    emoji: '❤️',
    title: "Just you two. We'll handle the rest.",
    description: 'Romantic stays, beautiful destinations, unforgettable experiences and enough time to actually enjoy each other.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=85',
    cta: 'Plan Your Honeymoon'
  },
  {
    id: 'family',
    label: 'Family Holiday',
    emoji: '👨‍👩‍👧',
    title: 'More memories. Less planning.',
    description: 'Family-friendly stays, comfortable travel and experiences everyone can enjoy, from kids to grandparents.',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=85',
    cta: 'Plan a Family Trip'
  },
  {
    id: 'solo',
    label: 'Solo Trip',
    emoji: '🎒',
    title: 'Your adventure. Your rules.',
    description: "Want to travel solo? Tell us where you want to go and what kind of experience you're looking for. We'll help build your perfect itinerary.",
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=85',
    cta: 'Plan a Solo Trip'
  },
  {
    id: 'corporate',
    label: 'Corporate Trip',
    emoji: '🏢',
    title: "Take the team somewhere they'll actually remember.",
    description: "From weekend team outings to domestic and international offsites, we'll plan the experience while you focus on your team.",
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=85',
    cta: 'Plan a Corporate Trip'
  },
  {
    id: 'group',
    label: 'Group Trip',
    emoji: '👥',
    title: 'More people. More stories.',
    description: 'Custom private group itineraries designed for reunions, celebrations, college groups or community travels.',
    image: 'https://images.unsplash.com/photo-1528605248659-144006cb075b?auto=format&fit=crop&w=800&q=85',
    cta: 'Plan a Group Trip'
  }
]

// 2. Popular Destinations
const POPULAR_DESTINATIONS = [
  {
    title: 'India',
    flag: '🇮🇳',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=85',
    tag: 'Mountains, beaches, deserts, forests, islands and everything in between.',
    locations: 'Goa · Kerala · Rajasthan · Himachal · Kashmir · Meghalaya · Spiti · Ladakh · Northeast · Andaman'
  },
  {
    title: 'Southeast Asia',
    flag: '🌴',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=85',
    tag: 'Tropical islands, incredible food, nightlife and culture.',
    locations: 'Bali · Vietnam · Thailand · Singapore · Malaysia · Sri Lanka'
  },
  {
    title: 'Middle East',
    flag: '🏜️',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=85',
    tag: 'Modern cities, desert adventures and unforgettable experiences.',
    locations: 'Dubai · Abu Dhabi · Oman'
  },
  {
    title: 'Europe',
    flag: '🇪🇺',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=85',
    tag: 'Iconic cities, hidden towns, scenic landscapes and unforgettable road trips.',
    locations: 'Italy · Switzerland · France · Spain · Greece · Balkans'
  },
  {
    title: 'Somewhere Else?',
    flag: '🌍',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
    tag: "Have a destination in mind that isn't on our list?",
    locations: "Tell us where. We'll figure it out."
  }
]

// 3. Customisation Options
const CUSTOMISE_ITEMS = [
  { icon: MapPin, title: 'Destination', description: 'Choose where you want to go.' },
  { icon: Calendar, title: 'Dates', description: 'Travel when it works for you.' },
  { icon: Hotel, title: 'Stays', description: 'From comfortable stays to premium experiences.' },
  { icon: Car, title: 'Transportation', description: 'Flights, trains, transfers, road trips and local transport.' },
  { icon: Utensils, title: 'Food & Dining', description: 'Local experiences, special meals and dietary preferences.' },
  { icon: Waves, title: 'Activities', description: 'Adventure, sightseeing, nightlife, wellness, culture and more.' },
  { icon: Wallet, title: 'Budget', description: "We'll build options around your budget." },
  { icon: Clock, title: 'Pace', description: 'Packed itinerary or slow travel? Your choice.' }
]

// 4. Testimonials
const CUSTOM_TESTIMONIALS = [
  {
    quote: '“We wanted a relaxed Bali trip with a mix of adventure and nightlife. Travel Tribes understood exactly what we wanted.”',
    name: 'Rohan & Friends',
    trip: 'Bali Custom Trip',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    quote: '“Our honeymoon was beautifully planned. The stays, experiences and pace were exactly what we wanted.”',
    name: 'Sneha & Arjun',
    trip: 'Kerala Honeymoon Trip',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    quote: '“We needed an offsite for our team and the Travel Tribes team handled everything end to end. It was a seamless experience.”',
    name: 'HR Team',
    trip: 'Goa Corporate Trip',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    rating: 5
  }
]

export default function PlanATripPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Form States
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [tripType, setTripType] = useState('Friends Trip')
  const [destination, setDestination] = useState('')
  const [travelDates, setTravelDates] = useState('')
  const [groupSize, setGroupSize] = useState('3-5 People (Friends / Family)')

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scrollToForm = (selectedVibe?: string) => {
    if (selectedVibe) {
      setTripType(selectedVibe)
    }
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        nameInputRef.current?.focus()
      }, 500)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!fullName.trim() || !phone.trim() || !email.trim() || !destination.trim()) {
      setError('Please fill in your Name, Email, WhatsApp Phone, and Destination.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/custom-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formSource: 'Plan a Trip Page',
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          destination: destination.trim(),
          travelDates: travelDates || 'Flexible dates',
          groupType: groupSize,
          tripVibe: tripType,
          notes: `Requested via Plan a Trip page. Group size: ${groupSize}. Trip Vibe: ${tripType}`
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
      setError('Something went wrong. Please try again or message us on WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageFrame>
      <main className="w-full bg-[#f7fbfd] text-[var(--navy)] overflow-hidden">
        {/* =========================================================================
            SECTION 1: HERO & INTERACTIVE TRIP PLANNER FORM
        ========================================================================== */}
        <section className="relative w-full pt-10 sm:pt-14 pb-16 lg:pb-24 overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-sky-50/40 via-white to-[#f7fbfd]">
          {/* Subtle Panoramic Background Image with soft gradient */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.22]">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2200&q=88"
              alt="Mountain ridge sunset travel background"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f7fbfd] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Page Copy & Pillars */}
              <div className="lg:col-span-6 space-y-6 sm:space-y-7">
                
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[var(--sky)]">
                  <span>PLAN A TRIP</span>
                  <span className="w-12 h-[2px] bg-[var(--sky)] inline-block rounded-full" />
                </div>

                {/* Main Heading */}
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-[var(--navy)] leading-[1.08] tracking-tight">
                    Can&apos;t find your <br />
                    perfect trip? <br />
                    <span className="text-[#e07a5f] font-serif italic font-normal">Make your own.</span>
                  </h1>

                  {/* Hand-drawn style sticker / doodle note */}
                  <div className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-orange-50/90 border border-orange-200/90 text-[#e07a5f] font-serif italic text-sm sm:text-base font-bold shadow-xs transform -rotate-1">
                    <span>✨ Your destination. Your people. Your rules.</span>
                  </div>
                </div>

                {/* Subtitle text */}
                <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed font-normal">
                  Tell us where you want to go, when you want to travel and who you’re travelling with. We’ll build a personalised trip around your dates, your budget and your kind of adventure.
                </p>

                {/* 4 Feature Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  <div className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-sky-50 text-[var(--sky)] flex items-center justify-center mb-1.5">
                      <Globe2 size={18} />
                    </div>
                    <span className="text-[11px] font-bold text-[var(--navy)] leading-tight">Any Destination</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
                      <Users size={18} />
                    </div>
                    <span className="text-[11px] font-bold text-[var(--navy)] leading-tight">For Any Group Size</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-1.5">
                      <Settings size={18} />
                    </div>
                    <span className="text-[11px] font-bold text-[var(--navy)] leading-tight">End-to-End Planning</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-1.5">
                      <ShieldCheck size={18} />
                    </div>
                    <span className="text-[11px] font-bold text-[var(--navy)] leading-tight">Domestic & Int.</span>
                  </div>
                </div>

                {/* Plan My Trip Button & Micro Copy */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToForm()}
                    className="glow-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-extrabold rounded-full cursor-pointer shadow-lg tracking-wide uppercase"
                  >
                    PLAN MY TRIP <ArrowRight size={16} />
                  </button>
                  <p className="text-xs text-slate-500 max-w-xs leading-normal">
                    Domestic or international. Weekend escape or bucket-list adventure. We’ll take it from here.
                  </p>
                </div>

              </div>

              {/* Right Column: Interactive Plan Your Trip Form Card */}
              <div className="lg:col-span-6" ref={formRef}>
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(11,41,64,0.12)] border border-slate-200/80 relative">
                  
                  {/* Card Title & Subtitle */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-2xl sm:text-3xl font-black text-[var(--navy)] tracking-tight">
                        Let&apos;s Plan Your Trip
                      </h2>
                      <span className="text-xs font-serif italic font-bold text-[#e07a5f] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/70 shrink-0">
                        Custom Itinerary
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-normal">
                      Fill in a few details and we&apos;ll get back to you with a customised plan.
                    </p>
                  </div>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-8 text-center space-y-4"
                    >
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 size={34} />
                      </div>
                      <h3 className="text-2xl font-black text-[var(--navy)]">Custom Trip Request Received! 🎉</h3>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        Thank you <strong>{fullName}</strong>. Our custom trip architects are building your personalized <strong>{destination}</strong> itinerary for <strong>{tripType}</strong>. We will get in touch with you shortly on WhatsApp / Email!
                      </p>
                      <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                          href={`https://wa.me/919975822023?text=Hi%20Travel%20Tribes,%20I%20just%20submitted%20a%20custom%20trip%20plan%20for%20${encodeURIComponent(destination)}.%20Please%20connect!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-md transition-all"
                        >
                          💬 Connect on WhatsApp (+91 99758 22023)
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false)
                            setFullName('')
                            setEmail('')
                            setPhone('')
                            setDestination('')
                            setTravelDates('')
                          }}
                          className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-[var(--sky)] hover:underline cursor-pointer"
                        >
                          Plan another trip ➔
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Your Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <User size={16} />
                            </div>
                            <input
                              ref={nameInputRef}
                              required
                              type="text"
                              placeholder="Enter your name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              style={{ paddingLeft: '2.4rem' }}
                              className="w-full h-11 pr-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <Mail size={16} />
                            </div>
                            <input
                              required
                              type="email"
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              style={{ paddingLeft: '2.4rem' }}
                              className="w-full h-11 pr-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Phone & Trip Type */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            WhatsApp Number <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
                              +91
                            </div>
                            <input
                              required
                              type="tel"
                              placeholder="98765 43210"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{ paddingLeft: '2.6rem' }}
                              className="w-full h-11 pr-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Trip Type <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              value={tripType}
                              onChange={(e) => setTripType(e.target.value)}
                              className="w-full h-11 px-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium cursor-pointer appearance-none"
                            >
                              <option value="Friends Trip">👯 Friends Trip</option>
                              <option value="Honeymoon">❤️ Honeymoon</option>
                              <option value="Family Holiday">👨‍👩‍👧 Family Holiday</option>
                              <option value="Solo Trip">🎒 Solo Trip</option>
                              <option value="Corporate Trip">🏢 Corporate Trip</option>
                              <option value="Group Trip">👥 Group Trip</option>
                              <option value="Custom / Other">✨ Custom / Other</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                              <ChevronDown size={16} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Where do you want to go? */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Where do you want to go? <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <MapPin size={16} />
                          </div>
                          <input
                            required
                            type="text"
                            placeholder="Enter destination (e.g. Bali, Spiti, Kerala, Europe)"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            style={{ paddingLeft: '2.4rem' }}
                            className="w-full h-11 pr-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                          />
                        </div>
                      </div>

                      {/* Travel Dates & Group Size */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            When do you want to travel?
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <Calendar size={16} />
                            </div>
                            <input
                              type="text"
                              placeholder="Select dates or month"
                              value={travelDates}
                              onChange={(e) => setTravelDates(e.target.value)}
                              style={{ paddingLeft: '2.4rem' }}
                              className="w-full h-11 pr-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            How many people? <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              value={groupSize}
                              onChange={(e) => setGroupSize(e.target.value)}
                              className="w-full h-11 px-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium cursor-pointer appearance-none"
                            >
                              <option value="1 (Solo Traveler)">1 (Solo Traveler)</option>
                              <option value="2 (Couple / Duo)">2 (Couple / Duo)</option>
                              <option value="3-5 People (Friends / Family)">3–5 People (Small Group)</option>
                              <option value="6-10 People (Medium Group)">6–10 People (Medium Group)</option>
                              <option value="10+ People (Large Group / Corporate)">10+ People (Large Group / Corporate)</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                              <ChevronDown size={16} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Error Banner if any */}
                      {error && (
                        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                          {error}
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-[#0b2940] hover:bg-[#134e75] text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-60 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Building Your Custom Plan...</span>
                          </>
                        ) : (
                          <>
                            <span>Get My Custom Plan</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>

                      {/* Micro footer note */}
                      <p className="text-center text-[11px] text-slate-400 font-medium">
                        We&apos;ll review your requirements and get back to you soon.
                      </p>

                    </form>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: WHY PLAN A CUSTOM TRIP?
        ========================================================================== */}
        <section className="w-full py-16 sm:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              
              {/* Left narrative */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--sky)]">
                  <span>WHY PLAN A CUSTOM TRIP?</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[var(--navy)] leading-tight tracking-tight">
                  A trip designed <br />
                  around <span className="text-[#e07a5f] font-serif italic font-normal">you.</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-1">
                  No two travellers are the same. So why should every itinerary look the same?
                </p>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Whether you’re planning a spontaneous getaway, a family holiday, a honeymoon, a friends’ trip or an international adventure, we create itineraries around what you actually want to experience.
                </p>
              </div>

              {/* Right 4 feature pillars */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                
                {/* 1 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all group">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 text-[var(--sky)] flex items-center justify-center mb-4 shadow-xs group-hover:bg-[var(--sky)] group-hover:text-white transition-colors">
                    <BookOpen size={20} />
                  </div>
                  <h3 className="text-base font-black text-[var(--navy)] mb-1.5 uppercase tracking-wide">
                    Personalised Itineraries
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Built around your dates, interests, pace and budget.
                  </p>
                </div>

                {/* 2 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all group">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center mb-4 shadow-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Users size={20} />
                  </div>
                  <h3 className="text-base font-black text-[var(--navy)] mb-1.5 uppercase tracking-wide">
                    Any Group Size
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Travelling solo, as a couple, with friends, family or a larger group? We&apos;ve got you.
                  </p>
                </div>

                {/* 3 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all group">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 text-amber-600 flex items-center justify-center mb-4 shadow-xs group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Settings size={20} />
                  </div>
                  <h3 className="text-base font-black text-[var(--navy)] mb-1.5 uppercase tracking-wide">
                    End-to-End Planning
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Stays, transport, activities, experiences and on-ground support, all planned for you.
                  </p>
                </div>

                {/* 4 */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all group">
                  <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center mb-4 shadow-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Globe2 size={20} />
                  </div>
                  <h3 className="text-base font-black text-[var(--navy)] mb-1.5 uppercase tracking-wide">
                    Domestic & International
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    From a weekend in Goa to a dream trip across Europe, tell us where you want to go.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 3: PICK YOUR TRAVEL VIBE
        ========================================================================== */}
        <section className="w-full py-16 sm:py-20 bg-[#f7fbfd] border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[var(--sky)] block mb-1">
                  PICK YOUR TRAVEL VIBE
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--navy)] tracking-tight">
                  What kind of trip are you planning?
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 self-start md:self-end font-serif italic text-sm sm:text-base font-bold text-[#e07a5f] bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200/80">
                <span>Different People · Different Stories</span>
              </div>
            </div>

            {/* 6 Vibe Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {TRAVEL_VIBES.map((vibe) => (
                <div
                  key={vibe.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Image Container */}
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden">
                    <Image
                      src={vibe.image}
                      alt={vibe.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-[var(--navy)] flex items-center gap-1.5 shadow-sm">
                      <span>{vibe.emoji}</span>
                      <span>{vibe.label}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-black text-[var(--navy)] leading-snug">
                        {vibe.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {vibe.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => scrollToForm(vibe.label)}
                        className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-[var(--sky)] text-[var(--navy)] hover:text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer group/btn"
                      >
                        <span>{vibe.cta}</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4: WHERE DO YOU WANT TO GO? (POPULAR DESTINATIONS)
        ========================================================================== */}
        <section className="w-full py-16 sm:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[var(--sky)] block mb-1">
                  POPULAR DESTINATIONS
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--navy)] tracking-tight">
                  Where do you want to go?
                </h2>
                <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide mt-1">
                  FROM INDIA TO ANYWHERE IN THE WORLD.
                </p>
              </div>
              <Link
                href="/domestic-trips"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[var(--sky)] hover:text-[var(--navy)] uppercase tracking-wider transition-colors self-start md:self-end"
              >
                <span>Explore All Destinations</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* 5 Destination Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {POPULAR_DESTINATIONS.map((dest, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setDestination(dest.title === 'Somewhere Else?' ? '' : dest.title)
                    scrollToForm()
                  }}
                  className="bg-[#f7fbfd] rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer group"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1.5 text-base font-black leading-tight drop-shadow-sm">
                        <span>{dest.flag}</span>
                        <span>{dest.title}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                    <p className="text-[11px] font-semibold text-slate-700 leading-snug">
                      {dest.tag}
                    </p>
                    <p className="text-[10px] text-slate-500 leading-normal border-t border-slate-200/80 pt-2 font-medium">
                      {dest.locations}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 5: HOW IT WORKS
        ========================================================================== */}
        <section className="w-full py-16 sm:py-20 bg-[#f7fbfd] border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-[var(--sky)] block mb-1">
                HOW IT WORKS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--navy)] tracking-tight">
                From your idea to a real itinerary.
              </h2>
              <p className="text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-widest mt-1">
                FROM “I WANT TO GO” TO “I&apos;M BOOKED.”
              </p>
            </div>

            {/* 4 Sequential Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              
              {/* Step 01 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs relative flex flex-col justify-between space-y-4 hover:border-[var(--sky)] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 font-mono">01</span>
                    <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[var(--sky)] flex items-center justify-center">
                      <FileText size={18} />
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-[var(--navy)] uppercase tracking-wider mb-2">
                    Tell us your idea
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Share your destination, dates, group size, budget and what kind of trip you&apos;re looking for.
                  </p>
                </div>
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                  ➔
                </div>
              </div>

              {/* Step 02 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs relative flex flex-col justify-between space-y-4 hover:border-[var(--sky)] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 font-mono">02</span>
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Compass size={18} />
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-[var(--navy)] uppercase tracking-wider mb-2">
                    We build the plan
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Our team creates a personalised itinerary with the right stays, experiences and travel options.
                  </p>
                </div>
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                  ➔
                </div>
              </div>

              {/* Step 03 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs relative flex flex-col justify-between space-y-4 hover:border-[var(--sky)] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 font-mono">03</span>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <HeartHandshake size={18} />
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-[var(--navy)] uppercase tracking-wider mb-2">
                    You make it yours
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Review the plan, share your feedback and we&apos;ll make changes until it feels right.
                  </p>
                </div>
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                  ➔
                </div>
              </div>

              {/* Step 04 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs relative flex flex-col justify-between space-y-4 hover:border-[var(--sky)] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 font-mono">04</span>
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <Plane size={18} />
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-[var(--navy)] uppercase tracking-wider mb-2">
                    Pack your bags
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Once you&apos;re happy, we&apos;ll take care of the bookings and remaining logistics.
                  </p>
                </div>
              </div>

            </div>

            {/* Tagline stamp */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-extrabold text-[var(--navy)] shadow-xs">
                <span>You dream it.</span>
                <span className="text-[#e07a5f]">We plan it.</span>
                <span className="text-[var(--sky)]">You enjoy it.</span>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 6: WHAT CAN WE CUSTOMISE?
        ========================================================================== */}
        <section className="w-full py-16 sm:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
              <span className="text-xs font-black uppercase tracking-widest text-[var(--sky)] block mb-1">
                WHAT CAN WE CUSTOMISE?
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--navy)] tracking-tight">
                Make the trip yours.
              </h2>
            </div>

            {/* 8 Grid items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {CUSTOMISE_ITEMS.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#f7fbfd] border border-slate-200/70 hover:border-[var(--sky)]/60 hover:bg-white hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 text-[var(--sky)] flex items-center justify-center mb-3 shadow-xs group-hover:scale-110 transition-transform">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-sm font-black text-[var(--navy)] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 7: REVIEWS / REAL STORIES, REAL TRAVELLERS
        ========================================================================== */}
        <section className="w-full py-16 sm:py-20 bg-[#f7fbfd] border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[var(--sky)] block mb-1">
                  TRAVELLERS LOVE CUSTOM TRIPS
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--navy)] tracking-tight">
                  Real stories, real travellers.
                </h2>
              </div>
            </div>

            {/* 3 Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CUSTOM_TESTIMONIALS.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
                >
                  <div className="space-y-3">
                    {/* Stars */}
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic">
                      {item.quote}
                    </p>
                  </div>

                  {/* Author footer */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-slate-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[var(--navy)]">{item.name}</h4>
                      <p className="text-[11px] text-[var(--sky)] font-bold">{item.trip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 8: BOTTOM CTA BANNER
        ========================================================================== */}
        <section className="relative w-full py-20 sm:py-24 text-white overflow-hidden bg-[#0b2940]">
          {/* Panoramic sunset mountain backdrop */}
          <div className="absolute inset-0 z-0 opacity-40">
            <Image
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=88"
              alt="Hiker looking at mountain sunset"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b2940] via-[#0b2940]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-6">
              
              {/* Handwritten style doodle sticker */}
              <div className="inline-flex items-center gap-1.5 font-serif italic text-sm font-bold text-amber-300 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">
                <span>More Places · More Stories</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight">
                Your next adventure <br />
                is just a message away.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Tell us where you want to go and we&apos;ll take care of the rest.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToForm()}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[var(--navy)] hover:bg-[var(--sky)] hover:text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Plan Your Custom Trip</span>
                  <ArrowRight size={15} />
                </button>
                <a
                  href="https://wa.me/919975822023?text=Hi%20Travel%20Tribes,%20I%20want%20to%20plan%20a%20custom%20trip!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-emerald-400" />
                  <span>Or talk to a planner directly (+91 99758 22023)</span>
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>
    </PageFrame>
  )
}

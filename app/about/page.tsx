import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PageFrame } from '@/components/site-shell'
import { FaqAccordionSection } from '@/components/faq-accordion-section'
import { Newsletter } from '@/components/trip-components'
import {
  ArrowRight,
  Compass,
  Users,
  MapPin,
  Sparkles,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Flame,
  MessageCircle,
  Clock3,
  Globe2,
  Smile,
  Zap,
  Luggage,
  SmilePlus
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Travel Tribes - Don\'t Just Travel. Find Your Tribe.',
  description: 'Founded in Mumbai in 2022, Travel Tribes is a community-first travel brand creating group adventures across India and around the world.',
}

export default function AboutPage() {
  const stats = [
    { number: '10,000+', label: 'Travellers', sub: 'Wanderers welcomed' },
    { number: '1,000+', label: 'Trips', sub: 'Batches executed' },
    { number: '2022', label: 'Founded in Mumbai', sub: 'Community born' },
    { number: '∞', label: 'Stories & Inside Jokes', sub: 'Lifelong memories' },
  ]

  const howWeTravelSteps = [
    {
      title: 'COME SOLO',
      desc: 'You don’t need to find a group before you travel.',
      tag: 'Zero Wait Time',
      icon: Users
    },
    {
      title: 'MEET YOUR PEOPLE',
      desc: 'Travel with like-minded people who are just as excited to explore.',
      tag: 'Like-Minded Tribe',
      icon: SmilePlus
    },
    {
      title: 'EXPERIENCE MORE',
      desc: 'From local experiences to hidden gems, we care about what you actually experience.',
      tag: 'Real & Unhurried',
      icon: Compass
    },
    {
      title: 'MAKE MEMORIES',
      desc: 'Because the best souvenirs aren’t things you buy. They’re stories you keep telling.',
      tag: 'Lifelong Friends',
      icon: Sparkles
    },
  ]

  const whatWeDoCategories = [
    {
      emoji: '🏔️',
      title: 'Mountain Adventures',
      desc: 'For the people who’d choose a mountain view over a city skyline.',
      link: '/upcoming-trips'
    },
    {
      emoji: '🌊',
      title: 'Beach Escapes',
      desc: 'Sun, sand, sunsets and questionable decisions.',
      link: '/domestic-trips'
    },
    {
      emoji: '🎒',
      title: 'Backpacking Trips',
      desc: 'Go beyond the tourist checklist.',
      link: '/upcoming-trips'
    },
    {
      emoji: '🚗',
      title: 'Road Trips',
      desc: 'Windows down. Music up. Let’s see where the road goes.',
      link: '/domestic-trips'
    },
    {
      emoji: '🌍',
      title: 'International Group Trips',
      desc: 'New countries. New cultures. New stories.',
      link: '/international-trips'
    },
    {
      emoji: '🌅',
      title: 'Weekend Getaways',
      desc: 'Because you don’t need two weeks of leave to escape.',
      link: '/weekend-getaways'
    },
  ]

  const philosophies = [
    {
      title: 'PEOPLE > PLACES',
      desc: 'A great destination is better when you’re sharing it with great people.',
      icon: Users
    },
    {
      title: 'EXPERIENCES > CHECKLISTS',
      desc: 'We’d rather create one unforgettable moment than rush through ten forgettable ones.',
      icon: Compass
    },
    {
      title: 'CONNECTION > CONVENIENCE',
      desc: 'Travel has a way of bringing people together. We create the space for that to happen.',
      icon: Heart
    },
    {
      title: 'MEMORIES > MATERIAL THINGS',
      desc: 'Because you’ll remember the trip long after you forget what you bought instead.',
      icon: Sparkles
    },
  ]

  const journeyTimeline = [
    {
      year: '2022',
      title: 'The Spark in Mumbai',
      desc: 'Travel Tribes begins in Mumbai with a simple idea — make travel easier for people who want to explore but don’t have a travel partner.'
    },
    {
      year: 'Then',
      title: 'Strangers to Family',
      desc: 'The first trips bring together strangers who quickly become friends, forming lifelong travel bonds.'
    },
    {
      year: 'Along the way',
      title: 'Expanding Horizons',
      desc: 'More destinations across North & South India, more travellers, more stories, and a rapidly growing tribe.'
    },
    {
      year: 'Today',
      title: '10,000+ Explorers Strong',
      desc: '10,000+ travellers, 1,000+ trips, 4.9★ rating. And we’re still only getting started.'
    }
  ]

  return (
    <PageFrame>
      <main className="bg-white overflow-hidden">
        
        {/* HERO */}
        <section
          className="pt-16 pb-20 lg:pt-24 lg:pb-32 bg-gradient-to-b from-[var(--sky-pale)] via-white to-white relative overflow-hidden border-b border-[var(--border)]"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-[var(--sky)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--navy)]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest bg-white border border-[var(--sky)]/20 px-4 py-1.5 rounded-full mb-5 shadow-xs">
              <Sparkles size={14} className="text-[var(--sky)]" />
              <span>ABOUT US</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--navy)] tracking-tight leading-[1.08] mb-6 uppercase">
              Don't Just Travel. <br />
              <span className="text-[var(--sky)]">Find Your Tribe.</span>
            </h1>

            <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-5 font-medium">
              We’re building a new way to travel — one where strangers become friends, trips become stories, and you never have to wait for your friends to be free.
            </p>

            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mb-8">
              Founded in Mumbai in 2022, Travel Tribes is a community-first travel brand creating group adventures across India and around the world.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/upcoming-trips"
                className="glow-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-md"
              >
                Explore Upcoming Trips <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919975822023?text=Hi%20Travel%20Tribes,%20tell%20me%20more%20about%20your%20upcoming%20trips!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[var(--navy)] font-bold text-xs sm:text-sm border border-slate-200/80 shadow-xs transition-colors"
              >
                <MessageCircle size={16} className="text-emerald-500" />
                <span>Chat With Us</span>
              </a>
            </div>
          </div>
        </section>

        {/* HOW IT STARTED */}
        <section
          className="py-20 lg:py-28 bg-white border-b border-slate-100"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3 border border-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1300&q=85"
                  alt="Friends sharing a bonfire story outdoors"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-5 -right-5 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xl max-w-[240px]">
                <div className="text-[10px] font-extrabold text-[var(--sky)] uppercase tracking-wider mb-1">
                  Est. 2022 • Mumbai
                </div>
                <div className="text-xs sm:text-sm font-bold text-[var(--navy)]">
                  Created for the solo wanderer in everyone.
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-3">
                <Compass size={14} className="text-[var(--sky)]" />
                <span>HOW IT STARTED</span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--navy)] leading-tight mb-4 uppercase">
                It Started With A Simple Idea.
              </h2>
              
              <div className="text-base sm:text-lg font-bold text-[var(--sky)] mb-5 leading-snug">
                What if you didn't need a travel partner to travel?
              </div>

              <div className="space-y-4 text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed">
                <p>
                  Back in 2022, in Mumbai, Travel Tribes started with a simple belief:
                  <strong className="text-[var(--navy)] font-bold"> Travel shouldn't depend on whether your friends are free.</strong>
                </p>
                <p>
                  There were so many people who wanted to explore — but didn't have the right people, time, or group to go with.
                </p>
                <p className="p-4 bg-[var(--sky-pale)]/60 rounded-2xl border border-[var(--sky-pale)] text-[var(--navy)] font-semibold">
                  So we decided to create the group. <br />
                  <span className="text-[var(--sky)] font-bold">Not just another tour group. A community of travellers.</span>
                </p>
                <p className="font-medium text-slate-800">
                  And that's how Travel Tribes began.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHERE WE ARE TODAY (STATS) */}
        <section
          className="py-18 lg:py-24 bg-[var(--navy)] text-white relative overflow-hidden"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--sky)] to-transparent opacity-40" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--sky)]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-2">
              <Sparkles size={14} className="text-[var(--sky)]" />
              <span>WHERE WE ARE TODAY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight uppercase">
              A Lot Has Happened Since Then.
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              What started in Mumbai has grown into a community of travellers exploring destinations across India and beyond.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-md rounded-3xl p-6 text-center border border-white/10 hover:border-[var(--sky)]/50 transition-all group"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white group-hover:text-[var(--sky)] transition-colors mb-1">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200">
                  {stat.label}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1 font-medium">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <span className="inline-block text-xs sm:text-sm font-bold text-[var(--sky)] bg-white/10 px-5 py-2 rounded-full border border-white/15">
              And we're just getting started. 🔥
            </span>
          </div>
        </section>

        {/* WHAT WE ARE */}
        <section
          className="py-20 lg:py-28 bg-white border-b border-slate-100"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-3">
              <Users size={14} className="text-[var(--sky)]" />
              <span>WHAT WE ARE</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--navy)] leading-tight mb-6 uppercase">
              More Than A Travel Company.
            </h2>

            <p className="text-base sm:text-lg text-slate-800 font-bold mb-4 leading-relaxed">
              Travel Tribes is a community of people who love to travel.
            </p>

            <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed mb-8">
              We bring together solo travellers, friends, couples, and curious explorers through thoughtfully designed group trips, backpacking adventures, weekend getaways, and international journeys.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              <div className="bg-[var(--sky-pale)]/50 p-5 rounded-2xl border border-[var(--sky-pale)] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[var(--sky)] shrink-0 shadow-xs">
                  <Users size={20} />
                </div>
                <div>
                  <div className="font-bold text-[var(--navy)] text-sm">You can come alone.</div>
                  <div className="text-slate-500 text-xs mt-0.5">Most travellers join solo.</div>
                </div>
              </div>

              <div className="bg-[var(--sky-pale)]/50 p-5 rounded-2xl border border-[var(--sky-pale)] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[var(--sky)] shrink-0 shadow-xs">
                  <Heart size={20} />
                </div>
                <div>
                  <div className="font-bold text-[var(--navy)] text-sm">You can come with your people.</div>
                  <div className="text-slate-500 text-xs mt-0.5">Either way, you'll find more to explore with.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WE DON'T DO BORING */}
        <section
          className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-5xl mx-auto">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-3">
                <Flame size={14} className="text-amber-500" />
                <span>WE DON'T DO BORING</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--navy)] leading-tight mb-4 uppercase">
                Because Travel Should Actually Feel Like Travel.
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                We're not here to take you from one tourist spot to another and call it an adventure.
              </p>

              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md">
                <div className="text-xs font-extrabold text-[var(--sky)] uppercase tracking-wider mb-4">
                  We want you to:
                </div>
                <ul className="space-y-3">
                  {[
                    'Take the road less travelled.',
                    'Find hidden places.',
                    'Eat local.',
                    'Stay up too late.',
                    'Laugh with strangers.',
                    'Make plans that weren’t on the itinerary.',
                  ].map((point, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={13} className="stroke-[3]" />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-slate-100 text-center sm:text-left">
                  <span className="text-xs sm:text-sm font-bold text-[var(--navy)]">
                    “Our trips are planned. <strong className="text-[var(--sky)] font-extrabold">The best moments aren't.</strong>”
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 border border-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85"
                  alt="Beach sunset gathering with Travel Tribes"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* THE TRIBE */}
        <section
          className="py-20 lg:py-28 bg-[var(--sky-pale)]/40 relative border-b border-[var(--border)]"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-3">
                <Heart size={14} className="text-[var(--sky)]" />
                <span>THE TRIBE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--navy)] leading-tight uppercase">
                Strangers On Day One. <br />
                <span className="text-[var(--sky)]">Friends By The End.</span>
              </h2>
            </div>

            {/* Narrative Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[var(--sky-pale)] shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <MapPin size={20} className="text-[var(--sky)] mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-[var(--navy)]">One joins from Mumbai</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <MapPin size={20} className="text-[var(--sky)] mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-[var(--navy)]">Another joins from Pune</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                  <MapPin size={20} className="text-[var(--sky)] mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-[var(--navy)]">Someone comes from Delhi</div>
                </div>
              </div>

              <div className="space-y-4 text-center max-w-2xl mx-auto">
                <p className="text-sm sm:text-base font-medium text-slate-500">
                  Nobody knows anyone. And then the trip begins.
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 leading-relaxed">
                  A few days later, there's a shared playlist, too many photos, inside jokes nobody else understands, and a group chat that refuses to die.
                </p>
                <div className="pt-4">
                  <div className="inline-block text-base sm:text-xl font-black text-white bg-[var(--navy)] px-8 py-3 rounded-full shadow-md">
                    That’s the Tribe. ✨
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE TRAVEL */}
        <section
          className="py-20 lg:py-28 bg-white border-b border-slate-100"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-3">
              <Compass size={14} className="text-[var(--sky)]" />
              <span>HOW WE TRAVEL</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--navy)] leading-tight uppercase">
              Small Groups. Real Experiences. Good People.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {howWeTravelSteps.map((step, idx) => {
              const Icon = step.icon
              return (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-[var(--sky-pale)]/50 rounded-3xl p-6 sm:p-7 border border-slate-200/70 hover:border-[var(--sky)] transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white text-[var(--sky)] flex items-center justify-center shadow-xs">
                        <Icon size={20} />
                      </div>
                      <span className="text-[9.5px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-slate-600 border border-slate-200/60">
                        {step.tag}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-extrabold text-[var(--navy)] mb-2 uppercase">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* THE PEOPLE ON GROUND (TRIP CAPTAINS) */}
        <section
          className="py-20 lg:py-28 bg-[var(--navy)] text-white relative overflow-hidden"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-3">
                <ShieldCheck size={14} className="text-[var(--sky)]" />
                <span>THE PEOPLE ON GROUND</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5 uppercase">
                Meet Your Trip Captain.
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed mb-6">
                Every Travel Tribes adventure has an on-ground Trip Captain who travels with the group.
                They’re there to keep the trip moving, coordinate the logistics, help with the unexpected, and make sure everyone feels included.
              </p>

              {/* 3 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center sm:text-left">
                  <div className="text-[10px] font-extrabold text-[var(--sky)] uppercase tracking-wider mb-1">Logistics</div>
                  <div className="text-xs sm:text-sm font-bold text-white">Part coordinator.</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center sm:text-left">
                  <div className="text-[10px] font-extrabold text-[var(--sky)] uppercase tracking-wider mb-1">Safety</div>
                  <div className="text-xs sm:text-sm font-bold text-white">Part problem-solver.</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center sm:text-left">
                  <div className="text-[10px] font-extrabold text-[var(--sky)] uppercase tracking-wider mb-1">Energy</div>
                  <div className="text-xs sm:text-sm font-bold text-white">Part vibe-checker.</div>
                </div>
              </div>

              <div className="p-4 bg-[var(--sky)]/15 border border-[var(--sky)]/30 rounded-2xl">
                <p className="text-xs sm:text-sm font-bold text-slate-100">
                  ⚡ Basically, we’ve got the logistics. <span className="text-[var(--sky)]">You bring the energy.</span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-square border border-white/20 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=85"
                  alt="Travel Tribes Trip Captain with group"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section
          className="py-20 lg:py-28 bg-white border-b border-slate-100"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-3">
              <Globe2 size={14} className="text-[var(--sky)]" />
              <span>WHAT WE DO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--navy)] leading-tight uppercase">
              Wherever Your Vibe Takes You.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whatWeDoCategories.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                className="bg-[var(--sky-pale)]/30 hover:bg-[var(--sky-pale)] rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-[var(--sky)] transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md hover:-translate-y-1"
              >
                <div>
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] group-hover:text-[var(--sky)] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--sky)] group-hover:text-[var(--navy)] transition-colors">
                  <span>Explore Batches</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* WHAT WE BELIEVE (PHILOSOPHY) */}
        <section
          className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200/80"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-3">
              <Zap size={14} className="text-[var(--sky)]" />
              <span>WHAT WE BELIEVE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--navy)] leading-tight uppercase">
              Our Travel Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {philosophies.map((phil, idx) => {
              const Icon = phil.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-[var(--sky-pale)] text-[var(--sky)] flex items-center justify-center mb-4 font-bold">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-[var(--navy)] mb-2 uppercase tracking-wide">
                      {phil.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      {phil.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* THE JOURNEY SO FAR (TIMELINE) */}
        <section
          className="py-20 lg:py-28 bg-white border-b border-slate-100"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-3">
              <Clock3 size={14} className="text-[var(--sky)]" />
              <span>THE JOURNEY SO FAR</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--navy)] leading-tight uppercase">
              2022 → Today
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeyTimeline.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-extrabold text-[var(--sky)] uppercase tracking-wider mb-2">
                    {item.year}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--navy)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THE FUTURE */}
        <section
          className="py-20 lg:py-28 bg-[var(--sky-pale)]/50 border-b border-[var(--border)] text-center"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-3">
              <Globe2 size={14} className="text-[var(--sky)]" />
              <span>THE FUTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--navy)] leading-tight mb-6 uppercase">
              We're Just Getting Started.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
              There are still mountains to climb. Islands to discover. Roads to take. Countries to explore. And thousands of people we haven't met yet.
            </p>
            <div className="inline-block text-sm sm:text-base font-extrabold text-[var(--navy)] bg-white px-6 py-3 rounded-full border border-slate-200 shadow-xs">
              The Tribe is growing — and there's always room for one more. 🌍✨
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <FaqAccordionSection
          title="Frequently Asked Questions"
          eyebrow="WHY TRAVEL TRIBES"
          subtitle="Everything you need to know about our community trips, solo safety, trip captains, and bookings."
        />

        {/* FINAL CTA */}
        <section
          className="py-20 lg:py-28 bg-gradient-to-br from-[var(--navy)] via-[#0e3654] to-[var(--navy)] text-white relative overflow-hidden text-center"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--sky)]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-4">
              <Sparkles size={14} className="text-[var(--sky)]" />
              <span>FIND YOUR TRIBE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 uppercase">
              Your Friends Are Busy. <br />
              <span className="text-[var(--sky)]">Go Anyway.</span>
            </h2>

            <div className="space-y-1.5 text-slate-300 text-xs sm:text-sm lg:text-base mb-6">
              <p>You don't need the perfect group.</p>
              <p>You don't need to wait for everyone to say yes.</p>
              <p className="font-bold text-white">You just need to say yes yourself.</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold text-slate-200 mb-8">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[var(--sky)]" /> Meet new people.
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[var(--sky)]" /> Explore new places.
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[var(--sky)]" /> Find your tribe.
              </span>
            </div>

            <div className="text-sm sm:text-lg font-black tracking-wider uppercase text-[var(--sky)] mb-6">
              DON'T JUST TRAVEL. FIND YOUR TRIBE.
            </div>

            <Link
              href="/upcoming-trips"
              className="glow-btn inline-flex items-center gap-2 px-9 py-4 rounded-full font-black text-xs sm:text-sm shadow-xl hover:scale-105 transition-all uppercase tracking-wider"
            >
              Explore Trips <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>
    </PageFrame>
  )
}

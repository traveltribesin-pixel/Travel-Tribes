import type { Metadata } from 'next'
import Link from 'next/link'
import { PageFrame } from '@/components/site-shell'
import { FaqAccordionSection } from '@/components/faq-accordion-section'
import { CommunityBannerSection } from '@/components/community-banner-section'
import { Newsletter } from '@/components/trip-components'
import { Users, ShieldCheck, Compass, Sparkles, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Why Travel With Us | Safe Solo Travel & Verified Tribes | Travel Tribes',
  description: 'Discover why 10,000+ travellers choose Travel Tribes for solo trips, women-safe group tours, verified captains and curated itineraries across India and beyond.',
  openGraph: {
    title: 'Why Travel With Us | Safe Solo Travel & Verified Tribes | Travel Tribes',
    description: 'Discover why 10,000+ travellers choose Travel Tribes for solo trips, women-safe group tours, verified captains and curated itineraries across India and beyond.',
    images: ['/image/Logowithbg.png']
  }
}

export default function WhyUsPage() {
  const pillars = [
    {
      icon: Users,
      title: 'Community-Led & Solo Friendly',
      desc: 'Most of our travellers join solo. You don’t need to know anyone before the trip — shared moments turn strangers into family.',
      badge: 'Find Your Tribe'
    },
    {
      icon: Compass,
      title: 'On-Ground Trip Captains',
      desc: 'Every trip is accompanied by an experienced Trip Captain who manages logistics, stays, local travel, and keeps the group vibe high.',
      badge: 'Zero Stress'
    },
    {
      icon: ShieldCheck,
      title: '100% Safe For Solo Females',
      desc: 'Carefully vetted accommodations, verified transport, and supportive trip leaders ensure everyone feels comfortable and respected.',
      badge: 'Safety First'
    },
    {
      icon: Sparkles,
      title: 'Zero Boring Itineraries',
      desc: 'No rushed tourist checklists or cookie-cutter packages. We build unhurried experiences with room for spontaneous magic.',
      badge: 'Real Experiences'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Happy Explorers' },
    { number: '4.9 / 5.0', label: 'Google Rating' },
    { number: '70%+', label: 'Solo Travellers' },
    { number: '100%', label: 'Trip Captain Backed' },
  ]

  return (
    <PageFrame>
      <main className="bg-white">
        {/* Hero Section */}
        <section
          className="pt-16 pb-20 lg:pt-24 lg:pb-28 bg-[var(--sky-pale)] relative overflow-hidden border-b border-[var(--border)]"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--sky)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--navy)]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest bg-white/90 border border-[var(--sky)]/20 px-4 py-1.5 rounded-full mb-4 shadow-xs">
              <HeartHandshake size={14} className="text-[var(--sky)]" />
              <span>The Travel Tribes Difference</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--navy)] tracking-tight leading-[1.1] mb-6">
              Why Travel With <br />
              <span className="text-[var(--sky)]">Travel Tribes?</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              We are a new-age community travel brand bringing people together through unforgettable group journeys.
              Whether you come solo or with friends, our goal is simple — explore more, meet great people, and find your tribe.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/upcoming-trips"
                className="glow-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm"
              >
                Explore Upcoming Trips <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919975822023?text=Hi%20Travel%20Tribes,%20I%20have%20a%20question%20about%20your%20trips!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[var(--navy)] font-bold text-xs sm:text-sm border border-slate-200/80 shadow-xs transition-colors"
              >
                Chat With Us
              </a>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="max-w-4xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 sm:p-5 text-center border border-white/80 shadow-xs"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[var(--navy)]">
                  {stat.number}
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 Pillars of Travel Tribes */}
        <section
          className="py-20 lg:py-28 bg-white border-b border-[var(--border)]"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest mb-2">
              Our Core Philosophy
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--navy)]">
              Built for real travellers, not tourists.
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              Here is what sets our group adventures apart from traditional packaged holidays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <div
                  key={idx}
                  className="bg-[var(--sky-pale)]/50 hover:bg-[var(--sky-pale)] rounded-3xl p-6 sm:p-7 border border-[var(--sky-pale)] hover:border-[var(--sky)] transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white text-[var(--sky)] group-hover:bg-[var(--sky)] group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
                        <Icon size={22} />
                      </div>
                      <span className="text-[9.5px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white text-slate-600 border border-slate-200/60">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* The Full FAQ Accordion Section */}
        <FaqAccordionSection
          title="Frequently Asked Questions"
          eyebrow="EVERYTHING EXPLAINED"
          subtitle="Clear, upfront answers to everything you wanted to know before booking your adventure."
        />

        {/* Community Banner */}
        <CommunityBannerSection />

        {/* Newsletter */}
        <Newsletter />
      </main>
    </PageFrame>
  )
}

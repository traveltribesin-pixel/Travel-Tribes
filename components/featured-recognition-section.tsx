'use client'

import React from 'react'
import { Award, CheckCircle2, ShieldCheck, Sparkles, Star } from 'lucide-react'

function MsmeLogo() {
  return (
    <div className="w-12 h-12 rounded-xl bg-amber-50/90 border border-amber-200/80 flex items-center justify-center shrink-0 p-1 shadow-sm group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="44" stroke="#1e3a8a" strokeWidth="4" strokeDasharray="6 3" />
        <circle cx="50" cy="50" r="32" fill="#ffffff" stroke="#d97706" strokeWidth="2.5" />
        <path d="M50 12 L50 20 M50 80 L50 88 M12 50 L20 50 M80 50 L88 50" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" />
        <text x="50" y="46" textAnchor="middle" fill="#1e3a8a" fontWeight="900" fontSize="18" fontFamily="sans-serif" letterSpacing="0.5">MSME</text>
        <text x="50" y="62" textAnchor="middle" fill="#d97706" fontWeight="800" fontSize="8" fontFamily="sans-serif">GOVT. OF INDIA</text>
      </svg>
    </div>
  )
}

function StartupIndiaLogo() {
  return (
    <div className="w-12 h-12 rounded-xl bg-orange-50/90 border border-orange-200/80 flex items-center justify-center shrink-0 p-1 shadow-sm group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="44" fill="#ffffff" />
        <path d="M22 66 C 30 38, 55 24, 78 20 C 72 45, 52 70, 22 66 Z" fill="#f97316" />
        <path d="M28 75 C 44 58, 62 48, 82 42 C 74 65, 56 80, 28 75 Z" fill="#16a34a" />
        <circle cx="68" cy="27" r="6" fill="#1e3a8a" />
        <text x="50" y="92" textAnchor="middle" fill="#1e3a8a" fontWeight="900" fontSize="11" fontFamily="sans-serif">#startupindia</text>
      </svg>
    </div>
  )
}

function LbbLogo() {
  return (
    <div className="w-12 h-12 rounded-xl bg-black border border-slate-800 flex items-center justify-center shrink-0 p-1 shadow-sm group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="16" fill="#000000" />
        <text x="50" y="56" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="32" fontFamily="sans-serif" letterSpacing="-1">LBB</text>
        <rect x="25" y="66" width="50" height="4" fill="#fbbf24" rx="2" />
      </svg>
    </div>
  )
}

function TheBetterIndiaLogo() {
  return (
    <div className="w-12 h-12 rounded-xl bg-emerald-50/90 border border-emerald-200/80 flex items-center justify-center shrink-0 p-1 shadow-sm group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="44" fill="#047857" />
        <circle cx="50" cy="50" r="39" fill="#065f46" />
        <path d="M50 20 C 65 30, 68 52, 50 68 C 32 52, 35 30, 50 20 Z" fill="#fbbf24" />
        <path d="M50 28 L50 62" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
        <text x="50" y="87" textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="8" fontFamily="sans-serif" letterSpacing="0.4">THE BETTER INDIA</text>
      </svg>
    </div>
  )
}

function YourStoryLogo() {
  return (
    <div className="w-12 h-12 rounded-xl bg-red-50/90 border border-red-200/80 flex items-center justify-center shrink-0 p-1 shadow-sm group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="88" height="88" rx="16" fill="#e11d48" />
        <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="34" fontFamily="sans-serif" letterSpacing="-1.5">YS</text>
        <text x="50" y="77" textAnchor="middle" fill="#fee2e2" fontWeight="800" fontSize="8.5" fontFamily="sans-serif" letterSpacing="0.8">YOURSTORY</text>
      </svg>
    </div>
  )
}

export const recognitionPartners = [
  {
    name: 'MSME',
    role: 'Govt. of India Registered',
    tag: 'Registered Enterprise',
    logo: <MsmeLogo />,
    description: 'Ministry of Micro, Small & Medium Enterprises verified travel brand.'
  },
  {
    name: 'Startup India',
    role: 'DPIIT Recognized',
    tag: 'Govt. Recognized',
    logo: <StartupIndiaLogo />,
    description: 'Recognized by DPIIT, Government of India for innovation in travel.'
  },
  {
    name: 'LBB',
    role: 'Little Black Book',
    tag: 'Featured Community',
    logo: <LbbLogo />,
    description: 'Recommended for authentic youth travel experiences, offbeat getaways & community trips.'
  },
  {
    name: 'The Better India',
    role: 'Inspiring Travel Stories',
    tag: 'Featured Story',
    logo: <TheBetterIndiaLogo />,
    description: 'Spotlighted for sustainable backpacking, local culture and community-first journeys.'
  },
  {
    name: 'YourStory',
    role: 'New-Age Travel Brand',
    tag: 'Media Spotlight',
    logo: <YourStoryLogo />,
    description: 'Covered as one of India’s fast-growing experiential group travel platforms.'
  }
]

export function FeaturedRecognitionSection() {
  // Duplicate array 4 times for seamless continuous infinite marquee loop
  const marqueeItems = [
    ...recognitionPartners,
    ...recognitionPartners,
    ...recognitionPartners,
    ...recognitionPartners
  ]

  return (
    <section className="relative w-full py-12 lg:py-16 bg-gradient-to-b from-[#f7fbfd] via-white to-[#f7fbfd] overflow-hidden border-y border-slate-100">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={14} />
          <span>AS SEEN & RECOGNIZED</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--navy)] tracking-tight uppercase">
          Making Noise Beyond the Group Chat.
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-medium">
          Featured by travel communities, publications & brands that love the way we travel.
        </p>
      </div>

      {/* Infinite Auto-Scrolling Marquee Track */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee-scroll 28s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="animate-marquee flex items-center gap-5 py-2">
          {marqueeItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-white/95 hover:bg-white px-5 py-4 rounded-2xl border border-slate-200/90 hover:border-[var(--sky)] shadow-[0_4px_16px_rgba(67,169,209,0.06)] hover:shadow-[0_8px_24px_rgba(67,169,209,0.14)] transition-all duration-300 min-w-[290px] sm:min-w-[320px] group cursor-default"
            >
              {item.logo}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="font-bold text-sm text-[var(--navy)] group-hover:text-[var(--sky)] transition-colors truncate">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-extrabold text-[var(--sky)] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 shrink-0">
                    {item.tag}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-slate-500 truncate">
                  {item.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges Bar Underneath */}
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200/70 text-center">
          <div className="flex items-center justify-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
            <ShieldCheck size={18} className="text-emerald-500" />
            <span>100% Verified Trips</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
            <Star size={18} className="text-amber-500 fill-amber-500" />
            <span>4.9★ (1,200+ Reviews)</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
            <CheckCircle2 size={18} className="text-[var(--sky)]" />
            <span>Solo-Female Friendly</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
            <Award size={18} className="text-[var(--sun)]" />
            <span>Experienced Captains</span>
          </div>
        </div>
      </div>
    </section>
  )
}


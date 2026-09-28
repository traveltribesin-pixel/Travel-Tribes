'use client'

import React from 'react'
import Image from 'next/image'
import { Award, CheckCircle2, ShieldCheck, Sparkles, Star } from 'lucide-react'

export const recognitionLogos = [
  {
    name: 'Maharashtra Tourism',
    src: '/image/Maha_Tourism_logo.jpg',
    width: 400,
    height: 300,
    className: 'h-14 sm:h-18 md:h-22 w-auto object-contain rounded-xl sm:rounded-2xl shadow-xs',
  },
  {
    name: 'MSME',
    src: '/image/msme_logo.png',
    width: 520,
    height: 520,
    className: 'h-16 sm:h-20 md:h-24 w-auto object-contain',
  },
  {
    name: 'Startup India',
    src: '/image/Startup-India_logo.png',
    width: 678,
    height: 199,
    className: 'h-11 sm:h-14 md:h-17 w-auto object-contain',
  },
  {
    name: 'Treebo Hotels',
    src: '/image/treebo-hotels-logo-startuptalky.jpg',
    width: 400,
    height: 250,
    className: 'h-14 sm:h-18 md:h-22 w-auto object-contain rounded-xl sm:rounded-2xl shadow-xs',
  },
  {
    name: 'The Hosteller',
    src: '/image/hostelers_logo.png',
    width: 400,
    height: 250,
    className: 'h-12 sm:h-16 md:h-20 w-auto object-contain',
  },
  {
    name: 'LBB',
    src: '/image/LBB_logo.jpg',
    width: 200,
    height: 200,
    className: 'h-16 sm:h-20 md:h-24 w-auto object-contain rounded-xl sm:rounded-2xl shadow-xs',
  },
  {
    name: 'The Better India',
    src: '/image/The_Better_India_id4voN7PrB_0.png',
    width: 820,
    height: 822,
    className: 'h-16 sm:h-20 md:h-24 w-auto object-contain',
  },
  {
    name: 'YourStory',
    src: '/image/yourstory-logo.jpg',
    width: 326,
    height: 341,
    className: 'h-16 sm:h-20 md:h-24 w-auto object-contain rounded-xl sm:rounded-2xl shadow-xs',
  },
]

export function FeaturedRecognitionSection() {
  // Repeating array for seamless continuous infinite marquee loop
  const marqueeLogos = [
    ...recognitionLogos,
    ...recognitionLogos,
    ...recognitionLogos,
    ...recognitionLogos,
  ]

  return (
    <section className="relative w-full py-10 sm:py-14 bg-gradient-to-b from-[#f7fbfd] via-white to-[#f7fbfd] overflow-hidden border-y border-slate-100">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] text-xs font-bold uppercase tracking-wider mb-2.5">
          <Sparkles size={14} />
          <span>AS SEEN & RECOGNIZED</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[var(--navy)] tracking-tight uppercase">
          Making Noise Beyond the Group Chat.
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mt-1.5 font-medium">
          Featured by travel communities, publications & brands that love the way we travel.
        </p>
      </div>

      {/* Infinite Auto-Sliding Logo Track with Prominent Large Sizing & Equal Spacing */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes logo-marquee-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-logo-marquee {
              display: flex;
              width: max-content;
              animation: logo-marquee-scroll 26s linear infinite;
            }
            @media (hover: hover) {
              .animate-logo-marquee:hover {
                animation-play-state: paused;
              }
            }
          `,
          }}
        />

        <div className="animate-logo-marquee flex items-center py-4">
          {marqueeLogos.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center shrink-0 w-48 sm:w-56 md:w-64 lg:w-72 h-20 sm:h-24 md:h-28 px-5 sm:px-8 transition-transform duration-300 hover:scale-105 select-none"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className={logo.className}
                priority={idx < 5}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges Bar Underneath */}
      {/* <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
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
      </div> */}
    </section>
  )
}

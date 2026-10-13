'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { HorizontalRail } from '@/components/trip-components'
import { TripCard } from '@/components/trip-card'
import { xmasNewYearTrips } from '@/lib/travel-data'

/* Helper to round coordinates to 1 decimal place to eliminate SSR/client float mismatch */
const r1 = (n: number) => Math.round(n * 10) / 10

/* --------------------------------------------------------------------------
   SVG Firework Burst 1: Golden Radiance (Gold / Amber / White)
--------------------------------------------------------------------------- */
function FireworkGold({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="goldCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
          <stop offset="35%" stopColor="#FBBF24" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#D97706" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldRay" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Outer Expansion Glow Ring */}
      <circle cx="100" cy="100" r="82" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 7" strokeOpacity="0.35" />
      <circle cx="100" cy="100" r="54" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2 5" strokeOpacity="0.45" />

      {/* Core Glow */}
      <circle cx="100" cy="100" r="22" fill="url(#goldCoreGlow)" />

      {/* Radiating Ray Sparks (16 angles) */}
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const len = i % 2 === 0 ? 76 : 58
        const x2 = r1(100 + Math.cos(rad) * len)
        const y2 = r1(100 + Math.sin(rad) * len)
        const dotR = i % 4 === 0 ? 3 : 2
        const dotLen = len + 10
        const dotX = r1(100 + Math.cos(rad) * dotLen)
        const dotY = r1(100 + Math.sin(rad) * dotLen)
        return (
          <g key={deg}>
            <line
              x1="100"
              y1="100"
              x2={x2}
              y2={y2}
              stroke="url(#goldRay)"
              strokeWidth={i % 2 === 0 ? '2' : '1.2'}
              strokeLinecap="round"
              strokeDasharray={i % 3 === 0 ? '4 3' : undefined}
            />
            {/* Sparkle Head */}
            <circle cx={dotX} cy={dotY} r={dotR} fill={i % 2 === 0 ? '#FEF08A' : '#FBBF24'} opacity={0.9} />
          </g>
        )
      })}

      {/* Central 4-point Diamond Star */}
      <path
        d="M100 86 Q100 100 86 100 Q100 100 100 114 Q100 100 114 100 Q100 100 100 86Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

/* --------------------------------------------------------------------------
   SVG Firework Burst 2: Celestial Cyan / Sky (Cyan / Electric Blue / White)
--------------------------------------------------------------------------- */
function FireworkCyan({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cyanCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ECFEFF" stopOpacity="1" />
          <stop offset="40%" stopColor="#22D3EE" stopOpacity="0.75" />
          <stop offset="80%" stopColor="#0284C7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cyanRay" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="78" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.3" />
      <circle cx="100" cy="100" r="48" stroke="#22D3EE" strokeWidth="1" strokeDasharray="2 4" strokeOpacity="0.4" />
      <circle cx="100" cy="100" r="20" fill="url(#cyanCoreGlow)" />

      {[15, 37.5, 60, 82.5, 105, 127.5, 150, 172.5, 195, 217.5, 240, 262.5, 285, 307.5, 330, 352.5].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const len = i % 2 === 0 ? 72 : 52
        const x2 = r1(100 + Math.cos(rad) * len)
        const y2 = r1(100 + Math.sin(rad) * len)
        const dotX = r1(100 + Math.cos(rad) * (len + 8))
        const dotY = r1(100 + Math.sin(rad) * (len + 8))
        return (
          <g key={deg}>
            <line
              x1="100"
              y1="100"
              x2={x2}
              y2={y2}
              stroke="url(#cyanRay)"
              strokeWidth={i % 2 === 0 ? '1.8' : '1'}
              strokeLinecap="round"
            />
            <circle cx={dotX} cy={dotY} r={i % 3 === 0 ? 2.8 : 1.8} fill="#A5F3FC" opacity={0.9} />
          </g>
        )
      })}

      <path
        d="M100 88 Q100 100 88 100 Q100 100 100 112 Q100 100 112 100 Q100 100 100 88Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

/* --------------------------------------------------------------------------
   SVG Firework Burst 3: Rose Festive Carnival (Rose / Coral / Gold)
--------------------------------------------------------------------------- */
function FireworkRose({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="roseCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF1F2" stopOpacity="1" />
          <stop offset="40%" stopColor="#FB7185" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#E11D48" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#9F1239" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="roseRay" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="70" stroke="#FB7185" strokeWidth="1" strokeDasharray="3 5" strokeOpacity="0.35" />
      <circle cx="100" cy="100" r="18" fill="url(#roseCoreGlow)" />

      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const len = i % 2 === 0 ? 66 : 48
        const x2 = r1(100 + Math.cos(rad) * len)
        const y2 = r1(100 + Math.sin(rad) * len)
        const dotX = r1(100 + Math.cos(rad) * (len + 9))
        const dotY = r1(100 + Math.sin(rad) * (len + 9))
        return (
          <g key={deg}>
            <line
              x1="100"
              y1="100"
              x2={x2}
              y2={y2}
              stroke="url(#roseRay)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx={dotX} cy={dotY} r={2.5} fill={i % 2 === 0 ? '#FDE047' : '#FECDD3'} opacity={0.95} />
          </g>
        )
      })}

      <path
        d="M100 90 Q100 100 90 100 Q100 100 100 110 Q100 100 110 100 Q100 100 100 90Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

/* --------------------------------------------------------------------------
   Small 4-point Twinkling Star
--------------------------------------------------------------------------- */
function TwinkleStar({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor">
      <path d="M12 0 Q12 12 0 12 Q12 12 12 24 Q12 12 24 12 Q12 12 12 0Z" />
    </svg>
  )
}

export function XmasNewYearSection() {
  if (!xmasNewYearTrips || xmasNewYearTrips.length === 0) return null

  return (
    <section 
      className="py-12 sm:py-16 relative overflow-hidden bg-[#060a12] text-white select-none"
      style={{
        paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
        paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
      }}
    >
      {/* Dynamic Keyframes for Celebration Fireworks */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fw-burst-pulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.82; }
          50% { transform: scale(1.08) rotate(4deg); opacity: 1; }
        }
        @keyframes fw-burst-pulse-alt {
          0%, 100% { transform: scale(0.95) rotate(0deg); opacity: 0.75; }
          50% { transform: scale(1.06) rotate(-5deg); opacity: 0.98; }
        }
        @keyframes fw-twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes fw-drift {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .anim-fw-burst {
          animation: fw-burst-pulse 4.5s ease-in-out infinite;
        }
        .anim-fw-burst-alt {
          animation: fw-burst-pulse-alt 5s ease-in-out 1.2s infinite;
        }
        .anim-fw-twinkle-1 {
          animation: fw-twinkle 2.2s ease-in-out infinite;
        }
        .anim-fw-twinkle-2 {
          animation: fw-twinkle 3s ease-in-out 0.8s infinite;
        }
        .anim-fw-twinkle-3 {
          animation: fw-twinkle 2.6s ease-in-out 1.5s infinite;
        }
        .anim-fw-drift {
          animation: fw-drift 6s ease-in-out infinite;
        }
      `}} />

      {/* ---------------------------------------------------------------------
          FIREWORKS & AMBIENT NIGHT SKY BACKGROUND
      ---------------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Dark Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a12] via-[#090e1c] to-[#050810]" />

        {/* Ambient Color Glow Orbs */}
        <div className="absolute -top-16 left-[5%] w-80 h-80 bg-amber-500/12 rounded-full blur-3xl" />
        <div className="absolute -top-10 right-[8%] w-88 h-88 bg-sky-500/14 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-[20%] w-72 h-72 bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 right-[15%] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        {/* --- Fireworks Elements Placed Across the Sky (Compact & Elegant) --- */}

        {/* 1. Gold Firework (Top Left) */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-8 w-20 sm:w-28 md:w-36 aspect-square anim-fw-burst opacity-80">
          <FireworkGold className="w-full h-full drop-shadow-[0_0_10px_rgba(245,158,11,0.35)]" />
        </div>

        {/* 2. Cyan Firework (Top Right) */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-8 w-20 sm:w-28 md:w-36 aspect-square anim-fw-burst-alt opacity-80">
          <FireworkCyan className="w-full h-full drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]" />
        </div>

        {/* 3. Subtle Rose Firework (Near Center Heading) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:translate-x-24 w-14 sm:w-20 md:w-24 aspect-square anim-fw-burst opacity-45">
          <FireworkRose className="w-full h-full drop-shadow-[0_0_8px_rgba(244,63,94,0.25)]" />
        </div>

        {/* 4. Medium Cyan Firework (Mid Left) */}
        <div className="absolute top-48 left-1 sm:left-4 w-16 sm:w-22 md:w-28 aspect-square anim-fw-burst-alt opacity-45">
          <FireworkCyan className="w-full h-full drop-shadow-[0_0_8px_rgba(56,189,248,0.25)]" />
        </div>

        {/* 5. Medium Gold Firework (Mid / Bottom Right) */}
        <div className="absolute top-52 right-1 sm:right-6 w-16 sm:w-24 md:w-30 aspect-square anim-fw-burst opacity-50">
          <FireworkGold className="w-full h-full drop-shadow-[0_0_8px_rgba(245,158,11,0.25)]" />
        </div>

        {/* --- Floating Twinkling Sparkles --- */}
        <TwinkleStar className="absolute top-12 left-[18%] w-3.5 h-3.5 text-amber-300 anim-fw-twinkle-1 drop-shadow-[0_0_8px_#fde047]" />
        <TwinkleStar className="absolute top-20 left-[32%] w-2.5 h-2.5 text-white anim-fw-twinkle-2 drop-shadow-[0_0_6px_#ffffff]" />
        <TwinkleStar className="absolute top-8 right-[24%] w-4 h-4 text-cyan-300 anim-fw-twinkle-3 drop-shadow-[0_0_8px_#38bdf8]" />
        <TwinkleStar className="absolute top-24 right-[16%] w-3 h-3 text-rose-300 anim-fw-twinkle-1 drop-shadow-[0_0_8px_#fb7185]" />
        <TwinkleStar className="absolute top-36 left-[8%] w-2 h-2 text-amber-200 anim-fw-twinkle-2" />
        <TwinkleStar className="absolute top-44 right-[32%] w-2.5 h-2.5 text-sky-200 anim-fw-twinkle-3" />
        <TwinkleStar className="absolute bottom-16 left-[22%] w-3 h-3 text-amber-400 anim-fw-twinkle-1 drop-shadow-[0_0_6px_#f59e0b]" />
        <TwinkleStar className="absolute bottom-20 right-[20%] w-3.5 h-3.5 text-cyan-200 anim-fw-twinkle-2 drop-shadow-[0_0_8px_#38bdf8]" />
        <TwinkleStar className="absolute bottom-8 left-[45%] w-2 h-2 text-rose-200 anim-fw-twinkle-3" />

        {/* Top & Bottom Subtle Shimmer Lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/25 to-transparent" />
      </div>

      {/* ---------------------------------------------------------------------
          FOREGROUND CONTENT: HEADER, RAILS & CTA
      ---------------------------------------------------------------------- */}
      <div className="relative z-10">
        {/* Festive Centered Section Heading */}
        <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto mb-8 sm:mb-10">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-[0_0_18px_rgba(245,158,11,0.25)] mb-3 backdrop-blur-md">
            <span className="text-amber-300">✨</span>
            <span>Holiday Celebrations 🎉</span>
            <span className="text-amber-300">✨</span>
          </div>

          {/* Heading with Festive Spark */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex items-center justify-center gap-2 flex-wrap">
            <span>Xmas &amp; New Year Trips</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-amber-300">.</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-300/90 max-w-2xl leading-relaxed text-center font-normal drop-shadow-sm">
            Ring in 2027 with beach countdowns, snowy mountain bonfires, starry desert camps, and your travel tribe.
          </p>
        </div>

        {/* Horizontal Rail containing the trips */}
        <HorizontalRail label="Xmas & New Year trips">
          {xmasNewYearTrips.map(t => (
            <TripCard key={t.slug} trip={t} featured />
          ))}
        </HorizontalRail>

        {/* Centered Glow Button Below Cards */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <Link
            href="/xmas-new-year-trips"
            className="glow-btn inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 text-xs sm:text-sm font-extrabold rounded-full shadow-[0_0_30px_rgba(245,158,11,0.35)] !text-white cursor-pointer bg-gradient-to-r from-amber-500 via-rose-600 to-amber-500 hover:from-amber-600 hover:to-rose-700 border border-amber-300/40 transition-all duration-300 hover:scale-105 uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>See all Xmas & New Year trips ({xmasNewYearTrips.length})</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}


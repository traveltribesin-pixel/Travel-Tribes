'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Menu, X, Phone, Sparkles } from 'lucide-react'
import { primaryNavItems, subNavItems } from '@/lib/travel-data'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 shadow-sm">
      
      {/* =========================================================================
          1. MAIN PRIMARY NAVBAR (Light & Crisp)
      ========================================================================== */}
      <div className={`transition-all duration-300 ${scrolled
        ? 'bg-[#f7fbfd]/95 backdrop-blur-[14px] border-b border-slate-200/80'
        : 'bg-[#f7fbfd] border-b border-slate-200/60'
        }`}>
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 xl:gap-8 h-[68px] max-[560px]:h-[60px] w-full max-w-[1240px] px-3 sm:px-6 lg:px-8 mx-auto justify-between">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-[9px] text-[12px] leading-[0.92] font-bold tracking-[-0.03em] text-[var(--navy)] shrink-0"
            onClick={() => setOpen(false)}
          >
            {/* Desktop Logo */}
            <span className="inline-block max-[920px]:hidden">
              <Image
                src="/image/Logoblack.png"
                alt="Travel Tribes"
                width={105}
                height={42}
                className="w-auto h-auto max-h-9 object-contain"
                priority
              />
            </span>
            {/* Mobile Logo */}
            <span className="hidden max-[920px]:inline-block">
              <Image
                src="/image/Logoblack.png"
                alt="Travel Tribes"
                width={82}
                height={28}
                className="w-auto h-auto max-h-[26px] sm:max-h-7 object-contain"
                priority
              />
            </span>
          </Link>

          {/* Mobile Phone Link */}
          <div className="hidden max-[920px]:flex items-end justify-end flex-1 px-2">
            <a
              href="tel:+919975822023"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-xs font-bold text-[var(--navy)] hover:text-[var(--sky)] transition-all shadow-xs"
              aria-label="Call Travel Tribes"
            >
              <Phone size={15} className="text-[var(--sky)] shrink-0" />
            </a>
          </div>

          {/* Primary Navigation Links (Upper Bar) */}
          <nav className="flex items-center justify-center flex-1 gap-4 lg:gap-6 xl:gap-8 text-[11.5px] lg:text-[12px] xl:text-[12.5px] font-black tracking-[0.04em] uppercase max-[920px]:hidden">
            {primaryNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link-anim transition-colors duration-200 whitespace-nowrap inline-flex items-center gap-1.5 ${isActive
                    ? 'active text-[var(--navy)] font-black'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--navy)]'
                    }`}
                >
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Plan a Trip CTA Button */}
          <Link
            href="/plan-a-trip"
            className="glow-btn inline-flex items-center justify-center gap-2 px-4 xl:px-5 py-2.5 text-[11.5px] xl:text-[12px] font-bold rounded-full max-[920px]:hidden shrink-0 whitespace-nowrap"
          >
            Plan a trip <ArrowRight size={14} />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            className="hidden max-[920px]:block shrink-0 border-0 bg-transparent text-[var(--navy)] cursor-pointer p-1"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. SECONDARY SUB-NAVBAR (Desktop Only - Hidden on Mobile)
      ========================================================================== */}
      <div className="hidden max-[920px]:hidden min-[921px]:block w-full bg-[#0b2940] text-white border-t border-white/10 shadow-[0_4px_16px_rgba(11,41,64,0.25)]">
        <div className="max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8 h-11 sm:h-12 flex items-center justify-between gap-4">
          
          {/* Left subtle indicator */}
          <div className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-[#85cfe7] shrink-0">
            <span className="w-2 h-2 rounded-full bg-[var(--sky)] animate-pulse shadow-[0_0_8px_var(--sky)]"></span>
            <span>Featured Escapes</span>
          </div>

          {/* Centered Professional Button Pills */}
          <nav className="flex items-center justify-center gap-3 text-[11.5px] font-bold tracking-tight uppercase mx-auto shrink-0">
            {subNavItems.map((item) => {
              const isActive = pathname === item.href
              const isXmas = item.href === '/xmas-new-year-trips'
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11.5px] font-extrabold tracking-wide transition-all duration-300 whitespace-nowrap cursor-pointer group select-none ${isActive
                    ? 'bg-gradient-to-r from-[var(--sky)] to-[#258cb5] text-white border border-sky-300/60 shadow-[0_0_16px_rgba(67,169,209,0.55)] scale-[1.02]'
                    : 'bg-white/10 text-white/90 border border-white/15 hover:bg-white/20 hover:border-white/40 hover:text-white hover:shadow-[0_0_14px_rgba(67,169,209,0.35)] hover:-translate-y-0.5 active:scale-95'
                    }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[8.5px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-normal transition-transform group-hover:scale-105 ${isActive
                      ? 'bg-white text-[var(--navy)]'
                      : isXmas
                        ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-xs'
                        : 'bg-sky-400 text-[var(--navy)]'
                      }`}>
                      {item.badge}
                    </span>
                  )}
                  <ArrowRight
                    size={11}
                    className={`transition-all duration-300 ${isActive
                      ? 'opacity-100 translate-x-0 text-white'
                      : 'opacity-50 text-[#85cfe7] group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:text-white'
                      }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Right Micro Tagline */}
          <div className="flex items-center gap-2 text-[10.5px] font-bold text-[#85cfe7] shrink-0 uppercase tracking-wider">
            <span>Small Groups · Big Adventures</span>
          </div>

        </div>
      </div>

      {/* =========================================================================
          3. MOBILE NAVIGATION DRAWER (Clean All-in-One Menu on Mobile)
      ========================================================================== */}
      {open && (
        <nav className="absolute top-full left-0 w-full grid p-[16px_5vw_24px] gap-2 bg-[#f7fbfd]/98 backdrop-blur-[16px] border-b border-[var(--border)] shadow-2xl max-h-[85vh] overflow-y-auto" aria-label="Mobile navigation">
          
          {/* Primary Trips */}
          <Link
            href="/upcoming-trips"
            onClick={() => setOpen(false)}
            className={`py-2.5 px-3 rounded-xl text-[14px] font-bold flex items-center justify-between transition-colors ${pathname === '/upcoming-trips' ? 'bg-[var(--sky-pale)] text-[var(--sky)]' : 'text-slate-700 hover:bg-slate-100'}`}
          >
            <span>Upcoming trips</span>
          </Link>

          <Link
            href="/domestic-trips"
            onClick={() => setOpen(false)}
            className={`py-2.5 px-3 rounded-xl text-[14px] font-bold flex items-center justify-between transition-colors ${pathname === '/domestic-trips' ? 'bg-[var(--sky-pale)] text-[var(--sky)]' : 'text-slate-700 hover:bg-slate-100'}`}
          >
            <span>Domestic</span>
          </Link>

          <Link
            href="/international-trips"
            onClick={() => setOpen(false)}
            className={`py-2.5 px-3 rounded-xl text-[14px] font-bold flex items-center justify-between transition-colors ${pathname === '/international-trips' ? 'bg-[var(--sky-pale)] text-[var(--sky)]' : 'text-slate-700 hover:bg-slate-100'}`}
          >
            <span>International</span>
          </Link>

          <Link
            href="/weekend-getaways"
            onClick={() => setOpen(false)}
            className={`py-2.5 px-3 rounded-xl text-[14px] font-bold flex items-center justify-between transition-colors ${pathname === '/weekend-getaways' ? 'bg-[var(--sky-pale)] text-[var(--sky)]' : 'text-slate-700 hover:bg-slate-100'}`}
          >
            <span>Weekend getaways</span>
          </Link>

          <Link
            href="/xmas-new-year-trips"
            onClick={() => setOpen(false)}
            className={`py-2.5 px-3 rounded-xl text-[14px] font-bold flex items-center justify-between transition-colors ${pathname === '/xmas-new-year-trips' ? 'bg-[var(--sky-pale)] text-[var(--sky)]' : 'text-amber-800 bg-amber-50/70 hover:bg-amber-100'}`}
          >
            <span>Xmas & New Year</span>
            <span className="bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              🎉 Festive
            </span>
          </Link>

          <Link
            href="/corporate-trips"
            onClick={() => setOpen(false)}
            className={`py-2.5 px-3 rounded-xl text-[14px] font-bold flex items-center justify-between transition-colors ${pathname === '/corporate-trips' ? 'bg-[var(--sky-pale)] text-[var(--sky)]' : 'text-sky-800 bg-sky-50/70 hover:bg-sky-100'}`}
          >
            <span>Corporate Trips</span>
            <span className="bg-sky-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              Offsites
            </span>
          </Link>

          <Link
            href="/why-us"
            onClick={() => setOpen(false)}
            className={`py-2.5 px-3 rounded-xl text-[14px] font-bold flex items-center justify-between transition-colors ${pathname === '/why-us' ? 'bg-[var(--sky-pale)] text-[var(--sky)]' : 'text-slate-700 hover:bg-slate-100'}`}
          >
            <span>Why Us</span>
          </Link>

          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className={`py-2.5 px-3 rounded-xl text-[14px] font-bold flex items-center justify-between transition-colors ${pathname === '/about' ? 'bg-[var(--sky-pale)] text-[var(--sky)]' : 'text-slate-700 hover:bg-slate-100'}`}
          >
            <span>About us</span>
          </Link>

          {/* Plan a Trip Action CTA */}
          <Link
            className="mt-2 text-white bg-[var(--sky)] hover:bg-[var(--navy)] font-extrabold py-3 px-4 rounded-xl text-[14px] flex items-center justify-center gap-2 shadow-md transition-colors"
            href="/plan-a-trip"
            onClick={() => setOpen(false)}
          >
            Plan a trip <ArrowRight size={16} />
          </Link>
        </nav>
      )}

    </header>
  )
}

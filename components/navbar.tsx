'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Menu, X } from 'lucide-react'
import { navItems } from '@/lib/travel-data'

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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
      ? 'bg-[#f7fbfd]/95 backdrop-blur-[12px] border-b border-[var(--border)] shadow-sm'
      : 'bg-[#f7fbfd]/80 backdrop-blur-[8px] border-b border-transparent'
      }`}>
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8 h-[78px] max-[560px]:h-[68px] w-full max-w-[1240px] px-4 sm:px-6 lg:px-8 mx-auto justify-between">
        <Link
          href="/"
          className="flex items-center gap-[9px] text-[12px] leading-[0.92] font-bold tracking-[-0.03em] text-[var(--navy)] min-w-[105px] shrink-0"
          onClick={() => setOpen(false)}
        >
          {/* Desktop Logo */}
          <span className="inline-block max-[920px]:hidden">
            <Image
              src="/image/Logoblack.png"
              alt="Travel Tribes"
              width={105}
              height={42}
              style={{ objectFit: 'contain', height: 'auto' }}
              priority
            />
          </span>
          {/* Mobile Logo */}
          <span className="hidden max-[920px]:inline-block">
            <Image
              src="/image/Logoblack.png"
              alt="Travel Tribes"
              width={100}
              height={40}
              style={{ objectFit: 'contain', height: 'auto' }}
              priority
            />
          </span>
        </Link>

        <nav className="flex items-center justify-center flex-1 gap-3.5 lg:gap-4 xl:gap-6 text-[11.5px] lg:text-[12px] xl:text-[12.5px] font-black tracking-[0.04em] uppercase max-[920px]:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const isXmas = item.href === '/xmas-new-year-trips'
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link-anim transition-colors duration-200 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  isActive
                    ? 'active text-[var(--navy)] font-black'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--navy)]'
                }`}
              >
                <span>{item.label}</span>
                {isXmas && (
                  <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-amber-600 text-white text-[8px] xl:text-[9px] font-black px-1.5 py-0.5 rounded-full tracking-normal shadow-sm normal-case">
                    Festive
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <Link
          href="/contact"
          className="glow-btn inline-flex items-center justify-center gap-2 px-4 xl:px-5 py-2.5 text-[11.5px] xl:text-[12px] font-bold rounded-full max-[920px]:hidden shrink-0 whitespace-nowrap"
        >
          Plan a trip <ArrowRight size={14} />
        </Link>

        <button
          className="hidden max-[920px]:block ml-auto border-0 bg-transparent text-[var(--navy)] cursor-pointer p-1"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {
        open && (
          <nav className="absolute top-full left-0 w-full grid p-[14px_5vw_22px] gap-2 bg-[#f7fbfd]/98 backdrop-blur-[16px] border-b border-[var(--border)] shadow-xl" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isXmas = item.href === '/xmas-new-year-trips'
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`py-2.5 px-3 rounded-xl text-[14px] font-bold flex items-center justify-between transition-colors ${
                    pathname === item.href
                      ? 'bg-[var(--sky-pale)] text-[var(--sky)]'
                      : isXmas
                        ? 'text-amber-700 bg-amber-50/70'
                        : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {isXmas && (
                    <span className="bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      🎉 Festive
                    </span>
                  )}
                </Link>
              )
            })}
            <Link
              className="mt-2 text-white bg-[var(--sky)] font-bold py-3 px-4 rounded-xl text-[14px] flex items-center justify-center gap-2 shadow-md hover:bg-[var(--navy)] transition-colors"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Plan a trip <ArrowRight size={16} />
            </Link>
          </nav>
        )
      }
    </header>
  )
}

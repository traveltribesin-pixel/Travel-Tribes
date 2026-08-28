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
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
      ? 'bg-[#f7fbfd]/90 backdrop-blur-[12px] border-b border-[var(--border)] shadow-sm'
      : 'bg-transparent border-b border-transparent'
      }`}>
      <div className="flex items-center gap-[34px] h-[78px] max-[560px]:h-[68px] w-full max-w-[1160px] px-6 lg:px-8 mx-auto justify-between lg:justify-start">
        <Link
          href="/"
          className="flex items-center gap-[9px] text-[12px] leading-[0.92] font-bold tracking-[-0.03em] text-[var(--navy)] min-w-[112px]"
          onClick={() => setOpen(false)}
        >
          {/* Desktop Logo */}
          <span className="inline-block max-[850px]:hidden">
            <Image
              src="/image/Logoblack.png"
              alt="Travel Tribes"
              width={100}
              height={40}
              style={{ objectFit: 'contain', height: 'auto' }}
              priority
            />
          </span>
          {/* Mobile Logo */}
          <span className="hidden max-[850px]:inline-block">
            <Image
              src="/image/Logoblack.png"
              alt="Travel Tribes"
              width={110}
              height={45}
              style={{ objectFit: 'contain', height: 'auto' }}
              priority
            />
          </span>
        </Link>

        <nav className="flex items-center justify-center flex-1 gap-[36px] text-[13px] font-black tracking-[0.08em] uppercase max-[850px]:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link-anim transition-colors duration-200 hover:text-[var(--navy)] ${isActive ? 'active text-[var(--navy)] font-black' : 'text-[var(--muted-foreground)]'
                  }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Link
          href="/contact"
          className="glow-btn inline-flex items-center justify-center gap-[9px] px-[22px] py-[12px] text-[12px] font-bold rounded-full max-[850px]:hidden"
        >
          Plan a trip <ArrowRight size={15} />
        </Link>

        <button
          className="hidden max-[850px]:block ml-auto border-0 bg-transparent text-[var(--navy)] cursor-pointer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {
        open && (
          <nav className="absolute top-full left-0 w-full grid p-[14px_5vw_22px] gap-[4px] bg-[#f7fbfd]/95 backdrop-blur-[12px] border-b border-[var(--border)] shadow-md" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-[9px] text-[14px]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="text-[var(--sky)] font-bold py-[9px] text-[14px] flex items-center gap-[9px]"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Plan a trip <ArrowRight size={15} />
            </Link>
          </nav>
        )
      }
    </header >
  )
}

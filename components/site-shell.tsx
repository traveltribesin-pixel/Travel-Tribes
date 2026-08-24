'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from './navbar'
import { Mail, Phone } from 'lucide-react'

// Custom Brand Icons since Lucide removed them
const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const TwitterIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-[#0b2940] text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#43a9d1] to-transparent opacity-30"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#43a9d1]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#43a9d1]/5 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="max-w-[1160px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="mb-6 inline-block hover:opacity-90 transition-opacity">
              <Image 
                src="/image/Logowhite.png" 
                alt="Travel Tribes" 
                width={180} 
                height={54} 
                style={{ objectFit: 'contain', height: 'auto' }} 
              />
            </Link>
            <p className="text-[#a9c4d2] text-sm leading-relaxed mb-8 max-w-sm">
              Small groups. Big landscapes. We curate extraordinary journeys that go beyond the typical tourist trails. Travel that stays with you forever.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#43a9d1] hover:text-white transition-all duration-300 hover:-translate-y-1">
                <InstagramIcon size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#43a9d1] hover:text-white transition-all duration-300 hover:-translate-y-1">
                <FacebookIcon size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#43a9d1] hover:text-white transition-all duration-300 hover:-translate-y-1">
                <TwitterIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col items-center lg:items-start">
            <h3 className="text-[#85cfe7] text-xs font-extrabold uppercase tracking-[0.15em] mb-6">Explore</h3>
            <ul className="flex flex-col gap-4 items-center lg:items-start">
              <li>
                <Link href="/upcoming-trips" className="text-[#c8dce5] text-sm hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#43a9d1]/40 group-hover:bg-[#43a9d1] transition-colors"></span>
                  Upcoming trips
                </Link>
              </li>
              <li>
                <Link href="/domestic-trips" className="text-[#c8dce5] text-sm hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#43a9d1]/40 group-hover:bg-[#43a9d1] transition-colors"></span>
                  Domestic trips
                </Link>
              </li>
              <li>
                <Link href="/international-trips" className="text-[#c8dce5] text-sm hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#43a9d1]/40 group-hover:bg-[#43a9d1] transition-colors"></span>
                  International trips
                </Link>
              </li>
              <li>
                <Link href="/weekend-getaways" className="text-[#c8dce5] text-sm hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#43a9d1]/40 group-hover:bg-[#43a9d1] transition-colors"></span>
                  Weekend getaways
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
            <h3 className="text-[#85cfe7] text-xs font-extrabold uppercase tracking-[0.15em] mb-6">Company</h3>
            <ul className="flex flex-col gap-4 items-center lg:items-start">
              <li>
                <Link href="/about" className="text-[#c8dce5] text-sm hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#43a9d1]/40 group-hover:bg-[#43a9d1] transition-colors"></span>
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#c8dce5] text-sm hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#43a9d1]/40 group-hover:bg-[#43a9d1] transition-colors"></span>
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-[#c8dce5] text-sm hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#43a9d1]/40 group-hover:bg-[#43a9d1] transition-colors"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#c8dce5] text-sm hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                  <span className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#43a9d1]/40 group-hover:bg-[#43a9d1] transition-colors"></span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
            <h3 className="text-[#85cfe7] text-xs font-extrabold uppercase tracking-[0.15em] mb-6">Get in Touch</h3>
            <ul className="flex flex-col gap-5 items-center lg:items-start">
              <li>
                <a href="mailto:hello@traveltribes.in" className="flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-4 group text-center lg:text-left">
                  <div className="lg:mt-1 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#43a9d1] group-hover:bg-[#43a9d1] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    <Mail size={14} />
                  </div>
                  <div>
                    <span className="block text-white text-sm font-medium mb-1">Email us</span>
                    <span className="block text-[#c8dce5] text-sm group-hover:text-white transition-colors">hello@traveltribes.in</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-4 group text-center lg:text-left">
                  <div className="lg:mt-1 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#43a9d1] group-hover:bg-[#43a9d1] group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    <Phone size={14} />
                  </div>
                  <div>
                    <span className="block text-white text-sm font-medium mb-1">Call us</span>
                    <span className="block text-[#c8dce5] text-sm group-hover:text-white transition-colors">+91 98765 43210</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[#91afbd] text-xs">
            © {new Date().getFullYear()} Travel Tribes. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[#91afbd] text-xs">
            <span>Made for the curious</span>
            <div className="w-1 h-1 rounded-full bg-[#43a9d1]"></div>
            <span>Crafted with passion</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function PageFrame({ children }: { children: React.ReactNode }) { return <><Navbar />{children}<Footer /></> }

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from './navbar'

export function Footer() {
  return <footer className="footer"><div className="footer-top"><div><Link href="/" className="brand footer-brand"><Image src="/image/Logowhite.png" alt="Travel Tribes" width={140} height={38} style={{ objectFit: 'contain', height: 'auto' }} /></Link><p className="footer-note">Small groups. Big landscapes.<br />Travel that stays with you.</p></div><div className="footer-links"><div><span className="eyebrow">Explore</span><Link href="/upcoming-trips">Upcoming trips</Link><Link href="/domestic-trips">Domestic trips</Link><Link href="/international-trips">International trips</Link><Link href="/weekend-getaways">Weekend getaways</Link></div><div><span className="eyebrow">Company</span><Link href="/about">About us</Link><Link href="/contact">Contact us</Link><a href="mailto:hello@traveltribes.in">hello@traveltribes.in</a></div></div></div><div className="footer-bottom"><span>© 2026 Travel Tribes</span><span>Made for the curious</span></div></footer>
}

export function PageFrame({ children }: { children: React.ReactNode }) { return <><Navbar />{children}<Footer /></> }

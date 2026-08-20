'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HomeCtaSection() {
  return (
    <section className="home-cta">
      <div>
        <span className="eyebrow light">Your next great story</span>
        <h2>
          Go somewhere<br /><em>that changes you.</em>
        </h2>
        <Link className="button button-light" href="/contact">
          Start planning <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  )
}

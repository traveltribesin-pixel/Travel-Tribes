'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin, Search, Star } from 'lucide-react'
import type { Trip } from '@/lib/travel-data'

export function HorizontalRail({ children, label = 'Scrollable content' }: { children: React.ReactNode; label?: string }) { const ref = useRef<HTMLDivElement>(null); const move = (dir: number) => ref.current?.scrollBy({ left: dir * 340, behavior: 'smooth' }); return <div className="rail-wrap"><div className="rail-controls"><button aria-label={`Previous ${label}`} onClick={() => move(-1)}><ArrowLeft size={16} /></button><button aria-label={`Next ${label}`} onClick={() => move(1)}><ArrowRight size={16} /></button></div><div className="horizontal-rail" ref={ref} aria-label={label}>{children}</div></div> }
import { TripCard } from './trip-card'
export { TripCard }
export function TripExplorer({ trips }: { trips: Trip[] }) { const [query, setQuery] = useState(''); const [filter, setFilter] = useState('All'); const filtered = useMemo(() => trips.filter(t => (filter === 'All' || t.region === filter) && `${t.title} ${t.location}`.toLowerCase().includes(query.toLowerCase())), [trips, query, filter]); return <div><div className="explorer"><div className="search-wrap"><Search size={18} /><input aria-label="Search trips" value={query} onChange={e => setQuery(e.target.value)} placeholder="Where do you want to go?" /></div><div className="filter-tabs">{['All', 'Domestic', 'International', 'Weekend', 'Honeymoon'].map(item => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div></div>{filtered.length ? <div className="trip-grid">{filtered.map(trip => <TripCard key={trip.slug} trip={trip} />)}</div> : <div className="empty-state"><h3>No trips found</h3><p>Try a different destination or clear your filters.</p></div>}</div> }
export function SectionHeading({ eyebrow, title, text, href, label = 'See all trips' }: { eyebrow: string; title: string; text?: string; href?: string; label?: string }) { return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>{href && <Link className="text-link" href={href}>{label} <ArrowRight size={16} /></Link>}</div> }
export function ReviewCard({ quote, name, detail }: { quote: string; name: string; detail: string }) {
  return (
    <article className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(11,41,64,0.05)] flex flex-col justify-between w-[350px] shrink-0">
      <div>
        <div className="flex gap-0.5 text-amber-400 mb-6" aria-label="5 out of 5 stars">
          {[1,2,3,4,5].map(i => (
            <Star key={i} size={15} fill="currentColor" className="stroke-none" />
          ))}
        </div>
        <blockquote className="font-serif italic text-[18px] text-slate-700 leading-relaxed font-medium mb-6">
          “{quote}”
        </blockquote>
      </div>
      <div className="mt-auto">
        <strong className="font-sans font-bold text-sm text-slate-800 block">
          {name}
        </strong>
        <span className="text-xs text-slate-400 font-medium mt-1 block">
          {detail}
        </span>
      </div>
    </article>
  )
}
export function Newsletter() { return <section className="newsletter"><div><span className="eyebrow">A note from the road</span><h2>Good trips, straight<br />to your inbox.</h2></div><form onSubmit={e => e.preventDefault()}><label htmlFor="newsletter-email">Your email address</label><div><input id="newsletter-email" type="email" required placeholder="you@example.com" /><button type="submit" aria-label="Subscribe"><ArrowRight /></button></div><small>No spam. Just places worth going.</small></form></section> }

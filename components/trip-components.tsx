'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useRef, useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin, Search, Star } from 'lucide-react'
import type { Trip } from '@/lib/travel-data'

export function HorizontalRail({ children, label = 'Scrollable content' }: { children: React.ReactNode; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const move = (dir: number) => {
    const firstChild = ref.current?.firstElementChild as HTMLElement;
    const scrollAmount = firstChild ? firstChild.offsetWidth + 22 : 340;
    ref.current?.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  };
  return (
    <div className="rail-wrap relative">
      {/* Top right mobile controls removed as per user request */}

      {/* Desktop Controls (Left/Right Centered) */}
      <button
        aria-label={`Previous ${label}`}
        onClick={() => move(-1)}
        disabled={!canScrollLeft}
        className="hidden lg:grid absolute left-[-24px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 place-items-center bg-white border border-slate-200 rounded-full shadow-lg text-slate-800 transition-all hover:bg-slate-50 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        aria-label={`Next ${label}`}
        onClick={() => move(1)}
        disabled={!canScrollRight}
        className="hidden lg:grid absolute right-[-24px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 place-items-center bg-white border border-slate-200 rounded-full shadow-lg text-slate-800 transition-all hover:bg-slate-50 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white"
      >
        <ArrowRight size={20} />
      </button>

      {/* Scrollable Container */}
      <div className="horizontal-rail [&>*]:!w-[75%] [&>*]:!flex-none lg:[&>*]:!w-[calc((100%-44px)/3)]" ref={ref} onScroll={checkScroll} aria-label={label}>
        {children}
      </div>
    </div>
  )
}
import { TripCard } from './trip-card'
export { TripCard }
export function TripExplorer({ trips }: { trips: Trip[] }) { 
  const [query, setQuery] = useState(''); 
  const [filter, setFilter] = useState('All'); 
  const filtered = useMemo(() => trips.filter(t => (filter === 'All' || t.region === filter) && `${t.title} ${t.location}`.toLowerCase().includes(query.toLowerCase())), [trips, query, filter]); 

  const articlesCategories = [
    { value: 'All', title: 'All' },
    { value: 'Domestic', title: 'Domestic' },
    { value: 'International', title: 'International' },
    { value: 'Weekend', title: 'Weekend' },
    { value: 'Honeymoon', title: 'Honeymoon' },
  ];

  return <div>
    {/* Desktop Tabs & Search */}
    <div className="hidden lg:flex items-center justify-between mb-8 gap-4">
        {/* Custom Tabs */}
        <div className="flex items-center justify-between bg-[#F9F8FB] p-1 rounded-xl border border-gray-200 w-fit gap-2">
            {articlesCategories.map((category) => (
                <button
                    key={category.value}
                    onClick={() => setFilter(category.value)}
                    className={`
                        relative flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all
                        ${filter === category.value
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'bg-transparent text-gray-600 hover:text-gray-900'
                        }
                    `}
                >
                    <div
                        className={`h-2 w-2 rounded-full ${filter === category.value
                            ? 'bg-[#43a9d1]'
                            : 'bg-gray-400'
                            }`}
                    />
                    {category.title}
                </button>
            ))}
        </div>

        {/* Search bar - Desktop */}
        <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search trips..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 pr-4 w-full border border-gray-200 h-11 bg-white rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#43a9d1]"
            />
        </div>
    </div>

    {/* Mobile Tabs & Search */}
    <div className="lg:hidden mb-8 space-y-3 flex flex-col sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
        {/* Custom Tabs - Mobile */}
        <div className="flex gap-2 bg-[#F9F8FB] p-1 rounded-xl border border-gray-100 overflow-x-auto w-full sm:w-fit" style={{ scrollbarWidth: 'none' }}>
            {articlesCategories.map((category) => (
                <button
                    key={category.value}
                    onClick={() => setFilter(category.value)}
                    className={`
                        relative flex items-center gap-2 px-4 py-3 text-sm rounded-lg font-medium transition-all whitespace-nowrap
                        ${filter === category.value
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'bg-transparent text-gray-600 hover:text-gray-900'
                        }
                    `}
                >
                    <div
                        className={`h-2 w-2 rounded-full ${filter === category.value
                            ? 'bg-[#43a9d1]'
                            : 'bg-gray-400'
                            }`}
                    />
                    {category.title}
                </button>
            ))}
        </div>

        {/* Search bar - Mobile */}
        <div className="relative w-full sm:max-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search trips..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 pr-4 w-full bg-white border border-gray-200 h-12 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#43a9d1]"
            />
        </div>
    </div>

    {filtered.length ? <div className="trip-grid">{filtered.map(trip => <TripCard key={trip.slug} trip={trip} />)}</div> : <div className="empty-state"><h3>No trips found</h3><p>Try a different destination or clear your filters.</p></div>}
  </div> 
}
export function SectionHeading({ eyebrow, title, text, href, label = 'See all trips', center = false }: { eyebrow: string; title: string; text?: string; href?: string; label?: string; center?: boolean }) {
  return (
    <div className={`section-heading ${center ? 'relative w-full !flex !flex-col lg:!flex-row !justify-center !items-center mb-4! lg:mb-10!' : ''}`}>
      <div className={center ? 'flex flex-col items-center text-center w-full max-w-4xl' : ''}>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {text && <p className={center ? '!max-w-none w-full mt-3' : ''}>{text}</p>}
      </div>
      {href && (
        <div className={center ? 'mt-0 self-end lg:mt-0 lg:absolute lg:right-0 lg:bottom-0 lg:self-auto' : ''}>
          <Link className="text-link !mt-0" href={href}>
            {label} <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  )
}
export function ReviewCard({ quote, name, detail }: { quote: string; name: string; detail: string }) {
  return (
    <article className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(11,41,64,0.05)] flex flex-col justify-between w-[350px] shrink-0">
      <div>
        <div className="flex gap-0.5 text-amber-400 mb-6" aria-label="5 out of 5 stars">
          {[1, 2, 3, 4, 5].map(i => (
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
export function Newsletter() { 
  return (
    <section className="newsletter">
      <div className="max-[560px]:text-center max-[560px]:flex max-[560px]:flex-col max-[560px]:items-center">
        <span className="eyebrow">A note from the road</span>
        <h2>Good trips, straight<br />to your inbox.</h2>
      </div>
      <form onSubmit={e => e.preventDefault()}>
        <label htmlFor="newsletter-email">Your email address</label>
        <div>
          <input id="newsletter-email" type="email" required placeholder="you@example.com" />
          <button type="submit" aria-label="Subscribe"><ArrowRight /></button>
        </div>
        <small>No spam. Just places worth going.</small>
      </form>
    </section>
  ) 
}

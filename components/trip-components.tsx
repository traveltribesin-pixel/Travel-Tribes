'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useRef, useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin, Search, Star, ChevronDown, RotateCcw } from 'lucide-react'
import { filterUpcomingDates, getTripPrimaryDate } from '@/lib/date-utils'
import { toFestiveTrip, type Trip } from '@/lib/travel-data'

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
      <div className="horizontal-rail [&>*]:!w-[88%] sm:[&>*]:!w-[48%] md:[&>*]:!w-[45%] [&>*]:!flex-none lg:[&>*]:!w-[calc((100%-44px)/3)]" ref={ref} onScroll={checkScroll} aria-label={label}>
        {children}
      </div>
    </div>
  )
}
import { TripCard } from './trip-card'
export { TripCard }

const defaultCategories = [
  { value: 'All', title: 'All' },
  { value: 'Domestic', title: 'Domestic' },
  { value: 'International', title: 'International' },
  { value: 'Weekend', title: 'Weekend' },
  { value: 'Xmas & New Year', title: 'Xmas & New Year' },
];

const monthsList = [
  { value: 'All', label: 'All Months' },
  { value: 'Jan', label: 'January' },
  { value: 'Feb', label: 'February' },
  { value: 'Mar', label: 'March' },
  { value: 'Apr', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'Jun', label: 'June' },
  { value: 'Jul', label: 'July' },
  { value: 'Aug', label: 'August' },
  { value: 'Sep', label: 'September' },
  { value: 'Oct', label: 'October' },
  { value: 'Nov', label: 'November' },
  { value: 'Dec', label: 'December' },
];

export function TripExplorer({
  trips,
  categories,
}: {
  trips: Trip[];
  categories?: { value: string; title: string }[];
}) { 
  const [query, setQuery] = useState(''); 
  const [filter, setFilter] = useState('All'); 
  const [selectedMonth, setSelectedMonth] = useState('All');

  const activeCategories = categories || defaultCategories;

  const filtered = useMemo(() => {
    let sourceTrips = trips;
    if (filter === 'Xmas & New Year') {
      sourceTrips = trips
        .map((t) => toFestiveTrip(t))
        .filter((t): t is Trip => t !== null);
    }

    return sourceTrips.filter((t) => {
      // 1. Category Filter
      let matchesCategory = true;
      if (filter !== 'All' && filter !== 'Xmas & New Year') {
        matchesCategory = t.region === filter;
      }

      // 2. Month Filter (matches any upcoming date for this trip in that month)
      let matchesMonth = true;
      if (selectedMonth !== 'All') {
        const monthQuery = selectedMonth.toLowerCase();
        const upcoming = t.dates && t.dates.length > 0 ? filterUpcomingDates(t.dates) : [t.date];
        matchesMonth = upcoming.some((d) => d && d.toLowerCase().includes(monthQuery));
      }

      // 3. Search Query Filter
      let matchesQuery = true;
      if (query.trim() !== '') {
        const q = query.toLowerCase();
        const primaryDate = getTripPrimaryDate(t);
        matchesQuery = Boolean(
          `${t.title} ${t.location} ${t.tag || ''} ${t.region || ''} ${primaryDate}`
            .toLowerCase()
            .includes(q)
        );
      }

      return matchesCategory && matchesMonth && matchesQuery;
    });
  }, [trips, query, filter, selectedMonth]);

  const hasActiveFilters = filter !== 'All' || selectedMonth !== 'All' || query.trim() !== '';

  const resetFilters = () => {
    setFilter('All');
    setSelectedMonth('All');
    setQuery('');
  };

  return (
    <div>
      {/* Desktop & Mobile Filter Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-8 gap-4">
        {/* Custom Category Tabs */}
        <div
          className="flex items-center bg-[#F9F8FB] p-1.5 rounded-2xl border border-gray-200/90 w-fit gap-1 sm:gap-1.5 overflow-x-auto max-w-full shadow-sm"
          style={{ scrollbarWidth: 'none' }}
        >
          {activeCategories.map((category) => (
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              className={`
                relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap
                ${filter === category.value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'bg-transparent text-gray-500 hover:text-gray-900'
                }
              `}
            >
              <div
                className={`h-2 w-2 rounded-full transition-colors ${
                  filter === category.value ? 'bg-[#43a9d1]' : 'bg-gray-300'
                }`}
              />
              {category.title}
            </button>
          ))}
        </div>

        {/* Filter Controls (Month + Search Bar) */}
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          {/* Month Dropdown */}
          <div className="relative min-w-[160px] flex-1 sm:flex-initial">
            <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#43a9d1] pointer-events-none" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full pl-9.5 pr-8 h-11 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#43a9d1]/20 focus:border-[#43a9d1] cursor-pointer appearance-none shadow-sm transition-all"
              aria-label="Filter by month"
            >
              {monthsList.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Search bar */}
          <div className="relative min-w-[200px] flex-1 sm:w-64 sm:flex-initial">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search trips..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9.5 pr-8 w-full border border-gray-200 h-11 bg-white rounded-xl text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#43a9d1]/20 focus:border-[#43a9d1] shadow-sm transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center text-xs transition-colors"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              title="Reset all filters"
              className="h-11 px-3.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid or Empty State */}
      {filtered.length ? (
        <div className="trip-grid">
          {filtered.map((trip) => (
            <TripCard key={trip.slug} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="empty-state py-16 px-6 text-center bg-white rounded-3xl border border-gray-200/80 shadow-sm my-8 flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-[#43a9d1]/10 flex items-center justify-center text-[#43a9d1] mb-4">
            <CalendarDays className="w-7 h-7" />
          </div>
          <h3 className="font-sans font-bold text-xl text-slate-800 mb-2">No trips found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            We couldn&apos;t find any trips matching your selected filters. Try choosing a different month or category.
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#43a9d1] text-white rounded-xl text-sm font-semibold hover:bg-[#3592b5] transition-all shadow-md shadow-[#43a9d1]/20 hover:scale-[1.02]"
          >
            <RotateCcw className="w-4 h-4" />
            Reset all filters
          </button>
        </div>
      )}
    </div>
  )
}
export function SectionHeading({ eyebrow, title, text, href, label = 'See all trips', center = false }: { eyebrow: string; title: string; text?: string; href?: string; label?: string; center?: boolean }) {
  return (
    <div className={`section-heading ${center ? 'relative w-full !flex !flex-col lg:!flex-row !justify-center !items-center mb-4! lg:mb-6!' : ''}`}>
      <div className={center ? 'flex flex-col items-center text-center w-full max-w-4xl' : ''}>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="!text-xl sm:!text-2xl md:!text-3xl lg:!text-4xl font-extrabold text-[var(--navy)] leading-tight">{title}</h2>
        {text && <p className={center ? '!max-w-none w-full mt-1.5 sm:mt-2 text-xs sm:text-sm' : ''}>{text}</p>}
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
export function ReviewCard({
  quote,
  name,
  detail,
  role,
  reviewCount,
  photoCount,
  rating = 5,
  timeAgo
}: {
  quote: string
  name: string
  detail?: string
  role?: string
  reviewCount?: string
  photoCount?: string
  rating?: number
  timeAgo?: string
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isLong = quote.length > 170

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#72c3e4] hover:border-[var(--sky)] shadow-[0_4px_18px_rgba(67,169,209,0.12)] hover:shadow-[0_14px_32px_rgba(67,169,209,0.22)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between w-full h-[330px] sm:h-[340px]">
      <div className="flex flex-col">
        {/* Header: Avatar, Name & Google/Local Guide Badge */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--navy)] to-[var(--sky)] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <strong className="font-sans font-bold text-sm text-slate-900 truncate">
                {name}
              </strong>
              {role === 'Local Guide' && (
                <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-1.5 py-0.5 rounded flex items-center gap-1">
                  ★ Local Guide
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 font-medium truncate">
              {reviewCount ? `${reviewCount}${photoCount ? ` · ${photoCount}` : ''}` : (detail || 'Verified Google Review')}
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5 text-amber-400 mb-2.5" aria-label={`${rating} out of 5 stars`}>
          <div className="flex gap-0.5">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" className="stroke-none" />
            ))}
          </div>
          {timeAgo && <span className="text-[10px] text-slate-400 font-normal">· {timeAgo}</span>}
        </div>

        {/* Review Quote (Fixed 135px container: 6 lines clamped or internal scroll) */}
        {!isExpanded ? (
          <div className="h-[135px] flex flex-col justify-between overflow-hidden">
            <blockquote className="text-[13.5px] sm:text-[14px] text-slate-700 leading-[1.55] font-normal line-clamp-5">
              “{quote}”
            </blockquote>
            {isLong && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded(true)
                }}
                className="self-start text-[12px] font-bold text-[var(--sky)] hover:text-[var(--navy)] transition-colors cursor-pointer hover:underline mt-1"
              >
                ...more
              </button>
            )}
          </div>
        ) : (
          <div
            className="h-[135px] overflow-y-auto review-scroll pr-1.5 flex flex-col"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <blockquote className="text-[13.5px] sm:text-[14px] text-slate-700 leading-[1.55] font-normal">
              “{quote}”
            </blockquote>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(false)
              }}
              className="self-start text-[11px] font-bold text-slate-400 hover:text-[var(--sky)] transition-colors cursor-pointer underline mt-2 shrink-0 pb-1"
            >
              Show less
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[var(--sky)] font-semibold shrink-0">
        <span className="truncate max-w-[65%]">{detail || 'Verified Review'}</span>
        <span className="text-slate-400 text-[10px] shrink-0">Google Review</span>
      </div>
    </article>
  )
}
export function Newsletter() { 
  return (
    <section className="newsletter">
      <div className="max-[560px]:text-center max-[560px]:flex max-[560px]:flex-col max-[560px]:items-center">
        <span className="eyebrow">FROM THE TRIBE</span>
        <h2>Good trips. Great stories.<br />Straight to your inbox.</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md">
          Get first dibs on new trips, fresh destinations, travel inspiration and limited-seat adventures.
        </p>
      </div>
      <form onSubmit={e => e.preventDefault()}>
        <label htmlFor="newsletter-email">Your email address</label>
        <div>
          <input id="newsletter-email" type="email" required placeholder="you@example.com" />
          <button type="submit" aria-label="Subscribe"><ArrowRight /></button>
        </div>
        <small>No spam. Just trips worth taking.</small>
      </form>
    </section>
  ) 
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Share2, Sparkles, Tag, Users } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'
import { blogs, trips } from '@/lib/travel-data'
import { Newsletter } from '@/components/trip-components'

export function generateStaticParams() {
  return blogs.map((b) => ({
    slug: b.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const blog = blogs.find((b) => b.slug === resolvedParams.slug)
  if (!blog) return {}

  const blogImage = blog.image
    ? (blog.image.startsWith('http') ? blog.image : encodeURI(blog.image.startsWith('/') ? blog.image : `/${blog.image}`))
    : '/image/travel-tribes-og-group.jpg'

  return {
    title: blog.metaTitle || `${blog.title} | Travel Tribes Journal`,
    description: blog.metaDescription || blog.excerpt,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      url: `https://traveltribes.in/blog/${blog.slug}`,
      siteName: 'Travel Tribes',
      images: [
        {
          url: blogImage,
          width: 1200,
          height: 630,
          alt: blog.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: [blogImage]
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const blog = blogs.find((b) => b.slug === resolvedParams.slug)

  if (!blog) {
    notFound()
  }

  const isExcluded = (s?: string) => {
    if (!s) return true
    const lower = s.toLowerCase()
    return lower.includes('hampi') || lower === 'spiti-valley-chandrataal' || lower.includes('jawai')
  }
  const relatedTrip = (blog.relatedTripSlug && !isExcluded(blog.relatedTripSlug))
    ? trips.find((t) => t.slug === blog.relatedTripSlug && !t.date?.toLowerCase().includes('no upcoming'))
    : null
  const otherBlogs = blogs.filter((b) => b.slug !== blog.slug).slice(0, 3)

  return (
    <PageFrame>
      <main className="min-h-screen bg-[#f7fbfd] text-[var(--navy)] pb-20">
        
        {/* Article Header Container */}
        <article className="max-w-[880px] mx-auto px-5 sm:px-8 pt-8 sm:pt-12">
          
          {/* Back Navigation */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[var(--sky)] mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Travel Journal
          </Link>

          {/* Category & Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] text-[11px] font-extrabold uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Calendar size={13} className="text-slate-400" />
              {blog.date}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
              <Clock size={13} className="text-slate-400" />
              {blog.readTime}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[var(--navy)] leading-tight sm:leading-[1.2] mb-6 tracking-tight">
            {blog.title}
          </h1>

          {/* Author Byline */}
          <div className="flex items-center justify-between py-4 border-y border-slate-200/80 mb-8">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[var(--sky-pale)] shrink-0">
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-extrabold text-sm text-[var(--navy)]">{blog.author.name}</div>
                <div className="text-xs text-slate-500 font-medium">{blog.author.role}</div>
              </div>
            </div>

            {/* WhatsApp Share Button */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${blog.title} - Read on Travel Tribes: https://traveltribes.in/blog/${blog.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200/80 transition-all cursor-pointer"
            >
              <Share2 size={13} /> Share on WhatsApp
            </a>
          </div>

          {/* Featured Hero Image */}
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200/60 mb-10">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Article Lead Excerpt */}
          <p className="text-base sm:text-xl font-medium text-slate-700 leading-relaxed sm:leading-relaxed mb-8 border-l-4 border-[var(--sky)] pl-4 italic bg-sky-50/40 py-2 rounded-r-xl">
            {blog.excerpt}
          </p>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-5">
            {blog.content.map((paragraph, index) => {
              if (paragraph.startsWith('•') || paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.') || paragraph.startsWith('4.') || paragraph.startsWith('5.')) {
                return (
                  <div key={index} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs my-3">
                    <p className="font-semibold text-slate-800 leading-snug m-0">{paragraph}</p>
                  </div>
                )
              }
              if (paragraph.startsWith('Top Highlights') || paragraph.startsWith('Best Time') || paragraph.startsWith('Must-Do')) {
                return (
                  <h3 key={index} className="text-lg sm:text-xl font-extrabold text-[var(--navy)] mt-6 mb-2">
                    {paragraph}
                  </h3>
                )
              }
              return (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
              <Tag size={13} /> Tags:
            </span>
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-semibold px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Trip Card CTA */}
          {relatedTrip && (
            <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0b2940] to-[#124263] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--sky)]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[#f5be18] text-xs font-extrabold uppercase tracking-wider mb-2">
                    <Sparkles size={14} /> Experience this in real life
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black mb-2">{relatedTrip.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#a9c4d2]">
                    <span className="flex items-center gap-1"><MapPin size={12} className="text-[var(--sky)]" /> {relatedTrip.location}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={12} className="text-[var(--sky)]" /> {relatedTrip.duration}</span>
                    <span>•</span>
                    <span className="font-bold text-white text-sm">{relatedTrip.price}</span>
                  </div>
                </div>
                <Link
                  href={`/itinerary/${relatedTrip.slug}`}
                  className="glow-btn px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider whitespace-nowrap shrink-0 inline-flex items-center gap-2"
                >
                  View Itinerary <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}

        </article>

        {/* Read More Stories Grid */}
        {otherBlogs.length > 0 && (
          <section className="max-w-[1160px] mx-auto px-5 sm:px-8 mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-wider">More from the journal</span>
                <h2 className="text-xl sm:text-3xl font-black text-[var(--navy)]">Related Travel Notes</h2>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-[var(--sky)] hover:underline inline-flex items-center gap-1"
              >
                View all stories <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherBlogs.map((b) => (
                <Link
                  key={b.slug}
                  href={`/blog/${b.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-[var(--sky)] shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={b.image}
                      alt={b.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[10px] font-extrabold text-[var(--sky)] uppercase tracking-wider mb-2">{b.category}</span>
                    <h4 className="font-bold text-sm text-[var(--navy)] group-hover:text-[var(--sky)] transition-colors line-clamp-2 mb-3">
                      {b.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-auto mb-4">{b.excerpt}</p>
                    <span className="text-xs font-bold text-[var(--navy)] group-hover:text-[var(--sky)] inline-flex items-center gap-1">
                      Read story <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="max-w-[1160px] mx-auto px-5 sm:px-8 mt-16">
          <Newsletter />
        </div>

      </main>
    </PageFrame>
  )
}

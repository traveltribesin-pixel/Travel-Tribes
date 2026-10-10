import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'
import { blogs } from '@/lib/travel-data'
import { Newsletter } from '@/components/trip-components'

export const metadata: Metadata = {
  title: 'Travel Journal & Guides | Travel Tribes Blog',
  description: 'Read the latest travel stories, solo backpacking guides, trekking itineraries, and packing tips from Travel Tribes trip captains.',
  openGraph: {
    title: 'Travel Journal & Guides | Travel Tribes Blog',
    description: 'Read the latest travel stories, solo backpacking guides, trekking itineraries, and packing tips from Travel Tribes trip captains.',
    images: ['/image/Logowithbg.png']
  }
}

export default function BlogIndexPage() {
  const featuredBlog = blogs[0]
  const remainingBlogs = blogs.slice(1)

  return (
    <PageFrame>
      <main className="min-h-screen bg-[#f7fbfd] text-[var(--navy)] pb-20">
        
        {/* Header Hero */}
        <section className="bg-gradient-to-b from-sky-50/70 to-transparent py-12 sm:py-16 border-b border-slate-200/60">
          <div className="max-w-[1160px] mx-auto px-5 sm:px-8 text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--sky)] mb-3 block">
              THE TRAVEL JOURNAL
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-[var(--navy)] tracking-tight mb-4">
              Notes from the Road
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Stories, destination roadmaps, packing essentials, and honest advice from travellers who have explored every trail.
            </p>
          </div>
        </section>

        <div className="max-w-[1160px] mx-auto px-5 sm:px-8 pt-12">
          
          {/* Featured Top Story */}
          {featuredBlog && (
            <Link
              href={`/blog/${featuredBlog.slug}`}
              className="group block bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[var(--sky)] shadow-sm hover:shadow-xl transition-all duration-300 mb-14"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[280px] sm:min-h-[380px] overflow-hidden bg-slate-100">
                  <Image
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[var(--navy)]/90 text-white text-[11px] font-bold backdrop-blur-xs">
                    Featured Story
                  </div>
                </div>
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-[var(--sky)] uppercase tracking-wider block mb-3">
                      {featuredBlog.category}
                    </span>
                    <h2 className="text-xl sm:text-3xl font-black text-[var(--navy)] group-hover:text-[var(--sky)] transition-colors leading-tight mb-4">
                      {featuredBlog.title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                      {featuredBlog.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 text-xs text-slate-500 font-semibold">
                    <span className="flex items-center gap-1.5"><Calendar size={13} /> {featuredBlog.date}</span>
                    <span className="text-[var(--navy)] group-hover:text-[var(--sky)] font-bold inline-flex items-center gap-1.5 transition-colors">
                      Read full story <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid of All Other Blogs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {remainingBlogs.map((blog) => (
              <article
                key={blog.slug}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-[var(--sky)] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <Link href={`/blog/${blog.slug}`} className="block relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/95 text-[var(--navy)] text-[10px] font-extrabold backdrop-blur-xs shadow-xs">
                    {blog.category}
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-semibold mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
                  </div>

                  <h3 className="font-bold text-lg text-[var(--navy)] group-hover:text-[var(--sky)] transition-colors leading-snug mb-3">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-6">
                    {blog.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                        <Image src={blog.author.avatar} alt={blog.author.name} fill className="object-cover" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{blog.author.name}</span>
                    </div>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-xs font-bold text-[var(--sky)] hover:text-[var(--navy)] inline-flex items-center gap-1 transition-colors"
                    >
                      Read <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <Newsletter />

        </div>

      </main>
    </PageFrame>
  )
}

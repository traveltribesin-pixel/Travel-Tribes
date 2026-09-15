'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { blogs } from '@/lib/travel-data'

export function BlogSection() {
  return (
    <section className="w-full max-w-[1280px] py-12 sm:py-16 px-[5vw] mx-auto blog-section">
      <SectionHeading 
        eyebrow="The travel journal" 
        title="Notes from the road." 
        text="Travel tips, destination guides, and stories from our guides. Dive into our journal to fuel your wanderlust for your next trip."
        href="/about" 
        label="Read our journal" 
        center
      />
      <HorizontalRail label="Travel blog">
        {blogs.map(blog => (
          <article className="group relative bg-white rounded-3xl overflow-hidden border border-[var(--sky-pale)] hover:border-[var(--sky)] shadow-[0_4px_16px_rgba(67,169,209,0.08)] hover:shadow-[0_14px_30px_rgba(67,169,209,0.18)] transition-all duration-300 hover:-translate-y-1 flex flex-col w-[88vw] max-w-[340px] shrink-0" key={blog.title}>
            {/* Top image block */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50">
              <Image 
                src={blog.image} 
                alt="" 
                fill 
                sizes="(max-width: 700px) 80vw, 33vw" 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Card details body */}
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-[10px] font-extrabold text-[var(--sky)] uppercase tracking-widest leading-none block mb-3">
                {blog.category}
              </span>
              <h3 className="font-sans font-bold text-[17px] text-slate-800 leading-snug mb-5 hover:text-[var(--sky)] transition-colors line-clamp-2 min-h-[44px]">
                <Link href="/about">{blog.title}</Link>
              </h3>
              <Link className="text-xs font-extrabold text-slate-800 hover:text-[var(--sky)] transition-colors inline-flex items-center gap-1.5 mt-auto no-underline" href="/about">
                Read story <ArrowRight size={15} />
              </Link>
            </div>
          </article>
        ))}
      </HorizontalRail>
    </section>
  )
}

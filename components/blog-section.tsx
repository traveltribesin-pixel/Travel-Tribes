'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { blogs } from '@/lib/travel-data'

export function BlogSection() {
  return (
    <section className="w-full max-w-[1280px] py-[110px] max-[850px]:py-[75px] px-[5vw] mx-auto blog-section">
      <SectionHeading 
        eyebrow="The travel journal" 
        title="Notes from the road." 
        href="/about" 
        label="Read our journal" 
      />
      <HorizontalRail label="Travel blog">
        {blogs.map(blog => (
          <article className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(11,41,64,0.06)] flex flex-col w-[340px] shrink-0" key={blog.title}>
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

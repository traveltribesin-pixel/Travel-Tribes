import { Suspense } from 'react'
import type { Metadata } from 'next'
import { BookingContent } from './booking-content'

export const metadata: Metadata = {
  title: 'Book Your Trip | Travel Tribes',
  description: 'Reserve your spot for epic backpacking trips across India with Travel Tribes.'
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f7fbfd] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-[var(--sky)] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-slate-500">Loading booking checkout...</p>
          </div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  )
}

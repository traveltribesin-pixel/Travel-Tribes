'use client'

import { useState, useEffect } from 'react'
import { FileText, ExternalLink, Copy, Check, Clock, Calendar, Users, IndianRupee } from 'lucide-react'

interface HistoryItem {
  id: string
  slug: string
  title: string
  destination: string
  clientName?: string
  quote?: number | string
  createdAt?: string
}

export function ItineraryHistorySection() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecent() {
      setLoading(true)
      try {
        const res = await fetch('/api/curated-itinerary')
        const data = await res.json()
        if (data.success && Array.isArray(data.itineraries)) {
          setHistory(data.itineraries.slice(0, 6))
        }
      } catch (e) {
        console.warn('Failed to load recent itineraries:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchRecent()
  }, [])

  const copyUrl = (slug: string) => {
    const fullUrl = `${window.location.origin}/itinerary/${slug}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 2000)
  }

  if (history.length === 0 && !loading) {
    return null
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0077b6]" />
            Recently Generated Itineraries
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Quickly view and share live itinerary links you have generated.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {history.map(item => (
          <div
            key={item.id || item.slug}
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-sky-50/40 hover:border-sky-300 transition-colors flex flex-col justify-between gap-2.5"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{item.title}</h4>
                {item.quote && (
                  <span className="shrink-0 text-xs font-mono font-bold text-[#0077b6] bg-white px-1.5 py-0.5 rounded border border-sky-200">
                    ₹{Number(item.quote).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                {item.clientName ? `Guest: ${item.clientName} • ` : ''}{item.destination}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
              <a
                href={`/itinerary/${item.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#0077b6] hover:bg-[#005f92] text-white text-[11px] font-bold transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Open Live ↗
              </a>
              <button
                type="button"
                onClick={() => copyUrl(item.slug)}
                className="inline-flex items-center gap-1 py-1 px-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-300 transition-colors"
              >
                {copiedSlug === item.slug ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-500" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

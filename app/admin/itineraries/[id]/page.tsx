'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'
import { ItineraryEditor } from '@/components/admin/itinerary-editor'
import type { AdminTrip } from '@/lib/trips-store'

export default function EditItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id
  const router = useRouter()

  const [trip, setTrip] = useState<AdminTrip | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTrip() {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/itineraries/${id}`)
        const data = await res.json()
        if (data.success && data.trip) {
          setTrip(data.trip)
        } else {
          setError(data.error || 'Itinerary not found')
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching itinerary')
      } finally {
        setLoading(false)
      }
    }
    loadTrip()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-slate-400">
        <div className="w-8 h-8 border-3 border-[#00b4d8] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs">Loading itinerary details...</p>
      </div>
    )
  }

  if (error || !trip) {
    return (
      <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-8 text-center space-y-4">
        <Compass className="w-10 h-10 text-slate-500 mx-auto" />
        <h2 className="text-sm font-bold text-white">{error || 'Itinerary not found'}</h2>
        <Link
          href="/admin/itineraries"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
        >
          <ArrowLeft size={14} /> Back to Itineraries
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ItineraryEditor initialData={trip} isNew={false} />
    </div>
  )
}

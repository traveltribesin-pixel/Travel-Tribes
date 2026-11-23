'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Compass,
  Plus,
  Search,
  Filter,
  Edit3,
  Eye,
  Copy,
  Trash2,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
  RefreshCw,
  Sliders,
  Check,
  X,
  Database
} from 'lucide-react'
import type { AdminTrip } from '@/lib/trips-store'

export default function AdminItinerariesPage() {
  const [trips, setTrips] = useState<AdminTrip[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [regionFilter, setRegionFilter] = useState('All')
  const [placementFilter, setPlacementFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)
  const [syncingDb, setSyncingDb] = useState(false)

  const handleSyncDatabase = async () => {
    setSyncingDb(true)
    try {
      const res = await fetch('/api/admin/database', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        setMessage({ type: 'success', text: `Database synchronized successfully (${data.syncedCount}/${data.total} itineraries)!` })
      } else {
        setMessage({ type: 'error', text: data.error || 'Database sync completed in local mode.' })
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error syncing database' })
    } finally {
      setSyncingDb(false)
    }
  }

  const fetchTrips = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/itineraries')
      const data = await res.json()
      if (data.success && Array.isArray(data.trips)) {
        setTrips(data.trips)
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to fetch itineraries' })
      }
    } catch (err: any) {
      console.error(err)
      setMessage({ type: 'error', text: err.message || 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  // Handle Quick Status Toggle
  const handleToggleStatus = async (id: string) => {
    setActionLoadingId(id)
    try {
      const res = await fetch(`/api/admin/itineraries/${id}/status`, { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        setTrips((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status: data.status } : t))
        )
        setMessage({ type: 'success', text: `Trip status updated to ${data.status}` })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to toggle status' })
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error updating status' })
    } finally {
      setActionLoadingId(null)
    }
  }

  // Handle Duplicate / Clone
  const handleDuplicate = async (id: string) => {
    setActionLoadingId(id)
    try {
      const res = await fetch(`/api/admin/itineraries/${id}/duplicate`, { method: 'POST' })
      const data = await res.json()
      if (data.success && data.trip) {
        setTrips((prev) => [data.trip, ...prev])
        setMessage({ type: 'success', text: `Itinerary cloned as Draft: ${data.trip.title}` })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to duplicate itinerary' })
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error duplicating' })
    } finally {
      setActionLoadingId(null)
    }
  }

  // Handle Delete
  const handleDelete = async (id: string) => {
    setActionLoadingId(id)
    try {
      const res = await fetch(`/api/admin/itineraries/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setTrips((prev) => prev.filter((t) => t.id !== id))
        setMessage({ type: 'success', text: 'Itinerary deleted successfully.' })
        setDeleteConfirmId(null)
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to delete' })
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error deleting' })
    } finally {
      setActionLoadingId(null)
    }
  }

  // Filter trips
  const filteredTrips = trips.filter((t) => {
    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      const matchesSearch =
        t.title.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.tag.toLowerCase().includes(q)
      if (!matchesSearch) return false
    }

    // Region
    if (regionFilter !== 'All' && t.region !== regionFilter) {
      return false
    }

    // Status
    if (statusFilter !== 'All' && t.status !== statusFilter) {
      return false
    }

    // Placement
    if (placementFilter !== 'All') {
      switch (placementFilter) {
        case 'home':
          if (!t.placements?.showOnHome) return false
          break
        case 'upcoming':
          if (!t.placements?.showOnUpcoming) return false
          break
        case 'domestic':
          if (!t.placements?.showOnDomestic) return false
          break
        case 'international':
          if (!t.placements?.showOnInternational) return false
          break
        case 'weekend':
          if (!t.placements?.showOnWeekend) return false
          break
        case 'festive':
          if (!t.placements?.showOnFestive) return false
          break
      }
    }

    return true
  })

  // Quick stats
  const totalCount = trips.length
  const publishedCount = trips.filter((t) => t.status === 'published').length
  const draftCount = trips.filter((t) => t.status === 'draft').length
  const domesticCount = trips.filter((t) => t.region === 'Domestic').length
  const intlCount = trips.filter((t) => t.region === 'International').length
  const weekendCount = trips.filter((t) => t.placements?.showOnWeekend).length
  const festiveCount = trips.filter((t) => t.placements?.showOnFestive).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0b2940] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00b4d8] animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Itineraries & Placements CMS 🗺️
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Create, edit, duplicate, and route itineraries to specific website pages and sections.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleSyncDatabase}
            disabled={syncingDb}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 hover:text-cyan-200 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            title="Sync all itineraries to database"
          >
            <Database size={15} className={syncingDb ? 'animate-spin text-[#00b4d8]' : ''} />
            <span className="hidden sm:inline">Sync Database</span>
          </button>

          <button
            onClick={fetchTrips}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin text-[#00b4d8]' : ''} />
          </button>

          <Link
            href="/admin/itineraries/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#0096c7] hover:from-[#0096c7] hover:to-[#0077b6] text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-[#00b4d8]/20 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Create New Itinerary</span>
          </Link>
        </div>
      </div>

      {/* Alert Notification */}
      {message && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-white">
            &times;
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-[#0b2940] border border-slate-800 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Trips</div>
          <div className="text-xl font-black text-white mt-1">{totalCount}</div>
        </div>
        <div className="bg-[#0b2940] border border-slate-800 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-bold text-emerald-400">Published</div>
          <div className="text-xl font-black text-emerald-400 mt-1">{publishedCount}</div>
        </div>
        <div className="bg-[#0b2940] border border-slate-800 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-bold text-amber-400">Drafts</div>
          <div className="text-xl font-black text-amber-400 mt-1">{draftCount}</div>
        </div>
        <div className="bg-[#0b2940] border border-slate-800 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-bold text-[#00b4d8]">Domestic</div>
          <div className="text-xl font-black text-white mt-1">{domesticCount}</div>
        </div>
        <div className="bg-[#0b2940] border border-slate-800 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-bold text-purple-400">International</div>
          <div className="text-xl font-black text-white mt-1">{intlCount}</div>
        </div>
        <div className="bg-[#0b2940] border border-slate-800 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-bold text-sky-400">Weekend</div>
          <div className="text-xl font-black text-white mt-1">{weekendCount}</div>
        </div>
        <div className="bg-[#0b2940] border border-slate-800 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-bold text-amber-300">Festive Specials</div>
          <div className="text-xl font-black text-white mt-1">{festiveCount}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, route, slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Region */}
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00b4d8]"
          >
            <option value="All">All Regions</option>
            <option value="Domestic">Domestic</option>
            <option value="International">International</option>
            <option value="Weekend">Weekend</option>
            <option value="Xmas & New Year">Xmas & New Year</option>
          </select>

          {/* Placement */}
          <select
            value={placementFilter}
            onChange={(e) => setPlacementFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00b4d8]"
          >
            <option value="All">All Placements</option>
            <option value="home">Home Page</option>
            <option value="upcoming">Upcoming Trips</option>
            <option value="domestic">Domestic Trips</option>
            <option value="international">International Trips</option>
            <option value="weekend">Weekend Getaways</option>
            <option value="festive">Xmas & New Year</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00b4d8]"
          >
            <option value="All">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Trip Cards Grid */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#00b4d8] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs">Loading itineraries...</p>
        </div>
      ) : filteredTrips.length === 0 ? (
        <div className="bg-[#0b2940] border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Compass className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-sm font-bold text-white">No itineraries match your criteria</h3>
          <p className="text-xs text-slate-400">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrips.map((trip) => {
            const isPublished = trip.status === 'published'
            const activeBatchesCount = (trip.dates || []).length
            const hasSoldOut = (trip.dates || []).some((d) => d.toLowerCase().includes('sold out'))

            return (
              <div
                key={trip.id}
                className="bg-[#0b2940] border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={trip.image || '/image/travel-tribes-og-group.jpg'}
                      alt={trip.alt || trip.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b2940] via-transparent to-black/40" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {trip.region}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleToggleStatus(trip.id)}
                        disabled={actionLoadingId === trip.id}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-md transition-all ${
                          isPublished
                            ? 'bg-emerald-500 text-slate-950 font-black'
                            : 'bg-amber-500 text-slate-950 font-black'
                        }`}
                        title="Click to toggle Published / Draft status"
                      >
                        {trip.status}
                      </button>
                    </div>

                    {/* Bottom Info on Image */}
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="font-extrabold text-white text-[11px] drop-shadow-sm">
                        {trip.duration}
                      </span>
                      <span className="font-black text-emerald-400 bg-slate-950/80 px-2 py-0.5 rounded-md text-xs border border-emerald-500/30">
                        {trip.price}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-sm font-extrabold text-white line-clamp-1" title={trip.title}>
                        {trip.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono line-clamp-1 mt-0.5">
                        /itinerary/{trip.slug}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-300">
                      <MapPin size={13} className="text-[#00b4d8] shrink-0" />
                      <span className="truncate text-[11px]">{trip.location}</span>
                    </div>

                    {/* Departure Dates Summary */}
                    <div className="flex items-center gap-2 text-[11px]">
                      <div className="flex items-center gap-1 text-slate-300">
                        <Calendar size={12} className="text-[#00b4d8]" />
                        <span>{activeBatchesCount} Batches</span>
                      </div>
                      {hasSoldOut && (
                        <span className="px-1.5 py-0.2 rounded-md bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                          Sold Out Batch
                        </span>
                      )}
                    </div>

                    {/* Page & Section Placement Badges */}
                    <div className="pt-2 border-t border-slate-800">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                        <Sliders size={11} className="text-[#00b4d8]" />
                        <span>Routed To:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {trip.placements?.showOnHome && (
                          <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                            Home ({trip.placements.homeSection || 'Upcoming'})
                          </span>
                        )}
                        {trip.placements?.showOnUpcoming && (
                          <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-blue-950 text-blue-300 border border-blue-800/80">
                            Upcoming
                          </span>
                        )}
                        {trip.placements?.showOnDomestic && (
                          <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                            Domestic
                          </span>
                        )}
                        {trip.placements?.showOnInternational && (
                          <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-purple-950 text-purple-300 border border-purple-800/80">
                            International
                          </span>
                        )}
                        {trip.placements?.showOnWeekend && (
                          <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-amber-950 text-amber-300 border border-amber-800/80">
                            Weekend
                          </span>
                        )}
                        {trip.placements?.showOnFestive && (
                          <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-rose-950 text-rose-300 border border-rose-800/80">
                            Festive (Xmas/NY)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions Bar */}
                <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/admin/itineraries/${trip.id}`}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#00b4d8]/10 hover:bg-[#00b4d8] text-[#00b4d8] hover:text-slate-950 text-xs font-bold transition-all cursor-pointer"
                      title="Edit Itinerary"
                    >
                      <Edit3 size={13} />
                      <span>Edit</span>
                    </Link>

                    <a
                      href={`/itinerary/${trip.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="View Live Itinerary"
                    >
                      <Eye size={13} />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDuplicate(trip.id)}
                      disabled={actionLoadingId === trip.id}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Duplicate as Draft"
                    >
                      <Copy size={13} />
                    </button>
                  </div>

                  {/* Delete Button / Confirm */}
                  {deleteConfirmId === trip.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDelete(trip.id)}
                        disabled={actionLoadingId === trip.id}
                        className="px-2 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold cursor-pointer"
                      >
                        Yes, Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(trip.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Delete Itinerary"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

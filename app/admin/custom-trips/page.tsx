'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  Building2,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Users,
  Briefcase,
  DollarSign,
  Compass,
  FileSpreadsheet
} from 'lucide-react'
import type { CRMLead } from '@/lib/crm-store'

export default function CustomTripsPage() {
  const [leads, setLeads] = useState<CRMLead[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'CORPORATE' | 'CUSTOM'>('ALL')

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/leads')
      const data = await res.json()
      if (data.success) {
        // Filter only custom, corporate, or plan-a-trip leads
        const customOnly = data.leads.filter(
          (l: CRMLead) =>
            l.source.toLowerCase().includes('corporate') ||
            l.source.toLowerCase().includes('custom') ||
            l.source.toLowerCase().includes('plan a trip') ||
            l.source.toLowerCase().includes('popup') ||
            l.groupSize ||
            l.budget
        )
        setLeads(customOnly)
      }
    } catch (err) {
      console.error('Error fetching custom trip leads:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const isCorporate = l.source.toLowerCase().includes('corporate') || (l.meta?.isCorporate)
      if (categoryFilter === 'CORPORATE' && !isCorporate) return false
      if (categoryFilter === 'CUSTOM' && isCorporate) return false

      if (search.trim()) {
        const q = search.toLowerCase()
        return (
          l.fullName.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.tripTitle && l.tripTitle.toLowerCase().includes(q))
        )
      }

      return true
    })
  }, [leads, categoryFilter, search])

  const openWhatsApp = (lead: CRMLead) => {
    const cleanPhone = lead.phone.replace(/[^\d]/g, '')
    const msg = `Hi ${lead.fullName}! 👋 Greetings from Travel Tribes. We received your request for ${lead.tripTitle || 'a custom group trip'} (${lead.groupSize || 'Private Group'}). We would love to share a tailor-made proposal deck and budget options with you! When is a good time for a quick 5-min call? ✈️✨`
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Corporate & Custom Trips</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00b4d8]/15 text-[#00b4d8] border border-[#00b4d8]/30">
              High Value Inquiries
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage bespoke corporate retreats, private group packages, and custom itineraries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Category Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setCategoryFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                categoryFilter === 'ALL' ? 'bg-[#00b4d8] text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Requests ({leads.length})
            </button>
            <button
              onClick={() => setCategoryFilter('CORPORATE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                categoryFilter === 'CORPORATE' ? 'bg-[#00b4d8] text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              🏢 Corporate Offsites
            </button>
            <button
              onClick={() => setCategoryFilter('CUSTOM')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                categoryFilter === 'CUSTOM' ? 'bg-[#00b4d8] text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              🎒 Custom Trips
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company or client name, destination, phone..."
            className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs bg-slate-900/40 rounded-2xl border border-slate-800">
            No custom or corporate requests found.
          </div>
        ) : (
          filtered.map((item) => {
            const isCorp = item.source.toLowerCase().includes('corporate')
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 shadow-lg flex flex-col justify-between space-y-4 group transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isCorp
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {isCorp ? 'Corporate Offsite' : 'Custom Trip'}
                    </span>

                    <span className="text-[10px] text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-[#00b4d8] transition-colors">
                      {item.fullName}
                    </h3>
                    <p className="text-xs text-[#00b4d8] font-medium flex items-center gap-1.5 mt-0.5">
                      <Compass size={13} />
                      <span>{item.tripTitle || 'Custom Destination'}</span>
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1.5 text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Users size={12} /> Group Size:
                      </span>
                      <span className="font-bold text-white">{item.groupSize || 'Not specified'}</span>
                    </div>

                    {item.travelDates && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Calendar size={12} /> Dates:
                        </span>
                        <span className="text-white">{item.travelDates}</span>
                      </div>
                    )}

                    {item.budget && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <DollarSign size={12} /> Budget / Vibe:
                        </span>
                        <span className="text-emerald-400 font-bold">{item.budget}</span>
                      </div>
                    )}
                  </div>

                  {item.message && (
                    <p className="text-xs text-slate-400 italic line-clamp-2">
                      "{item.message}"
                    </p>
                  )}
                </div>

                {/* Outreach Action Bar */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openWhatsApp(item)}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp Pitch</span>
                  </button>

                  <a
                    href={`tel:${item.phone}`}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 cursor-pointer transition-all"
                    title="Call"
                  >
                    <Phone size={14} />
                  </a>

                  {item.email && (
                    <a
                      href={`mailto:${item.email}`}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 cursor-pointer transition-all"
                      title="Send Proposal Email"
                    >
                      <Mail size={14} />
                    </a>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

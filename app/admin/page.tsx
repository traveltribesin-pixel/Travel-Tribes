'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Users,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Phone,
  MessageCircle,
  Clock,
  ArrowUpRight,
  Plus,
  RefreshCw,
  FileSpreadsheet,
  CheckCircle2,
  ChevronRight,
  Calendar,
  Compass,
  DollarSign,
  Sparkles
} from 'lucide-react'
import type { CRMLead, CRMBooking, CRMActivity } from '@/lib/crm-store'

interface StatsData {
  totalLeads: number
  newLeads: number
  inProgressLeads: number
  convertedLeads: number
  totalBookings: number
  totalRevenueCollected: number
  totalPendingBalance: number
  totalGrossValue: number
  conversionRate: string
  leadsBySource: Record<string, number>
  topDestinations: { title: string; count: number }[]
  recentActivities: CRMActivity[]
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [recentLeads, setRecentLeads] = useState<CRMLead[]>([])
  const [recentBookings, setRecentBookings] = useState<CRMBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedWhatsAppLead, setSelectedWhatsAppLead] = useState<CRMLead | null>(null)
  const [customMsg, setCustomMsg] = useState('')

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const [statsRes, leadsRes, bookingsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/leads'),
        fetch('/api/admin/bookings')
      ])

      const statsData = await statsRes.json()
      const leadsData = await leadsRes.json()
      const bookingsData = await bookingsRes.json()

      if (statsData.success) setStats(statsData.stats)
      if (leadsData.success) setRecentLeads(leadsData.leads.slice(0, 6))
      if (bookingsData.success) setRecentBookings(bookingsData.bookings.slice(0, 5))
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      fetchDashboardData()
    } catch (err) {
      console.error('Failed to update lead status:', err)
    }
  }

  const openWhatsApp = (phone: string, text: string) => {
    const cleanPhone = phone.replace(/[^\d]/g, '')
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
      case 'CONTACTED':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30'
      case 'IN_PROGRESS':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      case 'FOLLOW_UP':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30'
      case 'CONVERTED':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
      case 'LOST':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30'
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-600'
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse font-black'
      case 'HIGH':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
      case 'MEDIUM':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30'
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700'
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Welcome & Refresh Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              CRM Control Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00b4d8]/15 border border-[#00b4d8]/30 text-[#00b4d8]">
              LIVE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time enquiries, bookings, traveller management & WhatsApp follow-ups.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-[#00b4d8]' : ''} />
            <span>Refresh Data</span>
          </button>

          <Link
            href="/curate-itinerary"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-amber-400/20 transition-all cursor-pointer"
          >
            <Sparkles size={15} />
            <span>Curate Itinerary ✨</span>
          </Link>

          <Link
            href="/admin/leads"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#0096c7] hover:from-[#0096c7] hover:to-[#0077b6] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#00b4d8]/20 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Manage Leads</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Leads */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Leads</span>
            <Users size={16} className="text-[#00b4d8]" />
          </div>
          <p className="text-2xl font-black text-white">
            {stats ? stats.totalLeads : '--'}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Across all web forms</p>
        </div>

        {/* New Uncontacted Leads */}
        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 shadow-sm relative overflow-hidden group hover:border-cyan-700/60 transition-all">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">New Actionable</span>
            <AlertCircle size={16} className="text-cyan-400 animate-pulse" />
          </div>
          <p className="text-2xl font-black text-cyan-300">
            {stats ? stats.newLeads : '--'}
          </p>
          <p className="text-[10px] text-cyan-400/70 mt-1">Needs first contact</p>
        </div>

        {/* Total Bookings */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Bookings</span>
            <CreditCard size={16} className="text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">
            {stats ? stats.totalBookings : '--'}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Confirmed trips</p>
        </div>

        {/* Revenue Collected */}
        <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-800/40 shadow-sm relative overflow-hidden group hover:border-emerald-700/60 transition-all">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Collected</span>
            <DollarSign size={16} className="text-emerald-400" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-emerald-300">
            ₹{stats ? stats.totalRevenueCollected.toLocaleString('en-IN') : '--'}
          </p>
          <p className="text-[10px] text-emerald-400/70 mt-1">Received via UPI/Razorpay</p>
        </div>

        {/* Pending Balance */}
        <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-800/40 shadow-sm relative overflow-hidden group hover:border-amber-700/60 transition-all">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Due Balance</span>
            <Clock size={16} className="text-amber-400" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-amber-300">
            ₹{stats ? stats.totalPendingBalance.toLocaleString('en-IN') : '--'}
          </p>
          <p className="text-[10px] text-amber-400/70 mt-1">Pending before departure</p>
        </div>

        {/* Conversion Rate */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Conversion</span>
            <TrendingUp size={16} className="text-purple-400" />
          </div>
          <p className="text-2xl font-black text-white">
            {stats ? `${stats.conversionRate}%` : '--'}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">Lead to booking ratio</p>
        </div>
      </div>

      {/* Main Grid: Inbound Leads Pipeline + Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Inbound Leads Pipeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#00b4d8]" />
              <h2 className="text-lg font-bold text-white tracking-tight">Recent Inbound Leads</h2>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs text-[#00b4d8] hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>View Full Pipeline</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl divide-y divide-slate-800 overflow-hidden shadow-lg">
            {recentLeads.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No leads recorded yet. Submissions from website forms will appear here in real time.
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 hover:bg-slate-800/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm truncate">{lead.fullName}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusBadge(lead.status)}`}>
                        {lead.status}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getPriorityBadge(lead.priority)}`}>
                        {lead.priority}
                      </span>
                    </div>

                    <p className="text-xs text-[#00b4d8] font-medium flex items-center gap-1.5">
                      <Compass size={12} />
                      <span>{lead.tripTitle || lead.source}</span>
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>{lead.phone}</span>
                      <span>•</span>
                      <span className="truncate">{lead.email}</span>
                      <span>•</span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  {/* 1-Click Action Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() =>
                        openWhatsApp(
                          lead.phone,
                          `Hi ${lead.fullName}! 👋 Thanks for checking out Travel Tribes for ${lead.tripTitle || 'our upcoming trips'}. We'd love to help you join the upcoming batch! When are you planning to travel? 🎒`
                        )
                      }
                      title="1-Click WhatsApp Chat"
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <MessageCircle size={13} />
                      <span>WhatsApp</span>
                    </button>

                    <a
                      href={`tel:${lead.phone}`}
                      title="Direct Phone Call"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                    >
                      <Phone size={13} />
                    </a>

                    {/* Quick Status Shift */}
                    <select
                      value={lead.status}
                      onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                      className="text-[11px] bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 focus:outline-none focus:border-[#00b4d8]"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="FOLLOW_UP">FOLLOW UP</option>
                      <option value="CONVERTED">CONVERTED</option>
                      <option value="LOST">LOST</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 1 Col: Recent Bookings & Destinations Demand */}
        <div className="space-y-6">
          {/* Confirmed Bookings Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white tracking-tight">Recent Bookings</h2>
              </div>
              <Link
                href="/admin/bookings"
                className="text-xs text-[#00b4d8] hover:underline font-semibold"
              >
                View All
              </Link>
            </div>

            <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl divide-y divide-slate-800 overflow-hidden shadow-lg">
              {recentBookings.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-xs">
                  No online bookings recorded yet.
                </div>
              ) : (
                recentBookings.map((b) => (
                  <div key={b.id} className="p-3.5 space-y-1.5 hover:bg-slate-800/40 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white truncate">{b.fullName}</span>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${
                          b.paymentStatus === 'PAID'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {b.paymentStatus === 'PAID' ? 'PAID FULL' : `DUE: ₹${b.balanceDue.toLocaleString('en-IN')}`}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#00b4d8] font-medium truncate">{b.tripTitle}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                      <span>{b.guests} Guests · {b.sharingType || 'Standard'}</span>
                      <span className="font-bold text-emerald-400">
                        ₹{b.paidAmount.toLocaleString('en-IN')} Paid
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top In-Demand Destinations */}
          {stats && stats.topDestinations && stats.topDestinations.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg space-y-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#00b4d8]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Top Requested Destinations
                </h3>
              </div>
              <div className="space-y-2">
                {stats.topDestinations.map((d, i) => (
                  <div key={d.title} className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 truncate max-w-[200px] font-medium">
                      {i + 1}. {d.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-[#00b4d8] font-bold">
                      {d.count} inquiries
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

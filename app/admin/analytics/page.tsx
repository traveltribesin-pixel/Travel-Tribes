'use client'

import { useEffect, useState } from 'react'
import {
  TrendingUp,
  Users,
  CreditCard,
  Compass,
  PieChart,
  BarChart3,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  Percent
} from 'lucide-react'

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
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats')
        const data = await res.json()
        if (data.success) setStats(data.stats)
      } catch (err) {
        console.error('Failed to load stats:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading || !stats) {
    return (
      <div className="p-12 text-center text-slate-400 text-xs flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#00b4d8] border-t-transparent rounded-full animate-spin" />
        <span>Loading Analytics & Pipeline Metrics...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Analytics & Conversion Insights</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Performance metrics, lead acquisition source distribution, and destination popularity.
        </p>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Pipeline Value</span>
            <DollarSign className="text-emerald-400 w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-white">₹{stats.totalGrossValue.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-400">Combined value of all bookings & proposals</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Conversion Ratio</span>
            <Percent className="text-purple-400 w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-purple-300">{stats.conversionRate}%</p>
          <p className="text-[11px] text-slate-400">Inquiry to confirmed traveller conversion</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Confirmed Bookings</span>
            <CreditCard className="text-[#00b4d8] w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-cyan-300">{stats.totalBookings}</p>
          <p className="text-[11px] text-slate-400">Successful reservations</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Pipeline</span>
            <Users className="text-amber-400 w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-amber-300">{stats.inProgressLeads + stats.newLeads}</p>
          <p className="text-[11px] text-slate-400">In discussion / follow-up stage</p>
        </div>
      </div>

      {/* Grid: Acquisition Source Breakdown + Top Destinations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Breakdown */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#00b4d8]" />
            <h2 className="text-base font-bold text-white tracking-tight">Lead Acquisition Channels</h2>
          </div>

          <div className="space-y-3">
            {Object.entries(stats.leadsBySource).map(([src, count]) => {
              const percent = stats.totalLeads > 0 ? Math.round((count / stats.totalLeads) * 100) : 0
              return (
                <div key={src} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium truncate max-w-[240px]">{src}</span>
                    <span className="font-bold text-white">{count} leads ({percent}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00b4d8] to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(percent, 5)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Destination Popularity */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white tracking-tight">Top Requested Trips & Destinations</h2>
          </div>

          <div className="space-y-3">
            {stats.topDestinations.map((dest, i) => (
              <div
                key={dest.title}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 font-bold text-xs flex items-center justify-center">
                    {i + 1}
                  </div>
                  <span className="font-bold text-xs text-white truncate max-w-[240px]">
                    {dest.title}
                  </span>
                </div>

                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
                  {dest.count} Requests
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

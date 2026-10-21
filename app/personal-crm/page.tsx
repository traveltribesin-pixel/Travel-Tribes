'use client'

import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Users,
  CreditCard,
  CheckSquare,
  FileText,
  Search,
  RefreshCw,
  Plus,
  Phone,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  Filter,
  DollarSign,
  Calendar,
  Clock,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Send,
  HelpCircle,
  Lock,
  Unlock,
  KeyRound,
  Download,
  Bell,
  X,
  ShieldCheck
} from 'lucide-react'
import { generateCRMInvoicePDF } from '@/lib/generate-crm-invoice-pdf'

type ActiveModule = 'leads' | 'bookings' | 'tasks' | 'invoices'

interface Lead {
  id: string
  source: string
  fullName: string
  email: string
  phone: string
  tripTitle?: string
  travelDates?: string
  groupSize?: string
  budget?: string
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'FOLLOW_UP' | 'CONVERTED' | 'LOST' | 'ARCHIVED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  notes: any[]
  isMovedToBooking?: boolean
  convertedBookingId?: string
  nextFollowUpDate?: string
  syncedFromSheet?: boolean
  createdAt: string
}

interface Booking {
  id: string
  leadId?: string
  source: string
  fullName: string
  phone: string
  email: string
  tripTitle: string
  date: string
  guests: number
  totalAmount: number
  paidAmount: number
  balanceDue: number
  paymentMode: string
  paymentStatus: 'PAID' | 'PARTIAL' | 'PENDING'
  bookingStatus: 'CONFIRMED' | 'PENDING_VERIFICATION' | 'CANCELLED'
  transactionRef?: string
  createdAt: string
}

interface Task {
  id: string
  title: string
  type: 'CALL' | 'WHATSAPP' | 'PAYMENT' | 'ITINERARY' | 'OTHER'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  status: 'PENDING' | 'COMPLETED'
  dueDate: string
  leadName?: string
  createdAt: string
}

interface Invoice {
  id: string
  invoiceNumber: string
  leadId?: string
  bookingId?: string
  customerName: string
  customerPhone: string
  customerEmail: string
  tripTitle: string
  travelDates: string
  guests: number
  totalAmount: number
  advancePaid: number
  balanceDue: number
  paymentStatus: 'PAID' | 'PARTIAL' | 'PENDING'
  whatsappUrl: string
  whatsappMessageText: string
  createdAt: string
}

export default function PersonalCRMPage() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('leads')

  // Data states
  const [leads, setLeads] = useState<Lead[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [stats, setStats] = useState<any>(null)

  // Loading & Sync states
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState<string | null>(null)
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null)

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [sourceFilter, setSourceFilter] = useState('ALL')
  const [showConvertedLeads, setShowConvertedLeads] = useState(false)
  const [filterTodayFollowUps, setFilterTodayFollowUps] = useState(false)

  // PIN Auth States (Point 1: Sales PIN 7404)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState<string | null>(null)

  // Real-Time Notification Toast (Point 8)
  const [newLeadNotification, setNewLeadNotification] = useState<string | null>(null)

  // Modals
  const [showNewLeadModal, setShowNewLeadModal] = useState(false)
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [copiedInvoiceId, setCopiedInvoiceId] = useState<string | null>(null)

  // New Lead Form State
  const [newLeadName, setNewLeadName] = useState('')
  const [newLeadPhone, setNewLeadPhone] = useState('')
  const [newLeadEmail, setNewLeadEmail] = useState('')
  const [newLeadTrip, setNewLeadTrip] = useState('')
  const [newLeadBudget, setNewLeadBudget] = useState('')
  const [newLeadDates, setNewLeadDates] = useState('')
  const [creatingLead, setCreatingLead] = useState(false)

  // New Task Form State
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDueDate, setNewTaskDueDate] = useState(new Date().toISOString().split('T')[0])
  const [newTaskType, setNewTaskType] = useState<'CALL' | 'WHATSAPP' | 'PAYMENT' | 'ITINERARY'>('CALL')
  const [newTaskPriority, setNewTaskPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('HIGH')
  const [creatingTask, setCreatingTask] = useState(false)

  // Check PIN session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unlocked = sessionStorage.getItem('tt_crm_unlocked') === 'true'
      setIsUnlocked(unlocked)
      setAuthChecked(true)
    }
  }, [])

  // Auto-polling every 30s for live arrivals (Point 8)
  useEffect(() => {
    if (!isUnlocked) return

    const interval = setInterval(async () => {
      try {
        const syncRes = await fetch('/api/personal-crm/sync', { method: 'POST' })
        const syncData = await syncRes.json()
        if (syncData.success) {
          if (syncData.addedLeads > 0) {
            setNewLeadNotification(`🎉 ${syncData.addedLeads} New Lead(s) Received from Google Sheets!`)
            setTimeout(() => setNewLeadNotification(null), 8000)
          }
          // Silent refresh CRM data
          loadCRMData(false)
        }
      } catch (err) {
        // Silent background catch
      }
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [isUnlocked])

  const handleUnlockPIN = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (pinInput.trim() === '7404') {
      sessionStorage.setItem('tt_crm_unlocked', 'true')
      setIsUnlocked(true)
      setPinError(null)
      setPinInput('')
    } else {
      setPinError('Incorrect PIN. Please enter the 4-digit Sales PIN.')
    }
  }

  const handleLockCRM = () => {
    sessionStorage.removeItem('tt_crm_unlocked')
    setIsUnlocked(false)
    setPinInput('')
  }

  // Fetch initial data and sync from Google Sheets on load
  const loadCRMData = async (triggerSync = false) => {
    try {
      if (triggerSync) setSyncing(true)

      // Sync from Google Sheet if requested
      if (triggerSync) {
        const syncRes = await fetch('/api/personal-crm/sync', { method: 'POST' })
        const syncData = await syncRes.json()
        if (syncData.success) {
          setSyncMessage(
            `✅ Google Sheets Synced: +${syncData.addedLeads} new leads (${syncData.totalLeads} total in CRM)`
          )
          setLastSyncedTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }))
          setTimeout(() => setSyncMessage(null), 5000)
        }
      }

      // Fetch all modules in parallel
      const [leadsRes, bookingsRes, tasksRes, invoicesRes, statsRes] = await Promise.all([
        fetch('/api/personal-crm/leads?includeConverted=true'),
        fetch('/api/personal-crm/bookings'),
        fetch('/api/personal-crm/tasks'),
        fetch('/api/personal-crm/invoices'),
        fetch('/api/personal-crm/stats')
      ])

      const [leadsData, bookingsData, tasksData, invoicesData, statsData] = await Promise.all([
        leadsRes.json(),
        bookingsRes.json(),
        tasksRes.json(),
        invoicesRes.json(),
        statsRes.json()
      ])

      if (leadsData.success) setLeads(leadsData.leads || [])
      if (bookingsData.success) setBookings(bookingsData.bookings || [])
      if (tasksData.success) setTasks(tasksData.tasks || [])
      if (invoicesData.success) setInvoices(invoicesData.invoices || [])
      if (statsData.success) {
        setStats(statsData.stats)
        if (statsData.stats.lastSyncedAt) {
          setLastSyncedTime(new Date(statsData.stats.lastSyncedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }))
        }
      }
    } catch (err) {
      console.error('Error loading CRM data:', err)
    } finally {
      setLoading(false)
      setSyncing(false)
    }
  }

  useEffect(() => {
    // Initial sync and load
    loadCRMData(true)
  }, [])

  // Create Manual Lead
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLeadName || !newLeadPhone) return
    try {
      setCreatingLead(true)
      const res = await fetch('/api/personal-crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: newLeadName,
          phone: newLeadPhone,
          email: newLeadEmail,
          tripTitle: newLeadTrip,
          budget: newLeadBudget,
          travelDates: newLeadDates,
          source: 'Manual CRM Entry'
        })
      })
      const data = await res.json()
      if (data.success) {
        setShowNewLeadModal(false)
        setNewLeadName('')
        setNewLeadPhone('')
        setNewLeadEmail('')
        setNewLeadTrip('')
        setNewLeadBudget('')
        setNewLeadDates('')
        loadCRMData(false)
      } else {
        alert(data.error || 'Failed to add lead')
      }
    } catch (err) {
      console.error('Error creating lead:', err)
    } finally {
      setCreatingLead(false)
    }
  }

  // Create Task
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle) return
    try {
      setCreatingTask(true)
      const res = await fetch('/api/personal-crm/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTaskTitle,
          dueDate: newTaskDueDate,
          type: newTaskType,
          priority: newTaskPriority
        })
      })
      const data = await res.json()
      if (data.success) {
        setShowNewTaskModal(false)
        setNewTaskTitle('')
        loadCRMData(false)
      }
    } catch (err) {
      console.error('Task create error:', err)
    } finally {
      setCreatingTask(false)
    }
  }

  // Toggle Task Completion
  const handleToggleTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/personal-crm/tasks?id=${taskId}`, { method: 'PATCH' })
      const data = await res.json()
      if (data.success) {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, status: t.status === 'PENDING' ? 'COMPLETED' : 'PENDING' } : t))
        )
      }
    } catch (err) {
      console.error('Task toggle error:', err)
    }
  }

  const todayStr = useMemo(
    () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date()),
    []
  )

  const todayFollowUpsCount = useMemo(() => {
    return leads.filter((l) => l.nextFollowUpDate && l.nextFollowUpDate <= todayStr && !l.isMovedToBooking).length
  }, [leads, todayStr])

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      // Exclude converted / moved to booking unless user checked "show converted"
      if (!showConvertedLeads && (l.isMovedToBooking || l.status === 'CONVERTED')) {
        return false
      }

      if (filterTodayFollowUps) {
        if (!l.nextFollowUpDate || l.nextFollowUpDate > todayStr) {
          return false
        }
      }

      if (statusFilter !== 'ALL' && l.status !== statusFilter) return false
      if (sourceFilter !== 'ALL' && l.source !== sourceFilter) return false

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return (
          l.fullName.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.tripTitle && l.tripTitle.toLowerCase().includes(q)) ||
          (l.source && l.source.toLowerCase().includes(q))
        )
      }
      return true
    })
  }, [leads, statusFilter, sourceFilter, searchQuery, showConvertedLeads, filterTodayFollowUps, todayStr])

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return (
          b.id.toLowerCase().includes(q) ||
          b.fullName.toLowerCase().includes(q) ||
          b.phone.toLowerCase().includes(q) ||
          b.tripTitle.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [bookings, searchQuery])

  // Unique sources for filter dropdown
  const uniqueSources = useMemo(() => {
    const set = new Set<string>()
    leads.forEach((l) => {
      if (l.source) set.add(l.source)
    })
    return Array.from(set)
  }, [leads])

  // Active leads count (excluding converted)
  const activeLeadsCount = useMemo(() => {
    return leads.filter((l) => !l.isMovedToBooking && l.status !== 'CONVERTED').length
  }, [leads])

  // Clean WhatsApp phone link
  const getWhatsAppLink = (phone: string, name?: string, trip?: string) => {
    const digits = phone.replace(/[^\d]/g, '')
    const formatted = digits.length === 10 ? `91${digits}` : digits
    const text = encodeURIComponent(
      `Hi ${name || 'there'}! Reaching out from Travel Tribes regarding your inquiry for ${trip || 'your trip'}. When are you planning to travel?`
    )
    return `https://wa.me/${formatted}?text=${text}`
  }

  // Format Status Badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">New</span>
      case 'CONTACTED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">Contacted</span>
      case 'IN_PROGRESS':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">In Progress</span>
      case 'FOLLOW_UP':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Follow Up</span>
      case 'CONVERTED':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Converted</span>
      case 'LOST':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">Lost</span>
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">{status}</span>
    }
  }

  // Render PIN Screen if not unlocked (Point 1: Sales PIN 7404)
  if (authChecked && !isUnlocked) {
    return (
      <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-sky-500 selection:text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-sky-600/15 via-indigo-600/15 to-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-sm w-full bg-[#0a142c] border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-sky-950/40 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-emerald-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-sky-950/80">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sales Security Gateway</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Travel Tribes CRM</h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter your 4-digit Sales PIN to access customer leads & bookings
            </p>
          </div>

          <form onSubmit={handleUnlockPIN} className="space-y-4">
            <div className="space-y-1.5">
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^\d]/g, '').slice(0, 4)
                  setPinInput(val)
                  setPinError(null)
                  if (val === '7404') {
                    sessionStorage.setItem('tt_crm_unlocked', 'true')
                    setIsUnlocked(true)
                  }
                }}
                placeholder="••••"
                className="w-full bg-slate-900/90 border border-slate-700 focus:border-sky-500 rounded-2xl py-3 text-center text-3xl font-mono tracking-[0.5em] text-white placeholder-slate-600 focus:outline-none transition-colors shadow-inner"
              />

              {pinError && (
                <p className="text-xs text-rose-400 font-medium flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={pinInput.length < 4}
              className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-950/50 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" /> Unlock CRM Dashboard
            </button>
          </form>

          {/* Quick Digit Pad */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Clear', '0', '⌫'].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  if (k === 'Clear') {
                    setPinInput('')
                    setPinError(null)
                  } else if (k === '⌫') {
                    setPinInput((prev) => prev.slice(0, -1))
                  } else {
                    if (pinInput.length < 4) {
                      const next = pinInput + k
                      setPinInput(next)
                      if (next === '7404') {
                        sessionStorage.setItem('tt_crm_unlocked', 'true')
                        setIsUnlocked(true)
                      }
                    }
                  }
                }}
                className="py-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-sm font-bold text-slate-200 transition-colors active:scale-95"
              >
                {k}
              </button>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <span>Sales PIN:</span>
            <button
              type="button"
              onClick={() => {
                setPinInput('7404')
                sessionStorage.setItem('tt_crm_unlocked', 'true')
                setIsUnlocked(true)
              }}
              className="font-mono text-sky-400 font-bold hover:underline"
            >
              7404 (Click to Auto-fill)
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Real-time New Lead Alert Toast (Point 8) */}
      {newLeadNotification && (
        <div className="fixed top-16 right-4 z-50 max-w-sm bg-gradient-to-r from-emerald-900 to-slate-900 border border-emerald-500/50 rounded-2xl p-4 shadow-2xl shadow-emerald-950/80 text-white flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-xs sm:text-sm">{newLeadNotification}</p>
            <p className="text-[11px] text-slate-300">Live data synced from Google Sheets.</p>
          </div>
          <button
            type="button"
            onClick={() => setNewLeadNotification(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TOP ENTERPRISE HEADER */}
      <header className="sticky top-0 z-40 bg-[#0a1329]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo & CRM Title */}
          <div className="flex items-center gap-3">
            <Link href="/personal-crm" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-emerald-500 flex items-center justify-center font-black text-white text-base shadow-md shadow-sky-950">
                TT
              </div>
              <div>
                <h1 className="text-base font-black tracking-tight text-white flex items-center gap-2">
                  TRAVEL TRIBES <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/40 uppercase font-mono tracking-wider">CRM</span>
                </h1>
                <p className="text-[11px] text-slate-400 font-medium">Zoho Format • Personal Sales CRM</p>
              </div>
            </Link>
          </div>

          {/* Google Sheets Sync Pill & Action */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Google Sheet Live</span>
              {lastSyncedTime && <span className="text-slate-400 font-mono text-[11px]">({lastSyncedTime})</span>}
            </div>

            <button
              type="button"
              onClick={() => loadCRMData(true)}
              disabled={syncing}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors shadow-sm"
              title="Fetch fresh submissions directly from Google Sheets"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Syncing...' : 'Sync Sheet'}</span>
            </button>

            {/* CSV Export Button in Header (Point 7) */}
            <a
              href={`/api/personal-crm/export?type=${activeModule === 'bookings' ? 'bookings' : 'leads'}`}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors shadow-sm"
              title={`Download ${activeModule === 'bookings' ? 'Bookings' : 'Leads'} CSV`}
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </a>

            <button
              type="button"
              onClick={() => setShowNewLeadModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow-sm shadow-sky-950 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> + New Lead
            </button>

            {/* Lock CRM Button (Point 1) */}
            <button
              type="button"
              onClick={handleLockCRM}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold rounded-lg border border-rose-800/40 transition-colors"
              title="Lock Sales CRM"
            >
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Lock</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <span>Website</span> <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Sync Success Banner */}
      {syncMessage && (
        <div className="bg-emerald-950/80 border-b border-emerald-500/40 text-emerald-300 text-xs py-2 px-4 text-center font-medium">
          {syncMessage}
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* MODULE SELECTOR TABS (ZOHO CRM TABS) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-4">
          <div className="flex items-center gap-1 sm:gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveModule('leads')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeModule === 'leads'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Leads</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeModule === 'leads' ? 'bg-sky-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {activeLeadsCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModule('bookings')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeModule === 'bookings'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Bookings</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeModule === 'bookings' ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {bookings.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModule('tasks')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeModule === 'tasks'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Tasks</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeModule === 'tasks' ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {tasks.filter((t) => t.status === 'PENDING').length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModule('invoices')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeModule === 'invoices'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Invoices</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeModule === 'invoices' ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {invoices.length}
              </span>
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeModule}...`}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* MODULE 1: LEADS VIEW (ZOHO CRM FORMAT) */}
        {/* ========================================================= */}
        {activeModule === 'leads' && (
          <div className="space-y-4">
            {/* Leads Quick Stats Strip (Point 5: Today's Follow-Ups Highlight) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-[#0e1938] border border-slate-800/90 rounded-xl p-3.5 shadow-sm">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Leads</p>
                <p className="text-xl font-black text-white mt-0.5">{activeLeadsCount}</p>
              </div>
              <div className="bg-[#0e1938] border border-slate-800/90 rounded-xl p-3.5 shadow-sm">
                <p className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">New Enquiries</p>
                <p className="text-xl font-black text-sky-300 mt-0.5">
                  {leads.filter((l) => l.status === 'NEW' && !l.isMovedToBooking).length}
                </p>
              </div>
              {/* Today's Follow-Ups Card (Clickable Quick Filter) */}
              <button
                type="button"
                onClick={() => setFilterTodayFollowUps((prev) => !prev)}
                className={`text-left rounded-xl p-3.5 shadow-sm transition-all border ${
                  filterTodayFollowUps
                    ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-500/30'
                    : 'bg-[#0e1938] border-amber-500/30 hover:border-amber-500/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">Today's Calls</p>
                  {todayFollowUpsCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  )}
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <p className="text-xl font-black text-amber-300">{todayFollowUpsCount}</p>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {filterTodayFollowUps ? '(Active)' : '(Filter)'}
                  </span>
                </div>
              </button>
              <div className="bg-[#0e1938] border border-slate-800/90 rounded-xl p-3.5 shadow-sm">
                <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">In Follow-Up</p>
                <p className="text-xl font-black text-indigo-300 mt-0.5">
                  {leads.filter((l) => ['IN_PROGRESS', 'FOLLOW_UP'].includes(l.status) && !l.isMovedToBooking).length}
                </p>
              </div>
              <div className="bg-[#0e1938] border border-slate-800/90 rounded-xl p-3.5 shadow-sm">
                <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Moved to Bookings</p>
                <p className="text-xl font-black text-emerald-300 mt-0.5">
                  {leads.filter((l) => l.isMovedToBooking || l.status === 'CONVERTED').length}
                </p>
              </div>
            </div>

            {/* Filter Bar with Today's Follow-up pill & Export CSV */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0b142c] p-3 rounded-xl border border-slate-800/80 text-xs">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Filter className="w-3.5 h-3.5" />
                  <span className="font-semibold">Filter:</span>
                </div>

                {/* Today's Follow-ups Quick Pill (Point 5) */}
                <button
                  type="button"
                  onClick={() => setFilterTodayFollowUps((prev) => !prev)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    filterTodayFollowUps
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950'
                      : 'bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Today's Follow-Ups ({todayFollowUpsCount})</span>
                </button>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-sky-500"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="NEW">🟢 New</option>
                  <option value="CONTACTED">💬 Contacted</option>
                  <option value="IN_PROGRESS">⚡ In Progress</option>
                  <option value="FOLLOW_UP">⏳ Follow Up</option>
                  <option value="CONVERTED">🎉 Converted</option>
                  <option value="LOST">❌ Lost</option>
                </select>

                {/* Source Filter */}
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-sky-500 max-w-[180px] truncate"
                >
                  <option value="ALL">All Sources</option>
                  {uniqueSources.map((src) => (
                    <option key={src} value={src}>
                      {src}
                    </option>
                  ))}
                </select>

                {/* Toggle converted leads */}
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200 select-none pl-2 border-l border-slate-800">
                  <input
                    type="checkbox"
                    checked={showConvertedLeads}
                    onChange={(e) => setShowConvertedLeads(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-sky-600 focus:ring-0"
                  />
                  <span>Show Converted</span>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/api/personal-crm/export?type=leads"
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors shadow-sm"
                  title="Download complete leads database as CSV file"
                >
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                  <span>Export Leads CSV</span>
                </a>
                <span className="text-slate-400">
                  Showing <strong className="text-white">{filteredLeads.length}</strong> leads
                </span>
              </div>
            </div>

            {/* ZOHO CRM LEADS TABLE */}
            <div className="bg-[#0e1938] border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0b142c] text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Lead Name & Contact</th>
                      <th className="py-3.5 px-4 font-bold">Trip / Destination</th>
                      <th className="py-3.5 px-4 font-bold">Source</th>
                      <th className="py-3.5 px-4 font-bold">Travel Dates / Budget</th>
                      <th className="py-3.5 px-4 font-bold">Status</th>
                      <th className="py-3.5 px-4 font-bold">Date Received</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          <div className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                          Loading leads from Google Sheets & CRM...
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          No leads matching current filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                        >
                          {/* Name & Contact */}
                          <td className="py-3.5 px-4">
                            <Link href={`/personal-crm/leads/${lead.id}`} className="block">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                                  {lead.fullName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-bold text-white group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                                    <span>{lead.fullName}</span>
                                    {lead.isMovedToBooking && (
                                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                                        Booked
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                    <span>{lead.phone}</span>
                                    {lead.email && <span className="text-slate-600 truncate max-w-[140px]">• {lead.email}</span>}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </td>

                          {/* Trip Destination */}
                          <td className="py-3.5 px-4">
                            <Link href={`/personal-crm/leads/${lead.id}`} className="block">
                              <p className="font-semibold text-slate-200 truncate max-w-[200px]">
                                {lead.tripTitle || 'General Enquiry'}
                              </p>
                              {lead.groupSize && <p className="text-[11px] text-slate-400">{lead.groupSize}</p>}
                            </Link>
                          </td>

                          {/* Source */}
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/70 text-[11px] text-slate-300 font-medium truncate max-w-[150px] inline-block">
                              {lead.source}
                            </span>
                          </td>

                          {/* Dates & Budget */}
                          <td className="py-3.5 px-4">
                            <p className="text-slate-200 text-xs">{lead.travelDates || 'Flexible'}</p>
                            {lead.budget && (
                              <p className="text-emerald-400 font-mono text-[11px]">{lead.budget}</p>
                            )}
                          </td>

                          {/* Status & Next Follow-Up (Point 5) */}
                          <td className="py-3.5 px-4">
                            {getStatusBadge(lead.status)}
                            {lead.nextFollowUpDate && (
                              <div className="mt-1">
                                {lead.nextFollowUpDate === todayStr ? (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                                    ⏰ Call Today!
                                  </span>
                                ) : lead.nextFollowUpDate < todayStr ? (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                    ⚠️ Overdue ({lead.nextFollowUpDate})
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                                    📅 Due: {lead.nextFollowUpDate}
                                  </span>
                                )}
                              </div>
                            )}
                          </td>

                          {/* Date Received */}
                          <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                            {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Direct WhatsApp button */}
                              <a
                                href={getWhatsAppLink(lead.phone, lead.fullName, lead.tripTitle)}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Chat on WhatsApp"
                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>

                              {/* Separate Lead View Link */}
                              <Link
                                href={`/personal-crm/leads/${lead.id}`}
                                className="px-2.5 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold text-xs flex items-center gap-1 transition-colors shadow-sm"
                              >
                                <span>Details</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 2: BOOKINGS VIEW */}
        {/* ========================================================= */}
        {activeModule === 'bookings' && (
          <div className="space-y-4">
            {/* Bookings Metrics Card Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#0e1938] border border-slate-800 rounded-xl p-3.5">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Bookings</p>
                <p className="text-xl font-black text-white mt-0.5">{bookings.length}</p>
              </div>
              <div className="bg-[#0e1938] border border-slate-800 rounded-xl p-3.5">
                <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Revenue Collected</p>
                <p className="text-xl font-black text-emerald-400 font-mono mt-0.5">
                  ₹{bookings.reduce((sum, b) => sum + (Number(b.paidAmount) || 0), 0).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="bg-[#0e1938] border border-slate-800 rounded-xl p-3.5">
                <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">Pending Balance</p>
                <p className="text-xl font-black text-amber-400 font-mono mt-0.5">
                  ₹{bookings.reduce((sum, b) => sum + (Number(b.balanceDue) || 0), 0).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="bg-[#0e1938] border border-slate-800 rounded-xl p-3.5">
                <p className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">Gross Booking Value</p>
                <p className="text-xl font-black text-sky-400 font-mono mt-0.5">
                  ₹{bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* Bookings Actions Strip (Point 7: CSV Export) */}
            <div className="flex items-center justify-between gap-3 bg-[#0b142c] p-3 rounded-xl border border-slate-800/80 text-xs">
              <span className="text-slate-400">
                Total Confirmed Bookings: <strong className="text-emerald-400 font-mono">{filteredBookings.length}</strong>
              </span>
              <a
                href="/api/personal-crm/export?type=bookings"
                download
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-colors shadow-sm"
                title="Download all bookings as CSV file"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Bookings CSV</span>
              </a>
            </div>

            {/* Bookings Table */}
            <div className="bg-[#0e1938] border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0b142c] text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Booking ID & Customer</th>
                      <th className="py-3.5 px-4 font-bold">Destination & Batch</th>
                      <th className="py-3.5 px-4 font-bold">Paid Today (₹)</th>
                      <th className="py-3.5 px-4 font-bold">Balance Due (₹)</th>
                      <th className="py-3.5 px-4 font-bold">Payment Status</th>
                      <th className="py-3.5 px-4 font-bold">Mode / Ref</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          No bookings registered yet. When sales team clicks "CREATE BOOKING" on any lead, it appears here!
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-xs font-bold text-sky-400 bg-sky-950/40 px-1.5 py-0.5 rounded border border-sky-800/40">
                              {b.id}
                            </span>
                            <p className="font-bold text-white mt-1">{b.fullName}</p>
                            <p className="text-[11px] text-slate-400">{b.phone}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-slate-200">{b.tripTitle}</p>
                            <p className="text-[11px] text-slate-400">{b.date} • {b.guests} Guests</p>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 text-sm">
                            ₹{b.paidAmount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-amber-400 text-sm">
                            ₹{b.balanceDue.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                                b.paymentStatus === 'PAID'
                                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                  : b.paymentStatus === 'PARTIAL'
                                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                                  : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                              }`}
                            >
                              {b.paymentStatus}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300 text-xs">
                            <span className="font-medium">{b.paymentMode || 'UPI'}</span>
                            {b.transactionRef && <p className="text-[10px] text-slate-400 truncate max-w-[120px] font-mono">{b.transactionRef}</p>}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* PDF Invoice Download (Point 4) */}
                              <button
                                type="button"
                                onClick={() =>
                                  generateCRMInvoicePDF({
                                    invoiceNumber: `INV-${b.id.replace(/[^\d]/g, '')}`,
                                    bookingId: b.id,
                                    customerName: b.fullName,
                                    customerPhone: b.phone,
                                    customerEmail: b.email,
                                    tripTitle: b.tripTitle,
                                    travelDates: b.date,
                                    guests: b.guests || 1,
                                    totalAmount: b.totalAmount,
                                    advancePaid: b.paidAmount,
                                    balanceDue: b.balanceDue,
                                    paymentStatus: b.paymentStatus
                                  })
                                }
                                title="Download Official PDF Invoice"
                                className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-colors"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>

                              <a
                                href={getWhatsAppLink(b.phone, b.fullName, b.tripTitle)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs transition-colors"
                              >
                                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 3: TASKS VIEW */}
        {/* ========================================================= */}
        {activeModule === 'tasks' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">Sales & Follow-Up Tasks</h3>
                <p className="text-xs text-slate-400">Track pending calls, WhatsApp follow-ups, and balance reminders</p>
              </div>
              <button
                type="button"
                onClick={() => setShowNewTaskModal(true)}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Task
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-400 bg-[#0e1938] rounded-2xl border border-slate-800">
                  No tasks scheduled. Click "+ Add Task" to create one.
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all ${
                      task.status === 'COMPLETED'
                        ? 'bg-slate-900/40 border-slate-800 opacity-60'
                        : 'bg-[#0e1938] border-slate-800 shadow-md hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={task.status === 'COMPLETED'}
                        onChange={() => handleToggleTask(task.id)}
                        className="mt-1 w-4 h-4 rounded bg-slate-900 border-slate-700 text-sky-600 focus:ring-0 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                            {task.type}
                          </span>
                          <span className={`text-[10px] font-bold ${
                            task.priority === 'HIGH' ? 'text-rose-400' : 'text-slate-400'
                          }`}>
                            {task.priority} Priority
                          </span>
                        </div>
                        <p className={`font-semibold text-sm mt-2 text-white ${
                          task.status === 'COMPLETED' ? 'line-through text-slate-400' : ''
                        }`}>
                          {task.title}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-2 border-t border-slate-800/60">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> Due: {task.dueDate}
                          </span>
                          <span className={`font-bold ${task.status === 'COMPLETED' ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODULE 4: INVOICES VIEW */}
        {/* ========================================================= */}
        {activeModule === 'invoices' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">Generated Trip Invoices</h3>
                <p className="text-xs text-slate-400">All customer invoices generated and ready to dispatch via WhatsApp</p>
              </div>
            </div>

            <div className="bg-[#0e1938] border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0b142c] text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Invoice #</th>
                      <th className="py-3.5 px-4 font-bold">Customer & Phone</th>
                      <th className="py-3.5 px-4 font-bold">Trip Destination</th>
                      <th className="py-3.5 px-4 font-bold">Total Amount</th>
                      <th className="py-3.5 px-4 font-bold">Advance Paid</th>
                      <th className="py-3.5 px-4 font-bold">Balance</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {invoices.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          No invoices generated yet. Open any lead and click "SEND INVOICE" to create an invoice!
                        </td>
                      </tr>
                    ) : (
                      invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-sky-400">
                            {inv.invoiceNumber}
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-white">{inv.customerName}</p>
                            <p className="text-[11px] text-slate-400">{inv.customerPhone}</p>
                          </td>
                          <td className="py-3.5 px-4 text-slate-200">
                            <p className="font-semibold">{inv.tripTitle}</p>
                            <p className="text-[11px] text-slate-400">{inv.travelDates}</p>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-white">
                            ₹{inv.totalAmount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                            ₹{inv.advancePaid.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                            ₹{inv.balanceDue.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* PDF Invoice Download (Point 4) */}
                              <button
                                type="button"
                                onClick={() =>
                                  generateCRMInvoicePDF({
                                    invoiceNumber: inv.invoiceNumber,
                                    bookingId: inv.bookingId,
                                    customerName: inv.customerName,
                                    customerPhone: inv.customerPhone,
                                    customerEmail: inv.customerEmail,
                                    tripTitle: inv.tripTitle,
                                    travelDates: inv.travelDates,
                                    guests: inv.guests || 1,
                                    totalAmount: inv.totalAmount,
                                    advancePaid: inv.advancePaid,
                                    balanceDue: inv.balanceDue,
                                    paymentStatus: inv.paymentStatus
                                  })
                                }
                                title="Download Official Branded PDF Invoice"
                                className="p-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-colors"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>

                              <a
                                href={inv.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-sm transition-colors"
                              >
                                <Send className="w-3.5 h-3.5" /> Send WhatsApp
                              </a>
                              <button
                                type="button"
                                onClick={() => setSelectedInvoice(inv)}
                                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-xs"
                              >
                                Preview
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* NEW LEAD MODAL */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b142c] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Add New Lead Manually</h3>
              <button
                type="button"
                onClick={() => setShowNewLeadModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Customer Full Name*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Phone Number*</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9820112345"
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Trip / Destination Interest</label>
                <input
                  type="text"
                  placeholder="e.g. Meghalaya Backpacking Trip"
                  value={newLeadTrip}
                  onChange={(e) => setNewLeadTrip(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Travel Dates</label>
                  <input
                    type="text"
                    placeholder="e.g. Oct 2026 / Diwali"
                    value={newLeadDates}
                    onChange={(e) => setNewLeadDates(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Budget</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹25,000"
                    value={newLeadBudget}
                    onChange={(e) => setNewLeadBudget(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={creatingLead}
                  className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  {creatingLead ? 'Saving...' : 'Add Lead to CRM'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW TASK MODAL */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b142c] border border-slate-700 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Add Sales Task</h3>
              <button
                type="button"
                onClick={() => setShowNewTaskModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Task Title*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Call Amit regarding advance payment"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Task Type</label>
                  <select
                    value={newTaskType}
                    onChange={(e: any) => setNewTaskType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  >
                    <option value="CALL">📞 Phone Call</option>
                    <option value="WHATSAPP">💬 WhatsApp Followup</option>
                    <option value="PAYMENT">💰 Payment Reminder</option>
                    <option value="ITINERARY">🎒 Send Itinerary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={creatingTask}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  {creatingTask ? 'Saving...' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW INVOICE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b142c] border border-sky-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Invoice: {selectedInvoice.invoiceNumber}</h3>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed">
              {selectedInvoice.whatsappMessageText}
            </div>

            <div className="flex items-center gap-2 pt-2 flex-wrap">
              <a
                href={selectedInvoice.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg text-center flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Send on WhatsApp
              </a>
              <button
                type="button"
                onClick={() =>
                  generateCRMInvoicePDF({
                    invoiceNumber: selectedInvoice.invoiceNumber,
                    bookingId: selectedInvoice.bookingId,
                    customerName: selectedInvoice.customerName,
                    customerPhone: selectedInvoice.customerPhone,
                    customerEmail: selectedInvoice.customerEmail,
                    tripTitle: selectedInvoice.tripTitle,
                    travelDates: selectedInvoice.travelDates,
                    guests: selectedInvoice.guests || 1,
                    totalAmount: selectedInvoice.totalAmount,
                    advancePaid: selectedInvoice.advancePaid,
                    balanceDue: selectedInvoice.balanceDue,
                    paymentStatus: selectedInvoice.paymentStatus
                  })
                }
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold text-xs rounded-lg flex items-center gap-1.5 border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" /> Download PDF
              </button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(selectedInvoice.whatsappMessageText)
                  setCopiedInvoiceId(selectedInvoice.id)
                  setTimeout(() => setCopiedInvoiceId(null), 2000)
                }}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 border border-slate-700"
              >
                <Copy className="w-3.5 h-3.5" /> {copiedInvoiceId === selectedInvoice.id ? 'Copied!' : 'Copy Text'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

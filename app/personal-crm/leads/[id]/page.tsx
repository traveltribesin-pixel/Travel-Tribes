'use client'

import React, { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Send,
  CheckCircle2,
  Clock,
  Plus,
  FileText,
  CreditCard,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  Copy,
  Printer,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Download,
  Lock,
  KeyRound
} from 'lucide-react'
import { generateCRMInvoicePDF } from '@/lib/generate-crm-invoice-pdf'

interface CRMNote {
  id: string
  text: string
  author: string
  createdAt: string
}

interface LeadData {
  id: string
  source: string
  fullName: string
  email: string
  phone: string
  tripTitle?: string
  tripSlug?: string
  travelDates?: string
  groupSize?: string
  budget?: string
  message?: string
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'FOLLOW_UP' | 'CONVERTED' | 'LOST' | 'ARCHIVED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  notes: CRMNote[]
  customFields?: Record<string, string>
  isMovedToBooking?: boolean
  convertedBookingId?: string
  nextFollowUpDate?: string
  syncedFromSheet?: boolean
  createdAt: string
  updatedAt: string
}

export default function LeadDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const leadId = resolvedParams.id
  const router = useRouter()

  const [lead, setLead] = useState<LeadData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Booking Modal States
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [advancePaid, setAdvancePaid] = useState<number>(5000)
  const [totalAmount, setTotalAmount] = useState<number>(18000)
  const [batchDate, setBatchDate] = useState<string>('')
  const [guests, setGuests] = useState<number>(1)
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'Bank Transfer' | 'Razorpay' | 'Cash' | 'Card'>('UPI')
  const [transactionRef, setTransactionRef] = useState<string>('')
  const [bookingNotes, setBookingNotes] = useState<string>('')
  const [converting, setConverting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState<any>(null)

  // Invoice Modal States
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [generatingInvoice, setGeneratingInvoice] = useState(false)
  const [invoiceData, setInvoiceData] = useState<any>(null)
  const [customInvoiceAdvance, setCustomInvoiceAdvance] = useState<number>(5000)
  const [customInvoiceTotal, setCustomInvoiceTotal] = useState<number>(18000)
  const [copiedInvoice, setCopiedInvoice] = useState(false)

  // Note & Custom Field States
  const [newNote, setNewNote] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [showCustomFieldModal, setShowCustomFieldModal] = useState(false)
  const [newFieldKey, setNewFieldKey] = useState('')
  const [newFieldValue, setNewFieldValue] = useState('')

  // Follow-Up States (Point 5)
  const [followUpDateInput, setFollowUpDateInput] = useState<string>('')
  const [updatingFollowUp, setUpdatingFollowUp] = useState<boolean>(false)

  // PIN Auth States (Point 1: Sales PIN 7404)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState<string | null>(null)
  const [copiedTemplateIndex, setCopiedTemplateIndex] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unlocked = sessionStorage.getItem('tt_crm_unlocked') === 'true'
      setIsUnlocked(unlocked)
      setAuthChecked(true)
    }
  }, [])

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

  // Load Lead details
  const fetchLead = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/personal-crm/leads/${leadId}`)
      const data = await res.json()
      if (!data.success || !data.lead) {
        setError(data.error || 'Lead not found')
      } else {
        setLead(data.lead)
        setBatchDate(data.lead.travelDates || '')
        if (data.lead.nextFollowUpDate) {
          setFollowUpDateInput(data.lead.nextFollowUpDate)
        }
        // Extract budget estimate if present
        if (data.lead.budget) {
          const digits = parseInt(data.lead.budget.replace(/[^\d]/g, ''), 10)
          if (!isNaN(digits) && digits > 1000) {
            setTotalAmount(digits)
            setCustomInvoiceTotal(digits)
          }
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load lead details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLead()
  }, [leadId])

  // Handle Status Change
  const handleStatusChange = async (newStatus: string) => {
    if (!lead) return
    try {
      const res = await fetch(`/api/personal-crm/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      const data = await res.json()
      if (data.success) {
        setLead(data.lead)
      }
    } catch (err) {
      console.error('Status update failed:', err)
    }
  }

  // Handle Priority Change
  const handlePriorityChange = async (newPriority: string) => {
    if (!lead) return
    try {
      const res = await fetch(`/api/personal-crm/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority: newPriority })
      })
      const data = await res.json()
      if (data.success) {
        setLead(data.lead)
      }
    } catch (err) {
      console.error('Priority update failed:', err)
    }
  }

  // Add Note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!lead || !newNote.trim()) return
    try {
      setSavingNote(true)
      const res = await fetch(`/api/personal-crm/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteText: newNote.trim(),
          author: 'Sales Agent'
        })
      })
      const data = await res.json()
      if (data.success) {
        setLead(data.lead)
        setNewNote('')
      }
    } catch (err) {
      console.error('Add note failed:', err)
    } finally {
      setSavingNote(false)
    }
  }

  // Add Custom Field
  const handleAddCustomField = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!lead || !newFieldKey.trim()) return
    try {
      const updatedFields = {
        ...(lead.customFields || {}),
        [newFieldKey.trim()]: newFieldValue.trim()
      }
      const res = await fetch(`/api/personal-crm/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customFields: updatedFields })
      })
      const data = await res.json()
      if (data.success) {
        setLead(data.lead)
        setNewFieldKey('')
        setNewFieldValue('')
        setShowCustomFieldModal(false)
      }
    } catch (err) {
      console.error('Add custom field failed:', err)
    }
  }

  // Handle Follow Up Date
  const handleSetFollowUpDate = async (targetDate: string) => {
    if (!lead) return
    try {
      setUpdatingFollowUp(true)
      const res = await fetch(`/api/personal-crm/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nextFollowUpDate: targetDate })
      })
      const data = await res.json()
      if (data.success) {
        setLead(data.lead)
        setFollowUpDateInput(targetDate)
      }
    } catch (err) {
      console.error('Follow-up update failed:', err)
    } finally {
      setUpdatingFollowUp(false)
    }
  }

  // Handle Download Branded PDF Invoice
  const handleDownloadPDF = () => {
    if (!lead) return
    const invNum = lead.convertedBookingId
      ? `INV-${lead.convertedBookingId.replace(/[^\d]/g, '')}`
      : `INV-${lead.id.replace(/[^\d]/g, '') || '2026-101'}`

    generateCRMInvoicePDF({
      invoiceNumber: invNum,
      bookingId: lead.convertedBookingId,
      customerName: lead.fullName,
      customerPhone: lead.phone,
      customerEmail: lead.email,
      tripTitle: lead.tripTitle || 'Travel Tribes Expeditions',
      travelDates: batchDate || lead.travelDates || 'Upcoming Departure',
      guests: guests || 1,
      totalAmount: customInvoiceTotal,
      advancePaid: customInvoiceAdvance,
      balanceDue: Math.max(0, customInvoiceTotal - customInvoiceAdvance),
      paymentStatus: lead.isMovedToBooking ? 'CONFIRMED' : 'PARTIAL'
    })
  }

  // Handle Convert to Booking
  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!lead) return
    try {
      setConverting(true)
      const res = await fetch(`/api/personal-crm/leads/${lead.id}/create-booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          advancePaid,
          totalAmount,
          batchDate: batchDate || lead.travelDates || 'Upcoming Batch',
          guests,
          paymentMode,
          transactionRef,
          notes: bookingNotes
        })
      })
      const data = await res.json()
      if (data.success) {
        setBookingSuccess(data)
        setLead(data.lead)
      } else {
        alert(data.error || 'Failed to create booking')
      }
    } catch (err: any) {
      alert(err?.message || 'Error creating booking')
    } finally {
      setConverting(false)
    }
  }

  // Handle Send / Generate Invoice
  const handleOpenInvoice = async () => {
    if (!lead) return
    try {
      setGeneratingInvoice(true)
      setShowInvoiceModal(true)
      const res = await fetch(`/api/personal-crm/leads/${lead.id}/invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalAmount: customInvoiceTotal,
          advancePaid: customInvoiceAdvance,
          travelDates: batchDate || lead.travelDates,
          guests
        })
      })
      const data = await res.json()
      if (data.success) {
        setInvoiceData(data.invoice)
      }
    } catch (err) {
      console.error('Invoice generation failed:', err)
    } finally {
      setGeneratingInvoice(false)
    }
  }

  // Clean WhatsApp phone link
  const getWhatsAppDirectLink = (phone: string, text?: string) => {
    const digits = phone.replace(/[^\d]/g, '')
    const formatted = digits.length === 10 ? `91${digits}` : digits
    if (!text) {
      return `https://wa.me/${formatted}?text=Hi%20${encodeURIComponent(
        lead?.fullName || ''
      )},%20reaching%20out%20from%20Travel%20Tribes%20regarding%20your%20inquiry%20for%20${encodeURIComponent(
        lead?.tripTitle || 'your upcoming trip'
      )}!`
    }
    return `https://wa.me/${formatted}?text=${encodeURIComponent(text)}`
  }

  // PIN Lock Screen (Point 1)
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
              Enter your 4-digit Sales PIN to view lead details
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
              <KeyRound className="w-4 h-4" /> Unlock Lead Profile
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

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400 font-medium">Loading Lead Profile...</p>
        </div>
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Lead Not Found</h2>
        <p className="text-slate-400">{error || 'The requested lead does not exist or has been removed.'}</p>
        <Link
          href="/personal-crm"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Personal CRM
        </Link>
      </div>
    )
  }

  const phoneDigits = lead.phone.replace(/[^\d]/g, '')
  const formattedPhone = phoneDigits.length === 10 ? `+91 ${phoneDigits}` : lead.phone

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 pb-20">
      {/* Top Breadcrumb & Quick Action Bar */}
      <header className="sticky top-0 z-30 bg-[#0b142c]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/personal-crm"
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors bg-slate-800/60 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60"
            >
              <ArrowLeft className="w-4 h-4" /> All Leads
            </Link>
            <span className="text-slate-600 hidden sm:inline">/</span>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-sky-400 font-mono font-bold border border-slate-700">
                {lead.id}
              </span>
              <h1 className="text-sm sm:text-base font-bold text-white truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                {lead.fullName}
              </h1>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {lead.isMovedToBooking ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold">
                <ShieldCheck className="w-4 h-4" /> Transferred to Booking ({lead.convertedBookingId})
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowBookingModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold rounded-lg shadow-lg shadow-emerald-950/40 border border-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <CreditCard className="w-4 h-4" /> CREATE BOOKING
              </button>
            )}

            <button
              type="button"
              onClick={handleOpenInvoice}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs sm:text-sm font-bold rounded-lg shadow-lg shadow-sky-950/40 border border-sky-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileText className="w-4 h-4" /> SEND INVOICE (WHATSAPP)
            </button>

            <button
              type="button"
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs sm:text-sm font-bold rounded-lg border border-slate-700 transition-colors shadow-sm"
              title="Download official branded PDF invoice"
            >
              <Download className="w-4 h-4 text-sky-400" /> DOWNLOAD PDF
            </button>

            <a
              href={getWhatsAppDirectLink(lead.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold rounded-lg border border-emerald-500/30 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp
            </a>

            {/* Lock CRM Button */}
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('tt_crm_unlocked')
                setIsUnlocked(false)
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs sm:text-sm font-bold rounded-lg border border-rose-800/40 transition-colors"
              title="Lock Sales CRM"
            >
              <Lock className="w-3.5 h-3.5 text-rose-400" /> Lock
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-6">
        {/* Converted Alert Banner */}
        {lead.isMovedToBooking && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-white text-sm sm:text-base">
                  This lead is confirmed and transferred to the Booking module!
                </p>
                <p className="text-xs text-slate-400">
                  Booking ID: <strong className="text-emerald-400">{lead.convertedBookingId}</strong>. You can view
                  all payment records in the Bookings tab.
                </p>
              </div>
            </div>
            <Link
              href="/personal-crm?module=bookings"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              Go to Bookings Module <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 Cols on Desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Primary Profile Card */}
            <div className="bg-[#0e1938] border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-sky-950/50">
                    {lead.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-black text-white">{lead.fullName}</h2>
                      {lead.syncedFromSheet && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                          Synced from Google Sheet
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>Source:</span>
                      <span className="text-sky-300 font-semibold">{lead.source}</span>
                    </p>
                  </div>
                </div>

                {/* Status & Priority Dropdowns */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Status
                    </label>
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="NEW">🟢 New Lead</option>
                      <option value="CONTACTED">💬 Contacted</option>
                      <option value="IN_PROGRESS">⚡ In Progress</option>
                      <option value="FOLLOW_UP">⏳ Follow Up</option>
                      <option value="CONVERTED">🎉 Converted</option>
                      <option value="LOST">❌ Lost</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Priority
                    </label>
                    <select
                      value={lead.priority}
                      onChange={(e) => handlePriorityChange(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="URGENT">🔥 Urgent</option>
                      <option value="HIGH">⚡ High</option>
                      <option value="MEDIUM">⚖️ Medium</option>
                      <option value="LOW">🌱 Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Lead Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <Phone className="w-4 h-4 text-sky-400 mt-1 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Phone / WhatsApp</p>
                    <p className="text-sm font-bold text-white truncate">{formattedPhone}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-[11px] text-sky-400 hover:underline font-medium flex items-center gap-1"
                      >
                        Call
                      </a>
                      <span className="text-slate-600">•</span>
                      <a
                        href={getWhatsAppDirectLink(lead.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-emerald-400 hover:underline font-medium flex items-center gap-1"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <Mail className="w-4 h-4 text-indigo-400 mt-1 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
                    <p className="text-sm font-bold text-white truncate">{lead.email || 'Not provided'}</p>
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-[11px] text-indigo-400 hover:underline font-medium inline-block mt-1"
                      >
                        Send Email
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <MapPin className="w-4 h-4 text-rose-400 mt-1 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Trip Destination
                    </p>
                    <p className="text-sm font-bold text-white truncate">{lead.tripTitle || 'General Inquiry'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <Calendar className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Travel Dates</p>
                    <p className="text-sm font-bold text-white truncate">{lead.travelDates || 'Flexible'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <Users className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Group Size</p>
                    <p className="text-sm font-bold text-white truncate">{lead.groupSize || '1 Traveller'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
                  <DollarSign className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Budget / Estimated Value
                    </p>
                    <p className="text-sm font-bold text-white truncate">{lead.budget || 'Standard Package'}</p>
                  </div>
                </div>

                {/* Next Follow-Up Date Scheduler Box */}
                <div className="col-span-1 sm:col-span-2 p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                          Next Follow-Up Date
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {lead.nextFollowUpDate
                            ? `Scheduled for: ${lead.nextFollowUpDate}`
                            : 'No follow-up date scheduled yet'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <input
                        type="date"
                        value={followUpDateInput}
                        onChange={(e) => handleSetFollowUpDate(e.target.value)}
                        className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleSetFollowUpDate(new Date().toISOString().split('T')[0])}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-amber-300 border border-slate-700 transition-colors"
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const tom = new Date()
                          tom.setDate(tom.getDate() + 1)
                          handleSetFollowUpDate(tom.toISOString().split('T')[0])
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-sky-300 border border-slate-700 transition-colors"
                      >
                        Tomorrow
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const in3 = new Date()
                          in3.setDate(in3.getDate() + 3)
                          handleSetFollowUpDate(in3.toISOString().split('T')[0])
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-purple-300 border border-slate-700 transition-colors"
                      >
                        In 3 Days
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message from Customer */}
              {lead.message && (
                <div className="mt-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-400" /> Lead Inquiry Message
                  </p>
                  <p className="text-sm text-slate-200 leading-relaxed italic bg-slate-950/40 p-3 rounded-lg border border-slate-800/60">
                    "{lead.message}"
                  </p>
                </div>
              )}

              {/* Timestamp footer */}
              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
                <span>Received: {new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
                <span>Last Updated: {new Date(lead.updatedAt).toLocaleDateString('en-IN')}</span>
              </div>
            </div>

            {/* Custom / Additional Fields Section */}
            <div className="bg-[#0e1938] border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Additional / Custom Lead Fields
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sales team can add custom parameters (Dietary, Pickup city, Passport details, etc.)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCustomFieldModal(true)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Field
                </button>
              </div>

              {lead.customFields && Object.keys(lead.customFields).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(lead.customFields).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{key}</p>
                        <p className="text-sm font-bold text-white mt-0.5">{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900/40 border border-dashed border-slate-800 text-center text-xs text-slate-400">
                  No custom fields added yet. Click "+ Add Field" to store extra client parameters.
                </div>
              )}
            </div>

            {/* Notes & Activity Timeline */}
            <div className="bg-[#0e1938] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" /> Notes & Follow-up History
              </h3>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-3">
                <textarea
                  rows={2}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Log client discussion, WhatsApp followup note, or payment status..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={savingNote || !newNote.trim()}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> {savingNote ? 'Saving...' : 'Add Note to Lead'}
                  </button>
                </div>
              </form>

              {/* Notes Timeline List */}
              <div className="space-y-3 pt-2">
                {lead.notes && lead.notes.length > 0 ? (
                  lead.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-sky-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                        {note.author.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                          <span className="font-semibold text-slate-300">{note.author}</span>
                          <span>{new Date(note.createdAt).toLocaleDateString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{note.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No notes recorded yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Quick Action Hub & Invoice Preview */}
          <div className="space-y-6">
            {/* Quick Action Card: Create Booking */}
            <div className="bg-gradient-to-br from-[#0e1938] to-[#0a2034] border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Booking Conversion</h3>
                  <p className="text-xs text-slate-400">Payment aate hi lead ko booking me shift karein</p>
                </div>
              </div>

              {lead.isMovedToBooking ? (
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300">
                    ✅ <strong>Already Booked:</strong> This lead has been moved to the Booking module.
                  </div>
                  <Link
                    href="/personal-crm?module=bookings"
                    className="w-full block text-center py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors"
                  >
                    View in Bookings Module ➔
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    When the customer pays the advance amount, click below to record the payment and move this lead
                    directly into the <strong>Bookings Module</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(true)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <CreditCard className="w-4 h-4" /> CREATE BOOKING NOW
                  </button>
                </div>
              )}
            </div>

            {/* Quick Action Card: Pre-made Invoice Sender */}
            <div className="bg-gradient-to-br from-[#0e1938] to-[#0c1f3d] border border-sky-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Send WhatsApp Invoice</h3>
                  <p className="text-xs text-slate-400">Pre-calculated & ready to send in 1-click</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Recipient:</span>
                    <strong className="text-white">{lead.fullName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Destination:</span>
                    <strong className="text-white truncate max-w-[160px]">{lead.tripTitle || 'Trip'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Total:</span>
                    <strong className="text-emerald-400">₹{customInvoiceTotal.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Advance Due:</span>
                    <strong className="text-sky-400">₹{customInvoiceAdvance.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleOpenInvoice}
                  className="w-full py-3 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" /> Preview & Send via WhatsApp
                </button>
              </div>
            </div>

            {/* Quick Call / WhatsApp Contact Box */}
            <div className="bg-[#0e1938] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Client Connect</h4>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${lead.phone}`}
                  className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-center flex flex-col items-center justify-center gap-1 transition-colors"
                >
                  <Phone className="w-5 h-5 text-sky-400" />
                  <span className="text-xs font-bold text-white">Call Now</span>
                </a>
                <a
                  href={getWhatsAppDirectLink(lead.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 rounded-xl text-center flex flex-col items-center justify-center gap-1 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300">WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick Follow-Up Call Scheduler Card (Point 5) */}
            <div className="bg-[#0e1938] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Next Follow-Up Call
                  </h4>
                </div>
                {lead.nextFollowUpDate ? (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    📅 {lead.nextFollowUpDate}
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500 italic">Not Scheduled</span>
                )}
              </div>

              <p className="text-xs text-slate-400">
                Schedule when sales team needs to call {lead.fullName} back:
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={followUpDateInput}
                  onChange={(e) => setFollowUpDateInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => handleSetFollowUpDate(followUpDateInput)}
                  disabled={updatingFollowUp || !followUpDateInput}
                  className="px-3 py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  {updatingFollowUp ? 'Saving...' : 'Set Date'}
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[10px] text-slate-400 font-semibold mr-1">Quick:</span>
                <button
                  type="button"
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0]
                    setFollowUpDateInput(today)
                    handleSetFollowUpDate(today)
                  }}
                  className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-700 transition-colors"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const d = new Date()
                    d.setDate(d.getDate() + 1)
                    const tom = d.toISOString().split('T')[0]
                    setFollowUpDateInput(tom)
                    handleSetFollowUpDate(tom)
                  }}
                  className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-700 transition-colors"
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const d = new Date()
                    d.setDate(d.getDate() + 3)
                    const in3 = d.toISOString().split('T')[0]
                    setFollowUpDateInput(in3)
                    handleSetFollowUpDate(in3)
                  }}
                  className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-700 transition-colors"
                >
                  In 3 Days
                </button>
                {lead.nextFollowUpDate && (
                  <button
                    type="button"
                    onClick={() => {
                      setFollowUpDateInput('')
                      handleSetFollowUpDate('')
                    }}
                    className="px-2 py-1 rounded bg-rose-950/40 hover:bg-rose-950/70 text-[11px] text-rose-300 border border-rose-800/40 transition-colors ml-auto"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* WhatsApp Ready-Made Sales Templates Card (Point 3) */}
            <div className="bg-[#0e1938] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    WhatsApp Sales Templates
                  </h4>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  1-Click Dispatch
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Choose a pre-written message to send or copy for {lead.fullName}:
              </p>

              <div className="space-y-2.5">
                {[
                  {
                    title: '🎒 Itinerary Follow-Up',
                    text: `Hi ${lead.fullName}! 👋 Hope you had a chance to check out our ${lead.tripTitle || 'itinerary'}. We have upcoming departures with verified boutique stays & experienced Trip Captains. When are you planning to travel?`
                  },
                  {
                    title: '⏳ Last 3 Spots Alert',
                    text: `Hey ${lead.fullName}! 🎒 Quick heads-up on ${lead.tripTitle || 'the trip'} — we only have 3 spots remaining for the upcoming batch. Let me know if you would like me to reserve tentative slots for you today!`
                  },
                  {
                    title: '💰 Balance Payment Reminder',
                    text: `Hi ${lead.fullName}! 👋 Friendly reminder regarding your upcoming ${lead.tripTitle || 'trip'}. Please complete your remaining balance so we can finalize your travel vouchers. Let us know once done! 🚀`
                  },
                  {
                    title: '🎉 Welcome to the Tribe',
                    text: `Woohoo ${lead.fullName}! 🎉 Welcome to the Travel Tribes community for ${lead.tripTitle || 'our upcoming expedition'}! Your Trip Captain will connect with you 3 days prior to departure. Get ready for an epic journey! 🚀`
                  }
                ].map((tpl, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-bold text-xs text-slate-200">{tpl.title}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Copy Text Button */}
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(tpl.text)
                            setCopiedTemplateIndex(i)
                            setTimeout(() => setCopiedTemplateIndex(null), 2000)
                          }}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors border border-slate-700"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedTemplateIndex === i ? 'Copied!' : 'Copy'}</span>
                        </button>
                        {/* Send via WhatsApp Button */}
                        <a
                          href={getWhatsAppDirectLink(lead.phone, tpl.text)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold flex items-center gap-1 transition-colors"
                        >
                          <Send className="w-3 h-3" /> Send
                        </a>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 italic">
                      "{tpl.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CREATE BOOKING MODAL */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b142c] border border-emerald-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-white text-base">Create Booking & Transfer</h3>
                  <p className="text-xs text-slate-400">{lead.fullName} • {lead.tripTitle || 'Trip'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowBookingModal(false)
                  setBookingSuccess(null)
                }}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Booking Created Successfully! 🎉</h4>
                <p className="text-xs text-slate-300">
                  Lead has been marked as <strong>CONVERTED</strong> and transferred to the Bookings module.
                </p>
                <div className="p-3 bg-slate-900 rounded-xl text-left text-xs space-y-1 font-mono">
                  <p>Booking ID: <strong className="text-emerald-400">{bookingSuccess.booking.id}</strong></p>
                  <p>Paid Today: <strong>₹{bookingSuccess.booking.paidAmount.toLocaleString('en-IN')}</strong></p>
                  <p>Balance Due: <strong className="text-amber-400">₹{bookingSuccess.booking.balanceDue.toLocaleString('en-IN')}</strong></p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <a
                    href={bookingSuccess.invoice?.whatsappUrl || getWhatsAppDirectLink(lead.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Send Booking Invoice on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => router.push('/personal-crm?module=bookings')}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
                  >
                    View Bookings
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateBooking} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Advance Amount Received (₹)*</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={advancePaid}
                      onChange={(e) => setAdvancePaid(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Total Package Value (₹)*</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white font-bold focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Auto Calculated Balance Due */}
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-400">Remaining Balance to Collect:</span>
                  <strong className="text-amber-400 text-sm font-bold">
                    ₹{Math.max(0, totalAmount - advancePaid).toLocaleString('en-IN')}
                  </strong>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Travel Batch Date</label>
                    <input
                      type="text"
                      value={batchDate}
                      onChange={(e) => setBatchDate(e.target.value)}
                      placeholder="e.g. 24 Dec - 28 Dec 2026"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Number of Guests</label>
                    <input
                      type="number"
                      min={1}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Payment Mode</label>
                    <select
                      value={paymentMode}
                      onChange={(e: any) => setPaymentMode(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
                      <option value="Bank Transfer">Bank Transfer (IMPS/NEFT)</option>
                      <option value="Razorpay">Razorpay Gateway</option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Credit / Debit Card</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">Transaction Ref / UTR No.</label>
                    <input
                      type="text"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      placeholder="e.g. UPI Ref #482910..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Booking Notes (Optional)</label>
                  <input
                    type="text"
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="Room sharing preference, train seat request..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={converting}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {converting ? 'Processing...' : 'Confirm & Transfer to Bookings Module'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SEND INVOICE VIA WHATSAPP MODAL */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b142c] border border-sky-500/40 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-white text-base">Travel Tribes Trip Invoice</h3>
                  <p className="text-xs text-slate-400">{lead.fullName} • WhatsApp Ready</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {generatingInvoice ? (
              <div className="py-8 text-center text-slate-400 space-y-2">
                <div className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs">Generating official invoice format...</p>
              </div>
            ) : invoiceData ? (
              <div className="space-y-4">
                {/* Formatted Invoice Preview Card */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                  {invoiceData.whatsappMessageText}
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={invoiceData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" /> Send Invoice Directly on WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors border border-slate-700"
                    title="Download official PDF invoice"
                  >
                    <Download className="w-4 h-4" /> PDF
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(invoiceData.whatsappMessageText)
                      setCopiedInvoice(true)
                      setTimeout(() => setCopiedInvoice(false), 2000)
                    }}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-4 h-4" /> {copiedInvoice ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* Amount customizer */}
                <div className="pt-3 border-t border-slate-800/80">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Want to adjust amounts before sending?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400">Total Amount:</span>
                      <input
                        type="number"
                        value={customInvoiceTotal}
                        onChange={(e) => setCustomInvoiceTotal(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400">Advance To Collect:</span>
                      <input
                        type="number"
                        value={customInvoiceAdvance}
                        onChange={(e) => setCustomInvoiceAdvance(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenInvoice}
                    className="mt-2 w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold rounded"
                  >
                    Recalculate Invoice Message
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* ADD CUSTOM FIELD MODAL */}
      {showCustomFieldModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b142c] border border-slate-700 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <h4 className="font-bold text-white text-sm">Add Custom Lead Field</h4>
            <form onSubmit={handleAddCustomField} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Field Name / Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dietary Preference, Pickup City..."
                  value={newFieldKey}
                  onChange={(e) => setNewFieldKey(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Field Value</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jain Food, Delhi T3..."
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomFieldModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg"
                >
                  Save Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

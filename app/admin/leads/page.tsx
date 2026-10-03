'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Calendar,
  Sparkles,
  FileSpreadsheet,
  X,
  CheckCircle2,
  Trash2,
  MoreVertical,
  Kanban,
  Table as TableIcon,
  Compass,
  ArrowRight,
  Send,
  SendHorizontal
} from 'lucide-react'
import type { CRMLead, LeadStatus, LeadPriority } from '@/lib/crm-store'

const STATUS_COLUMNS: { id: LeadStatus; label: string; color: string }[] = [
  { id: 'NEW', label: 'New Leads', color: 'border-cyan-500 bg-cyan-950/20 text-cyan-300' },
  { id: 'CONTACTED', label: 'Contacted', color: 'border-blue-500 bg-blue-950/20 text-blue-300' },
  { id: 'IN_PROGRESS', label: 'In Progress', color: 'border-amber-500 bg-amber-950/20 text-amber-300' },
  { id: 'FOLLOW_UP', label: 'Follow Up', color: 'border-purple-500 bg-purple-950/20 text-purple-300' },
  { id: 'CONVERTED', label: 'Converted 🎉', color: 'border-emerald-500 bg-emerald-950/20 text-emerald-300' },
  { id: 'LOST', label: 'Lost / Closed', color: 'border-rose-500 bg-rose-950/20 text-rose-300' },
]

export default function LeadsPipelinePage() {
  const [leads, setLeads] = useState<CRMLead[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban')

  // Filter States
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [priorityFilter, setPriorityFilter] = useState('ALL')
  const [sourceFilter, setSourceFilter] = useState('ALL')

  // Modals & Drawers
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null)
  const [newNoteText, setNewNoteText] = useState('')
  const [whatsAppModalLead, setWhatsAppModalLead] = useState<CRMLead | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState('greeting')
  const [customWhatsAppMsg, setCustomWhatsAppMsg] = useState('')
  const [showAddLeadModal, setShowAddLeadModal] = useState(false)

  // Manual Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    tripTitle: '',
    travelDates: '',
    groupSize: '1',
    source: 'Instagram / Phone Enquiry',
    priority: 'HIGH' as LeadPriority,
    message: ''
  })

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/leads')
      const data = await res.json()
      if (data.success) {
        setLeads(data.leads)
        if (selectedLead) {
          const updated = data.leads.find((l: CRMLead) => l.id === selectedLead.id)
          if (updated) setSelectedLead(updated)
        }
      }
    } catch (err) {
      console.error('Error fetching leads:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (statusFilter !== 'ALL' && lead.status !== statusFilter) return false
      if (priorityFilter !== 'ALL' && lead.priority !== priorityFilter) return false
      if (sourceFilter !== 'ALL' && lead.source !== sourceFilter) return false

      if (search.trim()) {
        const q = search.toLowerCase()
        return (
          lead.fullName.toLowerCase().includes(q) ||
          lead.phone.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          (lead.tripTitle && lead.tripTitle.toLowerCase().includes(q)) ||
          (lead.source && lead.source.toLowerCase().includes(q))
        )
      }

      return true
    })
  }, [leads, statusFilter, priorityFilter, sourceFilter, search])

  // Extract unique sources for filter dropdown
  const uniqueSources = useMemo(() => {
    const set = new Set<string>()
    leads.forEach((l) => l.source && set.add(l.source))
    return Array.from(set)
  }, [leads])

  const handleUpdateLeadStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      fetchLeads()
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  const handleUpdateLeadPriority = async (leadId: string, newPriority: LeadPriority) => {
    try {
      await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority: newPriority })
      })
      fetchLeads()
    } catch (err) {
      console.error('Failed to update priority:', err)
    }
  }

  const handleAddNote = async () => {
    if (!selectedLead || !newNoteText.trim()) return
    try {
      await fetch(`/api/admin/leads/${selectedLead.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newNoteText.trim(), author: 'Admin' })
      })
      setNewNoteText('')
      fetchLeads()
    } catch (err) {
      console.error('Failed to add note:', err)
    }
  }

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return
    try {
      await fetch(`/api/admin/leads/${leadId}`, { method: 'DELETE' })
      setSelectedLead(null)
      fetchLeads()
    } catch (err) {
      console.error('Failed to delete lead:', err)
    }
  }

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeadForm)
      })
      const data = await res.json()
      if (data.success) {
        setShowAddLeadModal(false)
        setNewLeadForm({
          fullName: '',
          phone: '',
          email: '',
          tripTitle: '',
          travelDates: '',
          groupSize: '1',
          source: 'Instagram / Phone Enquiry',
          priority: 'HIGH',
          message: ''
        })
        fetchLeads()
      }
    } catch (err) {
      console.error('Failed to create manual lead:', err)
    }
  }

  // Open WhatsApp with dynamically generated template
  const triggerWhatsAppModal = (lead: CRMLead) => {
    setWhatsAppModalLead(lead)
    setSelectedTemplate('greeting')
    setCustomWhatsAppMsg(
      `Hi ${lead.fullName}! 👋 Thanks for reaching out to Travel Tribes regarding ${lead.tripTitle || 'our upcoming trips'}. When are you planning to travel with us? We have some amazing upcoming batches!`
    )
  }

  const handleTemplateChange = (tmpl: string, lead: CRMLead) => {
    setSelectedTemplate(tmpl)
    const trip = lead.tripTitle || 'your preferred trip'
    if (tmpl === 'greeting') {
      setCustomWhatsAppMsg(
        `Hi ${lead.fullName}! 👋 Thanks for checking out Travel Tribes for ${trip}. We'd love to help you plan your journey! When are you looking to travel? 🎒`
      )
    } else if (tmpl === 'itinerary') {
      setCustomWhatsAppMsg(
        `Hi ${lead.fullName}! 🎒 Hope you enjoyed checking out the itinerary for ${trip}. We have limited spots remaining for the upcoming batch. Would you like me to hold a spot for you?`
      )
    } else if (tmpl === 'seats') {
      setCustomWhatsAppMsg(
        `Hey ${lead.fullName}! ⚡ Quick update on ${trip} — only 3 spots are left for the upcoming batch. If you're planning to join, let me know so I can share the booking link!`
      )
    }
  }

  const sendWhatsAppMessage = () => {
    if (!whatsAppModalLead) return
    const cleanPhone = whatsAppModalLead.phone.replace(/[^\d]/g, '')
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customWhatsAppMsg)}`
    window.open(url, '_blank')
    setWhatsAppModalLead(null)

    // Automatically update status to CONTACTED if it was NEW
    if (whatsAppModalLead.status === 'NEW') {
      handleUpdateLeadStatus(whatsAppModalLead.id, 'CONTACTED')
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Leads Pipeline</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
              {filteredLeads.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage inquiries, follow-ups, convert to bookings & 1-click WhatsApp messaging.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* View Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-[#00b4d8] text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Kanban size={13} />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[#00b4d8] text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon size={13} />
              <span>Table</span>
            </button>
          </div>

          <a
            href="/api/admin/export?type=leads"
            download
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <FileSpreadsheet size={14} className="text-emerald-400" />
            <span>Export CSV</span>
          </a>

          <button
            onClick={() => setShowAddLeadModal(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#0096c7] hover:from-[#0096c7] hover:to-[#0077b6] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#00b4d8]/20 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Manual Lead</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lead by name, phone, email, or destination..."
            className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
          />
        </div>

        {/* Status Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00b4d8]"
        >
          <option value="ALL">All Statuses</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="FOLLOW_UP">Follow Up</option>
          <option value="CONVERTED">Converted</option>
          <option value="LOST">Lost</option>
        </select>

        {/* Priority Dropdown */}
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00b4d8]"
        >
          <option value="ALL">All Priorities</option>
          <option value="URGENT">Urgent 🔥</option>
          <option value="HIGH">High Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="LOW">Low Priority</option>
        </select>

        {/* Source Dropdown */}
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00b4d8] max-w-[200px]"
        >
          <option value="ALL">All Form Sources</option>
          {uniqueSources.map((src) => (
            <option key={src} value={src}>
              {src}
            </option>
          ))}
        </select>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-4 items-start overflow-x-auto pb-6 pt-1 w-full scrollbar-thin">
          {STATUS_COLUMNS.map((col) => {
            const colLeads = filteredLeads.filter((l) => l.status === col.id)
            return (
              <div
                key={col.id}
                className="w-[280px] sm:w-[300px] shrink-0 bg-slate-900/90 border border-slate-800/90 rounded-2xl p-3.5 flex flex-col gap-3 shadow-lg"
              >
                {/* Column Header */}
                <div className={`p-2.5 rounded-xl border flex items-center justify-between ${col.color}`}>
                  <span className="font-bold text-xs uppercase tracking-wider">{col.label}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900/90 font-black">
                    {colLeads.length}
                  </span>
                </div>

                {/* Column Lead Cards */}
                <div className="space-y-2.5 min-h-[140px]">
                  {colLeads.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-xs border border-dashed border-slate-800/80 rounded-xl">
                      No leads
                    </div>
                  ) : (
                    colLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="p-3.5 rounded-xl bg-slate-800/95 border border-slate-700/80 hover:border-[#00b4d8]/70 hover:shadow-xl transition-all cursor-pointer space-y-2 group"
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <span className="font-bold text-xs text-white group-hover:text-[#00b4d8] transition-colors line-clamp-1">
                            {lead.fullName}
                          </span>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                              lead.priority === 'URGENT'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : lead.priority === 'HIGH'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {lead.priority}
                          </span>
                        </div>

                        <p className="text-[11px] text-cyan-300 font-medium truncate flex items-center gap-1">
                          <Compass size={12} className="shrink-0 text-[#00b4d8]" />
                          <span className="truncate">{lead.tripTitle || lead.source}</span>
                        </p>

                        <div className="text-[11px] text-slate-400 space-y-0.5">
                          <p className="font-mono text-slate-300 truncate">📞 {lead.phone}</p>
                          {lead.travelDates && <p className="truncate text-slate-400">🗓️ {lead.travelDates}</p>}
                        </div>

                        {/* Quick 1-Click WhatsApp & Date */}
                        <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              triggerWhatsAppModal(lead)
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all hover:scale-105 active:scale-95"
                          >
                            <MessageCircle size={12} />
                            <span>WhatsApp</span>
                          </button>

                          <span className="text-[10px] text-slate-400 font-medium">
                            {new Date(lead.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Lead Name</th>
                  <th className="py-3 px-4">Phone / WhatsApp</th>
                  <th className="py-3 px-4">Trip Destination</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                      No leads match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                        {lead.fullName}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-mono text-slate-300">{lead.phone}</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#00b4d8] font-medium max-w-[200px] truncate">
                        {lead.tripTitle || '--'}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-700 bg-slate-800">
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            lead.priority === 'URGENT'
                              ? 'text-rose-400 bg-rose-500/10'
                              : lead.priority === 'HIGH'
                              ? 'text-amber-400 bg-amber-500/10'
                              : 'text-slate-400'
                          }`}
                        >
                          {lead.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px] max-w-[180px] truncate">
                        {lead.source}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => triggerWhatsAppModal(lead)}
                            className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 transition-all cursor-pointer"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle size={14} />
                          </button>
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                            title="Call Traveller"
                          >
                            <Phone size={14} />
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
      )}

      {/* ----------------- LEAD DETAIL DRAWER / MODAL ----------------- */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full overflow-y-auto flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#00b4d8] tracking-wider">
                    {selectedLead.source}
                  </span>
                  <h2 className="text-xl font-black text-white mt-1">{selectedLead.fullName}</h2>
                  <p className="text-xs text-slate-400">ID: {selectedLead.id}</p>
                </div>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Status & Priority Control */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Pipeline Status
                  </label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleUpdateLeadStatus(selectedLead.id, e.target.value as LeadStatus)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00b4d8]"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="FOLLOW_UP">FOLLOW UP</option>
                    <option value="CONVERTED">CONVERTED 🎉</option>
                    <option value="LOST">LOST / CLOSED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Lead Priority
                  </label>
                  <select
                    value={selectedLead.priority}
                    onChange={(e) => handleUpdateLeadPriority(selectedLead.id, e.target.value as LeadPriority)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00b4d8]"
                  >
                    <option value="URGENT">URGENT 🔥</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
              </div>

              {/* 1-Click Outreach Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => triggerWhatsAppModal(selectedLead)}
                  className="py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>Send WhatsApp</span>
                </button>

                <a
                  href={`tel:${selectedLead.phone}`}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Phone size={15} />
                  <span>Call {selectedLead.phone}</span>
                </a>
              </div>

              {/* Lead Details Breakdown */}
              <div className="space-y-3 text-xs">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inquiry Info</h3>
                
                <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Destination / Trip:</span>
                    <span className="font-bold text-[#00b4d8] text-right">{selectedLead.tripTitle || 'General'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phone:</span>
                    <span className="font-mono text-white">{selectedLead.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="text-white">{selectedLead.email || 'Not provided'}</span>
                  </div>
                  {selectedLead.travelDates && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Travel Dates:</span>
                      <span className="text-white">{selectedLead.travelDates}</span>
                    </div>
                  )}
                  {selectedLead.groupSize && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Group Size:</span>
                      <span className="text-white">{selectedLead.groupSize}</span>
                    </div>
                  )}
                  {selectedLead.message && (
                    <div className="pt-2 border-t border-slate-800 text-slate-300">
                      <span className="text-slate-400 block mb-1">Message / Notes from User:</span>
                      <p className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs italic">
                        "{selectedLead.message}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes Timeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Internal Notes ({selectedLead.notes.length})
                </h3>

                {/* Add Note Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add follow-up notes (e.g. Call done, interested in May batch)..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
                  />
                  <button
                    onClick={handleAddNote}
                    className="px-3 py-2 rounded-xl bg-[#00b4d8] hover:bg-[#0096c7] text-white text-xs font-bold cursor-pointer transition-all"
                  >
                    Save
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedLead.notes.length === 0 ? (
                    <p className="text-[11px] text-slate-500 italic">No notes logged yet.</p>
                  ) : (
                    selectedLead.notes.map((note) => (
                      <div key={note.id} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                        <p className="text-slate-200">{note.text}</p>
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span>By: {note.author}</span>
                          <span>{new Date(note.createdAt).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleDeleteLead(selectedLead.id)}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete Lead</span>
              </button>

              <button
                onClick={() => handleUpdateLeadStatus(selectedLead.id, 'CONVERTED')}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <CheckCircle2 size={14} />
                <span>Mark Converted</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- 1-CLICK WHATSAPP MODAL ----------------- */}
      {whatsAppModalLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Send WhatsApp Follow-up</h3>
                  <p className="text-[11px] text-slate-400">{whatsAppModalLead.fullName} ({whatsAppModalLead.phone})</p>
                </div>
              </div>

              <button
                onClick={() => setWhatsAppModalLead(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Template Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Choose Message Template:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleTemplateChange('greeting', whatsAppModalLead)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedTemplate === 'greeting'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  👋 Intro Greeting
                </button>
                <button
                  type="button"
                  onClick={() => handleTemplateChange('itinerary', whatsAppModalLead)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedTemplate === 'itinerary'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  🎒 Itinerary Check
                </button>
                <button
                  type="button"
                  onClick={() => handleTemplateChange('seats', whatsAppModalLead)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedTemplate === 'seats'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  ⚡ Limited Seats
                </button>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Message Preview (Editable):
              </label>
              <textarea
                rows={4}
                value={customWhatsAppMsg}
                onChange={(e) => setCustomWhatsAppMsg(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setWhatsAppModalLead(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={sendWhatsAppMessage}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <SendHorizontal size={14} />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- MANUAL ADD LEAD MODAL ----------------- */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Add Manual Lead</h3>
              <button
                onClick={() => setShowAddLeadModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.fullName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                    placeholder="e.g. Yash Patel"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="e.g. +91 98200 12345"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    placeholder="traveller@example.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Trip Destination</label>
                  <input
                    type="text"
                    value={newLeadForm.tripTitle}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, tripTitle: e.target.value })}
                    placeholder="e.g. Spiti Winter Expedition"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Travel Dates</label>
                  <input
                    type="text"
                    value={newLeadForm.travelDates}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, travelDates: e.target.value })}
                    placeholder="e.g. Dec 24-28"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Priority</label>
                  <select
                    value={newLeadForm.priority}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, priority: e.target.value as LeadPriority })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  >
                    <option value="URGENT">URGENT 🔥</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Source</label>
                  <input
                    type="text"
                    value={newLeadForm.source}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, source: e.target.value })}
                    placeholder="e.g. Instagram DM"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Initial Inquiry / Message</label>
                <textarea
                  rows={2}
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  placeholder="Traveller's query or specific requirements..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#0096c7] hover:from-[#0096c7] hover:to-[#0077b6] text-white font-bold cursor-pointer"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

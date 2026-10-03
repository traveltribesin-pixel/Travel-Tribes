'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  CreditCard,
  Search,
  Filter,
  Plus,
  Phone,
  MessageCircle,
  Clock,
  Calendar,
  DollarSign,
  FileSpreadsheet,
  X,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Compass,
  SendHorizontal,
  UserCheck
} from 'lucide-react'
import type { CRMBooking, PaymentStatus, BookingStatus } from '@/lib/crm-store'

export default function BookingsManagerPage() {
  const [bookings, setBookings] = useState<CRMBooking[]>([])
  const [loading, setLoading] = useState(true)

  // Filters
  const [search, setSearch] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('ALL')
  const [bookingStatusFilter, setBookingStatusFilter] = useState('ALL')

  // Drawers & Modals
  const [selectedBooking, setSelectedBooking] = useState<CRMBooking | null>(null)
  const [newNoteText, setNewNoteText] = useState('')
  const [showAddBookingModal, setShowAddBookingModal] = useState(false)
  const [updatePaymentModal, setUpdatePaymentModal] = useState<CRMBooking | null>(null)
  const [paymentUpdateAmount, setPaymentUpdateAmount] = useState<number>(0)
  const [paymentUpdateStatus, setPaymentUpdateStatus] = useState<PaymentStatus>('PAID')

  // Manual Booking Form State
  const [newBookingForm, setNewBookingForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    tripTitle: '',
    date: '',
    guests: 1,
    sharingType: 'Double Sharing',
    totalAmount: 15999,
    paidAmount: 5000,
    paymentStatus: 'PARTIAL' as PaymentStatus,
    bookingStatus: 'CONFIRMED' as BookingStatus,
    city: 'Mumbai',
    specialRequest: '',
    note: 'Manual booking registered by Admin'
  })

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bookings')
      const data = await res.json()
      if (data.success) {
        setBookings(data.bookings)
        if (selectedBooking) {
          const updated = data.bookings.find((b: CRMBooking) => b.id === selectedBooking.id)
          if (updated) setSelectedBooking(updated)
        }
      }
    } catch (err) {
      console.error('Error fetching bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (paymentFilter !== 'ALL' && b.paymentStatus !== paymentFilter) return false
      if (bookingStatusFilter !== 'ALL' && b.bookingStatus !== bookingStatusFilter) return false

      if (search.trim()) {
        const q = search.toLowerCase()
        return (
          b.id.toLowerCase().includes(q) ||
          b.fullName.toLowerCase().includes(q) ||
          b.phone.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          b.tripTitle.toLowerCase().includes(q) ||
          (b.city && b.city.toLowerCase().includes(q))
        )
      }

      return true
    })
  }, [bookings, paymentFilter, bookingStatusFilter, search])

  // Summary Metrics
  const totalRevenue = useMemo(() => bookings.reduce((sum, b) => sum + (Number(b.paidAmount) || 0), 0), [bookings])
  const totalPendingBalance = useMemo(() => bookings.reduce((sum, b) => sum + (Number(b.balanceDue) || 0), 0), [bookings])

  const handleUpdatePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!updatePaymentModal) return

    try {
      await fetch(`/api/admin/bookings/${updatePaymentModal.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paidAmount: Number(paymentUpdateAmount),
          paymentStatus: paymentUpdateStatus,
          note: `Payment updated: ₹${Number(paymentUpdateAmount).toLocaleString('en-IN')} received (Status: ${paymentUpdateStatus})`
        })
      })
      setUpdatePaymentModal(null)
      fetchBookings()
    } catch (err) {
      console.error('Failed to update payment:', err)
    }
  }

  const handleAddNote = async () => {
    if (!selectedBooking || !newNoteText.trim()) return
    try {
      await fetch(`/api/admin/bookings/${selectedBooking.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newNoteText.trim(), author: 'Admin' })
      })
      setNewNoteText('')
      fetchBookings()
    } catch (err) {
      console.error('Failed to add note:', err)
    }
  }

  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking record?')) return
    try {
      await fetch(`/api/admin/bookings/${bookingId}`, { method: 'DELETE' })
      setSelectedBooking(null)
      fetchBookings()
    } catch (err) {
      console.error('Failed to delete booking:', err)
    }
  }

  const handleCreateManualBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBookingForm)
      })
      const data = await res.json()
      if (data.success) {
        setShowAddBookingModal(false)
        fetchBookings()
      }
    } catch (err) {
      console.error('Failed to create booking:', err)
    }
  }

  const openWhatsAppPaymentReminder = (b: CRMBooking) => {
    const cleanPhone = b.phone.replace(/[^\d]/g, '')
    const msg = `Hi ${b.fullName}! 👋 Greetings from Travel Tribes! This is a gentle reminder regarding your booking (${b.id}) for ${b.tripTitle} departing on ${b.date}. Your remaining balance is ₹${b.balanceDue.toLocaleString('en-IN')}. Please let us know once paid so we can issue your final confirmed ticket and kit! 🎒✨`
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  const openWhatsAppConfirmation = (b: CRMBooking) => {
    const cleanPhone = b.phone.replace(/[^\d]/g, '')
    const msg = `Woohoo ${b.fullName}! 🎉 Your booking for ${b.tripTitle} (${b.date}) is fully confirmed! Booking ID: ${b.id}. Our Trip Captain will reach out to you in the official WhatsApp group 3 days prior to departure. Get ready for an epic journey! 🚀`
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">Bookings & Payments</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
              {filteredBookings.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Confirmed trips, payment tracking, balance due reminders & traveller rosters.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="/api/admin/export?type=bookings"
            download
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <FileSpreadsheet size={14} className="text-[#00b4d8]" />
            <span>Export Bookings CSV</span>
          </a>

          <button
            onClick={() => setShowAddBookingModal(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#0096c7] hover:from-[#0096c7] hover:to-[#0077b6] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#00b4d8]/20 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Manual Booking</span>
          </button>
        </div>
      </div>

      {/* Revenue Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold text-emerald-400 tracking-wider">Total Collected</span>
            <p className="text-2xl font-black text-emerald-300 mt-0.5">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider">Pending Balance Due</span>
            <p className="text-2xl font-black text-amber-300 mt-0.5">₹{totalPendingBalance.toLocaleString('en-IN')}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Clock size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Total Booked Travellers</span>
            <p className="text-2xl font-black text-white mt-0.5">
              {bookings.reduce((sum, b) => sum + (Number(b.guests) || 1), 0)} Travellers
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-[#00b4d8] flex items-center justify-center font-bold">
            <UserCheck size={20} />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Booking ID, customer name, phone, trip, or city..."
            className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
          />
        </div>

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00b4d8]"
        >
          <option value="ALL">All Payment Statuses</option>
          <option value="PAID">Fully Paid</option>
          <option value="PARTIAL">Partial (Advance Paid)</option>
          <option value="PENDING">Pending Verification</option>
          <option value="REFUNDED">Refunded</option>
        </select>

        <select
          value={bookingStatusFilter}
          onChange={(e) => setBookingStatusFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#00b4d8]"
        >
          <option value="ALL">All Booking Statuses</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Lead Traveller</th>
                <th className="py-3 px-4">Trip & Batch</th>
                <th className="py-3 px-4">Guests & Sharing</th>
                <th className="py-3 px-4">Paid / Total</th>
                <th className="py-3 px-4">Balance Due</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelectedBooking(b)}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#00b4d8] whitespace-nowrap">
                      {b.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white truncate max-w-[140px]">{b.fullName}</div>
                      <div className="text-[10px] text-slate-400">{b.phone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-white font-medium truncate max-w-[180px]">{b.tripTitle}</div>
                      <div className="text-[10px] text-cyan-400/80 truncate">{b.date}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span>{b.guests} Guests</span>
                      <span className="text-slate-500 block text-[10px]">{b.sharingType || 'Standard'}</span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-emerald-400">₹{b.paidAmount.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-slate-500">Total: ₹{b.totalAmount.toLocaleString('en-IN')}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {b.balanceDue > 0 ? (
                        <span className="font-bold text-amber-400">
                          ₹{b.balanceDue.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-slate-500">Nil</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          b.paymentStatus === 'PAID'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : b.paymentStatus === 'PARTIAL'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {b.balanceDue > 0 ? (
                          <button
                            onClick={() => openWhatsAppPaymentReminder(b)}
                            className="px-2 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                            title="Send WhatsApp Balance Due Reminder"
                          >
                            <MessageCircle size={12} />
                            <span>Remind</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => openWhatsAppConfirmation(b)}
                            className="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 cursor-pointer"
                            title="Send WhatsApp Trip Confirmation"
                          >
                            <MessageCircle size={14} />
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setUpdatePaymentModal(b)
                            setPaymentUpdateAmount(b.paidAmount)
                            setPaymentUpdateStatus(b.paymentStatus)
                          }}
                          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-medium cursor-pointer"
                        >
                          Edit
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

      {/* ----------------- BOOKING DETAIL DRAWER ----------------- */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full overflow-y-auto flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#00b4d8] tracking-wider">
                    {selectedBooking.source}
                  </span>
                  <h2 className="text-xl font-black text-white mt-1">{selectedBooking.fullName}</h2>
                  <p className="text-xs font-mono text-cyan-400">Booking ID: {selectedBooking.id}</p>
                </div>

                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Financial Snapshot */}
              <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Total Cost</span>
                  <p className="text-sm font-bold text-white mt-0.5">₹{selectedBooking.totalAmount.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Paid</span>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">₹{selectedBooking.paidAmount.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Balance Due</span>
                  <p className={`text-sm font-bold mt-0.5 ${selectedBooking.balanceDue > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                    ₹{selectedBooking.balanceDue.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Booking Data Grid */}
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Trip Destination:</span>
                  <span className="font-bold text-[#00b4d8] text-right">{selectedBooking.tripTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Batch Date:</span>
                  <span className="text-white text-right">{selectedBooking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Number of Guests:</span>
                  <span className="text-white font-bold">{selectedBooking.guests} Travellers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Room Sharing:</span>
                  <span className="text-white">{selectedBooking.sharingType || 'Standard'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-mono text-white">{selectedBooking.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-white">{selectedBooking.email || 'Not provided'}</span>
                </div>
                {selectedBooking.city && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Origin City:</span>
                    <span className="text-white">{selectedBooking.city}</span>
                  </div>
                )}
                {selectedBooking.couponCode && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Coupon Code:</span>
                    <span className="font-mono text-emerald-400 font-bold">{selectedBooking.couponCode}</span>
                  </div>
                )}
                {selectedBooking.specialRequest && (
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-400 block mb-1">Special Requests:</span>
                    <p className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                      {selectedBooking.specialRequest}
                    </p>
                  </div>
                )}
              </div>

              {/* Notes Timeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Internal Trip Notes ({selectedBooking.notes.length})
                </h3>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add booking note (e.g. Paid balance via GPay, train ticket booked)..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00b4d8]"
                  />
                  <button
                    onClick={handleAddNote}
                    className="px-3 py-2 rounded-xl bg-[#00b4d8] hover:bg-[#0096c7] text-white text-xs font-bold cursor-pointer"
                  >
                    Save
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedBooking.notes.length === 0 ? (
                    <p className="text-[11px] text-slate-500 italic">No notes logged yet.</p>
                  ) : (
                    selectedBooking.notes.map((note) => (
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
                onClick={() => handleDeleteBooking(selectedBooking.id)}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete Booking</span>
              </button>

              <button
                onClick={() => {
                  setUpdatePaymentModal(selectedBooking)
                  setPaymentUpdateAmount(selectedBooking.paidAmount)
                  setPaymentUpdateStatus(selectedBooking.paymentStatus)
                }}
                className="px-3.5 py-2 rounded-xl bg-[#00b4d8] hover:bg-[#0096c7] text-white text-xs font-bold cursor-pointer shadow-md"
              >
                Update Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- UPDATE PAYMENT MODAL ----------------- */}
      {updatePaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Update Payment & Balance</h3>
              <button
                onClick={() => setUpdatePaymentModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdatePayment} className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Total Trip Cost:</span>
                <p className="font-bold text-white text-sm">₹{updatePaymentModal.totalAmount.toLocaleString('en-IN')}</p>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Total Amount Received (INR):</label>
                <input
                  type="number"
                  required
                  value={paymentUpdateAmount}
                  onChange={(e) => setPaymentUpdateAmount(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#00b4d8]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Payment Status:</label>
                <select
                  value={paymentUpdateStatus}
                  onChange={(e) => setPaymentUpdateStatus(e.target.value as PaymentStatus)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                >
                  <option value="PAID">PAID (Full Payment Settled)</option>
                  <option value="PARTIAL">PARTIAL (Advance Received)</option>
                  <option value="PENDING">PENDING (Awaiting Transfer)</option>
                  <option value="REFUNDED">REFUNDED</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between text-xs">
                <span className="text-slate-400">Calculated Balance Due:</span>
                <span className="font-bold text-amber-400 font-mono">
                  ₹{Math.max(0, updatePaymentModal.totalAmount - paymentUpdateAmount).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUpdatePaymentModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00b4d8] hover:bg-[#0096c7] text-white font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- MANUAL ADD BOOKING MODAL ----------------- */}
      {showAddBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Add Offline / Manual Booking</h3>
              <button
                onClick={() => setShowAddBookingModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateManualBooking} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={newBookingForm.fullName}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, fullName: e.target.value })}
                    placeholder="e.g. Siddharth Rao"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={newBookingForm.phone}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, phone: e.target.value })}
                    placeholder="e.g. +91 98200 12345"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Trip Destination *</label>
                  <input
                    type="text"
                    required
                    value={newBookingForm.tripTitle}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, tripTitle: e.target.value })}
                    placeholder="e.g. Hampi Backpacking Trip"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Batch Date *</label>
                  <input
                    type="text"
                    required
                    value={newBookingForm.date}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, date: e.target.value })}
                    placeholder="e.g. Oct 01-05, 2026"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Guests Count</label>
                  <input
                    type="number"
                    min={1}
                    value={newBookingForm.guests}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, guests: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Total Cost (₹)</label>
                  <input
                    type="number"
                    value={newBookingForm.totalAmount}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, totalAmount: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Paid Amount (₹)</label>
                  <input
                    type="number"
                    value={newBookingForm.paidAmount}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, paidAmount: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBookingModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#0096c7] hover:from-[#0096c7] hover:to-[#0077b6] text-white font-bold cursor-pointer"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

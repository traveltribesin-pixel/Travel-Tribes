import fs from 'fs'
import path from 'path'

export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'FOLLOW_UP' | 'CONVERTED' | 'LOST' | 'ARCHIVED'
export type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export type PaymentStatus = 'PAID' | 'PARTIAL' | 'PENDING' | 'REFUNDED' | 'FAILED'
export type BookingStatus = 'CONFIRMED' | 'PENDING_VERIFICATION' | 'CANCELLED' | 'COMPLETED'

export interface CRMNote {
  id: string
  text: string
  author: string
  createdAt: string
}

export interface CRMLead {
  id: string
  source: string // e.g. 'Itinerary Download', 'Contact Form', 'Custom Trip Builder', 'Corporate Offsite', 'Plan a Trip Page', 'Manual Entry'
  fullName: string
  email: string
  phone: string
  tripTitle?: string
  tripSlug?: string
  travelDates?: string
  groupSize?: string
  budget?: string
  message?: string
  status: LeadStatus
  priority: LeadPriority
  notes: CRMNote[]
  assignedTo?: string
  nextFollowUpDate?: string
  lastContactedAt?: string
  convertedBookingId?: string
  meta?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface CRMBooking {
  id: string // e.g. TT-2027-4821
  source: string
  tripTitle: string
  tripSlug?: string
  date: string
  fullName: string
  email: string
  phone: string
  age?: number | null
  city?: string
  guests: number
  sharingType?: string
  paymentType: 'full' | 'advance'
  paymentStatus: PaymentStatus
  bookingStatus: BookingStatus
  totalAmount: number
  paidAmount: number
  balanceDue: number
  razorpayOrderId?: string
  razorpayPaymentId?: string
  specialRequest?: string
  couponCode?: string
  notes: CRMNote[]
  createdAt: string
  updatedAt: string
}

export interface CRMActivity {
  id: string
  type: 'LEAD_CREATED' | 'LEAD_UPDATED' | 'NOTE_ADDED' | 'BOOKING_CREATED' | 'PAYMENT_UPDATED' | 'STATUS_CHANGED'
  title: string
  description: string
  entityType: 'lead' | 'booking'
  entityId: string
  createdAt: string
}

export interface CRMData {
  leads: CRMLead[]
  bookings: CRMBooking[]
  activities: CRMActivity[]
  settings: {
    whatsappTemplates: {
      greeting: string
      itineraryFollowUp: string
      bookingConfirmed: string
      paymentReminder: string
    }
  }
}

const DATA_DIR = path.join(process.cwd(), 'data')
const CRM_FILE = path.join(DATA_DIR, 'crm-store.json')

const DEFAULT_SETTINGS = {
  whatsappTemplates: {
    greeting: 'Hi {{name}}! 👋 Thanks for reaching out to Travel Tribes regarding {{trip}}. When are you planning to travel with us? We have some amazing upcoming batches!',
    itineraryFollowUp: 'Hi {{name}}! 🎒 Hope you enjoyed checking out the itinerary for {{trip}}. We have a few spots remaining for the upcoming batch. Would you like me to reserve a tentative spot for you?',
    bookingConfirmed: 'Woohoo {{name}}! 🎉 Your booking for {{trip}} (Booking ID: {{bookingId}}) is confirmed! Your Trip Captain will connect with you 3 days prior to departure. Get ready for an epic journey! 🚀',
    paymentReminder: 'Hi {{name}}! 👋 This is a friendly reminder regarding your upcoming {{trip}} trip. Your remaining balance is ₹{{balance}}. Let us know once completed so we can finalize your travel kit!'
  }
}

// In-memory cache for fast reads
let memoryStore: CRMData | null = null

function ensureDataDirectory() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
  } catch (err) {
    console.error('Failed to create data directory:', err)
  }
}

const SAMPLE_LEADS: CRMLead[] = [
  {
    id: 'LEAD-101',
    source: 'Itinerary PDF Download Form',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '+91 98201 12345',
    tripTitle: 'Bali with Gili — 8 Nights / 9 Days',
    tripSlug: 'bali-gili-islands',
    travelDates: 'May 10–18, 2027',
    groupSize: '2 Travellers',
    status: 'NEW',
    priority: 'HIGH',
    notes: [
      {
        id: 'note-1',
        text: 'Downloaded PDF brochure. Interested in Scuba diving in Gili Trawangan.',
        author: 'System',
        createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  },
  {
    id: 'LEAD-102',
    source: 'Contact Us Page Form',
    fullName: 'Priya Mukherjee',
    email: 'priya.m@outlook.com',
    phone: '+91 97412 88990',
    tripTitle: 'Meghalaya Backpacking Trip',
    tripSlug: 'meghalaya-backpacking',
    travelDates: 'Oct 02–07, 2026 (Long Weekend)',
    groupSize: '1 (Solo Female)',
    message: 'Is this trip safe for solo female travellers? Looking to join the October batch.',
    status: 'CONTACTED',
    priority: 'URGENT',
    notes: [
      {
        id: 'note-2',
        text: 'WhatsApp message sent about our solo female traveller safety guidelines and group captain details.',
        author: 'Rohan (Sales)',
        createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
      }
    ],
    lastContactedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
  },
  {
    id: 'LEAD-103',
    source: 'Corporate Offsite Proposal Form',
    fullName: 'Vikram Mehta',
    email: 'vikram@techventures.co',
    phone: '+91 98110 55432',
    tripTitle: 'Udaipur Heritage & Desert Retreat',
    travelDates: 'Dec 18–21, 2026',
    groupSize: '25 People',
    budget: '₹4,50,000 Total',
    message: 'Need complete offsite planning with team bonding games, palace stay, and Gala dinner.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    notes: [
      {
        id: 'note-3',
        text: 'Initial proposal deck sent with 3 hotel options in Udaipur.',
        author: 'Admin',
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
      }
    ],
    nextFollowUpDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'LEAD-104',
    source: 'Custom Trip Builder (Website)',
    fullName: 'Sneha & Tanmay',
    email: 'sneha.patel@gmail.com',
    phone: '+91 98920 44321',
    tripTitle: 'Spiti Valley Winter Expedition from Delhi',
    tripSlug: 'spiti-winter-expedition',
    travelDates: 'Jan 15–22, 2027',
    groupSize: 'Couple',
    status: 'FOLLOW_UP',
    priority: 'MEDIUM',
    notes: [
      {
        id: 'note-4',
        text: 'Looking for 4x4 homestay package with heating.',
        author: 'Sales Team',
        createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  }
]

const SAMPLE_BOOKINGS: CRMBooking[] = [
  {
    id: 'TT-2026-4821',
    source: 'Direct Trip Booking Form (/book)',
    tripTitle: 'Coorg with Mysore — New Year Special',
    tripSlug: 'coorg-mysore-new-year',
    date: 'Dec 29, 2026–Jan 03, 2027 (New Year Special)',
    fullName: 'Rahul Deshmukh',
    email: 'rahul.deshmukh@gmail.com',
    phone: '+91 98230 77112',
    age: 26,
    city: 'Mumbai',
    guests: 2,
    sharingType: 'Double Sharing',
    paymentType: 'advance',
    paymentStatus: 'PARTIAL',
    bookingStatus: 'CONFIRMED',
    totalAmount: 21998,
    paidAmount: 6000,
    balanceDue: 15998,
    specialRequest: 'Veg food preference on train journey.',
    notes: [
      {
        id: 'bn-1',
        text: 'Advance booking received via UPI. Remaining ₹15,998 due 10 days before trip.',
        author: 'System',
        createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
  },
  {
    id: 'TT-2026-3914',
    source: 'Direct Trip Booking Form (/book)',
    tripTitle: 'Gokarna — X-Mas & New Year Special',
    tripSlug: 'gokarna-xmas-new-year',
    date: 'Dec 24–28, 2026 (Christmas Special)',
    fullName: 'Ananya Verma',
    email: 'ananya.v@gmail.com',
    phone: '+91 99881 22334',
    age: 24,
    city: 'Pune',
    guests: 1,
    sharingType: 'Triple Sharing',
    paymentType: 'full',
    paymentStatus: 'PAID',
    bookingStatus: 'CONFIRMED',
    totalAmount: 9999,
    paidAmount: 9999,
    balanceDue: 0,
    couponCode: 'EARLYBIRD',
    notes: [
      {
        id: 'bn-2',
        text: 'Full payment verified. Welcome kit and packing checklist emailed.',
        author: 'Admin',
        createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
      }
    ],
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
  },
  {
    id: 'TT-2026-2105',
    source: 'Direct Trip Booking Form (/book)',
    tripTitle: 'Hampi Backpacking Trip',
    tripSlug: 'hampi-backpacking',
    date: 'Oct 01–05, 2026 (Long Weekend)',
    fullName: 'Kunal Kapoor',
    email: 'kunal.kapoor@yahoo.com',
    phone: '+91 98190 66554',
    age: 28,
    city: 'Mumbai',
    guests: 3,
    sharingType: 'Triple Sharing',
    paymentType: 'full',
    paymentStatus: 'PAID',
    bookingStatus: 'CONFIRMED',
    totalAmount: 23997,
    paidAmount: 23997,
    balanceDue: 0,
    notes: [],
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString()
  }
]

const SAMPLE_ACTIVITIES: CRMActivity[] = [
  {
    id: 'act-1',
    type: 'LEAD_CREATED',
    title: 'New Lead Captured',
    description: 'Aarav Sharma downloaded Bali with Gili itinerary brochure',
    entityType: 'lead',
    entityId: 'LEAD-101',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  },
  {
    id: 'act-2',
    type: 'BOOKING_CREATED',
    title: 'New Booking Received',
    description: 'Rahul Deshmukh booked Coorg New Year (2 Guests) — ₹6,000 Advance Paid',
    entityType: 'booking',
    entityId: 'TT-2026-4821',
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
  },
  {
    id: 'act-3',
    type: 'STATUS_CHANGED',
    title: 'Lead Status Updated',
    description: 'Priya Mukherjee marked as CONTACTED',
    entityType: 'lead',
    entityId: 'LEAD-102',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
  }
]

export function loadCRMStore(): CRMData {
  if (memoryStore) {
    return memoryStore
  }

  ensureDataDirectory()

  try {
    if (fs.existsSync(CRM_FILE)) {
      const fileData = fs.readFileSync(CRM_FILE, 'utf-8')
      const parsed = JSON.parse(fileData)
      memoryStore = {
        leads: parsed.leads || [],
        bookings: parsed.bookings || [],
        activities: parsed.activities || [],
        settings: {
          ...DEFAULT_SETTINGS,
          ...(parsed.settings || {})
        }
      }
      return memoryStore
    }
  } catch (err) {
    console.error('Error reading CRM store file, initializing fallback:', err)
  }

  // Initialize with rich sample data if new store
  memoryStore = {
    leads: SAMPLE_LEADS,
    bookings: SAMPLE_BOOKINGS,
    activities: SAMPLE_ACTIVITIES,
    settings: DEFAULT_SETTINGS
  }

  saveCRMStore(memoryStore)
  return memoryStore
}

export function saveCRMStore(data: CRMData): boolean {
  ensureDataDirectory()
  try {
    memoryStore = data
    fs.writeFileSync(CRM_FILE, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.error('Failed to write CRM store file:', err)
    return false
  }
}

// ----------------- LEADS CRUD ----------------- //

export function getLeads(filters?: {
  status?: string
  search?: string
  priority?: string
  source?: string
}): CRMLead[] {
  const store = loadCRMStore()
  let list = [...store.leads]

  if (filters?.status && filters.status !== 'ALL') {
    list = list.filter(l => l.status === filters.status)
  }

  if (filters?.priority && filters.priority !== 'ALL') {
    list = list.filter(l => l.priority === filters.priority)
  }

  if (filters?.source && filters.source !== 'ALL') {
    list = list.filter(l => l.source === filters.source)
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase()
    list = list.filter(l =>
      l.fullName.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      (l.tripTitle && l.tripTitle.toLowerCase().includes(q)) ||
      (l.source && l.source.toLowerCase().includes(q))
    )
  }

  // Sort by newest first
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getLeadById(id: string): CRMLead | null {
  const store = loadCRMStore()
  return store.leads.find(l => l.id === id) || null
}

export function addLead(data: {
  fullName: string
  email: string
  phone: string
  source: string
  tripTitle?: string
  tripSlug?: string
  travelDates?: string
  groupSize?: string
  budget?: string
  message?: string
  priority?: LeadPriority
  meta?: Record<string, any>
}): CRMLead {
  const store = loadCRMStore()
  const now = new Date().toISOString()
  const id = `LEAD-${Date.now().toString().slice(-6)}`

  const newLead: CRMLead = {
    id,
    source: data.source || 'Website Lead',
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    tripTitle: data.tripTitle,
    tripSlug: data.tripSlug,
    travelDates: data.travelDates,
    groupSize: data.groupSize,
    budget: data.budget,
    message: data.message,
    status: 'NEW',
    priority: data.priority || 'HIGH',
    notes: [],
    meta: data.meta,
    createdAt: now,
    updatedAt: now
  }

  store.leads.unshift(newLead)

  // Log activity
  const activity: CRMActivity = {
    id: `act-${Date.now()}`,
    type: 'LEAD_CREATED',
    title: 'New Lead Captured',
    description: `${newLead.fullName} (${newLead.tripTitle || newLead.source})`,
    entityType: 'lead',
    entityId: newLead.id,
    createdAt: now
  }
  store.activities.unshift(activity)
  if (store.activities.length > 100) store.activities.pop()

  saveCRMStore(store)
  return newLead
}

export function updateLead(
  id: string,
  updates: Partial<CRMLead> & { note?: string; author?: string }
): CRMLead | null {
  const store = loadCRMStore()
  const index = store.leads.findIndex(l => l.id === id)
  if (index === -1) return null

  const lead = store.leads[index]
  const now = new Date().toISOString()

  // Track status change activity
  if (updates.status && updates.status !== lead.status) {
    store.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'STATUS_CHANGED',
      title: 'Lead Status Changed',
      description: `${lead.fullName} moved from ${lead.status} ➔ ${updates.status}`,
      entityType: 'lead',
      entityId: lead.id,
      createdAt: now
    })
  }

  // Add note if provided
  if (updates.note && updates.note.trim()) {
    lead.notes.unshift({
      id: `note-${Date.now()}`,
      text: updates.note.trim(),
      author: updates.author || 'Admin',
      createdAt: now
    })
  }

  const updatedLead: CRMLead = {
    ...lead,
    ...updates,
    notes: lead.notes, // keep preserved notes array
    updatedAt: now
  }

  store.leads[index] = updatedLead
  saveCRMStore(store)
  return updatedLead
}

export function addLeadNote(leadId: string, text: string, author: string = 'Admin'): CRMNote | null {
  const store = loadCRMStore()
  const lead = store.leads.find(l => l.id === leadId)
  if (!lead) return null

  const note: CRMNote = {
    id: `note-${Date.now()}`,
    text: text.trim(),
    author,
    createdAt: new Date().toISOString()
  }

  lead.notes.unshift(note)
  lead.updatedAt = new Date().toISOString()

  store.activities.unshift({
    id: `act-${Date.now()}`,
    type: 'NOTE_ADDED',
    title: 'Note Added to Lead',
    description: `Note added on ${lead.fullName}: "${text.slice(0, 40)}${text.length > 40 ? '...' : ''}"`,
    entityType: 'lead',
    entityId: lead.id,
    createdAt: new Date().toISOString()
  })

  saveCRMStore(store)
  return note
}

export function deleteLead(id: string): boolean {
  const store = loadCRMStore()
  const initialLen = store.leads.length
  store.leads = store.leads.filter(l => l.id !== id)
  if (store.leads.length !== initialLen) {
    saveCRMStore(store)
    return true
  }
  return false
}

// ----------------- BOOKINGS CRUD ----------------- //

export function getBookings(filters?: {
  paymentStatus?: string
  bookingStatus?: string
  search?: string
}): CRMBooking[] {
  const store = loadCRMStore()
  let list = [...store.bookings]

  if (filters?.paymentStatus && filters.paymentStatus !== 'ALL') {
    list = list.filter(b => b.paymentStatus === filters.paymentStatus)
  }

  if (filters?.bookingStatus && filters.bookingStatus !== 'ALL') {
    list = list.filter(b => b.bookingStatus === filters.bookingStatus)
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase()
    list = list.filter(b =>
      b.id.toLowerCase().includes(q) ||
      b.fullName.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.phone.toLowerCase().includes(q) ||
      b.tripTitle.toLowerCase().includes(q) ||
      (b.city && b.city.toLowerCase().includes(q))
    )
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getBookingById(id: string): CRMBooking | null {
  const store = loadCRMStore()
  return store.bookings.find(b => b.id === id) || null
}

export function addBooking(data: Omit<CRMBooking, 'notes' | 'createdAt' | 'updatedAt'> & { note?: string }): CRMBooking {
  const store = loadCRMStore()
  const now = new Date().toISOString()

  const newBooking: CRMBooking = {
    ...data,
    notes: data.note ? [{ id: `bn-${Date.now()}`, text: data.note, author: 'System', createdAt: now }] : [],
    createdAt: now,
    updatedAt: now
  }

  store.bookings.unshift(newBooking)

  // Log activity
  store.activities.unshift({
    id: `act-${Date.now()}`,
    type: 'BOOKING_CREATED',
    title: 'New Booking Registered',
    description: `${newBooking.fullName} booked ${newBooking.tripTitle} (${newBooking.guests} Guests) - ₹${newBooking.paidAmount.toLocaleString('en-IN')}`,
    entityType: 'booking',
    entityId: newBooking.id,
    createdAt: now
  })

  saveCRMStore(store)
  return newBooking
}

export function updateBooking(
  id: string,
  updates: Partial<CRMBooking> & { note?: string; author?: string }
): CRMBooking | null {
  const store = loadCRMStore()
  const index = store.bookings.findIndex(b => b.id === id)
  if (index === -1) return null

  const booking = store.bookings[index]
  const now = new Date().toISOString()

  if (updates.note && updates.note.trim()) {
    booking.notes.unshift({
      id: `bn-${Date.now()}`,
      text: updates.note.trim(),
      author: updates.author || 'Admin',
      createdAt: now
    })
  }

  // Calculate balance due automatically if totalAmount or paidAmount changes
  const total = updates.totalAmount !== undefined ? updates.totalAmount : booking.totalAmount
  const paid = updates.paidAmount !== undefined ? updates.paidAmount : booking.paidAmount
  const balance = Math.max(0, total - paid)

  const updatedBooking: CRMBooking = {
    ...booking,
    ...updates,
    totalAmount: total,
    paidAmount: paid,
    balanceDue: balance,
    notes: booking.notes,
    updatedAt: now
  }

  store.bookings[index] = updatedBooking
  saveCRMStore(store)
  return updatedBooking
}

export function deleteBooking(id: string): boolean {
  const store = loadCRMStore()
  const initialLen = store.bookings.length
  store.bookings = store.bookings.filter(b => b.id !== id)
  if (store.bookings.length !== initialLen) {
    saveCRMStore(store)
    return true
  }
  return false
}

// ----------------- ANALYTICS & STATS ----------------- //

export function getCRMStats() {
  const store = loadCRMStore()
  const leads = store.leads
  const bookings = store.bookings

  const totalLeads = leads.length
  const newLeads = leads.filter(l => l.status === 'NEW').length
  const inProgressLeads = leads.filter(l => ['CONTACTED', 'IN_PROGRESS', 'FOLLOW_UP'].includes(l.status)).length
  const convertedLeads = leads.filter(l => l.status === 'CONVERTED').length

  const totalBookings = bookings.length
  const totalRevenueCollected = bookings.reduce((sum, b) => sum + (Number(b.paidAmount) || 0), 0)
  const totalPendingBalance = bookings.reduce((sum, b) => sum + (Number(b.balanceDue) || 0), 0)
  const totalGrossValue = bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0)

  const conversionRate = totalLeads > 0 ? ((convertedLeads + totalBookings) / (totalLeads + totalBookings) * 100).toFixed(1) : '0'

  // Leads by Source
  const leadsBySource: Record<string, number> = {}
  leads.forEach(l => {
    const src = l.source || 'Direct / Other'
    leadsBySource[src] = (leadsBySource[src] || 0) + 1
  })

  // Top Destination Requests
  const destinationPopularity: Record<string, number> = {}
  leads.forEach(l => {
    if (l.tripTitle) {
      destinationPopularity[l.tripTitle] = (destinationPopularity[l.tripTitle] || 0) + 1
    }
  })
  bookings.forEach(b => {
    if (b.tripTitle) {
      destinationPopularity[b.tripTitle] = (destinationPopularity[b.tripTitle] || 0) + 2
    }
  })

  const topDestinations = Object.entries(destinationPopularity)
    .map(([title, count]) => ({ title, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)

  return {
    totalLeads,
    newLeads,
    inProgressLeads,
    convertedLeads,
    totalBookings,
    totalRevenueCollected,
    totalPendingBalance,
    totalGrossValue,
    conversionRate,
    leadsBySource,
    topDestinations,
    recentActivities: store.activities.slice(0, 15)
  }
}

// ----------------- CSV EXPORT UTILITIES ----------------- //

export function exportLeadsToCSV(): string {
  const leads = getLeads()
  const headers = ['ID', 'Date', 'Full Name', 'Phone', 'Email', 'Trip Destination', 'Status', 'Priority', 'Source', 'Travel Dates', 'Group Size', 'Notes Count']
  
  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${new Date(l.createdAt).toLocaleDateString('en-IN')}"`,
    `"${l.fullName.replace(/"/g, '""')}"`,
    `"${l.phone.replace(/"/g, '""')}"`,
    `"${l.email.replace(/"/g, '""')}"`,
    `"${(l.tripTitle || '').replace(/"/g, '""')}"`,
    `"${l.status}"`,
    `"${l.priority}"`,
    `"${l.source.replace(/"/g, '""')}"`,
    `"${(l.travelDates || '').replace(/"/g, '""')}"`,
    `"${(l.groupSize || '').replace(/"/g, '""')}"`,
    `"${l.notes.length}"`
  ])

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
}

export function exportBookingsToCSV(): string {
  const bookings = getBookings()
  const headers = ['Booking ID', 'Booking Date', 'Customer Name', 'Phone', 'Email', 'Trip', 'Batch Date', 'Guests', 'Room Sharing', 'Payment Status', 'Total Amount (INR)', 'Paid Amount (INR)', 'Balance Due (INR)', 'Booking Status']

  const rows = bookings.map(b => [
    `"${b.id}"`,
    `"${new Date(b.createdAt).toLocaleDateString('en-IN')}"`,
    `"${b.fullName.replace(/"/g, '""')}"`,
    `"${b.phone.replace(/"/g, '""')}"`,
    `"${b.email.replace(/"/g, '""')}"`,
    `"${b.tripTitle.replace(/"/g, '""')}"`,
    `"${b.date.replace(/"/g, '""')}"`,
    `"${b.guests}"`,
    `"${(b.sharingType || '').replace(/"/g, '""')}"`,
    `"${b.paymentStatus}"`,
    `"${b.totalAmount}"`,
    `"${b.paidAmount}"`,
    `"${b.balanceDue}"`,
    `"${b.bookingStatus}"`
  ])

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
}

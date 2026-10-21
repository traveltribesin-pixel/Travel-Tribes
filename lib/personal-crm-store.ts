import fs from 'fs'
import path from 'path'
import os from 'os'

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'IN_PROGRESS'
  | 'FOLLOW_UP'
  | 'CONVERTED'
  | 'LOST'
  | 'ARCHIVED'

export type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export type PaymentStatus = 'PAID' | 'PARTIAL' | 'PENDING' | 'REFUNDED'
export type BookingStatus = 'CONFIRMED' | 'PENDING_VERIFICATION' | 'CANCELLED' | 'COMPLETED'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'
export type TaskType = 'CALL' | 'WHATSAPP' | 'PAYMENT' | 'ITINERARY' | 'OTHER'

export interface CRMNote {
  id: string
  text: string
  author: string
  createdAt: string
}

export interface PersonalCRMLead {
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
  status: LeadStatus
  priority: LeadPriority
  notes: CRMNote[]
  customFields?: Record<string, string>
  isMovedToBooking?: boolean
  convertedBookingId?: string
  lastContactedAt?: string
  nextFollowUpDate?: string
  syncedFromSheet?: boolean
  sheetRowIndex?: number
  createdAt: string
  updatedAt: string
}

export interface PersonalCRMBooking {
  id: string // TT-BK-2026-XXXX
  leadId?: string
  source: string
  fullName: string
  phone: string
  email: string
  tripTitle: string
  tripSlug?: string
  date: string // travel batch date
  guests: number
  totalAmount: number
  paidAmount: number
  balanceDue: number
  paymentMode: 'UPI' | 'Bank Transfer' | 'Razorpay' | 'Cash' | 'Card' | 'Other'
  paymentStatus: PaymentStatus
  bookingStatus: BookingStatus
  transactionRef?: string
  specialRequest?: string
  notes: CRMNote[]
  createdAt: string
  updatedAt: string
}

export interface PersonalCRMTask {
  id: string
  title: string
  description?: string
  type: TaskType
  priority: TaskPriority
  status: 'PENDING' | 'COMPLETED'
  dueDate: string
  leadId?: string
  leadName?: string
  createdAt: string
  completedAt?: string
}

export interface PersonalCRMInvoice {
  id: string
  invoiceNumber: string // e.g. INV-2026-0101
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
  paymentUpiId: string
  bankDetails: string
  notes?: string
  whatsappMessageText: string
  whatsappUrl: string
  createdAt: string
}

export interface PersonalCRMActivity {
  id: string
  type:
    | 'LEAD_CREATED'
    | 'LEAD_UPDATED'
    | 'LEAD_CONVERTED'
    | 'NOTE_ADDED'
    | 'BOOKING_CREATED'
    | 'INVOICE_GENERATED'
    | 'TASK_CREATED'
    | 'TASK_COMPLETED'
    | 'SHEET_SYNC'
  title: string
  description: string
  entityType?: 'lead' | 'booking' | 'task' | 'invoice' | 'system'
  entityId?: string
  createdAt: string
}

export interface PersonalCRMStoreData {
  leads: PersonalCRMLead[]
  bookings: PersonalCRMBooking[]
  tasks: PersonalCRMTask[]
  invoices: PersonalCRMInvoice[]
  activities: PersonalCRMActivity[]
  lastSyncedAt?: string
  settings: {
    upiId: string
    bankName: string
    accountNumber: string
    ifscCode: string
    accountHolder: string
    helplinePhone: string
  }
}

const DATA_DIR = path.join(process.cwd(), 'data')
const CRM_STORE_FILE = path.join(DATA_DIR, 'personal-crm-store.json')
const TMP_CRM_STORE_FILE = path.join(os.tmpdir(), 'traveltribes-personal-crm-store.json')
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '1Up6p6IhT3Qd7kBM6iOihVOFKUUVxP-rs9KJ6_V-GgPI'

const DEFAULT_SETTINGS = {
  upiId: 'traveltribes@upi',
  bankName: 'HDFC Bank',
  accountNumber: '50200088992211',
  ifscCode: 'HDFC0001234',
  accountHolder: 'Travel Tribes Experiential Pvt Ltd',
  helplinePhone: '+91 99758 22023'
}

let cachedStore: PersonalCRMStoreData | null = null

function ensureDirectory() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
  } catch (err) {
    // Expected on read-only serverless filesystems
  }
}

function sanitizeStoreData(parsed: any): PersonalCRMStoreData {
  if (!parsed || typeof parsed !== 'object') {
    return {
      leads: [],
      bookings: [],
      tasks: [],
      invoices: [],
      activities: [],
      settings: DEFAULT_SETTINGS
    }
  }

  return {
    leads: Array.isArray(parsed.leads)
      ? parsed.leads.filter(
          (l: any) =>
            l && (l.syncedFromSheet === true || l.source?.includes('Manual') || l.id?.startsWith('LEAD-'))
        )
      : [],
    bookings: Array.isArray(parsed.bookings)
      ? parsed.bookings.filter(
          (b: any) =>
            b &&
            !b.fullName?.toLowerCase().includes('demo') &&
            !b.id?.startsWith('TT-2026-')
        )
      : [],
    tasks: Array.isArray(parsed.tasks)
      ? parsed.tasks.filter(
          (t: any) => t && t.id !== 'task-1' && t.id !== 'task-2'
        )
      : [],
    invoices: Array.isArray(parsed.invoices) ? parsed.invoices : [],
    activities: Array.isArray(parsed.activities) ? parsed.activities : [],
    lastSyncedAt: parsed.lastSyncedAt || undefined,
    settings: {
      ...DEFAULT_SETTINGS,
      ...(parsed.settings || {})
    }
  }
}

export function loadPersonalCRMStore(): PersonalCRMStoreData {
  if (cachedStore) {
    return cachedStore
  }

  // 1. Try reading from TMP_CRM_STORE_FILE (writable and preserved across warm serverless requests)
  try {
    if (fs.existsSync(TMP_CRM_STORE_FILE)) {
      const raw = fs.readFileSync(TMP_CRM_STORE_FILE, 'utf-8')
      const parsed = JSON.parse(raw)
      cachedStore = sanitizeStoreData(parsed)
      return cachedStore
    }
  } catch (err) {
    console.warn('Could not read from tmp CRM store:', err)
  }

  // 2. Fallback to bundled repo data file
  try {
    if (fs.existsSync(CRM_STORE_FILE)) {
      const raw = fs.readFileSync(CRM_STORE_FILE, 'utf-8')
      const parsed = JSON.parse(raw)
      cachedStore = sanitizeStoreData(parsed)
      return cachedStore
    }
  } catch (err) {
    console.warn('Could not read from bundled CRM store file:', err)
  }

  // 3. Clean store initialization with zero dummy data
  const cleanStore: PersonalCRMStoreData = {
    leads: [],
    bookings: [],
    tasks: [],
    invoices: [],
    activities: [],
    settings: DEFAULT_SETTINGS
  }

  cachedStore = cleanStore
  savePersonalCRMStore(cleanStore)
  return cleanStore
}

export function savePersonalCRMStore(data: PersonalCRMStoreData): boolean {
  cachedStore = data
  let saved = false

  // 1. Write to /tmp (always writable in AWS Lambda / Vercel Serverless & Local)
  try {
    fs.writeFileSync(TMP_CRM_STORE_FILE, JSON.stringify(data, null, 2), 'utf-8')
    saved = true
  } catch (err) {
    console.warn('Failed to save to tmp CRM store:', err)
  }

  // 2. Also attempt writing to project data/ directory if writable (e.g. localhost)
  try {
    ensureDirectory()
    fs.writeFileSync(CRM_STORE_FILE, JSON.stringify(data, null, 2), 'utf-8')
    saved = true
  } catch (err) {
    // Safely ignore on read-only serverless filesystems
  }

  return saved
}

// -------------------------------------------------------------
// GOOGLE SHEETS LIVE SYNC ENGINE
// -------------------------------------------------------------

function sanitizeString(val: any, maxLen = 1000): string {
  if (val === null || val === undefined) return ''
  const str = String(val).trim()
  return str.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '').slice(0, maxLen)
}

function cleanPhone(raw: any): string {
  if (!raw) return ''
  const str = String(raw).trim()
  return str.replace(/[^\d+]/g, '').slice(0, 25)
}

function parseSheetDate(rawFormatted?: string, rawValue?: string): string {
  if (rawFormatted && typeof rawFormatted === 'string') {
    // "21/10/2026, 02:30:30" or "21/10/2026 14:30:00"
    const parts = rawFormatted.split(/[\s,]+/)
    if (parts.length >= 2) {
      const dParts = parts[0].split('/')
      if (dParts.length === 3) {
        // dd/mm/yyyy
        const day = dParts[0].padStart(2, '0')
        const month = dParts[1].padStart(2, '0')
        const year = dParts[2]
        return `${year}-${month}-${day}T${parts[1] || '00:00:00'}+05:30`
      }
    }
  }

  if (rawValue && typeof rawValue === 'string' && rawValue.startsWith('Date(')) {
    const matched = rawValue.match(/\((.*?)\)/)
    if (matched && matched[1]) {
      const nums = matched[1].split(',').map((n) => parseInt(n.trim(), 10))
      // Date(year, monthIndex, day, hours, minutes, seconds)
      const d = new Date(Date.UTC(nums[0], nums[1] || 0, nums[2] || 1, nums[3] || 0, nums[4] || 0, nums[5] || 0))
      return d.toISOString()
    }
  }

  return new Date().toISOString()
}

export async function syncFromGoogleSheet(): Promise<{
  success: boolean
  addedLeads: number
  updatedLeads: number
  totalLeads: number
  totalBookings: number
  error?: string
}> {
  const store = loadPersonalCRMStore()
  let addedLeads = 0
  let updatedLeads = 0

  try {
    // 1. Fetch "📋 Leads & Inquiries"
    const leadsUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
      '📋 Leads & Inquiries'
    )}`

    const response = await fetch(leadsUrl, {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000)
    })
    if (!response.ok) {
      throw new Error(`Google Sheet returned HTTP ${response.status}`)
    }

    const text = await response.text()
    const jsonStart = text.indexOf('{')
    const jsonEnd = text.lastIndexOf('}')
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('Invalid JSON format from Google Sheet GViz API')
    }

    const data = JSON.parse(text.substring(jsonStart, jsonEnd + 1))
    const rows = data?.table?.rows || []

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      if (!row || !row.c) continue

      const c = row.c
      const dateFormatted = c[0]?.f
      const dateRaw = c[0]?.v
      const source = sanitizeString(c[1]?.v || 'Website Form', 120)
      const fullName = sanitizeString(c[2]?.v || '', 120)
      const phone = cleanPhone(c[3]?.v)
      const email = sanitizeString(c[5]?.v || '', 150).toLowerCase()
      const tripTitle = sanitizeString(c[6]?.v || '', 200)
      const travelDates = sanitizeString(c[7]?.v || 'Flexible', 120)
      const groupOrBudget = sanitizeString(c[8]?.v || '', 150)
      const message = sanitizeString(c[9]?.v || '', 2000)

      if (!fullName && !phone && !email) continue

      const isoDate = parseSheetDate(dateFormatted, dateRaw)
      const sheetRowNumber = i + 2
      const leadId = `LEAD-SHT-${sheetRowNumber}`

      // 1-to-1 mapping with Google Sheet row: Each row gets its own lead
      const existing = store.leads.find(
        (l) => l.id === leadId || l.sheetRowIndex === sheetRowNumber
      )

      if (existing) {
        // Update information if empty, but preserve status / converted state!
        let changed = false
        if (!existing.travelDates && travelDates) {
          existing.travelDates = travelDates
          changed = true
        }
        if (!existing.groupSize && groupOrBudget) {
          existing.groupSize = groupOrBudget
          changed = true
        }
        if (!existing.message && message) {
          existing.message = message
          changed = true
        }
        existing.syncedFromSheet = true
        existing.sheetRowIndex = sheetRowNumber
        if (changed) updatedLeads++
      } else {
        // Create new lead from sheet row
        const newLead: PersonalCRMLead = {
          id: leadId,
          source: source || 'Google Sheet Sync',
          fullName: fullName || 'Guest Traveller',
          email: email || '',
          phone: phone || '',
          tripTitle: tripTitle || 'Upcoming Trip',
          travelDates: travelDates || 'Flexible',
          groupSize: groupOrBudget || '',
          budget: groupOrBudget.includes('Budget:') ? groupOrBudget.split('Budget:')[1]?.trim() : '',
          message: message || '',
          status: 'NEW',
          priority: 'HIGH',
          notes: [
            {
              id: `note-sync-${Date.now()}-${i}`,
              text: `Synced from Google Sheet row #${i + 2} (${source})`,
              author: 'Google Sheet Sync',
              createdAt: new Date().toISOString()
            }
          ],
          customFields: {},
          isMovedToBooking: false,
          syncedFromSheet: true,
          sheetRowIndex: i + 2,
          createdAt: isoDate,
          updatedAt: new Date().toISOString()
        }
        store.leads.unshift(newLead)
        addedLeads++
      }
    }

    // 2. Fetch "💳 Bookings & Payments" sheet tab
    try {
      const bookingsUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
        '💳 Bookings & Payments'
      )}`
      const bRes = await fetch(bookingsUrl, {
        cache: 'no-store',
        signal: AbortSignal.timeout(10000)
      })
      if (bRes.ok) {
        const bText = await bRes.text()
        const bStart = bText.indexOf('{')
        const bEnd = bText.lastIndexOf('}')
        if (bStart !== -1 && bEnd !== -1) {
          const bData = JSON.parse(bText.substring(bStart, bEnd + 1))
          const bRows = bData?.table?.rows || []
          for (let bi = 0; bi < bRows.length; bi++) {
            const br = bRows[bi]
            if (!br || !br.c) continue
            const bc = br.c
            const bookingId = bc[2]?.v ? String(bc[2].v).trim() : ''
            const paymentId = bc[3]?.v ? String(bc[3].v).trim() : ''
            const paymentStatusRaw = bc[4]?.v ? String(bc[4].v).toUpperCase() : 'PENDING'
            const custName = bc[5]?.v ? String(bc[5].v).trim() : ''
            const custPhone = cleanPhone(bc[6]?.v)
            const custEmail = bc[8]?.v ? String(bc[8].v).trim().toLowerCase() : ''
            const trip = bc[10]?.v ? String(bc[10].v).trim() : ''
            const batch = bc[11]?.v ? String(bc[11].v).trim() : ''
            const guests = typeof bc[13]?.v === 'number' ? bc[13].v : 1
            const paidStr = String(bc[15]?.v || '0').replace(/[^\d.]/g, '')
            const grandStr = String(bc[17]?.v || '0').replace(/[^\d.]/g, '')
            const paid = parseFloat(paidStr) || 0
            const grand = parseFloat(grandStr) || paid || 10000
            const balance = Math.max(0, grand - paid)

            if (!custName && !bookingId) continue
            // Skip any demo/test bookings
            if (custName.toLowerCase().includes('demo') || bookingId.toUpperCase().includes('DEMO')) continue

            const exists = store.bookings.find(
              (b) => (bookingId && b.id === bookingId) || (custPhone && b.phone === custPhone && b.tripTitle === trip)
            )

            if (!exists) {
              store.bookings.unshift({
                id: bookingId || `TT-BK-${Date.now().toString().slice(-4)}-${bi + 1}`,
                source: 'Google Sheet (Bookings Tab)',
                fullName: custName || 'Valued Customer',
                phone: custPhone,
                email: custEmail,
                tripTitle: trip || 'Group Trip',
                date: batch || 'Upcoming Batch',
                guests: guests || 1,
                totalAmount: grand,
                paidAmount: paid,
                balanceDue: balance,
                paymentMode: 'UPI',
                paymentStatus: paid >= grand ? 'PAID' : paid > 0 ? 'PARTIAL' : 'PENDING',
                bookingStatus: 'CONFIRMED',
                transactionRef: paymentId,
                notes: [],
                createdAt: parseSheetDate(bc[0]?.f, bc[0]?.v),
                updatedAt: new Date().toISOString()
              })
            }
          }
        }
      }
    } catch (bErr) {
      console.warn('Optional bookings sheet tab sync error:', bErr)
    }

    store.lastSyncedAt = new Date().toISOString()

    // Add activity log
    store.activities.unshift({
      id: `act-sync-${Date.now()}`,
      type: 'SHEET_SYNC',
      title: 'Google Sheet Synced',
      description: `Synced with Google Sheet. Added ${addedLeads} new leads, updated ${updatedLeads}. Total: ${store.leads.length} leads.`,
      entityType: 'system',
      createdAt: new Date().toISOString()
    })

    if (store.activities.length > 80) {
      store.activities = store.activities.slice(0, 80)
    }

    savePersonalCRMStore(store)

    return {
      success: true,
      addedLeads,
      updatedLeads,
      totalLeads: store.leads.length,
      totalBookings: store.bookings.length
    }
  } catch (err: any) {
    console.error('Google Sheets Sync Failed:', err?.message || err)
    return {
      success: false,
      addedLeads: 0,
      updatedLeads: 0,
      totalLeads: store.leads.length,
      totalBookings: store.bookings.length,
      error: err?.message || 'Sync failed'
    }
  }
}

let lastSyncTimestamp = 0
let activeSyncPromise: Promise<{
  success: boolean
  addedLeads: number
  updatedLeads: number
  totalLeads: number
  totalBookings: number
  error?: string
}> | null = null

export async function syncFromGoogleSheetIfNeeded(thresholdMs = 15000): Promise<{
  success: boolean
  addedLeads: number
  updatedLeads: number
  totalLeads: number
  totalBookings: number
  error?: string
}> {
  const now = Date.now()
  const store = loadPersonalCRMStore()

  // If already synced recently and store has leads, return current state
  if (store.leads.length > 0 && now - lastSyncTimestamp < thresholdMs) {
    return {
      success: true,
      addedLeads: 0,
      updatedLeads: 0,
      totalLeads: store.leads.length,
      totalBookings: store.bookings.length
    }
  }

  // Deduplicate concurrent sync calls
  if (activeSyncPromise) {
    return await activeSyncPromise
  }

  activeSyncPromise = (async () => {
    try {
      const res = await syncFromGoogleSheet()
      lastSyncTimestamp = Date.now()
      return res
    } catch (err: any) {
      console.warn('Google Sheet auto-sync warning:', err?.message || err)
      const currentStore = loadPersonalCRMStore()
      return {
        success: false,
        addedLeads: 0,
        updatedLeads: 0,
        totalLeads: currentStore.leads.length,
        totalBookings: currentStore.bookings.length,
        error: err?.message || 'Sync failed'
      }
    } finally {
      activeSyncPromise = null
    }
  })()

  return await activeSyncPromise
}

// -------------------------------------------------------------
// LEADS MODULE ENGINE
// -------------------------------------------------------------

export function getPersonalCRMLeads(filters?: {
  status?: string
  priority?: string
  source?: string
  search?: string
  hideMovedToBookings?: boolean
}): PersonalCRMLead[] {
  const store = loadPersonalCRMStore()
  let list = [...store.leads]

  // Filter out converted leads that have been moved to booking if requested (default: true for Leads module)
  if (filters?.hideMovedToBookings) {
    list = list.filter((l) => !l.isMovedToBooking && l.status !== 'CONVERTED')
  }

  if (filters?.status && filters.status !== 'ALL') {
    list = list.filter((l) => l.status === filters.status)
  }

  if (filters?.priority && filters.priority !== 'ALL') {
    list = list.filter((l) => l.priority === filters.priority)
  }

  if (filters?.source && filters.source !== 'ALL') {
    list = list.filter((l) => l.source === filters.source)
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim()
    list = list.filter(
      (l) =>
        l.fullName.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.tripTitle && l.tripTitle.toLowerCase().includes(q)) ||
        (l.source && l.source.toLowerCase().includes(q))
    )
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function findLeadIndexInStore(leads: PersonalCRMLead[], searchId: string): number {
  if (!searchId) return -1
  const clean = decodeURIComponent(searchId).trim().toLowerCase()
  return leads.findIndex((l) => {
    const lId = l.id.toLowerCase()
    if (lId === clean) return true
    if (l.sheetRowIndex && (clean.endsWith(`-${l.sheetRowIndex}`) || clean === `lead-sht-${l.sheetRowIndex}`)) return true
    if (lId.endsWith(`-${clean}`) || clean.endsWith(`-${lId}`)) return true
    return false
  })
}

export function getPersonalCRMLeadById(id: string): PersonalCRMLead | null {
  const store = loadPersonalCRMStore()
  const idx = findLeadIndexInStore(store.leads, id)
  return idx !== -1 ? store.leads[idx] : null
}

export function addPersonalCRMLead(data: {
  fullName: string
  phone: string
  email?: string
  source?: string
  tripTitle?: string
  travelDates?: string
  groupSize?: string
  budget?: string
  message?: string
  priority?: LeadPriority
  customFields?: Record<string, string>
}): PersonalCRMLead {
  const store = loadPersonalCRMStore()
  const now = new Date().toISOString()
  const newLead: PersonalCRMLead = {
    id: `LEAD-MAN-${Date.now().toString().slice(-6)}`,
    source: data.source || 'Manual CRM Entry',
    fullName: data.fullName.trim(),
    phone: cleanPhone(data.phone),
    email: (data.email || '').trim().toLowerCase(),
    tripTitle: data.tripTitle || 'Custom Destination',
    travelDates: data.travelDates || 'Flexible',
    groupSize: data.groupSize || '1 Traveller',
    budget: data.budget || '',
    message: data.message || '',
    status: 'NEW',
    priority: data.priority || 'HIGH',
    notes: [
      {
        id: `note-${Date.now()}`,
        text: 'Lead created manually by sales team.',
        author: 'Sales Agent',
        createdAt: now
      }
    ],
    customFields: data.customFields || {},
    isMovedToBooking: false,
    createdAt: now,
    updatedAt: now
  }

  store.leads.unshift(newLead)

  store.activities.unshift({
    id: `act-${Date.now()}`,
    type: 'LEAD_CREATED',
    title: 'New Lead Created',
    description: `${newLead.fullName} (${newLead.tripTitle})`,
    entityType: 'lead',
    entityId: newLead.id,
    createdAt: now
  })

  savePersonalCRMStore(store)
  return newLead
}

export function updatePersonalCRMLead(
  id: string,
  updates: Partial<PersonalCRMLead> & { noteText?: string; author?: string }
): PersonalCRMLead | null {
  const store = loadPersonalCRMStore()
  const index = store.leads.findIndex((l) => l.id === id)
  if (index === -1) return null

  const lead = store.leads[index]
  const now = new Date().toISOString()

  // Track status change activity
  if (updates.status && updates.status !== lead.status) {
    store.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'LEAD_UPDATED',
      title: 'Lead Status Changed',
      description: `${lead.fullName} changed to ${updates.status}`,
      entityType: 'lead',
      entityId: lead.id,
      createdAt: now
    })
  }

  if (updates.noteText && updates.noteText.trim()) {
    lead.notes.unshift({
      id: `note-${Date.now()}`,
      text: updates.noteText.trim(),
      author: updates.author || 'Sales Agent',
      createdAt: now
    })
  }

  const updated: PersonalCRMLead = {
    ...lead,
    ...updates,
    customFields: {
      ...(lead.customFields || {}),
      ...(updates.customFields || {})
    },
    notes: lead.notes,
    updatedAt: now
  }

  store.leads[index] = updated
  savePersonalCRMStore(store)
  return updated
}

export function deletePersonalCRMLead(id: string): boolean {
  const store = loadPersonalCRMStore()
  const initial = store.leads.length
  store.leads = store.leads.filter((l) => l.id !== id)
  if (store.leads.length !== initial) {
    savePersonalCRMStore(store)
    return true
  }
  return false
}

// -------------------------------------------------------------
// CONVERT LEAD TO BOOKING ENGINE
// -------------------------------------------------------------

export function createBookingFromLead(
  leadId: string,
  bookingInput: {
    advancePaid: number
    totalAmount: number
    batchDate?: string
    guests?: number
    paymentMode?: 'UPI' | 'Bank Transfer' | 'Razorpay' | 'Cash' | 'Card' | 'Other'
    transactionRef?: string
    specialRequest?: string
    notes?: string
  }
): { booking: PersonalCRMBooking; lead: PersonalCRMLead; invoice: PersonalCRMInvoice } | null {
  const store = loadPersonalCRMStore()
  const leadIndex = findLeadIndexInStore(store.leads, leadId)
  if (leadIndex === -1) {
    console.warn(`[createBookingFromLead] Lead not found for ID: ${leadId}`)
    return null
  }

  const lead = store.leads[leadIndex]
  const now = new Date().toISOString()

  const advance = Number(bookingInput.advancePaid) || 0
  const total = Number(bookingInput.totalAmount) || advance || 15000
  const balance = Math.max(0, total - advance)
  const guests = Number(bookingInput.guests) || 1
  const batchDate = bookingInput.batchDate || lead.travelDates || 'Upcoming Batch'
  const mode = bookingInput.paymentMode || 'UPI'

  const bookingId = `TT-BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

  // 1. Create Booking Object
  const newBooking: PersonalCRMBooking = {
    id: bookingId,
    leadId: lead.id,
    source: `Converted from Lead (${lead.source})`,
    fullName: lead.fullName,
    phone: lead.phone,
    email: lead.email,
    tripTitle: lead.tripTitle || 'Travel Tribes Trip',
    tripSlug: lead.tripSlug,
    date: batchDate,
    guests,
    totalAmount: total,
    paidAmount: advance,
    balanceDue: balance,
    paymentMode: mode,
    paymentStatus: balance === 0 ? 'PAID' : advance > 0 ? 'PARTIAL' : 'PENDING',
    bookingStatus: 'CONFIRMED',
    transactionRef: bookingInput.transactionRef || '',
    specialRequest: bookingInput.specialRequest || lead.message || '',
    notes: [
      {
        id: `bn-${Date.now()}`,
        text: `Converted from lead. Advance received: ₹${advance.toLocaleString('en-IN')}. Mode: ${mode}. Ref: ${
          bookingInput.transactionRef || 'N/A'
        }. ${bookingInput.notes || ''}`,
        author: 'Sales Agent',
        createdAt: now
      }
    ],
    createdAt: now,
    updatedAt: now
  }

  store.bookings.unshift(newBooking)

  // 2. Mark Lead as Converted & Moved to Bookings
  lead.status = 'CONVERTED'
  lead.isMovedToBooking = true
  lead.convertedBookingId = bookingId
  lead.notes.unshift({
    id: `note-${Date.now()}`,
    text: `🎉 CONVERTED TO BOOKING! Booking ID: ${bookingId}. Advance Paid: ₹${advance.toLocaleString(
      'en-IN'
    )}, Balance: ₹${balance.toLocaleString('en-IN')}`,
    author: 'System',
    createdAt: now
  })
  lead.updatedAt = now
  store.leads[leadIndex] = lead

  // 3. Generate Official Invoice for this Booking/Lead
  const invoice = generateInvoiceForLeadOrBookingInternal(store, {
    leadId: lead.id,
    bookingId: newBooking.id,
    customerName: lead.fullName,
    phone: lead.phone,
    email: lead.email,
    tripTitle: lead.tripTitle || 'Travel Tribes Trip',
    travelDates: batchDate,
    guests,
    totalAmount: total,
    advancePaid: advance,
    customNotes: bookingInput.notes || ''
  })

  // 4. Log Activity
  store.activities.unshift({
    id: `act-${Date.now()}`,
    type: 'LEAD_CONVERTED',
    title: 'Lead Converted to Booking! 🎉',
    description: `${lead.fullName} booked ${newBooking.tripTitle} (Booking ID: ${bookingId}) with ₹${advance.toLocaleString('en-IN')} advance paid.`,
    entityType: 'booking',
    entityId: bookingId,
    createdAt: now
  })

  savePersonalCRMStore(store)

  return {
    booking: newBooking,
    lead,
    invoice
  }
}

// -------------------------------------------------------------
// BOOKINGS MODULE ENGINE
// -------------------------------------------------------------

export function getPersonalCRMBookings(filters?: {
  paymentStatus?: string
  bookingStatus?: string
  search?: string
}): PersonalCRMBooking[] {
  const store = loadPersonalCRMStore()
  let list = [...store.bookings]

  if (filters?.paymentStatus && filters.paymentStatus !== 'ALL') {
    list = list.filter((b) => b.paymentStatus === filters.paymentStatus)
  }

  if (filters?.bookingStatus && filters.bookingStatus !== 'ALL') {
    list = list.filter((b) => b.bookingStatus === filters.bookingStatus)
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim()
    list = list.filter(
      (b) =>
        b.id.toLowerCase().includes(q) ||
        b.fullName.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.tripTitle.toLowerCase().includes(q)
    )
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getPersonalCRMBookingById(id: string): PersonalCRMBooking | null {
  const store = loadPersonalCRMStore()
  return store.bookings.find((b) => b.id === id) || null
}

export function updatePersonalCRMBooking(
  id: string,
  updates: Partial<PersonalCRMBooking> & { noteText?: string; author?: string }
): PersonalCRMBooking | null {
  const store = loadPersonalCRMStore()
  const index = store.bookings.findIndex((b) => b.id === id)
  if (index === -1) return null

  const booking = store.bookings[index]
  const now = new Date().toISOString()

  const total = updates.totalAmount !== undefined ? updates.totalAmount : booking.totalAmount
  const paid = updates.paidAmount !== undefined ? updates.paidAmount : booking.paidAmount
  const balance = Math.max(0, total - paid)

  if (updates.noteText && updates.noteText.trim()) {
    booking.notes.unshift({
      id: `bn-${Date.now()}`,
      text: updates.noteText.trim(),
      author: updates.author || 'Sales Agent',
      createdAt: now
    })
  }

  const updated: PersonalCRMBooking = {
    ...booking,
    ...updates,
    totalAmount: total,
    paidAmount: paid,
    balanceDue: balance,
    paymentStatus: balance === 0 ? 'PAID' : paid > 0 ? 'PARTIAL' : 'PENDING',
    notes: booking.notes,
    updatedAt: now
  }

  store.bookings[index] = updated
  savePersonalCRMStore(store)
  return updated
}

// -------------------------------------------------------------
// TASKS MODULE ENGINE
// -------------------------------------------------------------

export function getPersonalCRMTasks(filters?: {
  status?: string
  priority?: string
  type?: string
}): PersonalCRMTask[] {
  const store = loadPersonalCRMStore()
  let list = [...store.tasks]

  if (filters?.status && filters.status !== 'ALL') {
    list = list.filter((t) => t.status === filters.status)
  }

  if (filters?.priority && filters.priority !== 'ALL') {
    list = list.filter((t) => t.priority === filters.priority)
  }

  if (filters?.type && filters.type !== 'ALL') {
    list = list.filter((t) => t.type === filters.type)
  }

  return list.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
}

export function addPersonalCRMTask(data: {
  title: string
  description?: string
  type?: TaskType
  priority?: TaskPriority
  dueDate: string
  leadId?: string
  leadName?: string
}): PersonalCRMTask {
  const store = loadPersonalCRMStore()
  const now = new Date().toISOString()
  const task: PersonalCRMTask = {
    id: `task-${Date.now()}`,
    title: data.title.trim(),
    description: data.description || '',
    type: data.type || 'CALL',
    priority: data.priority || 'HIGH',
    status: 'PENDING',
    dueDate: data.dueDate,
    leadId: data.leadId,
    leadName: data.leadName,
    createdAt: now
  }

  store.tasks.unshift(task)

  store.activities.unshift({
    id: `act-${Date.now()}`,
    type: 'TASK_CREATED',
    title: 'New Task Created',
    description: `${task.title} (Due: ${task.dueDate})`,
    entityType: 'task',
    entityId: task.id,
    createdAt: now
  })

  savePersonalCRMStore(store)
  return task
}

export function togglePersonalCRMTask(id: string): PersonalCRMTask | null {
  const store = loadPersonalCRMStore()
  const task = store.tasks.find((t) => t.id === id)
  if (!task) return null

  task.status = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING'
  task.completedAt = task.status === 'COMPLETED' ? new Date().toISOString() : undefined

  store.activities.unshift({
    id: `act-${Date.now()}`,
    type: 'TASK_COMPLETED',
    title: `Task Marked ${task.status}`,
    description: task.title,
    entityType: 'task',
    entityId: task.id,
    createdAt: new Date().toISOString()
  })

  savePersonalCRMStore(store)
  return task
}

export function deletePersonalCRMTask(id: string): boolean {
  const store = loadPersonalCRMStore()
  const initial = store.tasks.length
  store.tasks = store.tasks.filter((t) => t.id !== id)
  if (store.tasks.length !== initial) {
    savePersonalCRMStore(store)
    return true
  }
  return false
}

// -------------------------------------------------------------
// INVOICES & WHATSAPP ENGINE
// -------------------------------------------------------------

export function formatWhatsAppInvoiceText(invoice: {
  invoiceNumber: string
  customerName: string
  tripTitle: string
  travelDates: string
  guests: number
  totalAmount: number
  advancePaid: number
  balanceDue: number
  paymentStatus: string
  bookingId?: string
  upiId: string
  bankDetails: string
}): string {
  const isPaidInFull = invoice.balanceDue === 0

  const lines = [
    `🧾 *TRAVEL TRIBES — TRIP INVOICE & BOOKING SUMMARY*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `*Invoice No:* ${invoice.invoiceNumber}`,
    `*Booking ID:* ${invoice.bookingId || 'CONFIRMED'}`,
    `*Date:* ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`,
    `*Customer:* ${invoice.customerName}`,
    ``,
    `🏝️ *Trip:* ${invoice.tripTitle}`,
    `📅 *Travel Dates:* ${invoice.travelDates}`,
    `👥 *Total Travellers:* ${invoice.guests} Person(s)`,
    ``,
    `💰 *PAYMENT BREAKDOWN:*`,
    `• Total Trip Cost: ₹${invoice.totalAmount.toLocaleString('en-IN')}`,
    `• Amount Paid / Received: ₹${invoice.advancePaid.toLocaleString('en-IN')}`,
    `• Remaining Balance: ₹${invoice.balanceDue.toLocaleString('en-IN')}`,
    `• Payment Status: *${isPaidInFull ? '✅ FULLY PAID' : '⏳ PARTIALLY PAID / ADVANCE'}*`,
    ``,
    invoice.balanceDue > 0
      ? `🏦 *PAYMENT DETAILS FOR REMAINING BALANCE:*
• UPI ID: ${invoice.upiId}
• Bank: ${invoice.bankDetails}
(Please share payment screenshot once completed)`
      : `🎉 *Your trip is fully paid and confirmed!*`,
    ``,
    `🎒 *Inclusions:* Boutique stay, internal transfers, guided captain experiences & meals as per itinerary.`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Need any assistance? Reply directly to this WhatsApp!`,
    `_Tribe hai to vibe hai! 🚀_`
  ]

  return lines.join('\n')
}

function generateInvoiceForLeadOrBookingInternal(
  store: PersonalCRMStoreData,
  params: {
    leadId?: string
    bookingId?: string
    customerName: string
    phone: string
    email?: string
    tripTitle: string
    travelDates?: string
    guests?: number
    totalAmount?: number
    advancePaid?: number
    customNotes?: string
  }
): PersonalCRMInvoice {
  const now = new Date().toISOString()
  const cleanPhoneNum = cleanPhone(params.phone)
  let phoneDigits = cleanPhoneNum.replace(/[^\d]/g, '')
  if (phoneDigits.length === 10) phoneDigits = `91${phoneDigits}`

  const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  const total = Number(params.totalAmount) || 18000
  const advance = Number(params.advancePaid) || 5000
  const balance = Math.max(0, total - advance)
  const guests = Number(params.guests) || 1
  const dates = params.travelDates || 'Upcoming Batch'

  const messageText = formatWhatsAppInvoiceText({
    invoiceNumber,
    customerName: params.customerName,
    tripTitle: params.tripTitle,
    travelDates: dates,
    guests,
    totalAmount: total,
    advancePaid: advance,
    balanceDue: balance,
    paymentStatus: balance === 0 ? 'PAID' : 'PARTIAL',
    bookingId: params.bookingId,
    upiId: store.settings.upiId,
    bankDetails: `${store.settings.bankName} (A/C: ${store.settings.accountNumber}, IFSC: ${store.settings.ifscCode})`
  })

  const whatsappUrl = phoneDigits
    ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(messageText)}`
    : `https://wa.me/?text=${encodeURIComponent(messageText)}`

  const invoice: PersonalCRMInvoice = {
    id: `inv-${Date.now()}`,
    invoiceNumber,
    leadId: params.leadId,
    bookingId: params.bookingId,
    customerName: params.customerName,
    customerPhone: cleanPhoneNum,
    customerEmail: params.email || '',
    tripTitle: params.tripTitle,
    travelDates: dates,
    guests,
    totalAmount: total,
    advancePaid: advance,
    balanceDue: balance,
    paymentStatus: balance === 0 ? 'PAID' : advance > 0 ? 'PARTIAL' : 'PENDING',
    paymentUpiId: store.settings.upiId,
    bankDetails: `${store.settings.bankName} — A/C: ${store.settings.accountNumber} — IFSC: ${store.settings.ifscCode}`,
    notes: params.customNotes,
    whatsappMessageText: messageText,
    whatsappUrl,
    createdAt: now
  }

  store.invoices.unshift(invoice)

  store.activities.unshift({
    id: `act-${Date.now()}`,
    type: 'INVOICE_GENERATED',
    title: 'Invoice Generated',
    description: `Invoice ${invoiceNumber} created for ${invoice.customerName} (${invoice.tripTitle})`,
    entityType: 'invoice',
    entityId: invoice.id,
    createdAt: now
  })

  return invoice
}

export function generateInvoiceForLeadOrBooking(params: {
  leadId?: string
  bookingId?: string
  customerName: string
  phone: string
  email?: string
  tripTitle: string
  travelDates?: string
  guests?: number
  totalAmount?: number
  advancePaid?: number
  customNotes?: string
}): PersonalCRMInvoice {
  const store = loadPersonalCRMStore()
  const invoice = generateInvoiceForLeadOrBookingInternal(store, params)
  savePersonalCRMStore(store)
  return invoice
}

export function getPersonalCRMInvoices(filters?: { status?: string; search?: string }): PersonalCRMInvoice[] {
  const store = loadPersonalCRMStore()
  let list = [...store.invoices]

  if (filters?.status && filters.status !== 'ALL') {
    list = list.filter((i) => i.paymentStatus === filters.status)
  }

  if (filters?.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim()
    list = list.filter(
      (i) =>
        i.invoiceNumber.toLowerCase().includes(q) ||
        i.customerName.toLowerCase().includes(q) ||
        i.customerPhone.toLowerCase().includes(q) ||
        i.tripTitle.toLowerCase().includes(q)
    )
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// -------------------------------------------------------------
// STATS & DASHBOARD OVERVIEW ENGINE
// -------------------------------------------------------------

export function getPersonalCRMStats() {
  const store = loadPersonalCRMStore()
  const activeLeads = store.leads.filter((l) => !l.isMovedToBooking && l.status !== 'CONVERTED')
  const convertedLeads = store.leads.filter((l) => l.isMovedToBooking || l.status === 'CONVERTED')
  const totalBookings = store.bookings.length

  const totalCollectedRevenue = store.bookings.reduce((sum, b) => sum + (Number(b.paidAmount) || 0), 0)
  const totalPendingBalance = store.bookings.reduce((sum, b) => sum + (Number(b.balanceDue) || 0), 0)
  const totalGrossValue = store.bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0)

  const pendingTasks = store.tasks.filter((t) => t.status === 'PENDING').length
  const totalInvoices = store.invoices.length

  const todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date())
  const todayFollowUpsCount = activeLeads.filter(
    (l) => l.nextFollowUpDate && l.nextFollowUpDate <= todayStr
  ).length

  return {
    totalLeads: store.leads.length,
    activeLeadsCount: activeLeads.length,
    convertedLeadsCount: convertedLeads.length,
    newLeadsCount: activeLeads.filter((l) => l.status === 'NEW').length,
    inProgressLeadsCount: activeLeads.filter((l) => ['CONTACTED', 'IN_PROGRESS', 'FOLLOW_UP'].includes(l.status)).length,
    todayFollowUpsCount,
    totalBookings,
    totalCollectedRevenue,
    totalPendingBalance,
    totalGrossValue,
    pendingTasks,
    totalInvoices,
    lastSyncedAt: store.lastSyncedAt,
    activities: store.activities.slice(0, 15)
  }
}

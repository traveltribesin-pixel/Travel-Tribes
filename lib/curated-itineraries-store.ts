import fs from 'fs'
import os from 'os'
import path from 'path'
import zlib from 'zlib'
import { slugify } from '@/lib/utils'
import { appendToGoogleSheet } from '@/lib/google-sheets'
import {
  CuratedItinerary,
  TripType,
  MEGHALAYA_CANVA_SEED,
  DEFAULT_POINTS_TO_BE_NOTED,
  DEFAULT_WHY_TRAVEL_TRIBES
} from './curated-itinerary-constants'

export { slugify }
export type { CuratedItinerary, TripType }
export { DEFAULT_POINTS_TO_BE_NOTED, DEFAULT_WHY_TRAVEL_TRIBES }

export const SEED_ITINERARIES: CuratedItinerary[] = [MEGHALAYA_CANVA_SEED]

interface CuratedStoreData {
  itineraries: CuratedItinerary[]
}

const DATA_DIR = path.join(process.cwd(), 'data')
const CURATED_FILE = path.join(DATA_DIR, 'curated-itineraries.json')
const TMP_CURATED_FILE = path.join(os.tmpdir(), 'traveltribes-curated-itineraries.json')
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '1Up6p6IhT3Qd7kBM6iOihVOFKUUVxP-rs9KJ6_V-GgPI'
const PAYLOAD_PREFIX = 'TTZ1:'

function ensureDataDir(): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    return true
  } catch {
    return false
  }
}

function readJsonFileSafe(filePath: string): CuratedItinerary[] {
  try {
    if (!fs.existsSync(filePath)) return []
    const raw = fs.readFileSync(filePath, 'utf-8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed?.itineraries) ? parsed.itineraries : []
  } catch {
    return []
  }
}

function mergeItinerariesBySlug(lists: CuratedItinerary[][]): CuratedItinerary[] {
  const bySlug = new Map<string, CuratedItinerary>()
  for (const list of lists) {
    for (const item of list) {
      if (!item || !item.slug) continue
      const key = item.slug.toLowerCase()
      const existing = bySlug.get(key)
      if (!existing) {
        bySlug.set(key, item)
      } else {
        const existingTs = new Date(existing.updatedAt || existing.createdAt || 0).getTime()
        const candidateTs = new Date(item.updatedAt || item.createdAt || 0).getTime()
        if (candidateTs >= existingTs) {
          bySlug.set(key, item)
        }
      }
    }
  }
  return Array.from(bySlug.values())
}

export function loadCuratedStore(): CuratedStoreData {
  try {
    const repoList = readJsonFileSafe(CURATED_FILE)
    const tmpList = readJsonFileSafe(TMP_CURATED_FILE)
    let merged = mergeItinerariesBySlug([repoList, tmpList])

    if (merged.length === 0) {
      merged = [...SEED_ITINERARIES]
    }

    if (!merged.some((it: any) => it.slug === 'meghalaya-backpacking-trip')) {
      merged.unshift(MEGHALAYA_CANVA_SEED)
    }

    return { itineraries: merged }
  } catch (err) {
    console.error('Error reading curated itineraries store:', err)
    return { itineraries: SEED_ITINERARIES }
  }
}

export function saveCuratedStore(store: CuratedStoreData): { fileSaved: boolean; tmpSaved: boolean } {
  let tmpSaved = false
  let fileSaved = false

  // Always write to OS temp dir first (writable in Vercel / serverless lambdas)
  try {
    fs.writeFileSync(TMP_CURATED_FILE, JSON.stringify(store, null, 2), 'utf-8')
    tmpSaved = true
  } catch (err) {
    console.warn('Could not save curated store to tmp:', err)
  }

  // Also persist to repo data dir when writable (local dev / persistent server)
  try {
    if (ensureDataDir()) {
      fs.writeFileSync(CURATED_FILE, JSON.stringify(store, null, 2), 'utf-8')
      fileSaved = true
    }
  } catch {
    // Expected EROFS on read-only serverless filesystems (e.g. Vercel)
  }

  return { fileSaved, tmpSaved }
}

function encodeCuratedPayload(itinerary: CuratedItinerary): string {
  const compressed = zlib.deflateSync(Buffer.from(JSON.stringify(itinerary), 'utf-8')).toString('base64')
  return `${PAYLOAD_PREFIX}${compressed}`
}

function decodeCuratedPayload(rawCell: unknown): CuratedItinerary | null {
  if (typeof rawCell !== 'string' || !rawCell.trim()) return null
  try {
    const trimmed = rawCell.trim()
    if (trimmed.startsWith(PAYLOAD_PREFIX)) {
      const buf = Buffer.from(trimmed.slice(PAYLOAD_PREFIX.length), 'base64')
      const jsonStr = zlib.inflateSync(buf).toString('utf-8')
      const obj = JSON.parse(jsonStr)
      return obj?.slug ? obj : null
    }

    const parsed = JSON.parse(trimmed)
    if (typeof parsed?.compressedPayload === 'string' && parsed.compressedPayload.startsWith(PAYLOAD_PREFIX)) {
      return decodeCuratedPayload(parsed.compressedPayload)
    }
    if (parsed?.itinerary && typeof parsed.itinerary === 'object' && parsed.itinerary.slug) {
      return parsed.itinerary
    }
    if (parsed?.slug && Array.isArray(parsed?.days)) {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

function cacheItineraryLocally(item: CuratedItinerary): void {
  const store = loadCuratedStore()
  const idx = store.itineraries.findIndex(it => it.slug.toLowerCase() === item.slug.toLowerCase())
  if (idx !== -1) {
    store.itineraries[idx] = item
  } else {
    store.itineraries.unshift(item)
  }
  saveCuratedStore(store)
}

async function queryGoogleSheetGViz(sheetName: string, tq: string): Promise<any[]> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
      sheetName
    )}&tq=${encodeURIComponent(tq)}`
    const response = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(6000)
    })
    if (!response.ok) return []

    const text = await response.text()
    const jsonStart = text.indexOf('{')
    const jsonEnd = text.lastIndexOf('}')
    if (jsonStart === -1 || jsonEnd === -1) return []

    const data = JSON.parse(text.substring(jsonStart, jsonEnd + 1))
    if (data?.status === 'error' || !Array.isArray(data?.table?.rows)) return []
    return data.table.rows
  } catch (err) {
    console.warn(`[Curated Store] Google Sheet GViz lookup failed (${sheetName}):`, err)
    return []
  }
}

async function fetchCuratedFromGoogleSheetBySlug(slug: string): Promise<CuratedItinerary | null> {
  const safeSlug = String(slug || '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '')
  if (!safeSlug) return null

  // 1. Primary lookup in Master Activity Log (works immediately with existing webhook script)
  const masterRows = await queryGoogleSheetGViz(
    '🗂️ All Master Log',
    `SELECT H WHERE B = 'CURATED_ITINERARY' AND G = '${safeSlug}' LIMIT 1`
  )
  for (const row of masterRows) {
    const decoded = decodeCuratedPayload(row?.c?.[0]?.v)
    if (decoded && decoded.slug.toLowerCase() === safeSlug) {
      return decoded
    }
  }

  // 2. Fallback lookup in dedicated Curated Itineraries tab (if configured)
  const curatedRows = await queryGoogleSheetGViz(
    '📄 Curated Itineraries',
    `SELECT H WHERE C = '${safeSlug}' LIMIT 1`
  )
  for (const row of curatedRows) {
    const decoded = decodeCuratedPayload(row?.c?.[0]?.v)
    if (decoded && decoded.slug.toLowerCase() === safeSlug) {
      return decoded
    }
  }

  return null
}

async function fetchRecentCuratedFromGoogleSheet(limit = 30): Promise<CuratedItinerary[]> {
  const rows = await queryGoogleSheetGViz(
    '🗂️ All Master Log',
    `SELECT H WHERE B = 'CURATED_ITINERARY' LIMIT ${limit}`
  )
  const results: CuratedItinerary[] = []
  for (const row of rows) {
    const decoded = decodeCuratedPayload(row?.c?.[0]?.v)
    if (decoded) results.push(decoded)
  }
  return results
}

export function getCuratedItineraryBySlug(slug: string): CuratedItinerary | null {
  if (!slug) return null
  const cleanSlug = String(slug).trim().toLowerCase()
  const store = loadCuratedStore()
  return store.itineraries.find(it => it.slug.toLowerCase() === cleanSlug) || null
}

export async function getCuratedItineraryBySlugAsync(slug: string): Promise<CuratedItinerary | null> {
  const localMatch = getCuratedItineraryBySlug(slug)
  if (localMatch) return localMatch

  const remoteMatch = await fetchCuratedFromGoogleSheetBySlug(slug)
  if (remoteMatch) {
    cacheItineraryLocally(remoteMatch)
    return remoteMatch
  }
  return null
}

export function getAllCuratedItineraries(): CuratedItinerary[] {
  const store = loadCuratedStore()
  return store.itineraries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getAllCuratedItinerariesAsync(): Promise<CuratedItinerary[]> {
  const localList = getAllCuratedItineraries()
  const remoteList = await fetchRecentCuratedFromGoogleSheet(30)
  const merged = mergeItinerariesBySlug([localList, remoteList])
  return merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

function upsertCuratedInLocalStore(
  data: Omit<CuratedItinerary, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
): { itinerary: CuratedItinerary; fileSaved: boolean; tmpSaved: boolean } {
  const store = loadCuratedStore()
  const now = new Date().toISOString()

  let finalSlug = slugify(data.slug || data.title)
  if (!finalSlug) {
    finalSlug = `itinerary-${Date.now().toString().slice(-6)}`
  }

  // If existing record being updated
  if (data.id) {
    const index = store.itineraries.findIndex(it => it.id === data.id)
    if (index !== -1) {
      const existing = store.itineraries[index]
      const updated: CuratedItinerary = {
        ...existing,
        ...data,
        id: existing.id,
        slug: finalSlug,
        updatedAt: now
      }
      store.itineraries[index] = updated
      const { fileSaved, tmpSaved } = saveCuratedStore(store)
      return { itinerary: updated, fileSaved, tmpSaved }
    }
  }

  // Ensure unique slug for new items
  let uniqueSlug = finalSlug
  let counter = 1
  while (store.itineraries.some(it => it.slug === uniqueSlug && it.id !== data.id)) {
    uniqueSlug = `${finalSlug}-${counter}`
    counter++
  }

  const id = data.id || `curated-${Date.now().toString().slice(-8)}`
  const newItinerary: CuratedItinerary = {
    ...data,
    id,
    slug: uniqueSlug,
    createdAt: now,
    updatedAt: now
  }

  store.itineraries.unshift(newItinerary)
  const { fileSaved, tmpSaved } = saveCuratedStore(store)
  return { itinerary: newItinerary, fileSaved, tmpSaved }
}

export function saveCuratedItinerary(data: Omit<CuratedItinerary, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): CuratedItinerary {
  return upsertCuratedInLocalStore(data).itinerary
}

export async function saveCuratedItineraryAsync(
  data: Omit<CuratedItinerary, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
): Promise<{
  itinerary: CuratedItinerary
  persistence: {
    fileSaved: boolean
    tmpSaved: boolean
    cloudSaved: boolean
    cloudError?: string
  }
}> {
  const { itinerary, fileSaved, tmpSaved } = upsertCuratedInLocalStore(data)

  const compressedPayload = encodeCuratedPayload(itinerary)
  const sheetRes = await appendToGoogleSheet({
    type: 'curated_itinerary',
    source: 'Curate Itinerary Builder',
    fullName: itinerary.clientName || 'Valued Guest',
    phone: itinerary.clientPhone || '',
    email: itinerary.clientEmail || '',
    tripTitle: itinerary.slug,
    tripSlug: itinerary.slug,
    title: itinerary.title,
    destination: itinerary.destination,
    travelDates: itinerary.duration,
    message: `Curated proposal: /itinerary/${itinerary.slug}`,
    compressedPayload
  })

  return {
    itinerary,
    persistence: {
      fileSaved,
      tmpSaved,
      cloudSaved: sheetRes.success,
      cloudError: sheetRes.error
    }
  }
}

export function deleteCuratedItinerary(id: string): boolean {
  const store = loadCuratedStore()
  const initialLen = store.itineraries.length
  store.itineraries = store.itineraries.filter(it => it.id !== id)
  if (store.itineraries.length !== initialLen) {
    saveCuratedStore(store)
    return true
  }
  return false
}

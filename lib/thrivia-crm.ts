/**
 * Thrivia CRM Integration Helper
 * Dispatches captured leads, inquiries, and booking records to Thrivia CRM (thrivia.io).
 * Endpoint: https://api.thrivia.io/api/webforms/ingest
 */

export interface ThriviaLeadInput {
  name: string
  phone: string
  email: string
  source?: string
  message?: string
  tripTitle?: string
  travelDates?: string
  groupSize?: string | number
  budget?: string
  pageUrl?: string
  pageId?: string
  customFields?: Record<string, any>
}

export const THRIVIA_DEFAULT_ENDPOINT = 'https://api.thrivia.io/api/webforms/ingest'

/**
 * Gets configured Thrivia API key from environment variables.
 */
export function getThriviaApiKey(): string {
  return (process.env.THRIVIA_KEY || process.env.THRIVIA_API_KEY || '').trim()
}

/**
 * Gets configured Thrivia Ingest Endpoint URL.
 */
export function getThriviaEndpoint(): string {
  return (process.env.THRIVIA_ENDPOINT_URL || THRIVIA_DEFAULT_ENDPOINT).trim()
}

/**
 * Sends a captured lead or booking inquiry directly to Thrivia CRM webforms ingest.
 */
export async function sendLeadToThriviaCRM(
  data: ThriviaLeadInput
): Promise<{ success: boolean; leadId?: string; error?: string }> {
  const apiKey = getThriviaApiKey()
  const endpoint = getThriviaEndpoint()

  if (!apiKey) {
    console.warn('⚠️ [Thrivia CRM] THRIVIA_KEY is not configured in .env. Skipping CRM sync.')
    return { success: false, error: 'THRIVIA_KEY not configured in environment' }
  }

  // Sanitize fields
  const cleanName = String(data.name || 'Website Traveller').trim()
  const cleanPhone = String(data.phone || '').trim()
  const cleanEmail = String(data.email || '').trim().toLowerCase()
  const cleanSource = String(data.source || 'Website Lead').trim()

  // Assemble notes for Thrivia CRM lead card
  const noteParts: string[] = []
  if (cleanSource) noteParts.push(`Source: ${cleanSource}`)
  if (data.tripTitle) noteParts.push(`Trip: ${data.tripTitle}`)
  if (data.travelDates) noteParts.push(`Dates: ${data.travelDates}`)
  if (data.groupSize) noteParts.push(`Group Size: ${data.groupSize}`)
  if (data.budget) noteParts.push(`Budget: ${data.budget}`)
  if (data.message) noteParts.push(`Message: ${data.message}`)

  // Include any extra metadata from custom fields
  if (data.customFields && typeof data.customFields === 'object') {
    for (const [k, v] of Object.entries(data.customFields)) {
      if (v !== undefined && v !== null && v !== '') {
        noteParts.push(`${k}: ${v}`)
      }
    }
  }

  const notesText = noteParts.join(' | ')

  // Routing: Thrivia requires page_url, page_id, or event
  const eventName = data.tripTitle || cleanSource || 'Travel Tribes Lead'
  const pageUrl =
    data.pageUrl ||
    (data.tripTitle
      ? `https://traveltribes.in/trips/${encodeURIComponent(data.tripTitle.toLowerCase().replace(/\s+/g, '-'))}`
      : 'https://traveltribes.in')

  const payload: Record<string, any> = {
    name: cleanName,
    phone: cleanPhone,
    email: cleanEmail,
    event: eventName,
    page_url: pageUrl,
    notes: notesText,
    source: cleanSource,
    trip: data.tripTitle || '',
    travel_dates: data.travelDates || '',
    group_size: data.groupSize ? String(data.groupSize) : '',
    budget: data.budget || '',
    ...(data.customFields || {})
  }

  if (data.pageId) {
    payload.page_id = data.pageId
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Thrivia-Key': apiKey
      },
      body: JSON.stringify(payload)
    })

    const resJson = await res.json().catch(() => null)

    if (!res.ok) {
      console.error(
        `❌ [Thrivia CRM] Ingestion rejected (HTTP ${res.status}):`,
        resJson?.error || resJson?.message || 'Unknown error'
      )
      return {
        success: false,
        error: resJson?.error || resJson?.message || `HTTP ${res.status}`
      }
    }

    const leadId = resJson?.lead_id || resJson?.leadId || resJson?.id || 'synced'
    console.log(`✅ [Thrivia CRM] Lead captured successfully in Thrivia! Lead ID: ${leadId}`)
    return { success: true, leadId }
  } catch (error: any) {
    console.error('❌ [Thrivia CRM] Network error dispatching lead to Thrivia:', error?.message || error)
    return { success: false, error: error?.message || 'Network error' }
  }
}

/**
 * Diagnostic health check to test API key connection with Thrivia CRM.
 */
export async function checkThriviaCRMConnection(): Promise<{
  connected: boolean
  apiKeyConfigured: boolean
  endpoint: string
  latencyMs?: number
  error?: string
}> {
  const apiKey = getThriviaApiKey()
  const endpoint = getThriviaEndpoint()
  const apiKeyConfigured = Boolean(apiKey && !apiKey.includes('PASTE_YOUR_INGEST_KEY_HERE'))

  if (!apiKeyConfigured) {
    return {
      connected: false,
      apiKeyConfigured: false,
      endpoint,
      error: 'THRIVIA_KEY is missing or not configured in .env'
    }
  }

  const startTime = Date.now()

  try {
    const result = await sendLeadToThriviaCRM({
      name: 'Test Ping',
      phone: '9999999999',
      email: 'ping@traveltribes.in',
      source: 'System Diagnostic Ping',
      message: 'Automated connectivity test from Travel Tribes settings'
    })

    const latencyMs = Date.now() - startTime

    if (result.success) {
      return {
        connected: true,
        apiKeyConfigured: true,
        endpoint,
        latencyMs
      }
    }

    return {
      connected: false,
      apiKeyConfigured: true,
      endpoint,
      latencyMs,
      error: result.error
    }
  } catch (err: any) {
    return {
      connected: false,
      apiKeyConfigured: true,
      endpoint,
      error: err?.message || 'Connection test failed'
    }
  }
}

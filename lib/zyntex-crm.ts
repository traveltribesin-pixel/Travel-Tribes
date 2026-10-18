/**
 * Zyntex CRM Cloud Integration Helper
 * Dispatches captured leads, inquiries, and booking records to the user's custom Zyntex CRM platform.
 * Endpoint: https://crm-alpha-drab.vercel.app/api/v1/capture-lead
 */

export interface ZyntexLeadInput {
  name: string
  phone: string
  email: string
  source?: string
  message?: string
  tripTitle?: string
  travelDates?: string
  groupSize?: string
  budget?: string
  customFields?: Record<string, any>
}

const DEFAULT_API_KEY = 'zyn_live_395987dcebb63e58836fd423f51abf3b'
const DEFAULT_WEBHOOK_URL = 'https://crm-alpha-drab.vercel.app/api/v1/capture-lead'
const ORGS_URL = 'https://crm-alpha-drab.vercel.app/api/organizations'

/**
 * Auto-registers Travel Tribes in Zyntex CRM if the serverless in-memory store was reset.
 */
async function autoHealZyntexOrganization(apiKey: string): Promise<boolean> {
  try {
    const res = await fetch(ORGS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: 'org_travel_tribes',
        name: 'Travel Tribes',
        slug: 'travel-tribes',
        industry: 'Travel & Tourism',
        apiKey,
        currency: 'INR',
        currencySymbol: '₹'
      })
    })
    const json = await res.json().catch(() => null)
    return Boolean(res.ok && json?.success)
  } catch (err) {
    console.warn('⚠️ [Zyntex CRM] Auto-heal organization creation failed:', err)
    return false
  }
}

/**
 * Sends a captured lead directly to Zyntex CRM.
 */
export async function sendLeadToZyntexCRM(
  data: ZyntexLeadInput,
  attempt: number = 1
): Promise<{ success: boolean; leadId?: string; error?: string }> {
  const apiKey = process.env.ZYNTEX_CRM_API_KEY || DEFAULT_API_KEY
  const webhookUrl = process.env.ZYNTEX_CRM_WEBHOOK_URL || DEFAULT_WEBHOOK_URL

  if (!apiKey || !webhookUrl) {
    console.warn('⚠️ [Zyntex CRM] ZYNTEX_CRM_API_KEY or Webhook URL not set. Skipping sync.')
    return { success: false, error: 'Configuration missing' }
  }

  // Sanitize fields
  const cleanName = String(data.name || 'Traveller Lead').trim()
  const cleanPhone = String(data.phone || '').trim()
  const cleanEmail = String(data.email || '').trim().toLowerCase()
  const cleanSource = String(data.source || 'Website Lead').trim()
  
  let formattedMessage = data.message || ''
  if (data.tripTitle && !formattedMessage.includes(data.tripTitle)) {
    formattedMessage = `Trip: ${data.tripTitle}${data.travelDates ? ` | Dates: ${data.travelDates}` : ''}${data.groupSize ? ` | Group: ${data.groupSize}` : ''}${data.budget ? ` | Budget: ${data.budget}` : ''}${formattedMessage ? `\nNote: ${formattedMessage}` : ''}`
  }

  const payload: Record<string, any> = {
    apiKey,
    name: cleanName,
    phone: cleanPhone,
    email: cleanEmail,
    source: cleanSource,
    message: formattedMessage,
    trip: data.tripTitle || '',
    travelDates: data.travelDates || '',
    groupSize: data.groupSize || '',
    budget: data.budget || '',
    ...(data.customFields || {})
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Zyntex-Api-Key': apiKey
      },
      body: JSON.stringify(payload)
    })

    const resJson = await res.json().catch(() => null)

    // Handle 401 Unauthorized by auto-healing the organization and retrying once
    if (res.status === 401 && attempt === 1) {
      console.log('🔄 [Zyntex CRM] API Key returned 401. Re-verifying organization on Zyntex CRM...')
      const healed = await autoHealZyntexOrganization(apiKey)
      if (healed) {
        return sendLeadToZyntexCRM(data, 2)
      }
    }

    if (!res.ok || !resJson?.success) {
      console.error(`❌ [Zyntex CRM] Ingestion rejected (HTTP ${res.status}):`, resJson?.error || 'Unknown error')
      return { success: false, error: resJson?.error || `HTTP ${res.status}` }
    }

    const leadId = resJson?.data?.leadId
    console.log(`✅ [Zyntex CRM] Lead captured successfully! Org: "${resJson?.data?.orgName || 'Travel Tribes'}", Lead ID: ${leadId}`)
    return { success: true, leadId }
  } catch (error: any) {
    console.error('❌ [Zyntex CRM] Network error dispatching lead:', error?.message || error)
    return { success: false, error: error?.message || 'Network error' }
  }
}

/**
 * Diagnostic health check to test API key connection with Zyntex CRM
 */
export async function checkZyntexCRMConnection(): Promise<{
  connected: boolean
  orgName?: string
  apiKey: string
  webhookUrl: string
  latencyMs?: number
  error?: string
}> {
  const apiKey = process.env.ZYNTEX_CRM_API_KEY || DEFAULT_API_KEY
  const webhookUrl = process.env.ZYNTEX_CRM_WEBHOOK_URL || DEFAULT_WEBHOOK_URL
  const startTime = Date.now()

  try {
    const result = await sendLeadToZyntexCRM({
      name: 'Connection Test Ping',
      phone: '9999999999',
      email: 'test-ping@traveltribes.in',
      source: 'System Diagnostic Ping',
      message: 'Automated CRM connectivity check from Travel Tribes admin'
    })

    const latencyMs = Date.now() - startTime

    if (result.success) {
      return {
        connected: true,
        orgName: 'Travel Tribes',
        apiKey,
        webhookUrl,
        latencyMs
      }
    }

    return {
      connected: false,
      apiKey,
      webhookUrl,
      latencyMs,
      error: result.error
    }
  } catch (err: any) {
    return {
      connected: false,
      apiKey,
      webhookUrl,
      error: err?.message || 'Connection test failed'
    }
  }
}

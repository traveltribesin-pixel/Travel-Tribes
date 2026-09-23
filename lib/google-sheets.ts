/**
 * Google Sheets Auto-Sync Helper
 * Sends form submissions asynchronously to Google Apps Script Webhook
 */

export async function appendToGoogleSheet(data: Record<string, any>): Promise<{ success: boolean; error?: string }> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('⚠️ [Google Sheets] GOOGLE_SHEET_WEBHOOK_URL is not set in .env. Skipping Google Sheet sync.')
    return { success: false, error: 'Webhook URL missing' }
  }

  try {
    const payload = {
      ...data,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      submittedAtIso: new Date().toISOString()
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      redirect: 'follow'
    })

    if (!response.ok) {
      console.error(`❌ [Google Sheets] Webhook responded with HTTP ${response.status}`)
      return { success: false, error: `HTTP ${response.status}` }
    }

    console.log(`✅ [Google Sheets] Data synced successfully for type: "${data.type || 'lead'}"`)
    return { success: true }
  } catch (error: any) {
    console.error('❌ [Google Sheets] Error sending data to webhook:', error?.message || error)
    return { success: false, error: error?.message || 'Sync failed' }
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { sendLeadToThriviaCRM } from '@/lib/thrivia-crm'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))

    const name = body.name || body.fullName || body['first-name'] || body.firstName || 'Website Lead'
    const phone = body.phone || body.mobile || body.whatsapp || body.contact || ''
    const email = body.email || ''

    if (!phone && !email) {
      return NextResponse.json(
        { success: false, error: 'At least phone or email is required' },
        { status: 400 }
      )
    }

    const result = await sendLeadToThriviaCRM({
      name,
      phone,
      email,
      source: body.source || 'Website Webform',
      message: body.message || body.notes || '',
      tripTitle: body.tripTitle || body.trip || body.event || '',
      travelDates: body.travelDates || body.dates || '',
      groupSize: body.groupSize || body.travelers || body.guests || '',
      budget: body.budget || '',
      pageUrl: body.page_url || body.pageUrl || '',
      customFields: body
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to sync to Thrivia CRM' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, leadId: result.leadId })
  } catch (err: any) {
    console.error('Error in /api/thrivia-lead:', err)
    return NextResponse.json(
      { success: false, error: err?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

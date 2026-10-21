import { NextRequest, NextResponse } from 'next/server'
import {
  getPersonalCRMLeads,
  addPersonalCRMLead,
  syncFromGoogleSheet,
  syncFromGoogleSheetIfNeeded
} from '@/lib/personal-crm-store'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || undefined
    const priority = searchParams.get('priority') || undefined
    const source = searchParams.get('source') || undefined
    const search = searchParams.get('search') || undefined
    const includeConverted = searchParams.get('includeConverted') === 'true'
    const forceSync = searchParams.get('autoSync') === 'true' || searchParams.get('sync') === 'true'

    // Live Google Sheets Auto-Sync:
    // If forceSync is requested, perform full sync; otherwise check if sync is needed (15s throttle)
    if (forceSync) {
      await syncFromGoogleSheet().catch((e) => console.warn('Force sync warning:', e))
    } else {
      await syncFromGoogleSheetIfNeeded(15000).catch((e) => console.warn('Auto sync check warning:', e))
    }

    const leads = getPersonalCRMLeads({
      status,
      priority,
      source,
      search,
      hideMovedToBookings: !includeConverted
    })

    return NextResponse.json({
      success: true,
      leads,
      total: leads.length
    })
  } catch (error: any) {
    console.error('Personal CRM Leads GET Error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || !body.fullName || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Full name and phone number are required' },
        { status: 400 }
      )
    }

    const lead = addPersonalCRMLead({
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      source: body.source || 'Manual Personal CRM',
      tripTitle: body.tripTitle,
      travelDates: body.travelDates,
      groupSize: body.groupSize,
      budget: body.budget,
      message: body.message,
      priority: body.priority || 'HIGH',
      customFields: body.customFields || {}
    })

    return NextResponse.json({ success: true, lead })
  } catch (error: any) {
    console.error('Personal CRM Leads POST Error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to create lead' },
      { status: 500 }
    )
  }
}

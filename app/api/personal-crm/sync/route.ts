import { NextRequest, NextResponse } from 'next/server'
import {
  syncFromGoogleSheet,
  getPersonalCRMStats,
  getPersonalCRMLeads
} from '@/lib/personal-crm-store'

export async function POST(req: NextRequest) {
  try {
    const result = await syncFromGoogleSheet()
    const stats = getPersonalCRMStats()
    const leads = getPersonalCRMLeads({ hideMovedToBookings: false })

    return NextResponse.json({
      success: result.success,
      addedLeads: result.addedLeads,
      updatedLeads: result.updatedLeads,
      totalLeads: result.totalLeads,
      totalBookings: result.totalBookings,
      leads,
      stats,
      error: result.error
    })
  } catch (error: any) {
    console.error('Personal CRM Sync Error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Sync failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const result = await syncFromGoogleSheet()
    const stats = getPersonalCRMStats()
    const leads = getPersonalCRMLeads({ hideMovedToBookings: false })

    return NextResponse.json({
      success: result.success,
      addedLeads: result.addedLeads,
      updatedLeads: result.updatedLeads,
      totalLeads: result.totalLeads,
      totalBookings: result.totalBookings,
      leads,
      stats,
      error: result.error
    })
  } catch (error: any) {
    console.error('Personal CRM Sync Error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Sync failed' },
      { status: 500 }
    )
  }
}

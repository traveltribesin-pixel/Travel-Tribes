import { NextRequest, NextResponse } from 'next/server'
import { syncFromGoogleSheet, getPersonalCRMStats } from '@/lib/personal-crm-store'

export async function POST(req: NextRequest) {
  try {
    const result = await syncFromGoogleSheet()
    const stats = getPersonalCRMStats()
    return NextResponse.json({
      success: result.success,
      addedLeads: result.addedLeads,
      updatedLeads: result.updatedLeads,
      totalLeads: result.totalLeads,
      totalBookings: result.totalBookings,
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
    return NextResponse.json({
      success: result.success,
      addedLeads: result.addedLeads,
      updatedLeads: result.updatedLeads,
      totalLeads: result.totalLeads,
      totalBookings: result.totalBookings,
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

import { NextResponse } from 'next/server'
import { getPersonalCRMStats, syncFromGoogleSheetIfNeeded } from '@/lib/personal-crm-store'

export async function GET() {
  try {
    await syncFromGoogleSheetIfNeeded(15000).catch((e) => console.warn('Stats auto sync warning:', e))
    const stats = getPersonalCRMStats()
    return NextResponse.json({ success: true, stats })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}

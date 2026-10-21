import { NextResponse } from 'next/server'
import { getPersonalCRMStats } from '@/lib/personal-crm-store'

export async function GET() {
  try {
    const stats = getPersonalCRMStats()
    return NextResponse.json({ success: true, stats })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}

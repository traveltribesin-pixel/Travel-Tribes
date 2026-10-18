import { NextResponse } from 'next/server'
import { checkZyntexCRMConnection } from '@/lib/zyntex-crm'

export async function GET() {
  try {
    const status = await checkZyntexCRMConnection()
    return NextResponse.json({ success: status.connected, ...status })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to ping Zyntex CRM' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return GET()
}

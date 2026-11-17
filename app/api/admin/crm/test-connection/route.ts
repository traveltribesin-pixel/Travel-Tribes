import { NextResponse } from 'next/server'
import { checkThriviaCRMConnection } from '@/lib/thrivia-crm'

export async function GET() {
  try {
    const status = await checkThriviaCRMConnection()
    return NextResponse.json({ success: status.connected, ...status })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to ping Thrivia CRM' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return GET()
}

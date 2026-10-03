import { NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin-auth'
import { getCRMStats } from '@/lib/crm-store'

export async function GET() {
  const isAuth = await isAuthenticatedAdmin()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const stats = getCRMStats()
  return NextResponse.json({ success: true, stats })
}

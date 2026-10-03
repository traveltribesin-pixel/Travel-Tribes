import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin-auth'
import { exportLeadsToCSV, exportBookingsToCSV } from '@/lib/crm-store'

export async function GET(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'leads'

  const dateStr = new Date().toISOString().split('T')[0]

  if (type === 'bookings') {
    const csv = exportBookingsToCSV()
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="traveltribes-bookings-${dateStr}.csv"`
      }
    })
  }

  const csv = exportLeadsToCSV()
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="traveltribes-leads-${dateStr}.csv"`
    }
  })
}

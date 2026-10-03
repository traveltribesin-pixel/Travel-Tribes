import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin-auth'
import { getLeads, addLead } from '@/lib/crm-store'

export async function GET(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') || undefined
  const priority = searchParams.get('priority') || undefined
  const source = searchParams.get('source') || undefined
  const search = searchParams.get('search') || undefined

  const leads = getLeads({ status, priority, source, search })
  return NextResponse.json({ success: true, leads, total: leads.length })
}

export async function POST(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => null)
    if (!body || !body.fullName || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Full name and phone are required' },
        { status: 400 }
      )
    }

    const lead = addLead({
      fullName: String(body.fullName).trim(),
      email: String(body.email || '').trim().toLowerCase(),
      phone: String(body.phone).trim(),
      source: String(body.source || 'Manual CRM Entry').trim(),
      tripTitle: body.tripTitle ? String(body.tripTitle).trim() : undefined,
      tripSlug: body.tripSlug ? String(body.tripSlug).trim() : undefined,
      travelDates: body.travelDates ? String(body.travelDates).trim() : undefined,
      groupSize: body.groupSize ? String(body.groupSize).trim() : undefined,
      budget: body.budget ? String(body.budget).trim() : undefined,
      message: body.message ? String(body.message).trim() : undefined,
      priority: body.priority || 'HIGH'
    })

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('Error adding lead:', error)
    return NextResponse.json({ success: false, error: 'Failed to add lead' }, { status: 500 })
  }
}

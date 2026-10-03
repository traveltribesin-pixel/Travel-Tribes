import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin-auth'
import { updateLead, deleteLead, getLeadById } from '@/lib/crm-store'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const lead = getLeadById(id)
  if (!lead) {
    return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, lead })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid update body' }, { status: 400 })
    }

    const updated = updateLead(id, body)
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, lead: updated })
  } catch (error) {
    console.error('Error updating lead:', error)
    return NextResponse.json({ success: false, error: 'Failed to update lead' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const deleted = deleteLead(id)
  if (!deleted) {
    return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, message: 'Lead deleted successfully' })
}

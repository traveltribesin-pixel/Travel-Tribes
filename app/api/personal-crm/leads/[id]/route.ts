import { NextRequest, NextResponse } from 'next/server'
import {
  getPersonalCRMLeadById,
  updatePersonalCRMLead,
  deletePersonalCRMLead,
  syncFromGoogleSheetIfNeeded
} from '@/lib/personal-crm-store'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    let lead = getPersonalCRMLeadById(id)
    if (!lead) {
      await syncFromGoogleSheetIfNeeded(0).catch(() => null)
      lead = getPersonalCRMLeadById(id)
    }
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, lead })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ success: false, error: 'Empty update body' }, { status: 400 })
    }

    const updated = updatePersonalCRMLead(id, body)
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, lead: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const deleted = deletePersonalCRMLead(id)
    return NextResponse.json({ success: deleted })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}

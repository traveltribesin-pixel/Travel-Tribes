import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin-auth'
import { addLeadNote } from '@/lib/crm-store'

export async function POST(
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
    if (!body || !body.text) {
      return NextResponse.json({ success: false, error: 'Note text is required' }, { status: 400 })
    }

    const note = addLeadNote(id, body.text, body.author || 'Admin')
    if (!note) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, note })
  } catch (error) {
    console.error('Error adding lead note:', error)
    return NextResponse.json({ success: false, error: 'Failed to add note' }, { status: 500 })
  }
}

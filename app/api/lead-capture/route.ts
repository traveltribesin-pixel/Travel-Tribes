import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 })
    }

    const { fullName, phone, email, tripSlug, tripTitle } = body

    if (!fullName || !phone || !email) {
      return NextResponse.json({ success: false, error: 'Name, phone and email are required' }, { status: 400 })
    }

    // Log the captured lead for CRM / WhatsApp followups
    console.log(`[Itinerary Download Lead] Name: ${fullName}, Phone: ${phone}, Email: ${email}, Trip: ${tripTitle || tripSlug}, Date: ${new Date().toISOString()}`)

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Lead Capture Error:', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

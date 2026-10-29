import { NextRequest, NextResponse } from 'next/server'
import { loadCuratedStore } from '@/lib/curated-itineraries-store'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const inquiryId = searchParams.get('inquiryId')?.toLowerCase().trim()
    const leadId = searchParams.get('leadId')?.toLowerCase().trim()

    const store = loadCuratedStore()
    const existingOptions: Record<number, any> = {}

    if (inquiryId || leadId) {
      store.itineraries.forEach(it => {
        const matchesInquiry = inquiryId && (
          it.slug.toLowerCase().includes(inquiryId) ||
          (it as any).inquiryId?.toLowerCase() === inquiryId
        )
        const matchesLead = leadId && (
          (it as any).zohoLeadId?.toLowerCase() === leadId
        )

        if (matchesInquiry || matchesLead) {
          // Detect option number from slug or title
          let optNum = 1
          if (it.slug.includes('-opt2') || it.title.includes('Option 2')) optNum = 2
          else if (it.slug.includes('-opt3') || it.title.includes('Option 3')) optNum = 3

          if (!existingOptions[optNum]) {
            existingOptions[optNum] = {
              id: it.id,
              slug: it.slug,
              url: `/itinerary/${it.slug}`,
              optionNumber: optNum,
              title: it.title,
              destination: it.destination,
              quote: Number(it.quotation?.totalPackagePrice) || null,
              advancePaid: Number(it.quotation?.advanceAmount) || null,
              balanceDue: null,
              createdAt: it.createdAt || '',
              updatedAt: it.updatedAt || ''
            }
          }
        }
      })
    }

    return NextResponse.json({
      success: true,
      existingOptions
    })
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to check options'
    }, { status: 500 })
  }
}

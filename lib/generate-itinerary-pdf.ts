import { jsPDF } from 'jspdf'
import type { Trip } from '@/lib/travel-data'

export interface LeadInfo {
  fullName: string
  phone: string
  email: string
}

/**
 * Convert image URL to Base64 to embed in jsPDF
 */
async function getBase64ImageFromUrl(imageUrl: string): Promise<{ data: string; format: 'JPEG' | 'PNG' | 'WEBP' } | null> {
  try {
    const res = await fetch(imageUrl)
    if (!res.ok) return null
    const blob = await res.blob()

    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64data = reader.result as string
        if (!base64data) {
          resolve(null)
          return
        }
        let format: 'JPEG' | 'PNG' | 'WEBP' = 'JPEG'
        if (blob.type.includes('png')) format = 'PNG'
        else if (blob.type.includes('webp')) format = 'WEBP'
        resolve({ data: base64data, format })
      }
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

export async function generateItineraryPDF(trip: Trip, lead?: LeadInfo): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const pageWidth = doc.internal.pageSize.getWidth() // 210mm
  const pageHeight = doc.internal.pageSize.getHeight() // 297mm
  const margin = 14
  const contentWidth = pageWidth - margin * 2 // 182mm
  let y = 0

  // Brand Design Colors
  const navy: [number, number, number] = [11, 41, 64] // #0b2940
  const sun: [number, number, number] = [245, 190, 24] // #f5be18
  const sky: [number, number, number] = [67, 169, 209] // #43a9d1
  const darkText: [number, number, number] = [30, 41, 59] // #1e293b
  const mutedText: [number, number, number] = [100, 116, 139] // #64748b
  const lightBg: [number, number, number] = [248, 250, 252] // #f8fafc
  const cardBorder: [number, number, number] = [226, 232, 240] // #e2e8f0

  // Pre-fetch cover image if available
  let coverImgBase64: { data: string; format: 'JPEG' | 'PNG' | 'WEBP' } | null = null
  if (trip.image) {
    coverImgBase64 = await getBase64ImageFromUrl(trip.image)
  }

  // Draw modern top header banner on subsequent pages
  const drawPageHeader = (pageTitle?: string) => {
    doc.setFillColor(...navy)
    doc.rect(0, 0, pageWidth, 12, 'F')
    doc.setFillColor(...sun)
    doc.rect(0, 12, pageWidth, 1.2, 'F')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(255, 255, 255)
    doc.text('TRAVEL TRIBES', margin, 8)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...sun)
    doc.text('|  COMMUNITY BACKPACKING & TRIPS', margin + 28, 8)

    if (pageTitle) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(220, 235, 245)
      doc.text(pageTitle.toUpperCase(), pageWidth - margin, 8, { align: 'right' })
    }
  }

  // Draw modern footer on all pages
  const drawPageFooter = (pageNum: number, totalPages: number) => {
    doc.setFillColor(245, 248, 250)
    doc.rect(0, pageHeight - 11, pageWidth, 11, 'F')
    doc.setDrawColor(...cardBorder)
    doc.line(0, pageHeight - 11, pageWidth, pageHeight - 11)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...mutedText)
    doc.text('Travel Tribes • Direct Booking Helpline: +91 99758 22023 • hello@traveltribes.in • traveltribes.in', margin, pageHeight - 4.5)

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...navy)
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 4.5, { align: 'right' })
  }

  // Dynamic pagination checker
  const checkAddPage = (neededSpace: number, nextHeaderTitle = 'Detailed Itinerary') => {
    if (y + neededSpace > pageHeight - 18) {
      doc.addPage()
      drawPageHeader(nextHeaderTitle)
      y = 20
    }
  }

  // ==========================================
  // PAGE 1: COVER & TRIP SNAPSHOT
  // ==========================================

  // 1. Top Cover Header Strip
  doc.setFillColor(...navy)
  doc.rect(0, 0, pageWidth, 18, 'F')
  doc.setFillColor(...sun)
  doc.rect(0, 18, pageWidth, 1.5, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(255, 255, 255)
  doc.text('TRAVEL TRIBES', margin, 11)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...sun)
  doc.text('• WHERE WANDERERS BECOME TRIBE', margin + 34, 11)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(220, 235, 245)
  doc.text('Official Itinerary & Travel Guide', pageWidth - margin, 11, { align: 'right' })

  y = 25

  // 2. Cover Hero Visual Banner
  const heroHeight = 58
  if (coverImgBase64) {
    try {
      // Rounded image clip simulation
      doc.addImage(coverImgBase64.data, coverImgBase64.format, margin, y, contentWidth, heroHeight)
      // Dark gradient overlay at bottom of hero
      doc.setFillColor(11, 41, 64)
      doc.rect(margin, y + heroHeight - 14, contentWidth, 14, 'F')
    } catch {
      // Fallback if image load error
      doc.setFillColor(...navy)
      doc.roundedRect(margin, y, contentWidth, heroHeight, 3, 3, 'F')
    }
  } else {
    doc.setFillColor(...navy)
    doc.roundedRect(margin, y, contentWidth, heroHeight, 3, 3, 'F')
  }

  // Overlay text on bottom of hero image
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(255, 255, 255)
  const heroTitle = trip.title.length > 40 ? trip.title.substring(0, 40) + '...' : trip.title
  doc.text(heroTitle, margin + 6, y + heroHeight - 5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(...sun)
  doc.text(`Starting from ${trip.price}`, pageWidth - margin - 6, y + heroHeight - 5, { align: 'right' })

  y += heroHeight + 5

  // 3. Personalized "Prepared Exclusively For" Card
  doc.setFillColor(...lightBg)
  doc.roundedRect(margin, y, contentWidth, 16, 2.5, 2.5, 'F')
  doc.setDrawColor(...cardBorder)
  doc.roundedRect(margin, y, contentWidth, 16, 2.5, 2.5, 'D')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(...sky)
  doc.text('PREPARED EXCLUSIVELY FOR', margin + 5, y + 6)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...navy)
  const travelerName = lead?.fullName ? lead.fullName : 'Valued Tribe Explorer'
  doc.text(travelerName, margin + 5, y + 12)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(...mutedText)
  const todayStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  doc.text(`Prepared on: ${todayStr}  •  Booking Support: +91 99758 22023`, pageWidth - margin - 5, y + 12, { align: 'right' })

  y += 20

  // 4. Quick Metric Snapshot Bar (4 Key Metric Pills)
  const boxW = (contentWidth - 9) / 4
  const metricBoxes = [
    { label: 'DURATION', val: trip.duration, color: navy },
    { label: 'LOCATION', val: trip.region, color: navy },
    { label: 'GROUP SIZE', val: trip.spots, color: navy },
    { label: 'STARTING PRICE', val: trip.price, color: [22, 101, 52] as [number, number, number] }
  ]

  metricBoxes.forEach((m, idx) => {
    const curX = margin + idx * (boxW + 3)
    doc.setFillColor(...lightBg)
    doc.roundedRect(curX, y, boxW, 15, 2, 2, 'F')
    doc.setDrawColor(...cardBorder)
    doc.roundedRect(curX, y, boxW, 15, 2, 2, 'D')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6.5)
    doc.setTextColor(...sky)
    doc.text(m.label, curX + 4, y + 5)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...m.color)
    const valLines = doc.splitTextToSize(m.val, boxW - 6)
    doc.text(valLines[0] || m.val, curX + 4, y + 10.5)
  })

  y += 19

  // 5. Trip Overview / About the Experience
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(...navy)
  doc.text('ABOUT THIS ADVENTURE', margin, y)

  // Golden accent underline
  doc.setFillColor(...sun)
  doc.rect(margin, y + 1.5, 20, 0.8, 'F')
  y += 6.5

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(...darkText)
  const descLines = doc.splitTextToSize(trip.description, contentWidth)
  doc.text(descLines.slice(0, 5), margin, y)
  y += Math.min(descLines.length, 5) * 4.2 + 4

  // 6. Trip Highlights Box
  if (trip.highlights && trip.highlights.length > 0) {
    doc.setFillColor(254, 252, 240) // soft sun tint
    const highCount = Math.min(trip.highlights.length, 6)
    const boxHeight = 12 + Math.ceil(highCount / 2) * 6.5
    doc.roundedRect(margin, y, contentWidth, boxHeight, 2.5, 2.5, 'F')
    doc.setDrawColor(245, 225, 140)
    doc.roundedRect(margin, y, contentWidth, boxHeight, 2.5, 2.5, 'D')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...navy)
    doc.text('★ TRIP HIGHLIGHTS & SCENIC EXPERIENCES', margin + 5, y + 7)

    const halfW = (contentWidth - 14) / 2
    let itemY = y + 13

    for (let i = 0; i < highCount; i++) {
      const isLeft = i % 2 === 0
      const colX = isLeft ? margin + 5 : margin + halfW + 9
      if (i > 0 && isLeft) itemY += 6.5

      doc.setFillColor(...sun)
      doc.circle(colX + 1.5, itemY - 1, 1.2, 'F')

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7.8)
      doc.setTextColor(...darkText)
      const hText = trip.highlights[i]
      const hLines = doc.splitTextToSize(hText, halfW - 6)
      doc.text(hLines[0] || hText, colX + 4.5, itemY)
    }

    y += boxHeight + 4
  }

  // ==========================================
  // PAGE 2+: DAY-BY-DAY DETAILED ITINERARY
  // ==========================================
  if (trip.itinerary && trip.itinerary.length > 0) {
    doc.addPage()
    drawPageHeader('Detailed Day-by-Day Plan')
    y = 19

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(...navy)
    doc.text('DAY-BY-DAY JOURNEY ITINERARY', margin, y)

    doc.setFillColor(...sun)
    doc.rect(margin, y + 1.5, 25, 0.8, 'F')
    y += 7

    trip.itinerary.forEach((dayPlan) => {
      // Calculate estimated space for this day
      const actLineCounts = dayPlan.activities.map((a) => doc.splitTextToSize(a, contentWidth - 22).length)
      const totalActLines = actLineCounts.reduce((acc, c) => acc + c, 0)
      const estimatedDayHeight = 12 + totalActLines * 4.2 + dayPlan.activities.length * 2 + 4

      checkAddPage(estimatedDayHeight + 4, 'Day-by-Day Itinerary')

      // Day Container Card
      doc.setFillColor(...lightBg)
      doc.roundedRect(margin, y, contentWidth, estimatedDayHeight, 2.5, 2.5, 'F')
      doc.setDrawColor(...cardBorder)
      doc.roundedRect(margin, y, contentWidth, estimatedDayHeight, 2.5, 2.5, 'D')

      // Day Badge
      doc.setFillColor(...navy)
      doc.roundedRect(margin + 4, y + 4, 18, 6.5, 1.5, 1.5, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7.5)
      doc.setTextColor(255, 255, 255)
      doc.text(`DAY ${dayPlan.day}`, margin + 13, y + 8.5, { align: 'center' })

      // Day Title
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(...navy)
      const titleLines = doc.splitTextToSize(dayPlan.title, contentWidth - 30)
      doc.text(titleLines[0] || dayPlan.title, margin + 25, y + 8.5)

      let actY = y + 15

      // Activities list
      dayPlan.activities.forEach((act) => {
        doc.setFillColor(...sky)
        doc.circle(margin + 8, actY - 1, 1, 'F')

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.setTextColor(...darkText)
        const lines = doc.splitTextToSize(act, contentWidth - 20)
        doc.text(lines, margin + 12, actY)
        actY += lines.length * 4.2 + 1.5
      })

      y += estimatedDayHeight + 4
    })
  }

  // ==========================================
  // INCLUSIONS, EXCLUSIONS & POLICIES
  // ==========================================
  checkAddPage(70, 'Inclusions & Booking Policy')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...navy)
  doc.text('PACKAGE INCLUSIONS & EXCLUSIONS', margin, y)

  doc.setFillColor(...sun)
  doc.rect(margin, y + 1.5, 25, 0.8, 'F')
  y += 7

  const halfWidth = (contentWidth - 6) / 2

  // Inclusions Box
  if (trip.inclusions && trip.inclusions.length > 0) {
    const incLinesTotal = trip.inclusions.reduce((acc, inc) => acc + doc.splitTextToSize(`• ${inc}`, halfWidth - 8).length, 0)
    const incHeight = 10 + incLinesTotal * 4.2 + trip.inclusions.length * 1.5

    doc.setFillColor(240, 253, 244) // soft emerald tint
    doc.roundedRect(margin, y, halfWidth, incHeight, 2.5, 2.5, 'F')
    doc.setDrawColor(187, 247, 208)
    doc.roundedRect(margin, y, halfWidth, incHeight, 2.5, 2.5, 'D')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(22, 101, 52)
    doc.text('✓ WHAT IS INCLUDED', margin + 5, y + 6.5)

    let curIncY = y + 11.5
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(30, 60, 40)

    trip.inclusions.forEach((inc) => {
      const lines = doc.splitTextToSize(`• ${inc}`, halfWidth - 8)
      doc.text(lines, margin + 5, curIncY)
      curIncY += lines.length * 4 + 1
    })

    // Exclusions Box
    if (trip.exclusions && trip.exclusions.length > 0) {
      const excLinesTotal = trip.exclusions.reduce((acc, exc) => acc + doc.splitTextToSize(`• ${exc}`, halfWidth - 8).length, 0)
      const excHeight = Math.max(incHeight, 10 + excLinesTotal * 4.2 + trip.exclusions.length * 1.5)

      const excX = margin + halfWidth + 6
      doc.setFillColor(254, 242, 242) // soft rose tint
      doc.roundedRect(excX, y, halfWidth, excHeight, 2.5, 2.5, 'F')
      doc.setDrawColor(254, 202, 202)
      doc.roundedRect(excX, y, halfWidth, excHeight, 2.5, 2.5, 'D')

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8.5)
      doc.setTextColor(153, 27, 27)
      doc.text('✗ WHAT IS NOT INCLUDED', excX + 5, y + 6.5)

      let curExcY = y + 11.5
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7.5)
      doc.setTextColor(70, 30, 30)

      trip.exclusions.forEach((exc) => {
        const lines = doc.splitTextToSize(`• ${exc}`, halfWidth - 8)
        doc.text(lines, excX + 5, curExcY)
        curExcY += lines.length * 4 + 1
      })

      y += Math.max(incHeight, excHeight) + 6
    } else {
      y += incHeight + 6
    }
  }

  // Policies Summary Box
  if (trip.policies && trip.policies.length > 0) {
    checkAddPage(35, 'Policies & Booking')
    doc.setFillColor(...lightBg)
    doc.roundedRect(margin, y, contentWidth, 26, 2.5, 2.5, 'F')
    doc.setDrawColor(...cardBorder)
    doc.roundedRect(margin, y, contentWidth, 26, 2.5, 2.5, 'D')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(...navy)
    doc.text('IMPORTANT TRIP POLICIES & GUIDELINES', margin + 5, y + 6)

    let polY = y + 11
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...darkText)

    trip.policies.slice(0, 3).forEach((pol) => {
      doc.setFillColor(...sun)
      doc.circle(margin + 7, polY - 1, 0.9, 'F')
      const lines = doc.splitTextToSize(pol, contentWidth - 14)
      doc.text(lines[0] || pol, margin + 10, polY)
      polY += 4.5
    })

    y += 31
  }

  // ==========================================
  // FINAL STEP: HOW TO BOOK & VIP CALLOUT
  // ==========================================
  checkAddPage(34, 'How to Book')

  doc.setFillColor(...navy)
  doc.roundedRect(margin, y, contentWidth, 30, 3, 3, 'F')
  doc.setFillColor(...sun)
  doc.rect(margin, y + 28.5, contentWidth, 1.5, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(255, 255, 255)
  doc.text('READY TO JOIN THE TRIBE? HOW TO BOOK YOUR SLOT', margin + 6, y + 8)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(220, 235, 245)
  doc.text('1. Pay initial token advance (₹2,000 - ₹3,000) on website or WhatsApp.', margin + 6, y + 14)
  doc.text('2. Receive verified booking confirmation voucher & invoice on Email/WhatsApp.', margin + 6, y + 19)
  doc.text('3. Get added to the exclusive batch group with your Tribe leader 3 days prior.', margin + 6, y + 24)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(...sun)
  doc.text('WhatsApp: +91 99758 22023  •  traveltribes.in', pageWidth - margin - 6, y + 14, { align: 'right' })

  // ==========================================
  // FINAL PASS: ADD FOOTERS & HEADERS ON ALL PAGES
  // ==========================================
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    drawPageFooter(i, totalPages)
  }

  // Save / Download PDF
  const safeTitle = trip.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const filename = `${safeTitle}-itinerary-traveltribes.pdf`
  doc.save(filename)
}

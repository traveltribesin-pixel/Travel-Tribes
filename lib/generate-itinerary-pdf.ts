import { jsPDF } from 'jspdf'
import type { Trip } from '@/lib/travel-data'
import type { CuratedItinerary, HotelDetail, DayItinerary } from '@/lib/curated-itinerary-constants'
import { DEFAULT_BANK_ACCOUNT, DEFAULT_POINTS_TO_BE_NOTED } from '@/lib/curated-itinerary-constants'
import { generateProfessionalDayTitle } from '@/lib/day-title-generator'

export interface LeadInfo {
  fullName: string
  phone: string
  email: string
}

/**
 * Unified intermediate structure for both standard Trips and Curated Proposals
 */
export interface UnifiedItineraryData {
  title: string
  subtitle?: string
  destination: string
  duration: string
  price?: string
  tripType: 'customized' | 'group'
  clientName?: string
  clientPhone?: string
  clientEmail?: string
  travelDates?: string
  heroImage?: string
  overview: string
  highlights: string[]
  showcaseImages: { label: string; url: string }[]
  vehicleDetails?: string
  mealPlanDetails?: string
  tourLeadDetails?: string
  staySummary?: string
  days: {
    day: number
    title: string
    date?: string
    guidedTour?: boolean
    activities: string[]
    meals?: string
    stay?: string
    image?: string
  }[]
  hotels?: {
    city: string
    hotelName: string
    nights: string
    roomType?: string
    stayDates?: string
  }[]
  inclusions: string[]
  exclusions: string[]
  quotation?: {
    totalPrice?: string
    perPerson?: string
    advanceToken?: string
    balancePending?: string
    specialNotes?: string
  }
  accountDetails?: {
    beneficiaryName: string
    bankName: string
    accountNumber: string
    ifscCode: string
    accountType: string
    upiId: string
  }
  pointsToNote?: string[]
}

/**
 * Clean string for safe rendering in standard jsPDF Helvetica
 * Replaces Unicode ₹ with Rs. and strips non-printable characters.
 */
function cleanPdfText(str?: string): string {
  if (!str) return ''
  return str
    .replace(/₹/g, 'Rs. ')
    .replace(/[^\x00-\x7F\u00A0-\u00FF\u2022]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Convert image URL to Base64 to embed in jsPDF with 3.5s timeout & CORS safeguard
 */
async function getBase64ImageFromUrl(imageUrl: string): Promise<{ data: string; format: 'JPEG' | 'PNG' | 'WEBP' } | null> {
  if (!imageUrl) return null

  // If already a data URL
  if (imageUrl.startsWith('data:image/')) {
    let format: 'JPEG' | 'PNG' | 'WEBP' = 'JPEG'
    if (imageUrl.startsWith('data:image/png')) format = 'PNG'
    else if (imageUrl.startsWith('data:image/webp')) format = 'WEBP'
    return { data: imageUrl, format }
  }

  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null
    const timeoutId = controller ? setTimeout(() => controller.abort(), 3500) : null

    const resolvedUrl = typeof window !== 'undefined' && imageUrl.startsWith('/')
      ? `${window.location.origin}${imageUrl}`
      : imageUrl

    const res = await fetch(resolvedUrl, {
      signal: controller ? controller.signal : undefined
    })

    if (timeoutId) clearTimeout(timeoutId)
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

/**
 * Core Luxury PDF Renderer matching the Curated Itinerary Design Template
 */
export async function renderUnifiedItineraryPDF(data: UnifiedItineraryData): Promise<void> {
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

  // Brand Palette (Travel Tribes Curated System)
  const navy: [number, number, number] = [11, 41, 64] // #0b2940
  const bluePrimary: [number, number, number] = [0, 119, 182] // #0077b6
  const blueSky: [number, number, number] = [0, 180, 216] // #00b4d8
  const gold: [number, number, number] = [255, 222, 89] // #ffde59
  const darkText: [number, number, number] = [15, 23, 42] // #0f172a
  const mutedText: [number, number, number] = [100, 116, 139] // #64748b
  const lightBg: [number, number, number] = [248, 250, 252] // #f8fafc
  const cardBorder: [number, number, number] = [226, 232, 240] // #e2e8f0
  const emerald: [number, number, number] = [16, 185, 129] // #10b981
  const rose: [number, number, number] = [225, 29, 72] // #e11d48

  // Pre-fetch images in parallel with timeouts
  let heroImgBase64: { data: string; format: 'JPEG' | 'PNG' | 'WEBP' } | null = null
  let whiteLogoBase64: { data: string; format: 'JPEG' | 'PNG' | 'WEBP' } | null = null
  let showcaseImgsBase64: ({ data: string; format: 'JPEG' | 'PNG' | 'WEBP' } | null)[] = []

  try {
    const results = await Promise.all([
      data.heroImage ? getBase64ImageFromUrl(data.heroImage) : Promise.resolve(null),
      getBase64ImageFromUrl('/image/Logowhite.png'),
      ...(data.showcaseImages || []).slice(0, 4).map((sc) => getBase64ImageFromUrl(sc.url))
    ])

    heroImgBase64 = results[0]
    whiteLogoBase64 = results[1]
    showcaseImgsBase64 = results.slice(2)
  } catch {
    // Continue gracefully if image fetching has network issues
  }

  // Draw modern top header on page 2+
  const drawPageHeader = (pageTitle?: string) => {
    doc.setFillColor(...navy)
    doc.rect(0, 0, pageWidth, 13, 'F')
    doc.setFillColor(...gold)
    doc.rect(0, 13, pageWidth, 1.2, 'F')

    // Logo Wordmark
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(255, 255, 255)
    doc.text('TRAVEL TRIBES', margin, 8.5)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...gold)
    doc.text('|  WHERE WANDERERS BECOME TRIBE', margin + 30, 8.5)

    if (pageTitle) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(220, 235, 245)
      doc.text(pageTitle.toUpperCase(), pageWidth - margin, 8.5, { align: 'right' })
    }
  }

  // Draw modern branded footer on all pages
  const drawPageFooter = (pageNum: number, totalPages: number) => {
    doc.setFillColor(245, 248, 250)
    doc.rect(0, pageHeight - 11, pageWidth, 11, 'F')
    doc.setDrawColor(...cardBorder)
    doc.line(0, pageHeight - 11, pageWidth, pageHeight - 11)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...mutedText)
    doc.text('Travel Tribes  •  Helpline: +91 99758 22023  •  hello@traveltribes.in  •  traveltribes.in', margin, pageHeight - 4.5)

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...navy)
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 4.5, { align: 'right' })
  }

  // Dynamic pagination checker
  const checkAddPage = (neededSpace: number, nextHeaderTitle = 'Journey Itinerary') => {
    if (y + neededSpace > pageHeight - 18) {
      doc.addPage()
      drawPageHeader(nextHeaderTitle)
      y = 20
    }
  }

  // =========================================================================
  // PAGE 1: COVER HERO & EXECUTIVE PROPOSAL SNAPSHOT (FULL LUXURY COVER)
  // =========================================================================

  // Full Page Light Background
  doc.setFillColor(...lightBg)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  // 1. Top Hero Section Banner
  const heroH = 120
  doc.setFillColor(...navy)
  doc.rect(margin, 10, contentWidth, heroH, 'F')

  if (heroImgBase64) {
    try {
      doc.addImage(heroImgBase64.data, heroImgBase64.format, margin, 10, contentWidth, heroH)
      // Dark bottom gradient overlay simulation
      doc.setFillColor(11, 41, 64)
      doc.rect(margin, 10 + heroH - 46, contentWidth, 46, 'F')
      // Top translucent scrim
      doc.setFillColor(11, 41, 64)
      doc.rect(margin, 10, contentWidth, 22, 'F')
    } catch {
      // Fallback if image draw error
      doc.setFillColor(...navy)
      doc.rect(margin, 10, contentWidth, heroH, 'F')
    }
  }

  // Top Logo inside Hero
  if (whiteLogoBase64) {
    try {
      doc.addImage(whiteLogoBase64.data, whiteLogoBase64.format, margin + 6, 14, 40, 11)
    } catch {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(14)
      doc.setTextColor(255, 255, 255)
      doc.text('TRAVEL TRIBES', margin + 6, 22)
    }
  } else {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(255, 255, 255)
    doc.text('TRAVEL TRIBES', margin + 6, 22)
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(...gold)
  doc.text('OFFICIAL TRAVEL PROPOSAL', pageWidth - margin - 6, 21, { align: 'right' })

  // Proposal Badge inside Hero (bottom area)
  const badgeY = 10 + heroH - 39
  doc.setFillColor(...gold)
  doc.roundedRect(margin + 6, badgeY, 78, 6.5, 2, 2, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(...darkText)
  const badgeText = data.tripType === 'customized'
    ? '★ EXCLUSIVE HANDCRAFTED PROPOSAL'
    : '★ COMMUNITY BACKPACKING EXPEDITION'
  doc.text(badgeText, margin + 9, badgeY + 4.5)

  // Subtitle inside Hero
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(186, 230, 253) // soft sky
  const subText = cleanPdfText(data.subtitle || `${data.destination.toUpperCase()} • PRIVATE BESPOKE EXPERIENCE`)
  doc.text(subText, margin + 6, badgeY + 12)

  // Big Trip Title inside Hero
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(255, 255, 255)
  const fullTitle = cleanPdfText(`${data.title.toUpperCase()} (${data.duration.toUpperCase()})`)
  const titleLines = doc.splitTextToSize(fullTitle, contentWidth - 40)
  doc.text(titleLines.slice(0, 2), margin + 6, badgeY + 19)

  // Starting Price pill inside Hero (Bottom Right)
  if (data.price) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...gold)
    doc.text(cleanPdfText(`Quote: ${data.price}`), pageWidth - margin - 6, badgeY + 19, { align: 'right' })
  }

  y = 10 + heroH + 5

  // 2. Personalized "PREPARED EXCLUSIVELY FOR" Banner Card
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(margin, y, contentWidth, 20, 2.5, 2.5, 'F')
  doc.setDrawColor(...cardBorder)
  doc.roundedRect(margin, y, contentWidth, 20, 2.5, 2.5, 'D')

  // Left Ocean Blue Accent Bar
  doc.setFillColor(...bluePrimary)
  doc.rect(margin, y, 3.5, 20, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(...bluePrimary)
  doc.text('PREPARED EXCLUSIVELY FOR', margin + 7, y + 6.5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...navy)
  const clientDisplayName = cleanPdfText(data.clientName || 'Valued Tribe Explorer')
  doc.text(clientDisplayName, margin + 7, y + 14)

  const todayStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(...mutedText)
  doc.text(`Proposal Date: ${todayStr}`, pageWidth - margin - 6, y + 7.5, { align: 'right' })
  doc.text('Helpline: +91 99758 22023  •  hello@traveltribes.in', pageWidth - margin - 6, y + 14, { align: 'right' })

  y += 24

  // 3. Fast-Facts Metric Ribbon (4 Equal Width Metric Cards)
  const boxW = (contentWidth - 9) / 4
  const metricCards = [
    { label: 'DURATION', val: data.duration, sub: 'Days & Nights' },
    { label: 'DESTINATION', val: data.destination, sub: 'Curated Route' },
    { label: 'TRAVEL STYLE', val: data.tripType === 'customized' ? 'Private Road Trip' : 'Community Trip', sub: 'Verified Transfers' },
    { label: 'PACKAGE QUOTE', val: data.price ? cleanPdfText(data.price) : 'Custom Quote', sub: 'Taxes & Driver Incl.' }
  ]

  metricCards.forEach((m, idx) => {
    const curX = margin + idx * (boxW + 3)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(curX, y, boxW, 19, 2, 2, 'F')
    doc.setDrawColor(...cardBorder)
    doc.roundedRect(curX, y, boxW, 19, 2, 2, 'D')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6.5)
    doc.setTextColor(...bluePrimary)
    doc.text(m.label, curX + 4, y + 5)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(...navy)
    const valLines = doc.splitTextToSize(m.val, boxW - 8)
    doc.text(valLines[0] || m.val, curX + 4, y + 10.5)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.5)
    doc.setTextColor(...mutedText)
    doc.text(m.sub, curX + 4, y + 15)
  })

  y += 23

  // 4. Welcome to Travel Tribes & Trust Assurance Box
  doc.setFillColor(255, 255, 255)
  doc.roundedRect(margin, y, contentWidth, 42, 2.5, 2.5, 'F')
  doc.setDrawColor(...cardBorder)
  doc.roundedRect(margin, y, contentWidth, 42, 2.5, 2.5, 'D')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  doc.setTextColor(...navy)
  doc.text('WELCOME TO TRAVEL TRIBES • HANDCRAFTED EXPLORATION', margin + 6, y + 7)

  // Underline
  doc.setFillColor(...gold)
  doc.rect(margin + 6, y + 8.5, 24, 0.8, 'F')

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...darkText)
  const introPara = 'We are thrilled to present this personalized travel itinerary proposal for your upcoming journey. Every transfer, accommodation, and day-wise schedule in this proposal has been tailored to ensure unmatched convenience, scenic exploration, and peace of mind.'
  const introLines = doc.splitTextToSize(introPara, contentWidth - 12)
  doc.text(introLines, margin + 6, y + 14)

  // 3 Trust Badges inside box
  const trustY = y + 27
  const trustW = (contentWidth - 16) / 3
  const trustBadges = [
    { title: 'Handpicked Stays', sub: 'Comfort & Hygiene' },
    { title: 'Dedicated Transport', sub: 'Chauffeur & All Tolls' },
    { title: '24x7 Tribe Concierge', sub: 'On-Trip Assistance' }
  ]

  trustBadges.forEach((tb, i) => {
    const tX = margin + 6 + i * (trustW + 2)
    doc.setFillColor(...lightBg)
    doc.roundedRect(tX, trustY, trustW, 11, 1.5, 1.5, 'F')
    doc.setDrawColor(...cardBorder)
    doc.roundedRect(tX, trustY, trustW, 11, 1.5, 1.5, 'D')

    doc.setFillColor(...emerald)
    doc.circle(tX + 3.5, trustY + 5.5, 1.2, 'F')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(...navy)
    doc.text(tb.title, tX + 6.5, trustY + 5)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6)
    doc.setTextColor(...mutedText)
    doc.text(tb.sub, tX + 6.5, trustY + 8.5)
  })

  y += 46

  // 5. Destination Highlights Glimpses Ribbon
  if (data.highlights && data.highlights.length > 0) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(...navy)
    doc.text('KEY DESTINATION EXPERIENCES', margin, y)

    doc.setFillColor(...gold)
    doc.rect(margin, y + 1.5, 20, 0.7, 'F')
    y += 5.5

    const highPills = data.highlights.slice(0, 4)
    const pillW = (contentWidth - 9) / Math.max(highPills.length, 1)

    highPills.forEach((h, i) => {
      const pX = margin + i * (pillW + 3)
      doc.setFillColor(254, 252, 240) // soft sun
      doc.roundedRect(pX, y, pillW, 13, 2, 2, 'F')
      doc.setDrawColor(245, 225, 140)
      doc.roundedRect(pX, y, pillW, 13, 2, 2, 'D')

      doc.setFillColor(...gold)
      doc.circle(pX + 3.5, y + 6.5, 1.2, 'F')

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7)
      doc.setTextColor(...navy)
      const hLines = doc.splitTextToSize(cleanPdfText(h), pillW - 8)
      doc.text(hLines[0] || h, pX + 6, y + 7)
    })

    y += 18
  }

  // =========================================================================
  // PAGE 2: TRIP BLUEPRINT, SPECIFICATIONS & SCENIC HIGHLIGHTS
  // =========================================================================
  doc.addPage()
  drawPageHeader('Trip Blueprint & Specifications')
  y = 20

  // 1. Blueprint & Key Specifications Title
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(...navy)
  doc.text('1. TRIP BLUEPRINT & KEY SPECIFICATIONS', margin, y)
  doc.setFillColor(...gold)
  doc.rect(margin, y + 1.5, 26, 0.8, 'F')
  y += 7

  // 4 Specification Cards (2x2 Grid)
  const specW = (contentWidth - 6) / 2
  const specH = 26
  const specs = [
    {
      title: 'TRANSFERS & VEHICLE',
      primary: cleanPdfText(data.vehicleDetails || 'Dedicated Private AC Vehicle with Chauffeur'),
      note: 'All fuel, driver allowances, state border taxes, parking & tolls included.'
    },
    {
      title: 'HOTEL & ACCOMMODATIONS',
      primary: cleanPdfText(data.staySummary || 'Handpicked Boutique Stays & Mountain Cottages'),
      note: 'Well-appointed rooms with daily housekeeping, hot water & modern amenities.'
    },
    {
      title: 'MEAL PLAN',
      primary: cleanPdfText(data.mealPlanDetails || 'Breakfast & Dinner Included as per Plan'),
      note: 'Freshly prepared buffet or set menu meals served at reserved accommodations.'
    },
    {
      title: 'TOUR GUIDANCE & SUPPORT',
      primary: cleanPdfText(data.tourLeadDetails || 'Local Chauffeur & Verified Tribe Concierge'),
      note: '24/7 dedicated trip coordinator for smooth check-ins and itinerary assistance.'
    }
  ]

  specs.forEach((s, idx) => {
    const isLeft = idx % 2 === 0
    const curX = isLeft ? margin : margin + specW + 6
    const curY = y + Math.floor(idx / 2) * (specH + 3.5)

    doc.setFillColor(255, 255, 255)
    doc.roundedRect(curX, curY, specW, specH, 2, 2, 'F')
    doc.setDrawColor(...cardBorder)
    doc.roundedRect(curX, curY, specW, specH, 2, 2, 'D')

    // Top Header Strip in Card
    doc.setFillColor(...lightBg)
    doc.roundedRect(curX, curY, specW, 7, 2, 2, 'F')
    doc.setFillColor(...bluePrimary)
    doc.circle(curX + 4.5, curY + 3.5, 1.2, 'F')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(...bluePrimary)
    doc.text(s.title, curX + 7.5, curY + 4.5)

    // Primary Text
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...navy)
    const pLines = doc.splitTextToSize(s.primary, specW - 8)
    doc.text(pLines[0] || s.primary, curX + 4, curY + 12)

    // Sub note
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.8)
    doc.setTextColor(...mutedText)
    const nLines = doc.splitTextToSize(s.note, specW - 8)
    doc.text(nLines.slice(0, 2), curX + 4, curY + 17)
  })

  y += specH * 2 + 10

  // 2. Destination Showcase Gallery (4 Photos / Highlight Cards)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(...navy)
  doc.text('2. DESTINATION SHOWCASE & SCENIC GLIMPSES', margin, y)
  doc.setFillColor(...gold)
  doc.rect(margin, y + 1.5, 26, 0.8, 'F')
  y += 7

  const scW = (contentWidth - 9) / 4
  const scH = 34

  for (let i = 0; i < 4; i++) {
    const scX = margin + i * (scW + 3)
    const scData = data.showcaseImages[i]
    const scImgBase64 = showcaseImgsBase64[i]

    doc.setFillColor(255, 255, 255)
    doc.roundedRect(scX, y, scW, scH, 2, 2, 'F')
    doc.setDrawColor(...cardBorder)
    doc.roundedRect(scX, y, scW, scH, 2, 2, 'D')

    if (scImgBase64) {
      try {
        doc.addImage(scImgBase64.data, scImgBase64.format, scX + 1.5, y + 1.5, scW - 3, 23)
      } catch {
        doc.setFillColor(...lightBg)
        doc.rect(scX + 1.5, y + 1.5, scW - 3, 23, 'F')
      }
    } else {
      doc.setFillColor(...lightBg)
      doc.rect(scX + 1.5, y + 1.5, scW - 3, 23, 'F')
      doc.setFillColor(...bluePrimary)
      doc.circle(scX + scW / 2, y + 11, 2, 'F')
    }

    // Label Caption
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6.8)
    doc.setTextColor(...navy)
    const caption = cleanPdfText(scData?.label || `Scenic Spot ${i + 1}`)
    doc.text(caption, scX + scW / 2, y + 29, { align: 'center' })
  }

  y += scH + 8

  // 3. About This Adventure / Narrative Overview
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(...navy)
  doc.text('3. ABOUT THIS HANDCRAFTED EXPERIENCE', margin, y)
  doc.setFillColor(...gold)
  doc.rect(margin, y + 1.5, 26, 0.8, 'F')
  y += 6.5

  doc.setFillColor(255, 255, 255)
  const overviewClean = cleanPdfText(data.overview)
  const descLines = doc.splitTextToSize(overviewClean, contentWidth - 10)
  const overviewBoxH = Math.min(descLines.length, 6) * 4.2 + 8

  doc.roundedRect(margin, y, contentWidth, overviewBoxH, 2, 2, 'F')
  doc.setDrawColor(...cardBorder)
  doc.roundedRect(margin, y, contentWidth, overviewBoxH, 2, 2, 'D')

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...darkText)
  doc.text(descLines.slice(0, 6), margin + 5, y + 6)

  y += overviewBoxH + 6

  // 4. Special Requirements Note if present
  if (data.quotation?.specialNotes) {
    doc.setFillColor(254, 243, 199) // amber light
    doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'F')
    doc.setDrawColor(245, 158, 11)
    doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'D')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(146, 64, 14) // dark amber
    doc.text('SPECIAL CLIENT REQUIREMENTS / ITINERARY NOTES', margin + 5, y + 5.5)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.2)
    doc.setTextColor(120, 53, 15)
    const noteLines = doc.splitTextToSize(cleanPdfText(data.quotation.specialNotes), contentWidth - 10)
    doc.text(noteLines[0] || data.quotation.specialNotes, margin + 5, y + 11)

    y += 20
  }

  // =========================================================================
  // PAGE 3+: DAY-BY-DAY DETAILED JOURNEY ITINERARY
  // =========================================================================
  if (data.days && data.days.length > 0) {
    doc.addPage()
    drawPageHeader('Day-by-Day Journey Itinerary')
    y = 20

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(...navy)
    doc.text('DAY-BY-DAY DETAILED ITINERARY', margin, y)
    doc.setFillColor(...gold)
    doc.rect(margin, y + 1.5, 26, 0.8, 'F')
    y += 7

    data.days.forEach((d) => {
      // Calculate height for this day card
      const actLines = d.activities.map((a) => doc.splitTextToSize(cleanPdfText(a), contentWidth - 20))
      const totalActLinesCount = actLines.reduce((acc, lines) => acc + lines.length, 0)
      const estimatedDayHeight = 16 + totalActLinesCount * 4.2 + d.activities.length * 1.5 + 13

      checkAddPage(estimatedDayHeight + 5, 'Day-by-Day Journey Itinerary')

      // Main Day Container Card
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(margin, y, contentWidth, estimatedDayHeight, 2.5, 2.5, 'F')
      doc.setDrawColor(...cardBorder)
      doc.roundedRect(margin, y, contentWidth, estimatedDayHeight, 2.5, 2.5, 'D')

      // Header Strip in Blue Primary
      const headerH = 9
      doc.setFillColor(...bluePrimary)
      doc.roundedRect(margin, y, contentWidth, headerH, 2.5, 2.5, 'F')
      doc.rect(margin, y + headerH - 2, contentWidth, 2, 'F') // square bottom corners of strip

      // Day Pill Badge (Gold)
      doc.setFillColor(...gold)
      doc.roundedRect(margin + 3, y + 1.8, 15, 5.4, 1.2, 1.2, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7)
      doc.setTextColor(...darkText)
      doc.text(`DAY ${d.day}`, margin + 10.5, y + 5.5, { align: 'center' })

      // Day Narrative Title
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(255, 255, 255)
      const dayTitleClean = cleanPdfText(d.title)
      const titleLines = doc.splitTextToSize(dayTitleClean, contentWidth - 65)
      doc.text(titleLines[0] || dayTitleClean, margin + 21, y + 5.5)

      // Right Side Header Info: Date & Guided Tour Badge
      const rightDate = cleanPdfText(d.date || '')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7)
      doc.setTextColor(220, 235, 245)
      const rightLabel = rightDate ? `${rightDate}  •  Guided` : 'Guided Itinerary'
      doc.text(rightLabel, pageWidth - margin - 5, y + 5.5, { align: 'right' })

      // Card Content: Activities Bullets
      let curActY = y + headerH + 5
      d.activities.forEach((act, actIdx) => {
        // Cyan dot bullet
        doc.setFillColor(...bluePrimary)
        doc.circle(margin + 6, curActY - 1, 1, 'F')

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7.8)
        doc.setTextColor(...darkText)
        const lines = actLines[actIdx] || [act]
        doc.text(lines, margin + 10, curActY)
        curActY += lines.length * 4.1 + 1.5
      })

      // Bottom Row inside Day Card: Meals & Stay Badges
      const footerY = y + estimatedDayHeight - 8
      doc.setFillColor(...lightBg)
      doc.roundedRect(margin + 3, footerY - 1, contentWidth - 6, 7, 1.5, 1.5, 'F')

      // Meals badge
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(6.8)
      doc.setTextColor(...bluePrimary)
      doc.text('MEALS:', margin + 6, footerY + 3.5)

      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...darkText)
      doc.text(cleanPdfText(d.meals || 'Breakfast & Dinner Included'), margin + 18, footerY + 3.5)

      // Stay badge on Right
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...navy)
      const stayText = cleanPdfText(`STAY: ${d.stay || data.destination}`)
      doc.text(stayText, pageWidth - margin - 6, footerY + 3.5, { align: 'right' })

      y += estimatedDayHeight + 4
    })
  }

  // =========================================================================
  // ACCOMMODATIONS & STAY BREAKDOWN
  // =========================================================================
  if (data.hotels && data.hotels.length > 0) {
    checkAddPage(50, 'Accommodations Breakdown')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10.5)
    doc.setTextColor(...navy)
    doc.text('ACCOMMODATIONS & STAY BREAKDOWN', margin, y)
    doc.setFillColor(...gold)
    doc.rect(margin, y + 1.5, 26, 0.8, 'F')
    y += 7

    // Table Header
    doc.setFillColor(...navy)
    doc.roundedRect(margin, y, contentWidth, 7, 1.5, 1.5, 'F')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(255, 255, 255)
    doc.text('CITY / DESTINATION', margin + 4, y + 4.8)
    doc.text('HOTEL / RESORT NAME', margin + 45, y + 4.8)
    doc.text('DURATION', margin + 115, y + 4.8)
    doc.text('ROOM CATEGORY / MEAL PLAN', margin + 140, y + 4.8)

    y += 7.5

    data.hotels.forEach((h, hIdx) => {
      const rowBg = hIdx % 2 === 0 ? lightBg : [255, 255, 255] as [number, number, number]
      doc.setFillColor(...rowBg)
      doc.rect(margin, y, contentWidth, 7.5, 'F')
      doc.setDrawColor(...cardBorder)
      doc.line(margin, y + 7.5, pageWidth - margin, y + 7.5)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7.5)
      doc.setTextColor(...navy)
      doc.text(cleanPdfText(h.city), margin + 4, y + 5)

      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...darkText)
      doc.text(cleanPdfText(h.hotelName || 'Handpicked Boutique Stay'), margin + 45, y + 5)

      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...bluePrimary)
      doc.text(cleanPdfText(h.nights || 'Included'), margin + 115, y + 5)

      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...darkText)
      doc.text(cleanPdfText(h.roomType || 'Deluxe Room (CPAI/MAPAI)'), margin + 140, y + 5)

      y += 8
    })

    y += 6
  }

  // =========================================================================
  // INCLUSIONS & EXCLUSIONS
  // =========================================================================
  checkAddPage(65, 'Inclusions & Exclusions')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(...navy)
  doc.text('PACKAGE INCLUSIONS & EXCLUSIONS', margin, y)
  doc.setFillColor(...gold)
  doc.rect(margin, y + 1.5, 26, 0.8, 'F')
  y += 7

  const halfWidth = (contentWidth - 6) / 2

  // Inclusions Box (Left)
  const incList = data.inclusions && data.inclusions.length > 0
    ? data.inclusions
    : [
        'Dedicated Private Vehicle as per group size',
        'Handpicked Verified Stays on Double / Triple Sharing',
        'Daily Breakfast & Dinner as per plan',
        'All Tolls, Parking, Driver Allowances & Border Taxes',
        '24x7 On-Trip Assistance & Tribe Concierge'
      ]

  const incLinesArr = incList.map((inc) => doc.splitTextToSize(cleanPdfText(inc), halfWidth - 10))
  const totalIncLines = incLinesArr.reduce((a, b) => a + b.length, 0)
  const incBoxH = 10 + totalIncLines * 4 + incList.length * 1.5

  // Exclusions Box (Right)
  const excList = data.exclusions && data.exclusions.length > 0
    ? data.exclusions
    : [
        'Airfare / Train tickets to and from destination',
        'Monument entry fees, camera tickets & safari charges',
        'Personal expenses, laundry, room heaters & tips',
        'Any adventure activities not mentioned in itinerary',
        'GST 5% as applicable on travel packages'
      ]

  const excLinesArr = excList.map((exc) => doc.splitTextToSize(cleanPdfText(exc), halfWidth - 10))
  const totalExcLines = excLinesArr.reduce((a, b) => a + b.length, 0)
  const excBoxH = 10 + totalExcLines * 4 + excList.length * 1.5

  const maxIncExcH = Math.max(incBoxH, excBoxH)

  // Draw Inclusions Card
  doc.setFillColor(240, 253, 244) // soft emerald
  doc.roundedRect(margin, y, halfWidth, maxIncExcH, 2.5, 2.5, 'F')
  doc.setDrawColor(187, 247, 208)
  doc.roundedRect(margin, y, halfWidth, maxIncExcH, 2.5, 2.5, 'D')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(22, 101, 52)
  doc.text('✓ WHAT IS INCLUDED IN YOUR PACKAGE', margin + 5, y + 6.5)

  let curIncY = y + 12
  incList.forEach((inc, idx) => {
    doc.setFillColor(...emerald)
    doc.circle(margin + 7, curIncY - 1, 1, 'F')

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(30, 60, 40)
    const lines = incLinesArr[idx] || [inc]
    doc.text(lines, margin + 11, curIncY)
    curIncY += lines.length * 4 + 1.2
  })

  // Draw Exclusions Card
  const excX = margin + halfWidth + 6
  doc.setFillColor(254, 242, 242) // soft rose
  doc.roundedRect(excX, y, halfWidth, maxIncExcH, 2.5, 2.5, 'F')
  doc.setDrawColor(254, 202, 202)
  doc.roundedRect(excX, y, halfWidth, maxIncExcH, 2.5, 2.5, 'D')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(153, 27, 27)
  doc.text('✗ WHAT IS NOT INCLUDED', excX + 5, y + 6.5)

  let curExcY = y + 12
  excList.forEach((exc, idx) => {
    doc.setFillColor(...rose)
    doc.circle(excX + 7, curExcY - 1, 1, 'F')

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(70, 30, 30)
    const lines = excLinesArr[idx] || [exc]
    doc.text(lines, excX + 11, curExcY)
    curExcY += lines.length * 4 + 1.2
  })

  y += maxIncExcH + 6

  // =========================================================================
  // IMPORTANT GUIDELINES & POINTS TO BE NOTED
  // =========================================================================
  const points = data.pointsToNote && data.pointsToNote.length > 0
    ? data.pointsToNote
    : DEFAULT_POINTS_TO_BE_NOTED

  checkAddPage(38, 'Travel Guidelines')

  doc.setFillColor(255, 255, 255)
  doc.roundedRect(margin, y, contentWidth, 30, 2.5, 2.5, 'F')
  doc.setDrawColor(...cardBorder)
  doc.roundedRect(margin, y, contentWidth, 30, 2.5, 2.5, 'D')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(...navy)
  doc.text('IMPORTANT TRAVEL GUIDELINES & POINTS TO BE NOTED', margin + 5, y + 6)

  let ptY = y + 11
  points.slice(0, 4).forEach((pt) => {
    doc.setFillColor(...gold)
    doc.circle(margin + 7, ptY - 1, 0.9, 'F')

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.2)
    doc.setTextColor(...darkText)
    const lines = doc.splitTextToSize(cleanPdfText(pt), contentWidth - 14)
    doc.text(lines[0] || pt, margin + 11, ptY)
    ptY += 4.5
  })

  y += 35

  // =========================================================================
  // PACKAGE COMMERCIALS & OFFICIAL BANK ACCOUNT
  // =========================================================================
  checkAddPage(58, 'Commercials & Bank Account')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(...navy)
  doc.text('PACKAGE COMMERCIALS & OFFICIAL BANK ACCOUNT', margin, y)
  doc.setFillColor(...gold)
  doc.rect(margin, y + 1.5, 26, 0.8, 'F')
  y += 7

  const bank = data.accountDetails || DEFAULT_BANK_ACCOUNT
  const commH = 34

  // Commercials Card (Left)
  doc.setFillColor(...lightBg)
  doc.roundedRect(margin, y, halfWidth, commH, 2.5, 2.5, 'F')
  doc.setDrawColor(...cardBorder)
  doc.roundedRect(margin, y, halfWidth, commH, 2.5, 2.5, 'D')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...navy)
  doc.text('QUOTATION BREAKDOWN', margin + 5, y + 6)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(...mutedText)
  doc.text('Total Package Price:', margin + 5, y + 12.5)
  doc.text('Token Advance to Confirm:', margin + 5, y + 18.5)
  doc.text('Balance Pending:', margin + 5, y + 24.5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...navy)
  const totalDisplay = cleanPdfText(data.quotation?.totalPrice || data.price || 'Rs. 41,998')
  doc.text(totalDisplay, margin + halfWidth - 5, y + 12.5, { align: 'right' })

  doc.setTextColor(...emerald)
  const advDisplay = cleanPdfText(data.quotation?.advanceToken || 'Rs. 5,000')
  doc.text(advDisplay, margin + halfWidth - 5, y + 18.5, { align: 'right' })

  doc.setTextColor(...navy)
  const balDisplay = cleanPdfText(data.quotation?.balancePending || '7 Days Prior')
  doc.text(balDisplay, margin + halfWidth - 5, y + 24.5, { align: 'right' })

  // Bank Account Box (Right)
  const bankX = margin + halfWidth + 6
  doc.setFillColor(254, 252, 240) // soft gold/sun tint
  doc.roundedRect(bankX, y, halfWidth, commH, 2.5, 2.5, 'F')
  doc.setDrawColor(245, 225, 140)
  doc.roundedRect(bankX, y, halfWidth, commH, 2.5, 2.5, 'D')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...navy)
  doc.text('OFFICIAL VERIFIED BANK ACCOUNT', bankX + 5, y + 6)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...darkText)
  doc.text(`Account Name: ${cleanPdfText(bank.beneficiaryName)}`, bankX + 5, y + 12)
  doc.text(`Bank Name: ${cleanPdfText(bank.bankName)}`, bankX + 5, y + 16.5)
  doc.text(`Account No: ${cleanPdfText(bank.accountNumber)}`, bankX + 5, y + 21)
  doc.text(`IFSC Code: ${cleanPdfText(bank.ifscCode)}  •  UPI: ${cleanPdfText(bank.upiId)}`, bankX + 5, y + 25.5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6.5)
  doc.setTextColor(...bluePrimary)
  doc.text('Share payment screenshot on WhatsApp for instant confirmation.', bankX + 5, y + 30)

  y += commH + 6

  // =========================================================================
  // CLOSING SECTION: CONNECT WITH US (MATCHING SECTION 10)
  // =========================================================================
  checkAddPage(38, 'Connect with Travel Tribes')

  doc.setFillColor(...navy)
  doc.roundedRect(margin, y, contentWidth, 34, 3, 3, 'F')
  doc.setFillColor(...gold)
  doc.rect(margin, y + 32.5, contentWidth, 1.5, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10.5)
  doc.setTextColor(255, 255, 255)
  doc.text('CONNECT WITH TRAVEL TRIBES', margin + 6, y + 8)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(220, 235, 245)
  doc.text('Direct Helplines, Reviews, Official Community & Booking Channels', margin + 6, y + 13)

  // 4 Action Pills in Closing Section
  const pillBtnW = (contentWidth - 18) / 4
  const pillBtnH = 10
  const pillBtnY = y + 17
  const channels = [
    { label: 'Google Review', val: '4.9 ★ Rating' },
    { label: 'Instagram', val: '@traveltribes.in' },
    { label: 'Official Website', val: 'traveltribes.in' },
    { label: 'WhatsApp Helpline', val: '+91 99758 22023' }
  ]

  channels.forEach((ch, idx) => {
    const pX = margin + 6 + idx * (pillBtnW + 2)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(pX, pillBtnY, pillBtnW, pillBtnH, 1.5, 1.5, 'F')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6)
    doc.setTextColor(...bluePrimary)
    doc.text(ch.label, pX + 3, pillBtnY + 4)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(6.8)
    doc.setTextColor(...navy)
    doc.text(ch.val, pX + 3, pillBtnY + 7.8)
  })

  // =========================================================================
  // FINAL PASS: ADD FOOTERS & HEADERS ON ALL PAGES
  // =========================================================================
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    drawPageFooter(i, totalPages)
  }

  // Save / Trigger Download
  const safeTitle = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const filename = `${safeTitle}-itinerary-proposal.pdf`
  doc.save(filename)
}

/**
 * Generate PDF for standard Trip objects (used on standard trip pages)
 */
export async function generateItineraryPDF(trip: Trip, lead?: LeadInfo): Promise<void> {
  // Collect 4 showcase images from gallery or destination
  const showcaseList: { label: string; url: string }[] = []
  if (trip.gallery && trip.gallery.length > 0) {
    trip.gallery.forEach((g, idx) => {
      if (g.image && showcaseList.length < 4) {
        showcaseList.push({ label: g.alt || `Highlight ${idx + 1}`, url: g.image })
      }
    })
  }

  // Days mapping
  const totalDays = trip.itinerary?.length || 1
  const mappedDays = (trip.itinerary || []).map((d) => {
    const narrativeTitle = generateProfessionalDayTitle({
      dayNumber: d.day,
      totalDays,
      customTitle: d.title,
      destination: trip.location
    })

    return {
      day: d.day,
      title: narrativeTitle,
      guidedTour: true,
      activities: d.activities || [],
      meals: 'Breakfast & Dinner Included',
      stay: trip.location,
      image: trip.gallery?.[d.day - 1]?.image || trip.image
    }
  })

  const unifiedData: UnifiedItineraryData = {
    title: trip.title,
    subtitle: `${trip.region?.toUpperCase() || 'COMMUNITY'} EXPEDITION • WHERE WANDERERS BECOME TRIBE`,
    destination: trip.location,
    duration: trip.duration,
    price: trip.price,
    tripType: 'group',
    clientName: lead?.fullName || 'Valued Tribe Explorer',
    clientPhone: lead?.phone,
    clientEmail: lead?.email,
    travelDates: trip.date || trip.dates?.[0],
    heroImage: trip.image,
    overview: trip.description,
    highlights: trip.highlights || [],
    showcaseImages: showcaseList,
    vehicleDetails: 'Comfortable AC Tempo Traveller / SUV as per group size',
    mealPlanDetails: 'Breakfast & Dinner Included as per itinerary plan',
    tourLeadDetails: 'Dedicated Travel Tribes Trip Leader & Local Chauffeur',
    staySummary: 'Handpicked Community Stays, Boutique Cottages & Camps',
    days: mappedDays,
    hotels: [
      {
        city: trip.location,
        hotelName: 'Handpicked Verified Premium Stay',
        nights: trip.duration,
        roomType: 'Double / Triple Sharing'
      }
    ],
    inclusions: trip.inclusions || [],
    exclusions: trip.exclusions || [],
    quotation: {
      totalPrice: trip.price,
      perPerson: trip.price,
      advanceToken: trip.bookingAmount || 'Rs. 3,000',
      balancePending: 'To be paid 7 days prior to departure'
    },
    accountDetails: DEFAULT_BANK_ACCOUNT,
    pointsToNote: trip.policies || DEFAULT_POINTS_TO_BE_NOTED
  }

  await renderUnifiedItineraryPDF(unifiedData)
}

/**
 * Generate PDF for Curated Itineraries (used on curated proposal pages)
 */
export async function generateCuratedItineraryPDF(itinerary: CuratedItinerary): Promise<void> {
  // Collect 4 showcase images
  const showcaseList: { label: string; url: string }[] = []

  if (itinerary.locationGlimpses && itinerary.locationGlimpses.length > 0) {
    itinerary.locationGlimpses.forEach((g) => {
      if (g.image && showcaseList.length < 4) {
        showcaseList.push({ label: g.name || 'Trip Highlight', url: g.image })
      }
    })
  }

  if (showcaseList.length < 4 && itinerary.highlightImages && itinerary.highlightImages.length > 0) {
    itinerary.highlightImages.forEach((img, i) => {
      if (img && showcaseList.length < 4) {
        showcaseList.push({ label: `Scenic Glimpse ${i + 1}`, url: img })
      }
    })
  }

  if (showcaseList.length < 4 && itinerary.days && itinerary.days.length > 0) {
    itinerary.days.forEach((d) => {
      if (d.image && showcaseList.length < 4) {
        showcaseList.push({ label: d.title ? d.title.split('➔')[0].trim() : `Day ${d.day}`, url: d.image })
      }
    })
  }

  // Format stay summary
  const staySummaryText = itinerary.cityWiseStay && itinerary.cityWiseStay.length > 0
    ? itinerary.cityWiseStay
        .map((s) => `${s.city.split('/')[0].trim()} (${s.nights.replace(/nights?/i, 'N').trim()})`)
        .join(' • ')
    : itinerary.hotels && itinerary.hotels.length > 0
      ? itinerary.hotels.map((h) => `${h.city} (${h.nights})`).join(' • ')
      : 'Handpicked Boutique Stays'

  // Map days
  const totalDays = itinerary.days?.length || 1
  const mappedDays = (itinerary.days || []).map((d) => {
    const narrativeTitle = d.title && d.title.length > 5 && !d.title.startsWith('DAY')
      ? d.title
      : generateProfessionalDayTitle({
          dayNumber: d.day,
          totalDays,
          customTitle: d.title,
          destination: itinerary.destination
        })

    return {
      day: d.day,
      title: narrativeTitle,
      date: d.date,
      guidedTour: d.guidedTour ?? true,
      activities: d.points || (d.description ? [d.description] : []),
      meals: d.meals && d.meals.length > 0 ? d.meals.join(', ') : 'As per plan',
      stay: d.stayHotel || d.stay || 'Handpicked Boutique Stay',
      image: d.image
    }
  })

  // Quotation calculations
  const quote = itinerary.quotation || {}
  const isCustom = itinerary.tripType === 'customized'
  const totalPriceVal = isCustom
    ? (quote.totalPackagePrice || quote.pricePerPerson || '80,000')
    : (quote.tripleSharingPrice || quote.pricePerPerson || '20,999')

  const advanceTokenVal = quote.advanceAmount || '5,000'
  const balancePendingVal = quote.balancePendingAmount || 'As per invoice'

  const unifiedData: UnifiedItineraryData = {
    title: itinerary.title,
    subtitle: itinerary.subtitle || (isCustom ? 'PRIVATE BESPOKE EXPERIENCE' : 'COMMUNITY BACKPACKING'),
    destination: itinerary.destination,
    duration: itinerary.duration,
    price: `Rs. ${totalPriceVal}`,
    tripType: itinerary.tripType,
    clientName: itinerary.clientName || 'Valued Tribe Explorer',
    clientPhone: itinerary.clientPhone,
    clientEmail: itinerary.clientEmail,
    travelDates: itinerary.travelDates,
    heroImage: itinerary.bannerImage,
    overview: itinerary.overview,
    highlights: itinerary.highlights || [],
    showcaseImages: showcaseList,
    vehicleDetails: itinerary.transport?.vehicleType
      ? `${itinerary.transport.vehicleType} (${itinerary.transport.pickupDrop || 'Dedicated Transfers'})`
      : 'Private Dedicated Cab with Chauffeur',
    mealPlanDetails: itinerary.mealPlan || 'Breakfast & Dinner as per Plan',
    tourLeadDetails: 'Verified Local Chauffeur & 24/7 Tribe Concierge',
    staySummary: staySummaryText,
    days: mappedDays,
    hotels: (itinerary.hotels || []).map((h) => ({
      city: h.city,
      hotelName: h.hotelName,
      nights: h.nights,
      roomType: h.roomType || 'Deluxe Room',
      stayDates: h.stayDates
    })),
    inclusions: itinerary.inclusions || [],
    exclusions: itinerary.exclusions || [],
    quotation: {
      totalPrice: `Rs. ${totalPriceVal}`,
      perPerson: quote.pricePerPerson ? `Rs. ${quote.pricePerPerson}` : undefined,
      advanceToken: `Rs. ${advanceTokenVal}`,
      balancePending: `Rs. ${balancePendingVal}`,
      specialNotes: itinerary.specialRequirements
    },
    accountDetails: itinerary.accountDetails || DEFAULT_BANK_ACCOUNT,
    pointsToNote: itinerary.pointsToBeNoted || DEFAULT_POINTS_TO_BE_NOTED
  }

  await renderUnifiedItineraryPDF(unifiedData)
}

/**
 * Date utilities for Travel Tribes itineraries and booking system
 */

const MONTH_MAP: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11
}

export interface ParsedTripDate {
  startDate: Date
  endDate: Date
  raw: string
}

/**
 * Parses any trip date string into a structured start and end Date object.
 * Examples:
 * - "Aug 20–24, 2026"
 * - "Sep 03–07, 2026 (Long Weekend)"
 * - "Oct 29–Nov 02, 2026"
 * - "Dec 28–Jan 02, 2027 (New Year Special)"
 * - "Jun 12–20, 2027"
 */
export function parseTripDate(dateStr?: string): ParsedTripDate | null {
  if (!dateStr || typeof dateStr !== 'string') return null
  const cleaned = dateStr.trim()
  if (!cleaned) return null

  const currentYear = new Date().getFullYear()

  // 1. Cross-month or cross-year range: "Oct 29–Nov 02, 2026" or "Dec 28–Jan 02, 2027 (New Year Special)"
  const crossMonthMatch = cleaned.match(
    /([A-Za-z]+)\s*(\d{1,2})\s*[-–—]\s*([A-Za-z]+)\s*(\d{1,2})(?:,\s*(\d{4}))?/i
  )
  if (crossMonthMatch) {
    const m1Str = crossMonthMatch[1].toLowerCase()
    const d1 = parseInt(crossMonthMatch[2], 10)
    const m2Str = crossMonthMatch[3].toLowerCase()
    const d2 = parseInt(crossMonthMatch[4], 10)
    const yearParsed = crossMonthMatch[5] ? parseInt(crossMonthMatch[5], 10) : currentYear

    if (m1Str in MONTH_MAP && m2Str in MONTH_MAP) {
      const m1 = MONTH_MAP[m1Str]
      const m2 = MONTH_MAP[m2Str]

      // If span crosses Dec -> Jan (e.g., Dec 28 - Jan 02, 2027)
      const startYear = m1 > m2 ? yearParsed - 1 : yearParsed
      const endYear = yearParsed

      const startDate = new Date(startYear, m1, d1, 0, 0, 0, 0)
      const endDate = new Date(endYear, m2, d2, 23, 59, 59, 999)

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        return { startDate, endDate, raw: cleaned }
      }
    }
  }

  // 2. Single-month range: "Aug 20–24, 2026" or "Sep 03–07, 2026 (Long Weekend)"
  const singleMonthMatch = cleaned.match(
    /([A-Za-z]+)\s*(\d{1,2})\s*[-–—]\s*(\d{1,2})(?:,\s*(\d{4}))?/i
  )
  if (singleMonthMatch) {
    const mStr = singleMonthMatch[1].toLowerCase()
    const d1 = parseInt(singleMonthMatch[2], 10)
    const d2 = parseInt(singleMonthMatch[3], 10)
    const year = singleMonthMatch[4] ? parseInt(singleMonthMatch[4], 10) : currentYear

    if (mStr in MONTH_MAP) {
      const m = MONTH_MAP[mStr]
      const startDate = new Date(year, m, d1, 0, 0, 0, 0)
      const endDate = new Date(year, m, d2, 23, 59, 59, 999)

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        return { startDate, endDate, raw: cleaned }
      }
    }
  }

  // 3. Single date: "Oct 18, 2026" or "Oct 18"
  const singleDateMatch = cleaned.match(/([A-Za-z]+)\s*(\d{1,2})(?:,\s*(\d{4}))?/i)
  if (singleDateMatch) {
    const mStr = singleDateMatch[1].toLowerCase()
    const d = parseInt(singleDateMatch[2], 10)
    const year = singleDateMatch[3] ? parseInt(singleDateMatch[3], 10) : currentYear

    if (mStr in MONTH_MAP) {
      const m = MONTH_MAP[mStr]
      const startDate = new Date(year, m, d, 0, 0, 0, 0)
      const endDate = new Date(year, m, d, 23, 59, 59, 999)

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        return { startDate, endDate, raw: cleaned }
      }
    }
  }

  return null
}

/**
 * Checks if a given date string is in the future or active today.
 * If the start date is prior to today's date (00:00:00), it returns false (past date).
 */
export function isDateUpcoming(dateStr?: string, referenceDate?: Date): boolean {
  if (!dateStr) return false
  if (dateStr.toLowerCase().includes('no upcoming')) return false
  const parsed = parseTripDate(dateStr)
  if (!parsed) return true // Fallback to true if unparseable

  const now = referenceDate || new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)

  // Returns true only if trip departure is today or in the future
  return parsed.startDate.getTime() >= startOfToday.getTime()
}

/**
 * Filters an array of date strings to strictly include only upcoming dates.
 */
export function filterUpcomingDates(dates?: string[], referenceDate?: Date): string[] {
  if (!dates || !Array.isArray(dates)) return []
  return dates.filter((d) => isDateUpcoming(d, referenceDate))
}

/**
 * Resolves the primary active date to display for a trip.
 * Always prioritizes the earliest upcoming date.
 */
export function getTripPrimaryDate(
  trip: { date?: string; dates?: string[] },
  referenceDate?: Date
): string {
  if (trip.date?.toLowerCase().includes('no upcoming') || trip.dates?.[0]?.toLowerCase().includes('no upcoming')) {
    return 'No Upcoming Trips'
  }

  if (trip.dates && trip.dates.length > 0) {
    const upcoming = filterUpcomingDates(trip.dates, referenceDate)
    if (upcoming.length > 0) {
      return upcoming[0]
    }
  }

  if (trip.date && isDateUpcoming(trip.date, referenceDate)) {
    return trip.date
  }

  // If all specific dates are in the past or none defined, fallback to first date or trip.date
  return trip.dates?.[0] || trip.date || 'Upcoming'
}

/**
 * Checks if a trip has any upcoming departure date.
 */
export function isTripUpcoming(
  trip: { date?: string; dates?: string[] },
  referenceDate?: Date
): boolean {
  if (trip.date?.toLowerCase().includes('no upcoming') || trip.dates?.[0]?.toLowerCase().includes('no upcoming')) {
    return false
  }

  if (trip.dates && trip.dates.length > 0) {
    const upcoming = filterUpcomingDates(trip.dates, referenceDate)
    return upcoming.length > 0
  }
  return trip.date ? isDateUpcoming(trip.date, referenceDate) : true
}

/**
 * Checks if a date string is a Long Weekend batch (LW).
 */
export function isLongWeekendDate(dateStr?: string): boolean {
  if (!dateStr || typeof dateStr !== 'string') return false
  const lower = dateStr.toLowerCase()
  return (
    lower.includes('(lw)') ||
    lower.includes('long weekend') ||
    lower.includes('christmas weekend')
  )
}

/**
 * Checks if a date string belongs to an Xmas, Christmas or New Year departure batch.
 */
export function isFestiveDate(dateStr?: string): boolean {
  if (!dateStr || typeof dateStr !== 'string') return false
  const lower = dateStr.toLowerCase()
  if (
    lower.includes('new year') ||
    lower.includes('(ny)') ||
    lower.includes('xmas') ||
    lower.includes('christmas') ||
    lower.includes('festive') ||
    lower.includes('31st')
  ) {
    return true
  }

  const parsed = parseTripDate(dateStr)
  if (!parsed) return false

  const s = parsed.startDate
  const e = parsed.endDate

  const sMonth = s.getMonth() // 0 = Jan, 11 = Dec
  const sDay = s.getDate()
  const eMonth = e.getMonth()
  const eDay = e.getDate()

  // Starts in Dec on or after 23rd
  if (sMonth === 11 && sDay >= 23) return true
  // Spans across Dec -> Jan
  if (sMonth === 11 && eMonth === 0) return true
  // Starts on Dec 20 or later and covers Dec 25
  if (sMonth === 11 && sDay >= 20 && eDay >= 25) return true

  return false
}

/**
 * Filters an array of date strings to strictly include only Xmas & New Year dates.
 */
export function filterFestiveDates(dates?: string[]): string[] {
  if (!dates || !Array.isArray(dates)) return []
  return dates.filter((d) => isFestiveDate(d))
}

import { NextRequest, NextResponse } from 'next/server'
import { saveCuratedItinerary, slugify, loadCuratedStore } from '@/lib/curated-itineraries-store'
import type { CuratedItinerary, DayItinerary, HotelDetail, LocationGlimpse } from '@/lib/curated-itinerary-constants'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
    }

    const {
      inquiryId,
      fullName,
      clientName,
      destination,
      noOfDays,
      noOfNights,
      startDate,
      endDate,
      adults,
      kids,
      vehicleType,
      mealPlan,
      hotels,
      dayActivities,
      finalQuotationAmount,
      perAdultPrice,
      perKidPrice,
      advanceAmountPaid,
      balancePendingAmount,
      specialRequirements,
      inclusions,
      exclusions,
      tripTitle,
      heroImage,
      galleryImages,
      optionNumber
    } = body

    const guestName = fullName || clientName || 'Valued Guest'
    const dest = destination || 'Custom Trip'
    const daysCount = Math.max(1, Number(noOfDays) || 1)
    const nightsCount = Math.max(0, Number(noOfNights) || (daysCount > 1 ? daysCount - 1 : 0))
    const durationStr = body.duration?.trim() || `${daysCount} Day${daysCount > 1 ? 's' : ''} / ${nightsCount} Night${nightsCount > 1 ? 's' : ''}`

    // Luxury title generator based on destination fallback
    const getLuxuryDestinationTitle = (destName: string) => {
      if (!destName) return 'Curated Luxury Itinerary'
      const d = destName.toLowerCase().trim()
      if (d.includes('rajasthan')) return 'Royal Heritage of Rajasthan'
      if (d.includes('meghalaya')) return 'Enchanting Meghalaya & Dawki Wonders'
      if (d.includes('spiti')) return 'High-Altitude Spiti Valley Expedition'
      if (d.includes('kashmir')) return 'Paradise on Earth: Kashmir & Gulmarg'
      if (d.includes('ladakh')) return 'Land of High Passes: Ladakh Odyssey'
      if (d.includes('himachal')) return 'Himachal Mountain Serenade'
      if (d.includes('uttarakhand')) return 'Scenic Vistas of Uttarakhand'
      if (d.includes('kerala')) return 'God’s Own Country: Kerala Backwaters & Hills'
      if (d.includes('goa')) return 'Goa Coastal & Heritage Getaway'
      if (d.includes('bali')) return 'Tropical Paradise: Bali & Nusa Penida'
      if (d.includes('dubai')) return 'Futuristic Glamour: Dubai & Desert Dunes'
      if (d.includes('thailand')) return 'Tropical Wonders: Thailand Island Escape'
      if (d.includes('vietnam')) return 'Emerald Waters & Heritage: Vietnam Odyssey'
      return `${destName} Curated Luxury Expedition`
    }

    // Generate readable title
    const optTag = optionNumber && optionNumber > 1 ? ` (Option ${optionNumber})` : ''
    const title = (tripTitle?.trim() || getLuxuryDestinationTitle(dest)) + optTag

    // Helper to calculate human readable date for each day
    const calculateDayDate = (baseDateStr: string, offsetDays: number): string | undefined => {
      if (!baseDateStr) return undefined
      try {
        const d = new Date(baseDateStr)
        if (isNaN(d.getTime())) return undefined
        d.setDate(d.getDate() + offsetDays)
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      } catch {
        return undefined
      }
    }

    // Format hotels
    const hotelsList = Array.isArray(hotels) ? hotels : []
    const formattedHotels: HotelDetail[] = hotelsList.map((h: any, idx: number) => {
      const rawNights = h.nights?.toString().trim()
      const nightsText = rawNights
        ? (rawNights.toLowerCase().includes('night') ? rawNights : `${rawNights} Night${rawNights === '1' ? '' : 's'}`)
        : '1 Night'

      return {
        id: `hotel-${idx + 1}`,
        city: h.city?.trim() || dest,
        hotelName: h.hotelName?.trim() || `${h.city || dest} Luxury Stay`,
        nights: nightsText,
        stayDates: h.stayDates?.trim() || undefined,
        roomType: h.roomType?.trim() || h.roomCategory?.trim() || h.category?.trim() || 'Deluxe Room',
        starRating: h.starRating?.trim() || (h.category?.includes('5') || h.category?.includes('Luxury') ? '5 Star Luxury' : (h.category || '4 Star Deluxe')),
        amenities: ['Free High-Speed WiFi', 'Daily Curated Breakfast', 'Air Conditioned', '24/7 Room Service']
      }
    })

    // Collect all unique attractions for highlights
    const keyAttractions: string[] = []

    // Build sequential night-to-hotel mapping from formattedHotels
    // e.g. Hotel 1 (2 Nights) covers night 0 and night 1; Hotel 2 (1 Night) covers night 2
    const nightToHotelMap: HotelDetail[] = []
    formattedHotels.forEach(h => {
      const rawN = parseInt((h.nights || '1').replace(/\D/g, ''), 10)
      const count = isNaN(rawN) || rawN < 1 ? 1 : rawN
      for (let i = 0; i < count; i++) {
        nightToHotelMap.push(h)
      }
    })

    // Format dayActivities into DayItinerary[]
    const dayActsList = Array.isArray(dayActivities) ? dayActivities : []
    const formattedDays: DayItinerary[] = dayActsList.map((da: any, idx: number) => {
      const expPoints: string[] = []
      
      // Collect all en-route spots (single or multiple)
      const enRouteList: string[] = []
      if (Array.isArray(da.enRoutes) && da.enRoutes.length > 0) {
        da.enRoutes.forEach((r: any) => {
          if (typeof r === 'string' && r.trim()) enRouteList.push(r.trim())
        })
      } else if (da.enRouteExperiences?.trim()) {
        enRouteList.push(da.enRouteExperiences.trim())
      } else if (da.enRoute?.trim()) {
        enRouteList.push(da.enRoute.trim())
      }

      enRouteList.forEach(spot => {
        expPoints.push(`En-Route Spot: ${spot}`)
      })
      const enRouteVal = enRouteList.join(' & ') || undefined

      if (da.guidedTour) {
        expPoints.push(`Dedicated local guide assistance included for today's sightseeing`)
      }

      // Experience 1, 2, 3, 4 columns
      ;['exp1', 'exp2', 'exp3', 'exp4'].forEach(k => {
        const val = da[k]?.trim()
        if (val) {
          keyAttractions.push(val)
          expPoints.push(val)
        }
      })

      // Extra Experiences (Exp 5, Exp 6, ...)
      if (Array.isArray(da.extraExperiences)) {
        da.extraExperiences.forEach((extra: any) => {
          const val = typeof extra === 'string' ? extra.trim() : ''
          if (val) {
            keyAttractions.push(val)
            expPoints.push(val)
          }
        })
      }

      const expList = Array.isArray(da.experiences) ? da.experiences : []
      expList.forEach((e: any) => {
        if (e && e.name) {
          keyAttractions.push(e.name)
          expPoints.push(e.description ? `${e.name} — ${e.description}` : e.name)
        }
      })

      const optList = Array.isArray(da.optionalExperiences) ? da.optionalExperiences : []
      optList.forEach((oe: any) => {
        if (oe && oe.name) {
          expPoints.push(`Optional: ${oe.name}${oe.description ? ` — ${oe.description}` : ''}`)
        }
      })

      const mealsList: string[] = []
      if (da.breakfast) mealsList.push('Breakfast')
      if (da.lunch) mealsList.push('Lunch')
      if (da.dinner) mealsList.push('Dinner')

      // If user typed multiline activities or provided points array
      if (typeof da.activitiesText === 'string' && da.activitiesText.trim()) {
        da.activitiesText.split('\n').map((s: string) => s.trim().replace(/^[•\-\*]\s*/, '')).filter(Boolean).forEach((act: string) => {
          expPoints.push(act)
        })
      }
      if (Array.isArray(da.points) && da.points.length > 0) {
        da.points.forEach((p: any) => {
          if (typeof p === 'string' && p.trim()) expPoints.push(p.trim())
        })
      }

      const dayCity1 = da.city?.trim() || dest
      const dayCity2 = da.city2?.trim() || dayCity1
      const dayTitle = da.title?.trim() || (dayCity1 && dayCity2 && dayCity1.toLowerCase() !== dayCity2.toLowerCase()
        ? `${dayCity1} to ${dayCity2}${enRouteVal ? ` via ${enRouteVal}` : ''}`
        : (dayCity1 ? `Sightseeing & Heritage Exploration in ${dayCity1}` : `Day ${da.dayNumber || idx + 1}`))

      // Match night stay hotel: check by city match first, else by sequential night allocation
      const matchingHotelByCity = formattedHotels.find(h =>
        dayCity2 && h.city && (
          h.city.toLowerCase() === dayCity2.toLowerCase() ||
          dayCity2.toLowerCase().includes(h.city.toLowerCase()) ||
          h.city.toLowerCase().includes(dayCity2.toLowerCase())
        )
      )
      const mappedHotelByNight = nightToHotelMap[idx] || formattedHotels[formattedHotels.length - 1]
      const assignedHotel = matchingHotelByCity || mappedHotelByNight

      const stayHotelName = da.stayHotel?.trim() || da.stay?.trim() || (assignedHotel ? assignedHotel.hotelName : (dayCity2 ? `${dayCity2} Stay` : 'Comfort Stay'))
      const stayCityName = assignedHotel ? assignedHotel.city : dayCity2
      const stayDisplay = da.stay?.trim() || (stayHotelName && stayCityName && !stayHotelName.toLowerCase().includes(stayCityName.toLowerCase()) ? `${stayHotelName}, ${stayCityName}` : stayHotelName)
      
      const formatDisplayDate = (dStr?: string): string | undefined => {
        if (!dStr) return undefined
        try {
          const d = new Date(dStr)
          if (!isNaN(d.getTime())) {
            return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          }
        } catch {}
        return dStr
      }
      const dayDate = formatDisplayDate(da.date?.trim()) || calculateDayDate(startDate, idx)

      return {
        day: da.dayNumber || idx + 1,
        title: dayTitle,
        date: dayDate,
        travelDistance: da.travelDistance?.trim() || undefined,
        guidedTour: Boolean(da.guidedTour),
        enRouteStop: enRouteVal,
        points: expPoints.length > 0 ? expPoints : (dayCity1 ? [`Sightseeing & leisure exploration in ${dayCity1}`] : ['Day exploration & leisure activities']),
        description: expPoints.join(' • '),
        meals: mealsList.length > 0 ? mealsList : (mealPlan ? [mealPlan] : ['Breakfast', 'Dinner']),
        stayCity: dayCity2,
        stayHotel: stayHotelName,
        stay: stayDisplay,
        image: da.image?.trim() || (galleryImages && galleryImages[idx % galleryImages.length]) || heroImage
      }
    })

    // Location Glimpses for summary (up to 4)
    const glimpses: LocationGlimpse[] = (Array.isArray(galleryImages) ? galleryImages : []).slice(0, 4).map((img: string, i: number) => ({
      name: formattedDays[i]?.title?.split(':')?.[1]?.trim() || `Scenic Highlight ${i + 1}`,
      image: img
    }))

    // Build structured route text
    const routeCities: string[] = []
    dayActsList.forEach((da: any) => {
      if (da.city && !routeCities.includes(da.city)) routeCities.push(da.city)
      if (da.city2 && !routeCities.includes(da.city2)) routeCities.push(da.city2)
    })
    const routeText = body.routeText?.trim() || (routeCities.length > 0 ? routeCities.join(' ➔ ') : `${dest} Circuit`)

    // Generate dynamic highlights
    const topHighlights = Array.isArray(body.highlights) && body.highlights.length > 0
      ? body.highlights
      : [
          `Private transfers in dedicated ${vehicleType || 'AC Vehicle'} with professional chauffeur for all transfers & sightseeing`,
          `Accommodations in verified properties across ${formattedHotels.map(h => h.city).filter((v, i, a) => a.indexOf(v) === i).join(', ') || dest}`,
          `Curated daily dining arrangement on ${mealPlan || 'Breakfast & Dinner'} plan`,
          `Private custom itinerary crafted for ${body.groupVibe?.trim() || `${adults || 2} Adults${kids > 0 ? ` & ${kids} Children` : ''} (${body.sharingType || 'Double Sharing'})`}`
        ]
    if (dayActsList.some((d: any) => d.guidedTour)) {
      topHighlights.push('Dedicated local guide assistance for key heritage monuments & cultural walks')
    }
    if (keyAttractions.length > 0) {
      topHighlights.push(`Includes top landmark visits: ${keyAttractions.slice(0, 5).join(', ')}`)
    }

    // Construct slug
    const cleanGuest = slugify(guestName).slice(0, 20) || 'guest'
    const cleanDest = slugify(dest).slice(0, 20) || 'trip'
    const baseSlug = `${cleanGuest}-${cleanDest}-${daysCount}d${optionNumber && optionNumber > 1 ? `-opt${optionNumber}` : ''}`

    const nowIso = new Date().toISOString()
    const finalSubtitle = body.subtitle?.trim() || (body.travelStyle ? `${String(body.travelStyle).toUpperCase()} • PRIVATE BESPOKE EXPERIENCE` : 'PRIVATE BESPOKE EXPERIENCE')
    const finalTravelDates = body.travelDates?.trim() || (startDate && endDate ? `${startDate} to ${endDate}` : startDate || '')
    const finalGroupVibe = body.groupVibe?.trim() || body.travelStyle || 'Private Tour'
    const finalPickupDrop = body.pickupDrop?.trim() || `${body.departureCity || 'Airport / Station'} Pickup & Drop Included`

    const newCurated: CuratedItinerary = {
      id: `sheet-${Date.now()}`,
      slug: baseSlug,
      createdAt: nowIso,
      updatedAt: nowIso,
      tripType: 'customized',
      title,
      subtitle: finalSubtitle,
      destination: dest,
      duration: durationStr,
      routeText,
      bannerImage: heroImage || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80',
      overview: `A private bespoke ${durationStr} journey handcrafted exclusively for ${guestName}. Featuring handpicked accommodations, private dedicated transfers with ${vehicleType || 'Dedicated AC Vehicle'}, and curated local experiences across ${dest}.`,
      highlights: topHighlights,
      highlightImages: Array.isArray(galleryImages) ? galleryImages : [],
      locationGlimpses: glimpses,
      cityWiseStay: formattedHotels.map(h => ({
        city: h.city,
        nights: h.nights
      })),
      clientName: guestName,
      clientPhone: body.mobile || '',
      clientEmail: body.email || '',
      inquiryId: inquiryId || '',
      travelDates: finalTravelDates,
      groupVibe: finalGroupVibe,
      mealPlan: mealPlan || 'Breakfast & Dinner',
      specialRequirements: specialRequirements || '',
      hotels: formattedHotels,
      transport: {
        vehicleType: vehicleType || 'Private Dedicated AC Vehicle',
        pickupDrop: finalPickupDrop,
        includedFeatures: [
          'All toll taxes, parking fees, state border permits and fuel included',
          'Dedicated experienced driver for entire tour duration',
          'Point-to-point sightseeing & inter-city transit as per itinerary'
        ]
      },
      days: formattedDays,
      inclusions: Array.isArray(inclusions) && inclusions.length > 0 ? inclusions : [
        `Accommodation for ${nightsCount} Nights in selected room categories`,
        `Private ${vehicleType || 'AC Vehicle'} for all transfers and sightseeing`,
        `Daily meals as per ${mealPlan || 'Breakfast & Dinner'} plan`,
        'Driver allowance, toll taxes, fuel, parking and state permits'
      ],
      exclusions: Array.isArray(exclusions) && exclusions.length > 0 ? exclusions : [
        '5% GST (unless specified)',
        'Monument entry fees, camera tickets, boating & optional activity charges',
        'Personal expenses such as laundry, phone calls, beverages & tips'
      ],
      quotation: {
        totalPackagePrice: finalQuotationAmount || undefined,
        pricePerPerson: perAdultPrice || undefined,
        pricePerChild: perKidPrice || undefined,
        advanceAmount: advanceAmountPaid || undefined,
        balancePendingAmount: balancePendingAmount || undefined,
        numberOfGuests: body.groupVibe?.trim() || `${adults || 2} Adults${kids > 0 ? `, ${kids} Kids` : ''} (${body.sharingType || 'Double Sharing'})${body.travelStyle ? ` • ${body.travelStyle}` : ''}`,
        paymentTerms: balancePendingAmount ? `Advance: ₹${Number(advanceAmountPaid).toLocaleString('en-IN')}, Balance pending: ₹${Number(balancePendingAmount).toLocaleString('en-IN')}` : undefined
      }
    }

    const saved = saveCuratedItinerary(newCurated)
    const shareUrl = `/itinerary/${saved.slug}`

    return NextResponse.json({
      success: true,
      itinerary: saved,
      slug: saved.slug,
      url: shareUrl,
      message: 'Itinerary generated & published successfully!'
    })
  } catch (error: any) {
    console.error('Error generating sheet itinerary:', error)
    return NextResponse.json({ success: false, error: error?.message || 'Failed to generate itinerary' }, { status: 500 })
  }
}

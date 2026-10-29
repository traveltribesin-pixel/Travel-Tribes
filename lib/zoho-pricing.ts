// Offline pricing calculator for manual subform itineraries

export interface ChildDetailPricing {
  age?: number | string;
  bedPreference?: 'With Bed' | 'Without Bed' | 'Crib' | string;
}

export interface HotelPricingInput {
  hotelName?: string;
  city?: string;
  nights?: number;
  category?: string;
  roomCategory?: string;
  roomRate?: number;
  baseRate?: number;
  extraBedRate?: number;
  childNoBedRate?: number;
}

export interface DayRowPricingInput {
  dayNumber?: number;
  guidedTour?: boolean;
  activities?: Array<{
    name?: string;
    costPerPerson?: number;
    costPerChild?: number;
    privateCost?: number;
  }>;
}

export function isExtraBed(pref?: string): boolean {
  if (!pref) return false;
  const p = String(pref).toLowerCase().trim();
  return p.includes('with bed') || p.includes('extra bed') || p === 'extra';
}

export function isWithoutBed(pref?: string): boolean {
  if (!pref) return true;
  const p = String(pref).toLowerCase().trim();
  return p.includes('without bed') || p.includes('no bed') || p.includes('crib') || p.includes('cot');
}

/**
 * Calculates recommended room and bed distribution strictly following standard occupancy rules (Max 3 adults per room)
 */
export function calculateRoomsAndBeds(params: {
  adults: number;
  sharingType?: string;
  totalKidsCount?: number;
  initialExtraBedCount?: number;
}) {
  const adults = Math.max(1, Number(params.adults) || 1);
  const sharing = String(params.sharingType || 'Double Sharing').toLowerCase();
  const kidsCount = Math.max(0, Number(params.totalKidsCount) || 0);
  const extraBedKids = Math.max(0, Number(params.initialExtraBedCount) || 0);

  let baseRooms = 1;
  let baseExtraBeds = 0;

  if (sharing.includes('single')) {
    baseRooms = adults;
  } else if (sharing.includes('triple')) {
    baseRooms = Math.ceil(adults / 3);
  } else if (sharing.includes('quad')) {
    baseRooms = Math.ceil(adults / 4);
  } else {
    // Default: Double Sharing (2 adults per room)
    baseRooms = Math.ceil(adults / 2);
    // If odd number of adults in double sharing (e.g. 3 adults, 5 adults), the extra adult takes an extra bed or room
    if (adults % 2 !== 0 && adults > 1) {
      baseRooms = Math.floor(adults / 2);
      baseExtraBeds = 1;
      if (baseRooms < 1) baseRooms = 1;
    }
  }

  // Room capacity check: each room can take at most 1 extra bed
  const totalExtraBedsNeeded = baseExtraBeds + extraBedKids;
  const maxBedsForBaseRooms = baseRooms;

  let extraRoomsAdded = 0;
  let billableExtraBeds = totalExtraBedsNeeded;

  if (totalExtraBedsNeeded > maxBedsForBaseRooms) {
    extraRoomsAdded = Math.ceil((totalExtraBedsNeeded - maxBedsForBaseRooms) / 2);
    billableExtraBeds = maxBedsForBaseRooms;
  }

  const totalRooms = baseRooms + extraRoomsAdded;

  return {
    totalRooms,
    baseRooms,
    extraRoomsAdded,
    extraBedCount: totalExtraBedsNeeded,
    billableExtraBeds,
    childWithoutBedCount: Math.max(0, kidsCount - extraBedKids)
  };
}

/**
 * Lead pricing computation matching standard manual quotation rules
 */
export function calculateLeadPricingOffline(params: {
  adults: number;
  kids?: number;
  noOfDays: number;
  sharingType?: string;
  globalTargetCat?: string;
  kidsDetails?: ChildDetailPricing[];
  hotels?: HotelPricingInput[];
  vehicle?: {
    name?: string;
    dailyCost?: number;
  };
  dayRows?: DayRowPricingInput[];
}) {
  const adults = Math.max(1, Number(params.adults) || 1);
  const kids = Math.max(0, Number(params.kids) || 0);
  const totalDays = Math.max(1, Number(params.noOfDays) || 1);
  const kidsDetails = Array.isArray(params.kidsDetails) ? params.kidsDetails : [];

  // Child demographics
  const kidsAbove3 = kidsDetails.filter(k => (Number(k.age) || 0) > 3).length;
  const kidsAbove5 = kidsDetails.filter(k => (Number(k.age) || 0) > 5).length;
  const kidsWithBed = kidsDetails.filter(k => isExtraBed(k.bedPreference)).length;
  const kidsWithoutBed = Math.max(0, kids - kidsWithBed);

  const eligiblePaxForPrivate = Math.max(1, adults + kidsAbove3);
  const totalTransportPax = adults + kidsAbove5;

  // 1. Rooms & Beds calculation
  const roomDist = calculateRoomsAndBeds({
    adults,
    sharingType: params.sharingType,
    totalKidsCount: kids,
    initialExtraBedCount: kidsWithBed
  });

  const roomsCount = roomDist.totalRooms;
  const billableExtraBeds = roomDist.billableExtraBeds;

  // 2. Hotels Total Cost
  let totalHotelsCost = 0;
  let currentHotelExtraBedCostTotal = 0;
  let currentHotelChildNoBedCostTotal = 0;
  const hotelBreakdowns: any[] = [];

  const hotelsList = Array.isArray(params.hotels) ? params.hotels : [];
  hotelsList.forEach((h, idx) => {
    const nights = Math.max(1, Number(h.nights) || 1);
    const roomRate = Number(h.roomRate || h.baseRate) || 0;
    const extraBedRate = Number(h.extraBedRate) || 0;
    const childNoBedRate = Number(h.childNoBedRate) || 0;

    const roomsTotal = roomsCount * roomRate * nights;
    const extraBedsTotal = billableExtraBeds * extraBedRate * nights;
    const childNoBedTotal = kidsWithoutBed * childNoBedRate * nights;
    const hotelSum = roomsTotal + extraBedsTotal + childNoBedTotal;

    totalHotelsCost += hotelSum;
    currentHotelExtraBedCostTotal += extraBedsTotal;
    currentHotelChildNoBedCostTotal += childNoBedTotal;

    hotelBreakdowns.push({
      hotelName: h.hotelName || `Hotel ${idx + 1}`,
      city: h.city || '',
      nights,
      roomsTotal,
      extraBedsTotal,
      childNoBedTotal,
      hotelSum
    });
  });

  // 3. Vehicle / Transport Cost
  const vehicleDailyRate = Number(params.vehicle?.dailyCost) || 4500;
  const totalVehicleCost = vehicleDailyRate * totalDays;
  const perHeadTransportCost = totalTransportPax > 0 ? Math.round(totalVehicleCost / totalTransportPax) : 0;

  // 4. Activities & Sightseeing Cost
  let totalActivitiesCost = 0;
  let totalAdultActivitiesCost = 0;
  let totalChildActivitiesCost = 0;
  let totalGuideCost = 0;

  const rows = Array.isArray(params.dayRows) ? params.dayRows : [];
  rows.forEach(row => {
    if (row.guidedTour) {
      totalGuideCost += 2000; // Flat guide allowance per day
    }

    (row.activities || []).forEach(act => {
      const sicA = Number(act.costPerPerson) || 0;
      const sicC = Number(act.costPerChild) || 0;
      const priv = Number(act.privateCost) || 0;

      if (sicA > 0 || sicC > 0) {
        const adultSum = sicA * adults;
        const childSum = sicC * kids;
        totalAdultActivitiesCost += adultSum;
        totalChildActivitiesCost += childSum;
        totalActivitiesCost += (adultSum + childSum);
      } else if (priv > 0) {
        totalActivitiesCost += priv;
        const perPax = Math.round(priv / eligiblePaxForPrivate);
        totalAdultActivitiesCost += perPax * adults;
        totalChildActivitiesCost += perPax * kidsAbove3;
      }
    });
  });

  totalActivitiesCost += totalGuideCost;
  const perHeadGuideShare = eligiblePaxForPrivate > 0 ? Math.round(totalGuideCost / eligiblePaxForPrivate) : 0;

  // 5. Total Base Quotation
  const finalQuotation = totalHotelsCost + totalVehicleCost + totalActivitiesCost;

  // 6. Per Adult Cost & Per Child Cost calculation
  const adultHotelShare = adults > 0 ? Math.round((totalHotelsCost - currentHotelChildNoBedCostTotal) / adults) : 0;
  const perAdultCost = Math.round(
    adultHotelShare +
    perHeadTransportCost +
    (adults > 0 ? Math.round(totalAdultActivitiesCost / adults) : 0) +
    perHeadGuideShare
  );

  const childHotelShare = kids > 0 ? Math.round((currentHotelExtraBedCostTotal + currentHotelChildNoBedCostTotal) / kids) : 0;
  const childTransportShare = kidsAbove5 > 0 ? perHeadTransportCost : 0;
  const childActivitiesShare = kids > 0 ? Math.round(totalChildActivitiesCost / kids) : 0;
  const perChildCost = kids > 0 ? Math.round(childHotelShare + childTransportShare + childActivitiesShare + perHeadGuideShare) : 0;

  return {
    roomsCount,
    baseRooms: roomDist.baseRooms,
    extraRoomsAdded: roomDist.extraRoomsAdded,
    extraBedCount: roomDist.extraBedCount,
    billableExtraBeds,
    childWithoutBedCount: roomDist.childWithoutBedCount,
    transportKidsCount: kidsAbove5,
    kidsAbove5Count: kidsAbove5,
    totalTransportPax,
    totalActivitiesCost,
    totalAdultActivitiesCost,
    totalChildActivitiesCost,
    totalGuideCost,
    perHeadGuideShare,
    totalVehicleCost,
    perHeadTransportCost,
    totalHotelsCost,
    currentHotelExtraBedCostTotal,
    currentHotelChildNoBedCostTotal,
    childHotelShare,
    finalQuotation,
    perAdultCost,
    perChildCost,
    hotelBreakdowns
  };
}

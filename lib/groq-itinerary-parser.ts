import {
  MEAL_PLAN_OPTIONS,
  PICKUP_DROP_OPTIONS,
  ROOM_TYPE_OPTIONS,
  SHARING_OPTIONS,
  STAR_RATING_OPTIONS,
  TRAVEL_STYLE_OPTIONS,
  VEHICLE_OPTIONS,
  type ParsedDayItinerary,
  type ParsedHotelItem,
  type ParsedItineraryData
} from './curate-form-options';

const GROQ_CHAT_COMPLETIONS_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL_CANDIDATES = [
  'openai/gpt-oss-120b',
  'qwen/qwen3.8-27b',
  'openai/gpt-oss-20b'
] as const;

const SYSTEM_PROMPT = `You are a precision travel itinerary structuring engine for Travel Tribes (India & International bespoke holidays).
Convert ANY raw itinerary text (WhatsApp messages, PDF copy-paste, emails, vendor quotes, or rough notes) into ONE strict JSON object matching the schema below.

CRITICAL EXTRACTION RULES:
1. NEVER skip, merge, or summarize away days. Extract EVERY single day in exact chronological order in the "days" array.
2. NEVER truncate sightseeing points and NEVER leave "sightseeings" empty. Extract EVERY landmark, sightseeing spot, viewpoint, monastery, waterfall, cafe, camp, trek, boarding point, overnight train/Volvo transit, check-in, and activity mentioned for each day into "sightseeings" as crisp, standalone bullet strings (NOT long paragraphs, NOT meal notes like "Breakfast included").
3. For each day:
   - "customTitle": Crisp heading WITHOUT "Day 1:" or "DAY 01 -" prefix (e.g. "Shimla ➔ Chitkul | Last Village of India").
   - "city": Morning origin / From City (clean city name only, e.g. "Shimla").
   - "city2": Night stay / To City (clean city name only, e.g. "Chitkul"; for final departure day, return city e.g. "Delhi" or "Mumbai").
   - "enRoutes": Array of specific intermediate en-route stops/halts along the transit (e.g. ["Khab Sangam", "Nako Lake"]). Empty [] if none.
   - "breakfast", "lunch", "dinner": Booleans reflecting meals included that day (if overall trip is MAP, breakfast applies Day 2+ and dinner on stay nights unless text specifies otherwise).
   - "guidedTour": true unless purely an unguided overnight bus/train transit.
   - "travelDistance": e.g. "240 km / 7 hrs" if mentioned, else "".
   - "activitiesText": Brief 1-line summary only if extra narrative exists outside sightseeings, else "".
4. Client fields ("firstName", "lastName", "clientPhone", "clientEmail", "departureCity", "adults", "kids", "sharingType", "travelStyle"):
   - ONLY fill these if EXPLICITLY mentioned in the pasted text. Otherwise set to null so existing operator entries are preserved!
5. "tripTitle": Attractive trip name WITHOUT repeating client name and WITHOUT trailing word "Itinerary" (e.g. "Spiti Valley Xmas & New Year Special").
6. "destination": Concise primary destination (e.g. "Spiti Valley", "Rajasthan (Jaipur, Jodhpur, Udaipur)").
7. "routeText": Clean circuit separated by " ➔ " (e.g. "Delhi ➔ Shimla ➔ Chitkul ➔ Kaza ➔ Kalpa ➔ Delhi").
8. "hotels": Extract stays/hotels if mentioned (hotel names, room types, ratings, nights per city). If city-wise nights or overnight stay cities are clear without hotel names, generate consecutive stay objects using "Handpicked 4-Star Boutique Stay (<City>)". Total hotel nights should align with trip nights.
9. "inclusions" & "exclusions": Extract explicit bullet lists if present in the text; otherwise return [] so Travel Tribes defaults remain intact.
10. Dates & Prices:
    - "startDate" & "endDate": "YYYY-MM-DD" ONLY if exact dates appear in text, else null.
    - "finalQuotationAmount", "perAdultPrice", "perKidPrice", "advanceAmountPaid": Pure digits string (e.g. "24999") ONLY if prices appear, else null.

REQUIRED JSON SHAPE:
{
  "firstName": string | null,
  "lastName": string | null,
  "clientPhone": string | null,
  "clientEmail": string | null,
  "departureCity": string | null,
  "adults": string | null,
  "kids": string | null,
  "sharingType": "Double Sharing" | "Triple Sharing" | "Quad Sharing" | "Single Occupancy" | "Family Suites" | null,
  "travelStyle": "Couple / Honeymoon Getaway" | "Family Vacation with Kids" | "Group of Friends / Adventure" | "Corporate Offsite / Incentive" | "Solo Custom Expedition" | null,
  "tripTitle": string,
  "subtitle": string,
  "destination": string,
  "startDate": string | null,
  "endDate": string | null,
  "duration": string,
  "travelDates": string | null,
  "vehicleType": string | null,
  "pickupDrop": string | null,
  "mealPlan": string | null,
  "routeText": string,
  "hotels": [
    {
      "city": string,
      "hotelName": string,
      "starRating": "5 Star Luxury" | "4 Star Deluxe" | "3 Star Comfort" | "Heritage Palace / Haveli" | "Boutique Resort" | "Luxury Homestay / Alpine Camps",
      "nights": string,
      "roomType": "Deluxe Room" | "Super Deluxe Room" | "Executive Lake View / Mountain View Room" | "Superior Luxury Suite" | "Cottage / Wooden Chalet" | "Luxury Swiss Alpine Tent"
    }
  ],
  "days": [
    {
      "dayNumber": number,
      "customTitle": string,
      "city": string,
      "city2": string,
      "enRoutes": string[],
      "breakfast": boolean,
      "lunch": boolean,
      "dinner": boolean,
      "guidedTour": boolean,
      "travelDistance": string,
      "sightseeings": string[],
      "activitiesText": string
    }
  ],
  "inclusions": string[],
  "exclusions": string[],
  "finalQuotationAmount": string | null,
  "perAdultPrice": string | null,
  "perKidPrice": string | null,
  "advanceAmountPaid": string | null,
  "specialRequirements": string | null
}`;

function cleanStr(val: unknown): string {
  return typeof val === 'string' ? val.trim() : val != null ? String(val).trim() : '';
}

function cleanNullableStr(val: unknown): string | null {
  const s = cleanStr(val);
  if (!s || s.toLowerCase() === 'null' || s.toLowerCase() === 'undefined' || s.toLowerCase() === 'n/a') {
    return null;
  }
  return s;
}

function cleanDigits(val: unknown): string | null {
  const s = cleanNullableStr(val);
  if (!s) return null;
  const digits = s.replace(/[^\d]/g, '');
  return digits ? digits : null;
}

function cleanIsoDate(val: unknown): string | null {
  const s = cleanNullableStr(val);
  if (!s) return null;
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
}

function cleanBullet(val: unknown): string {
  return cleanStr(val)
    .replace(/^[•\-\*▪▸►✓✗✔✘]\s*/, '')
    .replace(/^\d+[.)]\s*/, '')
    .trim();
}

function matchSelectOption(raw: string | null, options: string[]): string | null {
  if (!raw) return null;
  const lower = raw.toLowerCase();
  const exact = options.find(opt => opt.toLowerCase() === lower);
  if (exact) return exact;

  // Keyword fuzzy match against predefined dropdown options
  const matched = options.find(opt => {
    const tokens = opt.toLowerCase().split(/[\s\/()\-—]+/).filter(t => t.length >= 3);
    return tokens.some(tok => lower.includes(tok));
  });
  return matched || null;
}

function normalizeVehicle(raw: string | null): string | null {
  if (!raw) return null;
  const lower = raw.toLowerCase();
  if (lower.includes('innova')) return VEHICLE_OPTIONS[1];
  if (lower.includes('ertiga')) return VEHICLE_OPTIONS[2];
  if (lower.includes('17') && lower.includes('tempo')) return VEHICLE_OPTIONS[4];
  if (lower.includes('tempo')) return VEHICLE_OPTIONS[3];
  if (lower.includes('fortuner')) return VEHICLE_OPTIONS[5];
  if (lower.includes('dzire') || lower.includes('etios') || lower.includes('sedan')) return VEHICLE_OPTIONS[6];
  return matchSelectOption(raw, VEHICLE_OPTIONS) || raw;
}

function normalizeMealPlan(raw: string | null): string | null {
  if (!raw) return null;
  const lower = raw.toLowerCase();
  if (lower.includes('all meal') || lower.includes('ap plan') || (lower.includes('breakfast') && lower.includes('lunch') && lower.includes('dinner'))) {
    return MEAL_PLAN_OPTIONS[2];
  }
  if (lower.includes('map') || (lower.includes('breakfast') && lower.includes('dinner'))) {
    return MEAL_PLAN_OPTIONS[0];
  }
  if (lower.includes('cp') || (lower.includes('breakfast') && !lower.includes('dinner'))) {
    return MEAL_PLAN_OPTIONS[1];
  }
  if (lower.includes('ep') || lower.includes('room only') || lower.includes('no meal')) {
    return MEAL_PLAN_OPTIONS[3];
  }
  return raw;
}

function normalizeStarRating(raw: unknown): string {
  const s = cleanStr(raw);
  if (!s) return '4 Star Deluxe';
  const lower = s.toLowerCase();
  if (lower.includes('5')) return STAR_RATING_OPTIONS[0];
  if (lower.includes('4')) return STAR_RATING_OPTIONS[1];
  if (lower.includes('3')) return STAR_RATING_OPTIONS[2];
  if (lower.includes('heritage') || lower.includes('palace') || lower.includes('haveli')) return STAR_RATING_OPTIONS[3];
  if (lower.includes('boutique') || lower.includes('resort')) return STAR_RATING_OPTIONS[4];
  if (lower.includes('homestay') || lower.includes('camp') || lower.includes('tent')) return STAR_RATING_OPTIONS[5];
  return matchSelectOption(s, STAR_RATING_OPTIONS) || '4 Star Deluxe';
}

function normalizeRoomType(raw: unknown): string {
  const s = cleanStr(raw);
  if (!s) return 'Deluxe Room';
  const lower = s.toLowerCase();
  if (lower.includes('super deluxe')) return ROOM_TYPE_OPTIONS[1];
  if (lower.includes('executive') || lower.includes('view')) return ROOM_TYPE_OPTIONS[2];
  if (lower.includes('suite')) return ROOM_TYPE_OPTIONS[3];
  if (lower.includes('cottage') || lower.includes('chalet')) return ROOM_TYPE_OPTIONS[4];
  if (lower.includes('tent') || lower.includes('camp')) return ROOM_TYPE_OPTIONS[5];
  return matchSelectOption(s, ROOM_TYPE_OPTIONS) || 'Deluxe Room';
}

function synthesizeHotelsFromDays(days: ParsedDayItinerary[], destination: string): ParsedHotelItem[] {
  const stayDays = days.slice(0, Math.max(1, days.length - 1));
  const segments: { city: string; nights: number }[] = [];

  for (const day of stayDays) {
    const city = (day.city2 || day.city || destination || 'Destination').trim();
    const prev = segments[segments.length - 1];
    if (prev && prev.city.toLowerCase() === city.toLowerCase()) {
      prev.nights += 1;
    } else {
      segments.push({ city, nights: 1 });
    }
  }

  return segments.map(seg => ({
    city: seg.city,
    hotelName: `Handpicked 4-Star Boutique Stay (${seg.city})`,
    starRating: '4 Star Deluxe',
    nights: String(seg.nights),
    roomType: 'Deluxe Room'
  }));
}

export function normalizeParsedItinerary(raw: any): ParsedItineraryData {
  const destination = cleanStr(raw?.destination) || 'Custom Tour';
  const rawTitle = cleanStr(raw?.tripTitle)
    .replace(/\bitinerary\s*$/i, '')
    .trim();
  const tripTitle = rawTitle || `${destination} Bespoke Escape`;

  const rawDays = Array.isArray(raw?.days) ? raw.days : [];
  const days: ParsedDayItinerary[] = rawDays.map((d: any, idx: number) => {
    const cleanedSights = (Array.isArray(d?.sightseeings) ? d.sightseeings : [])
      .map(cleanBullet)
      .filter((s: string) => s.length > 0 && !/^meals?\s*:/i.test(s));

    const enRoutes = (Array.isArray(d?.enRoutes) ? d.enRoutes : [])
      .map(cleanBullet)
      .filter(Boolean);

    const customTitle = cleanStr(d?.customTitle)
      .replace(/^day\s*\d+\s*[:\-–—|.]*\s*/i, '')
      .trim();

    const activitiesText = cleanStr(d?.activitiesText);
    const fallbackSight = activitiesText ? [activitiesText] : ['Sightseeing & leisure exploration'];

    return {
      dayNumber: idx + 1,
      customTitle,
      city: cleanStr(d?.city) || (idx === 0 ? destination : ''),
      city2: cleanStr(d?.city2) || destination,
      enRoutes,
      breakfast: typeof d?.breakfast === 'boolean' ? d.breakfast : idx > 0,
      lunch: typeof d?.lunch === 'boolean' ? d.lunch : false,
      dinner: typeof d?.dinner === 'boolean' ? d.dinner : idx < rawDays.length - 1,
      guidedTour: typeof d?.guidedTour === 'boolean' ? d.guidedTour : true,
      travelDistance: cleanStr(d?.travelDistance),
      sightseeings: cleanedSights.length > 0 ? cleanedSights : fallbackSight,
      activitiesText
    };
  });

  if (days.length === 0) {
    days.push({
      dayNumber: 1,
      customTitle: `Arrival in ${destination}`,
      city: destination,
      city2: destination,
      enRoutes: [],
      breakfast: false,
      lunch: false,
      dinner: true,
      guidedTour: true,
      travelDistance: '',
      sightseeings: ['Arrival, hotel check-in & local leisure exploration'],
      activitiesText: ''
    });
  }

  const rawHotels = Array.isArray(raw?.hotels) ? raw.hotels : [];
  let hotels: ParsedHotelItem[] = rawHotels
    .map((h: any) => {
      const city = cleanStr(h?.city) || destination;
      const nightsNum = Math.max(1, parseInt(String(h?.nights || '1').replace(/\D/g, ''), 10) || 1);
      return {
        city,
        hotelName: cleanStr(h?.hotelName) || `Handpicked 4-Star Boutique Stay (${city})`,
        starRating: normalizeStarRating(h?.starRating),
        nights: String(nightsNum),
        roomType: normalizeRoomType(h?.roomType)
      };
    })
    .filter((h: ParsedHotelItem) => Boolean(h.city || h.hotelName));

  if (hotels.length === 0 && days.length > 1) {
    hotels = synthesizeHotelsFromDays(days, destination);
  }

  // Derive route circuit fallback from day cities when omitted
  let routeText = cleanStr(raw?.routeText)
    .replace(/Day\s*\d+\s*[:\-➔→]?\s*/gi, '')
    .replace(/\s*(?:->|→)\s*/g, ' ➔ ')
    .trim();

  if (!routeText) {
    const cities: string[] = [];
    days.forEach(d => {
      if (d.city && cities[cities.length - 1]?.toLowerCase() !== d.city.toLowerCase()) cities.push(d.city);
      if (d.city2 && cities[cities.length - 1]?.toLowerCase() !== d.city2.toLowerCase()) cities.push(d.city2);
    });
    routeText = cities.join(' ➔ ') || destination;
  }

  const numDays = days.length;
  const numNights = Math.max(0, numDays - 1);
  const duration = cleanStr(raw?.duration) || `${numDays} Day${numDays > 1 ? 's' : ''} / ${numNights} Night${numNights !== 1 ? 's' : ''}`;

  const adultsStr = cleanDigits(raw?.adults);
  const adultsCount = adultsStr ? Math.max(1, parseInt(adultsStr, 10)) : null;
  const perAdultPrice = cleanDigits(raw?.perAdultPrice);
  let finalQuotationAmount = cleanDigits(raw?.finalQuotationAmount);
  if (!finalQuotationAmount && perAdultPrice) {
    finalQuotationAmount = String(parseInt(perAdultPrice, 10) * (adultsCount || 2));
  }

  const inclusions = (Array.isArray(raw?.inclusions) ? raw.inclusions : [])
    .map(cleanBullet)
    .filter(Boolean);
  const exclusions = (Array.isArray(raw?.exclusions) ? raw.exclusions : [])
    .map(cleanBullet)
    .filter(Boolean);

  const rawSubtitle = cleanStr(raw?.subtitle);
  const subtitle =
    rawSubtitle && rawSubtitle.toLowerCase() !== tripTitle.toLowerCase()
      ? rawSubtitle
      : 'PRIVATE BESPOKE EXPERIENCE';

  return {
    firstName: cleanNullableStr(raw?.firstName),
    lastName: cleanNullableStr(raw?.lastName),
    clientPhone: cleanNullableStr(raw?.clientPhone),
    clientEmail: cleanNullableStr(raw?.clientEmail),
    departureCity: cleanNullableStr(raw?.departureCity),
    adults: adultsStr,
    kids: cleanDigits(raw?.kids),
    sharingType: matchSelectOption(cleanNullableStr(raw?.sharingType), SHARING_OPTIONS),
    travelStyle: matchSelectOption(cleanNullableStr(raw?.travelStyle), TRAVEL_STYLE_OPTIONS),
    tripTitle,
    subtitle,
    destination,
    startDate: cleanIsoDate(raw?.startDate),
    endDate: cleanIsoDate(raw?.endDate),
    duration,
    travelDates: cleanNullableStr(raw?.travelDates),
    vehicleType: normalizeVehicle(cleanNullableStr(raw?.vehicleType)),
    pickupDrop: matchSelectOption(cleanNullableStr(raw?.pickupDrop), PICKUP_DROP_OPTIONS) || cleanNullableStr(raw?.pickupDrop),
    mealPlan: normalizeMealPlan(cleanNullableStr(raw?.mealPlan)),
    routeText,
    hotels,
    days,
    inclusions,
    exclusions,
    finalQuotationAmount,
    perAdultPrice,
    perKidPrice: cleanDigits(raw?.perKidPrice),
    advanceAmountPaid: cleanDigits(raw?.advanceAmountPaid),
    specialRequirements: cleanNullableStr(raw?.specialRequirements)
  };
}

async function callGroqModel(apiKey: string, model: string, rawText: string) {
  const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      max_tokens: 10000,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Parse the following raw itinerary text into the structured JSON object:\n\n"""\n${rawText}\n"""`
        }
      ]
    }),
    signal: AbortSignal.timeout(45000)
  });

  if (!response.ok) {
    const errPayload = await response.json().catch(() => null);
    const apiMsg = errPayload?.error?.message || `Groq API HTTP ${response.status}`;
    const err: any = new Error(apiMsg);
    err.status = response.status;
    throw err;
  }

  const data = await response.json();
  const content: string = data?.choices?.[0]?.message?.content || '';
  if (!content.trim()) {
    throw new Error('Groq returned an empty response. Please try again.');
  }

  const stripped = content
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  return JSON.parse(stripped);
}

export async function parseItineraryWithGroq(rawText: string, apiKey: string): Promise<{
  parsed: ParsedItineraryData;
  model: string;
  durationMs: number;
}> {
  const startedAt = Date.now();
  let lastError: any = null;

  for (const candidateModel of MODEL_CANDIDATES) {
    try {
      const jsonResult = await callGroqModel(apiKey, candidateModel, rawText);
      return {
        parsed: normalizeParsedItinerary(jsonResult),
        model: candidateModel,
        durationMs: Date.now() - startedAt
      };
    } catch (err: any) {
      lastError = err;
      // Immediately abort on authentication failure; advance fallback chain on model/rate/transient errors
      if (err?.status === 401 || err?.status === 403) {
        throw err;
      }
      const isRetryableWithNextModel =
        err?.status === 404 ||
        err?.status === 429 ||
        err?.status === 503 ||
        err?.status === 400 ||
        err?.name === 'TimeoutError';
      if (!isRetryableWithNextModel) {
        throw err;
      }
    }
  }

  throw lastError || new Error('All configured Groq models failed to parse itinerary.');
}


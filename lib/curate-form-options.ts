export const DEFAULT_INCLUSIONS = [
  'Accommodation in verified, handpicked hotels / boutique stays on selected occupancy',
  'Dedicated private AC vehicle with experienced chauffeur for all transfers & sightseeing as per itinerary',
  'Daily hearty breakfast & dinner included (MAP Meal Plan)',
  'Driver night allowance, fuel charges, interstate taxes, toll taxes and parking fees included',
  'Sightseeing & inter-city transfers strictly as per the curated day-by-day itinerary',
  '24/7 dedicated on-ground concierge support and trip coordination by Travel Tribes'
];

export const DEFAULT_EXCLUSIONS = [
  '5% GST as applicable on government travel and holiday services',
  'Airfare or train tickets to/from the arrival and departure city (unless specified)',
  'Monument entrance fees, camera tickets, boating & optional adventure activity charges',
  'Lunch, highway refreshments, alcoholic beverages and personal mineral water',
  'Personal expenses such as laundry, room heater charges, phone calls and tips',
  'Any cost arising due to unforeseen natural calamities, landslides, roadblocks or flight/train delays'
];

export const VEHICLE_OPTIONS = [
  'Private Dedicated AC Vehicle (Innova Crysta / Ertiga / Similar)',
  'Innova Crysta AC (6+1 Seater Luxury MPV)',
  'Maruti Ertiga AC (4+1 Seater MPV)',
  'Tempo Traveller AC (12-Seater Luxury)',
  'Tempo Traveller AC (17-Seater Luxury)',
  'Toyota Fortuner 4x4 Luxury SUV',
  'Sedan AC (Dzire / Etios)',
  'Dedicated Mountain Tempo Traveller & 3AC Train'
];

export const MEAL_PLAN_OPTIONS = [
  'Breakfast & Dinner Included (MAP Plan)',
  'Daily Breakfast Included (CP Plan)',
  'All Meals Included — Breakfast, Lunch & Dinner (AP Plan)',
  'Room Only — No Meals Included (EP Plan)'
];

export const PICKUP_DROP_OPTIONS = [
  'Airport & Railway Station Pickup & Drop Included',
  'Ex-Guwahati Airport / Railway Station',
  'Ex-Delhi Airport / Railway Station',
  'Ex-Mumbai Airport / Railway Station',
  'Ex-Jaipur Airport / Railway Station',
  'Ex-Kochi Airport / Ernakulam Railway Station',
  'Ex-Srinagar Airport',
  'Ex-Denpasar Airport (Bali)'
];

export const SHARING_OPTIONS = [
  'Double Sharing',
  'Triple Sharing',
  'Quad Sharing',
  'Single Occupancy',
  'Family Suites'
];

export const TRAVEL_STYLE_OPTIONS = [
  'Couple / Honeymoon Getaway',
  'Family Vacation with Kids',
  'Group of Friends / Adventure',
  'Corporate Offsite / Incentive',
  'Solo Custom Expedition'
];

export const STAR_RATING_OPTIONS = [
  '5 Star Luxury',
  '4 Star Deluxe',
  '3 Star Comfort',
  'Heritage Palace / Haveli',
  'Boutique Resort',
  'Luxury Homestay / Alpine Camps'
];

export const ROOM_TYPE_OPTIONS = [
  'Deluxe Room',
  'Super Deluxe Room',
  'Executive Lake View / Mountain View Room',
  'Superior Luxury Suite',
  'Cottage / Wooden Chalet',
  'Luxury Swiss Alpine Tent'
];

export interface ParsedDayItinerary {
  dayNumber: number;
  customTitle: string;
  city: string;
  city2: string;
  enRoutes: string[];
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  guidedTour: boolean;
  travelDistance: string;
  sightseeings: string[];
  activitiesText: string;
}

export interface ParsedHotelItem {
  city: string;
  hotelName: string;
  starRating: string;
  nights: string;
  roomType: string;
}

export interface ParsedItineraryData {
  firstName: string | null;
  lastName: string | null;
  clientPhone: string | null;
  clientEmail: string | null;
  departureCity: string | null;
  adults: string | null;
  kids: string | null;
  sharingType: string | null;
  travelStyle: string | null;
  tripTitle: string;
  subtitle: string;
  destination: string;
  startDate: string | null;
  endDate: string | null;
  duration: string;
  travelDates: string | null;
  vehicleType: string | null;
  pickupDrop: string | null;
  mealPlan: string | null;
  routeText: string;
  hotels: ParsedHotelItem[];
  days: ParsedDayItinerary[];
  inclusions: string[];
  exclusions: string[];
  finalQuotationAmount: string | null;
  perAdultPrice: string | null;
  perKidPrice: string | null;
  advanceAmountPaid: string | null;
  specialRequirements: string | null;
}


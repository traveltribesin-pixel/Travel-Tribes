/**
 * Thrivia CRM & Event Embed Configuration
 * 
 * Public API Key for website embeds: pk_live_322b3dc5889c6618df5aa17899d64049
 */

export const THRIVIA_PUBLIC_KEY = 'pk_live_322b3dc5889c6618df5aa17899d64049'

/**
 * Mapping of each Trip Slug -> its own unique Thrivia Event ID.
 * 
 * When a trip has a valid Thrivia Event ID mapped here:
 * The original Travel Tribes "Book Now →" button automatically triggers
 * Thrivia's 1-click checkout overlay while maintaining 100% of our original design!
 */
export const TRIP_THRIVIA_EVENTS: Record<string, string> = {
  // ==========================================
  // 1. INTERNATIONAL TRIPS
  // ==========================================
  // Bali with Gili (8N/9D)
  'bali-gili-islands': '6af34e899b85caba6f0ec468',
  'bali-gili-islands-xmas-new-year': '6af34e899b85caba6f0ec468',

  // Sri Lanka - Xmas & New Year Special (7N/8D)
  'sri-lanka-island-escape': '6af34a069b85caba6f0e927a',
  'sri-lanka-island-escape-xmas-new-year': '6af34a069b85caba6f0e927a',

  // Bhutan - Land of the Thunder Dragon (6N/7D) / Bagdogra
  'bhutan-backpacking': '6ad31a32a4173ffeb1395dd8',
  'bhutan-tshechu-festival': '6af3428d9b85caba6f0e204d',

  // Thailand Full Moon Party - New Year Special
  'thailand-full-moon-party-new-year-special': '6af3154c9b85caba6f0b8d68',

  // Vietnam Backpacking — 7N/8D
  'vietnam-classic': '6adf1c65093de04ff7d5c9ef',
  'vietnam-phu-quoc': '6adf1c65093de04ff7d5c9ef',
  'vietnam-sapa': '6adf1c65093de04ff7d5c9ef',

  // ==========================================
  // 2. DOMESTIC & XMAS / NEW YEAR SPECIALS
  // ==========================================
  // Spiti Valley Winter Expedition (from Delhi)
  'spiti-winter-expedition': '6af3319a9b85caba6f0d1760',
  'spiti-winter-expedition-xmas-new-year': '6af3319a9b85caba6f0d1760',

  // Spiti Valley Xmas & NY Special (From Mumbai)
  'spiti-valley-xmas-new-year-mumbai': '6ae0aab2093de04ff7e0ce56',

  // Meghalaya Backpacking - Xmas & New Year Special
  'meghalaya-backpacking': '6af32a9d9b85caba6f0c801b',
  'meghalaya-backpacking-xmas-new-year': '6af32a9d9b85caba6f0c801b',

  // Meghalaya with Kaziranga - Xmas & New Year Special (6N/7D)
  'meghalaya-with-kaziranga': '6af32d249b85caba6f0cc36d',
  'meghalaya-with-kaziranga-xmas-new-year': '6af32d249b85caba6f0cc36d',

  // Coorg Backpacking - Xmas & New Year Special (4N/5D)
  'coorg-backpacking': '6af32e5a9b85caba6f0cd0f5',
  'coorg-backpacking-xmas-new-year': '6af32e5a9b85caba6f0cd0f5',

  // Coorg and Mysore New Year Trip from Mumbai
  'coorg-mysore-new-year': '6ad31a32a4173ffeb1395cf6',

  // Gokarna Christmas and New Year Trip from Mumbai / Backpacking
  'gokarna-backpacking': '6ad31a32a4173ffeb1395d69',
  'gokarna-xmas-new-year': '6ad31a32a4173ffeb1395d69',

  // Udaipur Christmas and New Year Trip from Mumbai / Backpacking
  'udaipur-backpacking': '6ad31a31a4173ffeb1395b32',
  'udaipur-xmas-new-year': '6ad31a31a4173ffeb1395b32',

  // Himachal New Year Special
  'himachal-new-year-special': '6af313529b85caba6f0b8045',

  // Rajasthan New Year Special
  'rajasthan-new-year-special': '6af2d9379b85caba6f08ada8',

  // Hampi Backpacking & Jawai Safari
  'hampi-backpacking': '',
  'jawai-leopard-safari': '',
  'spiti-valley-chandrataal': '',

  // ==========================================
  // 3. WEEKEND GETAWAYS & CAMPING
  // ==========================================
  // Alibaug Private Beach Camping
  'alibaug-private-beach-camping': '6ae065f1093de04ff7ddf008',

  // Bhandardara Fireflies / Lakeside Camping
  'bhandardara-lakeside-camping': '6ad31a33a4173ffeb139614d',

  // Other weekend trips
  'stargazing-and-camping-in-sandhan-valley': '',
  'konkan-coastal-roadtrip': '',
}

/**
 * Resolve the specific Thrivia event ID for any trip slug.
 * Returns null if the trip doesn't have a Thrivia Event ID configured yet.
 */
export function getThriviaEventId(slug?: string): string | null {
  if (!slug) return null
  const id = TRIP_THRIVIA_EVENTS[slug]?.trim()
  return id && id.length > 0 ? id : null
}

/**
 * Returns the direct link to a Thrivia event page.
 */
export function getThriviaEventUrl(eventId: string): string {
  return `https://www.thrivia.io/e/${eventId}`
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { PageFrame } from '@/components/site-shell'
import { FileText, Mail, Phone, MapPin, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Travel Tribes',
  description: 'Terms & Conditions of Travel Tribes (Operated by Tribeify Experience LLP). Read our terms governing your access to and use of our website and travel services.',
  openGraph: {
    title: 'Terms & Conditions | Travel Tribes',
    description: 'Terms & Conditions of Travel Tribes (Operated by Tribeify Experience LLP).',
    images: ['/image/Logowithbg.png']
  }
}

export default function TermsPage() {
  const sections = [
    { id: 'services', num: '1', title: 'Our Services' },
    { id: 'eligibility', num: '2', title: 'Eligibility and Booking' },
    { id: 'pricing', num: '3', title: 'Pricing and Payments' },
    { id: 'inclusions', num: '4', title: 'Trip Inclusions and Exclusions' },
    { id: 'group-trips', num: '5', title: 'Group Trips and Community Travel' },
    { id: 'custom-trips', num: '6', title: 'Private and Customised Trips' },
    { id: 'special-bookings', num: '7', title: 'Honeymoon, Corporate and Special Group Bookings' },
    { id: 'changes-itineraries', num: '8', title: 'Changes to Itineraries and Travel Arrangements' },
    { id: 'cancellation', num: '9', title: 'Cancellation, Refunds and Rescheduling' },
    { id: 'responsibilities', num: '10', title: 'Traveller Responsibilities' },
    { id: 'documents', num: '11', title: 'Passports, Visas and Travel Documents' },
    { id: 'health-safety', num: '12', title: 'Health, Fitness and Safety' },
    { id: 'insurance', num: '13', title: 'Travel Insurance' },
    { id: 'third-party', num: '14', title: 'Third-Party Service Providers' },
    { id: 'conduct', num: '15', title: 'Traveller Conduct and Right to Refuse Participation' },
    { id: 'belongings', num: '16', title: 'Personal Belongings and Property' },
    { id: 'promotional-media', num: '17', title: 'Photography, Videos and Promotional Content' },
    { id: 'intellectual-property', num: '18', title: 'Intellectual Property' },
    { id: 'website-use', num: '19', title: 'Website Use and Accuracy of Information' },
    { id: 'liability', num: '20', title: 'Limitation of Liability' },
    { id: 'force-majeure', num: '21', title: 'Force Majeure' },
    { id: 'privacy', num: '22', title: 'Privacy and Personal Information' },
    { id: 'support', num: '23', title: 'Complaints and Customer Support' },
    { id: 'disputes', num: '24', title: 'Governing Law and Disputes' },
    { id: 'terms-changes', num: '25', title: 'Changes to These Terms' },
    { id: 'contact', num: '26', title: 'Contact Information' },
  ]

  return (
    <PageFrame>
      <main className="bg-slate-50 min-h-screen text-slate-800">
        {/* HERO SECTION */}
        <section
          className="pt-14 pb-16 lg:pt-20 lg:pb-20 bg-gradient-to-b from-[var(--sky-pale)] via-white to-slate-50 border-b border-slate-200"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest bg-white border border-[var(--sky)]/20 px-4 py-1.5 rounded-full mb-4 shadow-xs">
              <FileText size={14} className="text-[var(--sky)]" />
              <span>TERMS OF SERVICE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--navy)] tracking-tight leading-tight uppercase mb-3">
              Terms &amp; Conditions
            </h1>

            <p className="text-base sm:text-lg text-[var(--navy)] font-bold mb-4">
              Travel Tribes | Operated by Tribeify Experience LLP
            </p>

            <div className="inline-block text-xs font-semibold text-slate-600 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              Last Updated: <span className="text-[var(--navy)] font-bold">19 October 2026</span>
            </div>
          </div>
        </section>

        {/* CONTENT LAYOUT */}
        <section
          className="py-12 lg:py-16"
          style={{
            paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
            paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
          }}
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* SIDEBAR NAVIGATION (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <h2 className="text-xs font-extrabold text-[var(--navy)] uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                Contents
              </h2>
              <nav className="space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-slate-600 hover:text-[var(--navy)] hover:bg-[var(--sky-pale)]/50 transition-colors"
                  >
                    <span className="font-bold text-[var(--sky)] w-6 shrink-0">{sec.num}.</span>
                    <span className="truncate">{sec.title}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/privacy-policy"
                  className="text-xs font-bold text-[var(--sky)] hover:underline flex items-center gap-1.5"
                >
                  View Privacy Policy →
                </Link>
              </div>
            </aside>

            {/* MAIN TERMS CONTENT */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-10">
              
              {/* INTRODUCTORY PARAGRAPHS */}
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed border-b border-slate-100 pb-8">
                <p>
                  Welcome to Travel Tribes. These Terms &amp; Conditions govern your access to and use of our website, <a href="https://traveltribes.in" className="text-[var(--sky)] underline hover:text-[var(--navy)]" target="_blank" rel="noopener noreferrer">https://traveltribes.in</a>, and the travel services offered under the Travel Tribes brand.
                </p>
                <p>
                  Travel Tribes is operated by Tribeify Experience LLP, a travel business based in Mumbai, Maharashtra, India.
                </p>
                <p>
                  By accessing our website, submitting an enquiry, making a booking or participating in a trip organised or facilitated by us, you agree to these Terms &amp; Conditions and any trip-specific terms, itinerary details and cancellation policy communicated to you before booking.
                </p>
                <p className="font-medium text-slate-800">
                  Please read these terms carefully before confirming your booking.
                </p>
              </div>

              {/* 1. Our Services */}
              <section id="services" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  1. Our Services
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Travel Tribes offers travel-related services that may include:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-slate-700 pl-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Group trips and community travel experiences.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Weekend getaways, treks and camping trips.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Domestic and international holidays.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Customised and private trips.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Honeymoon packages.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Corporate trips, offsites and team experiences.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>College trips, group travel and related arrangements.</span>
                  </li>
                </ul>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                  <p>
                    The exact services, inclusions, exclusions, itinerary, price and applicable conditions may vary for each trip.
                  </p>
                  <p>
                    Some travel arrangements may be provided directly by Travel Tribes, while others may be delivered by independent third-party suppliers.
                  </p>
                </div>
              </section>

              {/* 2. Eligibility and Booking */}
              <section id="eligibility" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  2. Eligibility and Booking
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  To make a booking, you must provide accurate, complete and up-to-date information.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  By making a booking, you confirm that:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-slate-700 pl-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>You are legally capable of entering into a binding agreement.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>The personal and travel information you provide is accurate.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>You have reviewed the trip details, inclusions, exclusions, price and applicable cancellation policy.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>You understand and accept the conditions communicated for your selected trip.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>You are authorised to make bookings and provide information for any accompanying travellers included in your reservation.</span>
                  </li>
                </ul>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                  <p>
                    Bookings for minors must be made by a parent or lawful guardian, subject to the requirements of the particular trip.
                  </p>
                  <p>
                    A booking is considered confirmed only after the applicable payment and confirmation requirements communicated by Travel Tribes have been fulfilled and a booking confirmation has been issued.
                  </p>
                  <p>
                    Submitting an enquiry or making an initial payment does not automatically guarantee a booking unless confirmation has been provided.
                  </p>
                </div>
              </section>

              {/* 3. Pricing and Payments */}
              <section id="pricing" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  3. Pricing and Payments
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    All trip prices, payment schedules and applicable charges will be communicated through the relevant trip page, quotation, brochure or booking communication.
                  </p>
                  <p>
                    Unless expressly stated otherwise, prices are subject to the inclusions and exclusions specified for the particular trip.
                  </p>
                  <p>
                    You agree to pay the booking amount, instalments, balance payment and applicable taxes or other disclosed charges within the communicated deadlines.
                  </p>
                  <p>
                    Travel Tribes reserves the right to correct genuine pricing or listing errors before a booking is confirmed. If a material pricing error affects a confirmed booking, we will communicate with you to resolve the matter appropriately.
                  </p>
                  <p>
                    Failure to make a payment by the specified deadline may result in cancellation of the booking, subject to the applicable booking and cancellation terms.
                  </p>
                  <p>
                    Additional expenses not expressly included in the package price will be the traveller's responsibility.
                  </p>
                </div>
              </section>

              {/* 4. Trip Inclusions and Exclusions */}
              <section id="inclusions" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  4. Trip Inclusions and Exclusions
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Every trip has its own inclusions and exclusions. These may cover accommodation, transportation, meals, activities, permits, guides, transfers and other services.
                  </p>
                  <p>
                    Travellers are responsible for reviewing the itinerary and package details before making a booking.
                  </p>
                  <p>
                    Unless expressly included in writing, the following may be excluded:
                  </p>
                </div>
                <ul className="space-y-2 text-sm sm:text-base text-slate-700 pl-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Personal expenses and shopping.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Meals and beverages not specified in the itinerary.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Optional activities and experiences.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Travel insurance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Visa fees and passport-related expenses.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Additional transportation or accommodation arising from personal changes or missed departures.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Expenses caused by delays, disruptions or circumstances outside the agreed package.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Any other item specifically identified as excluded in the trip details.</span>
                  </li>
                </ul>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                  Only inclusions expressly stated in the applicable trip information or confirmed in writing form part of the package.
                </p>
              </section>

              {/* 5. Group Trips and Community Travel */}
              <section id="group-trips" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  5. Group Trips and Community Travel
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Travel Tribes group trips are designed to bring travellers together through shared travel experiences.
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  When you book a group trip, you acknowledge that:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-slate-700 pl-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>You may be travelling with individuals you have not met before.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Accommodation, transportation, activities and other facilities may be shared, as specified in the package.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>The itinerary and activities are planned for the group as a whole.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>You are expected to respect fellow travellers, local communities, trip leaders and service providers.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Individual preferences may not always be accommodated where they conflict with the confirmed group itinerary or operational requirements.</span>
                  </li>
                </ul>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                  <p>
                    The group size, age guidance, room-sharing arrangements and other trip-specific details will be communicated wherever applicable.
                  </p>
                  <p>
                    Travel Tribes may take reasonable steps to address disruptive behaviour that affects the safety, comfort or experience of other participants.
                  </p>
                </div>
              </section>

              {/* 6. Private and Customised Trips */}
              <section id="custom-trips" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  6. Private and Customised Trips
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Private and customised trips are planned according to the requirements communicated by the customer and the arrangements confirmed in writing.
                  </p>
                  <p>
                    The final itinerary, accommodation, transportation, activities, price and payment schedule will depend on availability, destination conditions and the agreed scope of services.
                  </p>
                  <p>
                    Requests to change a confirmed itinerary may result in additional charges, revised availability or changes to the travel schedule.
                  </p>
                  <p>
                    A customised itinerary or quotation does not guarantee availability until the relevant arrangements have been confirmed.
                  </p>
                </div>
              </section>

              {/* 7. Honeymoon, Corporate and Special Group Bookings */}
              <section id="special-bookings" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  7. Honeymoon, Corporate and Special Group Bookings
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Honeymoon packages, corporate offsites, college trips, private group bookings and special events may be subject to separate proposals, quotations or agreements.
                  </p>
                  <p>
                    The specific payment terms, cancellation conditions, minimum group sizes, inclusions and other arrangements communicated for the booking will apply.
                  </p>
                  <p>
                    Where a separate written agreement is issued and accepted, its applicable provisions will be read together with these Terms &amp; Conditions. In the event of a conflict, the specific written agreement will prevail for the matter it expressly addresses, subject to applicable law.
                  </p>
                </div>
              </section>

              {/* 8. Changes to Itineraries and Travel Arrangements */}
              <section id="changes-itineraries" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  8. Changes to Itineraries and Travel Arrangements
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Travel involves factors that may be outside our control, including weather, road conditions, transportation schedules, accommodation availability, local restrictions, safety considerations and operational disruptions.
                  </p>
                  <p>
                    Travel Tribes may make reasonable changes to an itinerary, accommodation, transport arrangements, activity schedules or departure plans when necessary for operational, availability or safety reasons.
                  </p>
                  <p>
                    Where reasonably practicable, we will inform affected travellers of material changes.
                  </p>
                  <p>
                    We will endeavour to provide suitable alternatives where feasible. Any refunds, adjustments or other remedies will depend on the applicable booking terms, the services affected and applicable law.
                  </p>
                  <p>
                    Travellers should follow the instructions of authorised trip leaders and local service providers when changes are necessary for safety or operational reasons.
                  </p>
                </div>
              </section>

              {/* 9. Cancellation, Refunds and Rescheduling */}
              <section id="cancellation" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  9. Cancellation, Refunds and Rescheduling
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Cancellation and refund terms may vary by trip, supplier, destination, departure date and booking type.
                  </p>
                  <p>
                    The cancellation policy communicated for your specific trip at the time of booking will apply.
                  </p>
                  <p>
                    Before making a payment, please review the applicable cancellation policy and any stated deadlines or non-refundable components.
                  </p>
                  <p>
                    Depending on the applicable policy:
                  </p>
                </div>
                <ul className="space-y-2 text-sm sm:text-base text-slate-700 pl-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Cancellation charges may apply when a traveller cancels a confirmed booking.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Certain payments or supplier costs may be non-refundable.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Refund eligibility may depend on the timing and circumstances of cancellation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Rescheduling or transferring a booking may be subject to availability, supplier approval and additional charges.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Refund processing times may depend on the payment method and relevant service providers.</span>
                  </li>
                </ul>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                  <p>
                    If Travel Tribes cancels a trip, we will communicate the available options in accordance with the applicable trip terms and law.
                  </p>
                  <p>
                    Where a trip is affected by a force majeure event or circumstances beyond reasonable control, the available remedies will depend on the services affected, supplier terms, applicable law and the circumstances of the disruption.
                  </p>
                  <p>
                    No refund or deduction should be assumed unless it is provided for in the applicable policy or otherwise required by law.
                  </p>
                </div>
              </section>

              {/* 10. Traveller Responsibilities */}
              <section id="responsibilities" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  10. Traveller Responsibilities
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Travellers are responsible for:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-slate-700 pl-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Providing accurate personal, contact and travel information.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Carrying valid identification and required travel documents.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Obtaining passports, visas, permits and other entry documents where applicable.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Arriving at the designated meeting point at the specified time.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Following the confirmed itinerary and reasonable instructions provided for the trip.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Respecting fellow travellers, local communities, cultural practices and the environment.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Following safety instructions and applicable local laws.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Informing Travel Tribes of relevant dietary, accessibility or safety requirements in advance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Taking reasonable care of personal belongings and valuables.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Paying any personal expenses or additional charges not included in the package.</span>
                  </li>
                </ul>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                  Travellers may be responsible for additional costs arising from inaccurate information, missed departures, failure to carry required documents or personal changes to the itinerary, subject to applicable law and the confirmed booking terms.
                </p>
              </section>

              {/* 11. Passports, Visas and Travel Documents */}
              <section id="documents" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  11. Passports, Visas and Travel Documents
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Travellers are responsible for ensuring that they possess valid passports, visas, permits, identification and other documents required for their journey.
                  </p>
                  <p>
                    For international travel, travellers should verify entry requirements, passport validity, visa conditions, transit requirements and any applicable health or immigration rules before departure.
                  </p>
                  <p>
                    Travel Tribes may share general information or facilitate visa-related assistance where offered, but final approval of visas and entry permission rests with the relevant authorities.
                  </p>
                  <p>
                    We cannot guarantee visa approval or entry into any country.
                  </p>
                  <p>
                    Any loss, cancellation or additional expense arising from missing, invalid or rejected travel documents will be handled in accordance with the applicable booking terms and law.
                  </p>
                </div>
              </section>

              {/* 12. Health, Fitness and Safety */}
              <section id="health-safety" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  12. Health, Fitness and Safety
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Certain trips may involve physical exertion, trekking, camping, high-altitude travel, adventure activities, remote destinations or other inherent risks.
                  </p>
                  <p>
                    Travellers should assess their fitness and suitability for the selected trip before booking and disclose relevant safety requirements where requested.
                  </p>
                  <p>
                    You agree to follow applicable safety instructions, activity rules and reasonable directions from trip leaders and service providers.
                  </p>
                  <p>
                    If an activity is unsuitable or unsafe for a traveller under the circumstances, participation may be restricted where reasonably necessary for safety.
                  </p>
                  <p>
                    Travel Tribes may assist with emergency coordination where practicable, but travellers should maintain appropriate personal preparedness and emergency contacts.
                  </p>
                  <p>
                    We strongly recommend that travellers consider suitable travel insurance, particularly for international travel, adventure activities and trips involving significant transport or medical risks.
                  </p>
                </div>
              </section>

              {/* 13. Travel Insurance */}
              <section id="insurance" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  13. Travel Insurance
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Unless expressly included in the confirmed package, travel insurance is the traveller's responsibility.
                  </p>
                  <p>
                    Travellers are encouraged to review insurance coverage for medical expenses, emergency evacuation, trip cancellation, baggage loss, travel delays and adventure activities where relevant.
                  </p>
                  <p>
                    Travel Tribes does not guarantee that any particular insurance policy will cover a specific event, claim or activity.
                  </p>
                  <p>
                    Any insurance arranged through a third-party provider will be subject to that provider's terms, conditions and eligibility requirements.
                  </p>
                </div>
              </section>

              {/* 14. Third-Party Service Providers */}
              <section id="third-party" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  14. Third-Party Service Providers
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Certain elements of a trip may be delivered by independent third parties, including hotels, airlines, transport operators, local guides, activity providers and destination management companies.
                  </p>
                  <p>
                    Their services may be subject to separate terms, operating conditions and safety requirements.
                  </p>
                  <p>
                    Travel Tribes will make reasonable efforts to coordinate the services included in your confirmed booking. However, we cannot guarantee that an independent provider will never experience delays, service interruptions, operational issues or other circumstances beyond our reasonable control.
                  </p>
                  <p>
                    Nothing in these terms excludes or limits any responsibility that cannot legally be excluded or limited.
                  </p>
                </div>
              </section>

              {/* 15. Traveller Conduct and Right to Refuse Participation */}
              <section id="conduct" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  15. Traveller Conduct and Right to Refuse Participation
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    All travellers are expected to behave responsibly and respectfully throughout a trip.
                  </p>
                  <p>
                    Threatening behaviour, harassment, violence, unlawful conduct, serious disruption, damage to property or conduct that creates a material safety risk may result in appropriate action.
                  </p>
                  <p>
                    Where reasonably necessary to protect the safety or wellbeing of participants, Travel Tribes may refuse participation in an activity or remove a traveller from a trip, subject to the circumstances and applicable law.
                  </p>
                  <p>
                    Any resulting refund or additional expense will be assessed under the applicable cancellation policy and legal requirements.
                  </p>
                </div>
              </section>

              {/* 16. Personal Belongings and Property */}
              <section id="belongings" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  16. Personal Belongings and Property
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Travellers are responsible for their personal belongings, valuables, travel documents and electronic devices.
                  </p>
                  <p>
                    We recommend that you keep important items secure and avoid carrying unnecessary valuables.
                  </p>
                  <p>
                    If an item is lost, damaged or left behind, we may assist with reasonable enquiries where practicable, but recovery cannot be guaranteed.
                  </p>
                  <p>
                    Responsibility for lost or damaged property will be determined by the circumstances, the applicable law and the terms governing the relevant service.
                  </p>
                </div>
              </section>

              {/* 17. Photography, Videos and Promotional Content */}
              <section id="promotional-media" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  17. Photography, Videos and Promotional Content
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Photography and videography may take place during trips and events for personal memories, trip documentation or promotional purposes.
                  </p>
                  <p>
                    Where Travel Tribes intends to use identifiable images, videos or testimonials for public promotional purposes, we will provide appropriate notice and obtain consent where required by applicable law.
                  </p>
                  <p>
                    Travellers may inform our team if they do not wish to have their identifiable image used for promotional purposes. We will consider reasonable requests concerning content under our control, subject to legal obligations and third-party platform limitations.
                  </p>
                  <p>
                    Posting content publicly or tagging Travel Tribes does not automatically grant permission for its use in our advertising.
                  </p>
                </div>
              </section>

              {/* 18. Intellectual Property */}
              <section id="intellectual-property" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  18. Intellectual Property
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    The content on <a href="https://traveltribes.in" className="text-[var(--sky)] underline hover:text-[var(--navy)]" target="_blank" rel="noopener noreferrer">https://traveltribes.in</a>, including text, branding, logos, graphics, photographs, videos, designs and other materials owned or licensed by Travel Tribes, is protected by applicable intellectual property laws.
                  </p>
                  <p>
                    You may access and use the website for personal, non-commercial purposes.
                  </p>
                  <p>
                    You must not copy, reproduce, distribute, modify, publish or commercially exploit our content without prior written permission, except where permitted by law.
                  </p>
                </div>
              </section>

              {/* 19. Website Use and Accuracy of Information */}
              <section id="website-use" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  19. Website Use and Accuracy of Information
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    We aim to keep our website, trip information and booking details accurate and current. However, availability, prices, itineraries, images and other information may change.
                  </p>
                  <p>
                    Website content is provided for general information and does not itself guarantee a reservation or availability.
                  </p>
                  <p>
                    The specific itinerary, inclusions, exclusions, price and booking confirmation issued for your trip will govern the arrangements applicable to that booking.
                  </p>
                  <p>
                    You agree not to misuse our website, attempt unauthorised access, interfere with its operation or submit false or unlawful information.
                  </p>
                </div>
              </section>

              {/* 20. Limitation of Liability */}
              <section id="liability" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  20. Limitation of Liability
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    To the extent permitted by applicable law, Travel Tribes will not be responsible for losses arising solely from circumstances outside its reasonable control, including weather events, natural disasters, government restrictions, third-party operational disruptions or a traveller's failure to comply with applicable requirements.
                  </p>
                  <p>
                    Nothing in these Terms &amp; Conditions excludes or limits liability for fraud, wilful misconduct, gross negligence where such exclusion is prohibited, or any liability that cannot legally be excluded or limited.
                  </p>
                  <p>
                    Any liability relating to a particular booking will be assessed in light of the confirmed services, applicable booking terms, the circumstances and applicable law.
                  </p>
                </div>
              </section>

              {/* 21. Force Majeure */}
              <section id="force-majeure" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  21. Force Majeure
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    A force majeure event means an extraordinary circumstance beyond reasonable control that prevents or materially affects the performance of a trip or service. This may include natural disasters, severe weather, epidemics or pandemics, war, terrorism, civil unrest, government restrictions, transport shutdowns or other comparable events.
                  </p>
                  <p>
                    If a force majeure event affects a trip, Travel Tribes will make reasonable efforts to communicate material changes and explore feasible alternatives.
                  </p>
                  <p>
                    Cancellation, rescheduling, refunds and other remedies will be handled according to the applicable trip policy, supplier conditions and applicable law.
                  </p>
                </div>
              </section>

              {/* 22. Privacy and Personal Information */}
              <section id="privacy" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  22. Privacy and Personal Information
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Personal information collected in connection with our website and services is handled in accordance with our Privacy Policy, available on <a href="https://traveltribes.in" className="text-[var(--sky)] underline hover:text-[var(--navy)]" target="_blank" rel="noopener noreferrer">https://traveltribes.in</a>.
                  </p>
                  <p>
                    By providing information for an enquiry or booking, you acknowledge that the information may be processed as described in that policy and as permitted or required by applicable law.
                  </p>
                </div>
              </section>

              {/* 23. Complaints and Customer Support */}
              <section id="support" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  23. Complaints and Customer Support
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  If you have a concern regarding a booking, payment, trip arrangement or service, please contact our team so we can review the issue.
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 space-y-3 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[var(--sky)] shrink-0" />
                    <span><strong>Email:</strong> <a href="mailto:hello@traveltribes.in" className="text-[var(--sky)] hover:underline">hello@traveltribes.in</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[var(--sky)] shrink-0" />
                    <span><strong>Phone / WhatsApp:</strong> <a href="tel:+919975822023" className="text-[var(--sky)] hover:underline">+91 99758 22023</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-[var(--sky)] shrink-0" />
                    <span><strong>Website:</strong> <a href="https://traveltribes.in" className="text-[var(--sky)] hover:underline" target="_blank" rel="noopener noreferrer">https://traveltribes.in</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[var(--sky)] shrink-0" />
                    <span><strong>Location:</strong> Mumbai, Maharashtra, India</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                  Please provide your booking reference and relevant details when raising a complaint. We will review the matter and respond within a reasonable period, subject to the nature of the complaint and applicable law.
                </p>
              </section>

              {/* 24. Governing Law and Disputes */}
              <section id="disputes" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  24. Governing Law and Disputes
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    These Terms &amp; Conditions are governed by the laws of India.
                  </p>
                  <p>
                    Any dispute arising in connection with these terms or a booking will be addressed in accordance with applicable Indian law. Subject to mandatory legal provisions, the competent courts in Mumbai, Maharashtra, shall have jurisdiction.
                  </p>
                  <p>
                    Nothing in this section limits any rights or remedies available to consumers under applicable law.
                  </p>
                </div>
              </section>

              {/* 25. Changes to These Terms */}
              <section id="terms-changes" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  25. Changes to These Terms
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Travel Tribes may update these Terms &amp; Conditions from time to time to reflect changes in our services, business operations or applicable law.
                  </p>
                  <p>
                    The latest version will be published on <a href="https://traveltribes.in" className="text-[var(--sky)] underline hover:text-[var(--navy)]" target="_blank" rel="noopener noreferrer">https://traveltribes.in</a> with the revised “Last Updated” date.
                  </p>
                  <p>
                    The terms applicable to a particular booking will also include the trip-specific conditions and cancellation policy communicated for that booking.
                  </p>
                </div>
              </section>

              {/* 26. Contact Information */}
              <section id="contact" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  26. Contact Information
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  For questions regarding these Terms &amp; Conditions, bookings or our services, please contact:
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 space-y-3 text-sm sm:text-base">
                  <div className="font-bold text-[var(--navy)]">Tribeify Experience LLP</div>
                  <div>Operating under the brand name: <strong>Travel Tribes</strong></div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[var(--sky)] shrink-0" />
                    <span><strong>Email:</strong> <a href="mailto:hello@traveltribes.in" className="text-[var(--sky)] hover:underline">hello@traveltribes.in</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[var(--sky)] shrink-0" />
                    <span><strong>Phone / WhatsApp:</strong> <a href="tel:+919975822023" className="text-[var(--sky)] hover:underline">+91 99758 22023</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[var(--sky)] shrink-0" />
                    <span><strong>Location:</strong> Mumbai, Maharashtra, India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-[var(--sky)] shrink-0" />
                    <span><strong>Website:</strong> <a href="https://traveltribes.in" className="text-[var(--sky)] hover:underline" target="_blank" rel="noopener noreferrer">https://traveltribes.in</a></span>
                  </div>
                </div>

                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                  <p>
                    By booking a trip or using our services, you confirm that you have had the opportunity to read and understand these Terms &amp; Conditions and agree to the terms applicable to your booking, subject to applicable law.
                  </p>
                  <p className="font-semibold text-[var(--navy)]">
                    Thank you for choosing Travel Tribes. We look forward to helping you explore more, connect with new people and create memorable travel experiences.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  )
}

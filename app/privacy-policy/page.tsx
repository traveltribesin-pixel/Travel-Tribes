import type { Metadata } from 'next'
import Link from 'next/link'
import { PageFrame } from '@/components/site-shell'
import { ShieldCheck, Mail, Phone, MapPin, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Travel Tribes',
  description: 'Privacy Policy of Travel Tribes (Operated by Tribeify Experience LLP). Learn how we collect, use, store, disclose and protect your personal information.',
  openGraph: {
    title: 'Privacy Policy | Travel Tribes',
    description: 'Privacy Policy of Travel Tribes (Operated by Tribeify Experience LLP).',
    images: ['/image/Logowithbg.png']
  }
}

export default function PrivacyPolicyPage() {
  const sections = [
    { id: 'definitions', num: '1', title: 'Definitions' },
    { id: 'collection', num: '2', title: 'Collection of Personal Data' },
    { id: 'categories', num: '3', title: 'Categories of Personal Data Collected' },
    { id: 'cookies', num: '4', title: 'Cookies and Website Usage Data' },
    { id: 'purpose', num: '5', title: 'Purpose and Use of Personal Data' },
    { id: 'sharing', num: '6', title: 'Sharing and Disclosure of Personal Data' },
    { id: 'cross-border', num: '7', title: 'International Travel and Cross-Border Transfers' },
    { id: 'security', num: '8', title: 'Data Storage, Retention and Security' },
    { id: 'rights', num: '9', title: 'Your Privacy Rights and Choices' },
    { id: 'marketing', num: '10', title: 'Marketing Communications' },
    { id: 'media', num: '11', title: 'Photographs, Videos and Testimonials' },
    { id: 'children', num: '12', title: 'Information Relating to Children' },
    { id: 'contact', num: '13', title: 'Contact and Grievance Redressal' },
    { id: 'compliance', num: '14', title: 'Compliance with Applicable Law' },
    { id: 'changes', num: '15', title: 'Changes to This Privacy Policy' },
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
              <ShieldCheck size={14} className="text-[var(--sky)]" />
              <span>LEGAL &amp; PRIVACY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--navy)] tracking-tight leading-tight uppercase mb-3">
              Privacy Policy
            </h1>

            <p className="text-base sm:text-lg text-[var(--sky)] font-bold mb-4">
              Your Privacy, Our Responsibility
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
              <nav className="space-y-1.5 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-[var(--navy)] hover:bg-[var(--sky-pale)]/50 transition-colors"
                  >
                    <span className="font-bold text-[var(--sky)] w-5 shrink-0">{sec.num}.</span>
                    <span className="truncate">{sec.title}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/terms"
                  className="text-xs font-bold text-[var(--sky)] hover:underline flex items-center gap-1.5"
                >
                  View Terms &amp; Conditions →
                </Link>
              </div>
            </aside>

            {/* MAIN POLICY CONTENT */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-10">
              
              {/* INTRODUCTORY PARAGRAPHS */}
              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed border-b border-slate-100 pb-8">
                <p>
                  Tribeify Experience LLP, operating under the brand name <strong>Travel Tribes</strong> (“Travel Tribes”, “we”, “us” or “our”), values the trust you place in us when you choose our travel services.
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, store, disclose and protect your personal information when you visit <a href="https://traveltribes.in" className="text-[var(--sky)] underline hover:text-[var(--navy)]" target="_blank" rel="noopener noreferrer">https://traveltribes.in</a>, enquire about a trip, make a booking, communicate with our team or participate in our travel experiences.
                </p>
                <p>
                  This policy applies to travellers, prospective customers, website visitors, group organisers, corporate clients and other individuals whose information we process in connection with our services.
                </p>
              </div>

              {/* 1. Definitions */}
              <section id="definitions" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  1. Definitions
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  For the purposes of this Privacy Policy:
                </p>
                <ul className="space-y-2.5 text-sm sm:text-base text-slate-700 pl-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Personal Data:</strong> Information relating to an identified or identifiable individual.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Processing:</strong> Any operation performed on personal data, including collection, recording, storage, use, disclosure or deletion.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Traveller:</strong> An individual who enquires about, books or participates in a Travel Tribes trip or service.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Service Providers:</strong> Third parties that help us deliver travel arrangements or operate our business.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Cookies:</strong> Small data files or similar technologies that may be stored on your device when you visit a website.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Minor:</strong> An individual below the age of 18 years.</span>
                  </li>
                </ul>
              </section>

              {/* 2. Collection of Personal Data */}
              <section id="collection" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  2. Collection of Personal Data
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    We collect information that you voluntarily provide when you enquire about or book our trips, communicate with our team, or use our services.
                  </p>
                  <p>
                    This information may be collected through our website, enquiry forms, WhatsApp, email, telephone, social media, booking channels or authorised representatives.
                  </p>
                  <p>
                    We may also collect certain technical information automatically when you visit our website, depending on the website infrastructure and technologies enabled.
                  </p>
                  <p>
                    We do not intentionally collect more information than is reasonably necessary for the relevant purpose.
                  </p>
                </div>
              </section>

              {/* 3. Categories of Personal Data Collected */}
              <section id="categories" className="space-y-5 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  3. Categories of Personal Data Collected
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Depending on the services you request, we may collect the following categories of information.
                </p>

                <div className="space-y-4 pl-1 sm:pl-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] mb-1">
                      3.1 Contact Information
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      Your full name, mobile number, email address, city, residential address where required, and emergency contact details.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] mb-1">
                      3.2 Identity Information
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      Date of birth, age, nationality, government-issued identification, passport details, visa information and other travel documents where required to arrange or facilitate your trip.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] mb-1">
                      3.3 Travel and Booking Information
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      Your selected destination, departure date, booking history, itinerary, accommodation preferences, transportation details, room-sharing preferences, dietary requirements and other travel-related requests.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] mb-1">
                      3.4 Payment and Financial Information
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-2">
                      Booking amounts, payment status, transaction references, billing details and information necessary for invoices, refunds, accounting and applicable tax requirements.
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      Payments may be processed through third-party payment providers. We do not intend to collect complete payment card credentials through ordinary enquiry forms or chat messages.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] mb-1">
                      3.5 Health and Safety Information
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      For activities such as trekking, camping, adventure travel or high-altitude trips, we may request relevant information about allergies, medical conditions, accessibility needs or fitness limitations where necessary for safety or trip arrangements.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] mb-1">
                      3.6 Information Relating to Minors
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      Where a trip permits minors to participate, we may collect limited information necessary for the booking, travel arrangements and safety, subject to applicable law and the required parental or guardian authorisation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] mb-1">
                      3.7 Technical and Usage Information
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      Depending on the technologies enabled, this may include your IP address, browser type, device information, operating system, pages visited, referral source, website interactions, error logs and cookie-related information.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] mb-1">
                      3.8 Communications and Feedback
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      Information contained in your enquiries, messages, reviews, testimonials, complaints, feedback and customer support conversations.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Cookies and Website Usage Data */}
              <section id="cookies" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  4. Cookies and Website Usage Data
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Our website may use cookies or similar technologies to support website functionality, understand visitor activity, improve performance and measure promotional campaigns, depending on the tools implemented.
                  </p>
                  <p>
                    These technologies may help us understand which pages visitors access, identify technical issues and improve the browsing experience.
                  </p>
                  <p>
                    You may be able to manage or disable cookies through your browser settings. Certain website functions may not operate as intended if some cookies are disabled.
                  </p>
                  <p>
                    Where required by applicable law, we will provide appropriate notices or consent options for non-essential cookies.
                  </p>
                </div>
              </section>

              {/* 5. Purpose and Use of Personal Data */}
              <section id="purpose" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  5. Purpose and Use of Personal Data
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  We may use your personal information for the following purposes:
                </p>
                <ul className="space-y-2.5 text-sm sm:text-base text-slate-700 pl-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Enquiries and bookings:</strong> To respond to enquiries, provide quotations, recommend destinations and manage bookings.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Travel arrangements:</strong> To coordinate hotels, transportation, activities, local guides and other trip services.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Communication:</strong> To send booking confirmations, payment updates, itineraries, departure instructions and changes to travel arrangements.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Traveller support:</strong> To respond to questions, complaints, emergencies and requests for assistance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Payments and accounting:</strong> To process or verify payments, issue invoices, maintain financial records and meet applicable tax obligations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Safety and security:</strong> To manage relevant travel risks, investigate suspected fraud and protect travellers and our operations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Service improvement:</strong> To understand feedback, improve our website and develop better travel experiences.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Marketing:</strong> Where permitted by law and supported by the required consent or other valid basis, to share trip announcements, offers, newsletters and destination updates.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span><strong>Legal compliance:</strong> To comply with applicable laws, regulations and lawful requests from competent authorities.</span>
                  </li>
                </ul>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                  We may also use aggregated information that does not identify individuals to analyse travel preferences and improve our services.
                </p>
              </section>

              {/* 6. Sharing and Disclosure of Personal Data */}
              <section id="sharing" className="space-y-5 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  6. Sharing and Disclosure of Personal Data
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  We do not sell your personal information as a standalone commercial product. We may share relevant information with the following parties when necessary to deliver our services or comply with legal requirements.
                </p>

                <div className="space-y-4 pl-1 sm:pl-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] mb-1">
                      6.1 Travel and Service Providers
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      Information may be shared with hotels, resorts, airlines, railway or bus operators, transport companies, drivers, local guides, trek leaders, activity providers, destination management companies, visa assistance providers and other vendors involved in your booking.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] mb-1">
                      6.2 Technology and Business Providers
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-2">
                      We may use third-party services for website hosting, booking management, customer support, communication, payment processing, analytics and other business operations.
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      The providers involved depend on the systems and tools we actually use.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] mb-1">
                      6.3 Group Organisers and Corporate Clients
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      For corporate trips, college trips, private group bookings and events, relevant booking information may be shared with an authorised organiser where necessary to coordinate the service.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--navy)] mb-1">
                      6.4 Legal and Safety Requirements
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-2">
                      We may disclose information when necessary to comply with applicable law, respond to lawful requests, investigate suspected unlawful activity, establish or defend legal claims, or protect the safety and rights of travellers and other individuals.
                    </p>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      We aim to limit disclosures to information relevant to the purpose for which it is shared.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. International Travel and Cross-Border Transfers */}
              <section id="cross-border" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  7. International Travel and Cross-Border Transfers
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    When you book an international trip, we may need to share relevant personal information with overseas hotels, airlines, transport providers, destination management companies, activity operators, visa assistance providers or other suppliers.
                  </p>
                  <p>
                    Such sharing may be necessary to make reservations, meet travel documentation requirements and provide services at your destination.
                  </p>
                  <p>
                    Your information may therefore be processed in countries whose privacy laws differ from those in India. Where applicable, we will handle such processing in accordance with relevant legal requirements.
                  </p>
                </div>
              </section>

              {/* 8. Data Storage, Retention and Security */}
              <section id="security" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  8. Data Storage, Retention and Security
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    We retain personal information for as long as reasonably necessary to fulfil the purpose for which it was collected, provide travel services, maintain business records, resolve disputes and meet applicable legal obligations.
                  </p>
                  <p>
                    Retention periods depend on the nature of the information and the relevant requirements. Booking and financial records may need to be retained for statutory or accounting purposes, while enquiry and marketing information may be retained according to the relevant purpose and your preferences.
                  </p>
                  <p>
                    We take reasonable steps appropriate to our operations to protect personal information against unauthorised access, loss, misuse, alteration or disclosure. These measures depend on the systems and service providers involved.
                  </p>
                  <p>
                    No online transmission or storage system can be guaranteed to be completely secure. If a personal data breach occurs, we will take appropriate steps to investigate and respond, including providing notifications where required by applicable law.
                  </p>
                </div>
              </section>

              {/* 9. Your Privacy Rights and Choices */}
              <section id="rights" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  9. Your Privacy Rights and Choices
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Subject to applicable law, you may be entitled to:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-slate-700 pl-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Request information about personal data we hold about you.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Request correction or updating of inaccurate information.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Request deletion of personal information where permitted by law.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Withdraw consent where processing relies on your consent.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Opt out of promotional communications.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Raise a privacy-related grievance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[var(--sky)] font-bold text-lg leading-tight">•</span>
                    <span>Exercise other rights available to you under applicable data protection law.</span>
                  </li>
                </ul>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                  <p>
                    To exercise these rights, contact us using the details in Section 13. We may request reasonable information to verify your identity before processing your request.
                  </p>
                  <p>
                    Some information may need to be retained to fulfil legal obligations, complete a booking or resolve a dispute.
                  </p>
                </div>
              </section>

              {/* 10. Marketing Communications */}
              <section id="marketing" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  10. Marketing Communications
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Where permitted by applicable law, we may use your contact details to send information about upcoming trips, special offers, new destinations, community events and other Travel Tribes services.
                  </p>
                  <p>
                    You can opt out of promotional communications by using an unsubscribe option where available, replying to a promotional message with an opt-out request, or contacting us directly.
                  </p>
                  <p>
                    Opting out of marketing will not prevent us from sending essential communications about an existing enquiry, booking, payment or trip.
                  </p>
                </div>
              </section>

              {/* 11. Photographs, Videos and Testimonials */}
              <section id="media" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  11. Photographs, Videos and Testimonials
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Photographs and videos may be taken during trips or events for trip documentation, community memories and promotional purposes.
                  </p>
                  <p>
                    Where we intend to use identifiable photographs, videos or testimonials for public marketing, we will provide appropriate notice and obtain consent where required by applicable law.
                  </p>
                  <p>
                    If you do not want your identifiable image or testimonial used for promotional purposes, please inform our team or contact us. We will consider reasonable requests concerning future use or the removal of content under our control, subject to legal requirements and third-party platform limitations.
                  </p>
                  <p>
                    Publicly tagging Travel Tribes or posting content online does not automatically grant us permission to reproduce that content in our advertising.
                  </p>
                </div>
              </section>

              {/* 12. Information Relating to Children */}
              <section id="children" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  12. Information Relating to Children
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    Our services are generally intended to be booked and used by adults unless a particular trip or service permits participation by minors.
                  </p>
                  <p>
                    Where minors are permitted to participate, the necessary information must be provided or authorised by a parent or lawful guardian in accordance with applicable law.
                  </p>
                  <p>
                    We collect information relating to minors only where reasonably necessary for bookings, safety, travel arrangements or legal requirements. A parent or lawful guardian may contact us regarding information relating to a minor.
                  </p>
                </div>
              </section>

              {/* 13. Contact and Grievance Redressal */}
              <section id="contact" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  13. Contact and Grievance Redressal
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  For questions, privacy requests or grievances relating to the collection or use of your personal information, please contact us using the details below.
                </p>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 space-y-3 text-sm sm:text-base">
                  <div><strong>Legal Entity:</strong> Tribeify Experience LLP</div>
                  <div><strong>Brand Name:</strong> Travel Tribes</div>
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
                    Please use the subject line “<strong>Privacy Request – Travel Tribes</strong>” when contacting us about your personal information.
                  </p>
                  <p>
                    We will review your request and respond in accordance with applicable law. If a request cannot be fulfilled in full, we will explain the reason where legally required.
                  </p>
                </div>
              </section>

              {/* 14. Compliance with Applicable Law */}
              <section id="compliance" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  14. Compliance with Applicable Law
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    We handle personal information in accordance with applicable Indian laws and regulations, including the Digital Personal Data Protection Act, 2023 and its rules, to the extent applicable and in force, as well as other applicable legal requirements.
                  </p>
                  <p>
                    Where services are provided to individuals outside India, additional privacy laws may apply depending on the circumstances.
                  </p>
                </div>
              </section>

              {/* 15. Changes to This Privacy Policy */}
              <section id="changes" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                  15. Changes to This Privacy Policy
                </h2>
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p>
                    We may update this Privacy Policy to reflect changes in our services, business operations, technologies or applicable laws.
                  </p>
                  <p>
                    The latest version will be published on <a href="https://traveltribes.in" className="text-[var(--sky)] underline hover:text-[var(--navy)]" target="_blank" rel="noopener noreferrer">https://traveltribes.in</a> with the revised “Last Updated” date. Where required by law, we will provide notice of material changes or seek additional consent.
                  </p>
                  <p>
                    We encourage you to review this page periodically.
                  </p>
                </div>
              </section>

              {/* CLOSING / FOOTER NOTE */}
              <div className="pt-8 border-t border-slate-200 text-sm text-slate-600 space-y-1.5">
                <p className="font-bold text-[var(--navy)]">Travel Tribes</p>
                <p>Operated by Tribeify Experience LLP</p>
                <p>Website: <a href="https://traveltribes.in" className="text-[var(--sky)] hover:underline" target="_blank" rel="noopener noreferrer">https://traveltribes.in</a></p>
                <p>Email: <a href="mailto:hello@traveltribes.in" className="text-[var(--sky)] hover:underline">hello@traveltribes.in</a></p>
                <p>Phone / WhatsApp: <a href="tel:+919975822023" className="text-[var(--sky)] hover:underline">+91 99758 22023</a></p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  )
}

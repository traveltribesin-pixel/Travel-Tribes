import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://traveltribes.in'),
  title: {
    default: 'Travel Tribes | Group Trips, Backpacking & Weekend Getaways',
    template: '%s | Travel Tribes'
  },
  description: 'Join Travel Tribes for unforgettable group trips, backpacking adventures and weekend getaways across India & beyond. Travel solo, meet new people and find your tribe.',
  keywords: [
    'group trips India',
    'backpacking India',
    'weekend getaways Mumbai Pune',
    'solo travel community',
    'Travel Tribes',
    'curated tours India',
    'social travel'
  ],
  authors: [{ name: 'Travel Tribes' }],
  creator: 'Travel Tribes',
  publisher: 'Travel Tribes',
  icons: {
    icon: '/image/Logowithbg.png',
    shortcut: '/image/Logowithbg.png',
    apple: '/image/Logowithbg.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://traveltribes.in',
    siteName: 'Travel Tribes',
    title: 'Travel Tribes | Group Trips, Backpacking & Weekend Getaways',
    description: 'Join Travel Tribes for unforgettable group trips, backpacking adventures and weekend getaways across India & beyond. Travel solo, meet new people and find your tribe.',
    images: [
      {
        url: '/image/travel-tribes-og-group.jpg',
        width: 1200,
        height: 630,
        alt: 'Travel Tribes Community Group Trips'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Tribes | Group Trips, Backpacking & Weekend Getaways',
    description: 'Join Travel Tribes for unforgettable group trips, backpacking adventures and weekend getaways across India & beyond.',
    images: ['/image/travel-tribes-og-group.jpg']
  },
  robots: {
    index: true,
    follow: true
  }
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#43a9d1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-0BTW5GX4DG'

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaId}');
          `}
        </Script>
        {children}
        {/* Thrivia CRM & Event Booking Embed SDK */}
        <Script
          src="https://www.thrivia.io/embed/v1.js"
          data-key="pk_live_322b3dc5889c6618df5aa17899d64049"
          strategy="afterInteractive"
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}


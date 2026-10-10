import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

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
        url: '/image/Logowithbg.png',
        width: 800,
        height: 800,
        alt: 'Travel Tribes Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Tribes | Group Trips, Backpacking & Weekend Getaways',
    description: 'Join Travel Tribes for unforgettable group trips, backpacking adventures and weekend getaways across India & beyond.',
    images: ['/image/Logowithbg.png']
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
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}


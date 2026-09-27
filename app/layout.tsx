import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Travel Tribes | Small groups. Big landscapes.',
  description: 'Thoughtfully designed group journeys for curious people. Discover domestic, international and weekend trips with Travel Tribes.',
  generator: 'v0.app',
  icons: {
    icon: '/image/Logowithbg.png',
    shortcut: '/image/Logowithbg.png',
    apple: '/image/Logowithbg.png',
  },
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


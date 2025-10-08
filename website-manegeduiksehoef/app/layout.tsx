import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './spectacular-effects.css'
import Navbar from '@/components/Navbar'
import BackToTop from '@/components/BackToTop'
import BackgroundEffects from '@/components/BackgroundEffects'
import PerformanceMonitor from '@/components/PerformanceMonitor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Manege Duikse Hoef - Rijlessen en Pensionstalling',
  description: 'Professionele rijlessen en uitstekende pensionstalling in een warme, veilige omgeving. Ervaren instructeurs en verzorgers voor uw paard.',
  keywords: 'manege, rijlessen, pensionstalling, paarden, Duikse Hoef, instructeurs, verzorging, ponykamp, dressuur, springen',
  authors: [{ name: 'Manege Duikse Hoef' }],
  creator: 'Manege Duikse Hoef',
  publisher: 'Manege Duikse Hoef',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://manegeduiksehoef.nl',
    title: 'Manege Duikse Hoef - Rijlessen en Pensionstalling',
    description: 'Professionele rijlessen en uitstekende pensionstalling in een warme, veilige omgeving.',
    siteName: 'Manege Duikse Hoef',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manege Duikse Hoef - Rijlessen en Pensionstalling',
    description: 'Professionele rijlessen en uitstekende pensionstalling in een warme, veilige omgeving.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <div className="min-h-screen relative">
          <BackgroundEffects />
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
          <BackToTop />
          <PerformanceMonitor />
        </div>
      </body>
    </html>
  )
}
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import './spectacular-effects.css'
import Navbar from '@/components/Navbar'
import BackToTop from '@/components/BackToTop'
import BackgroundEffects from '@/components/BackgroundEffects'
import PerformanceMonitor from '@/components/PerformanceMonitor'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://manegeduiksehoef.nl'),
  title: 'Manege Duikse Hoef - Rijlessen en Pensionstalling',
  description: 'Professionele rijlessen en uitstekende pensionstalling in een warme, veilige omgeving. Ervaren instructeurs en verzorgers voor uw paard.',
  keywords: 'manege, rijlessen, pensionstalling, paarden, Duikse Hoef, instructeurs, verzorging, ponykamp, dressuur, springen',
  authors: [{ name: 'Manege Duikse Hoef' }],
  creator: 'Manege Duikse Hoef',
  publisher: 'Manege Duikse Hoef',
  icons: {
    icon: '/faviconroze.png',
    apple: '/faviconroze.png',
  },
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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HorseRidingSchool",
    "name": "Manege Duikse Hoef",
    "image": "https://manegeduiksehoef.nl/logo.png",
    "url": "https://manegeduiksehoef.nl",
    "telephone": "+31620685310",
    "email": "info@manegeduiksehoef.nl",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Duiksehoef 6",
      "addressLocality": "Loon op Zand",
      "postalCode": "5175 PG",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.6275",
      "longitude": "5.0750"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Bank Transfer",
    "areaServed": {
      "@type": "City",
      "name": "Loon op Zand"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Manege Diensten",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Paardrijlessen"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Buitenritten"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pensionstalling"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/p/Stal-Manege-Duikse-Hoef-100092264474224/",
      "https://www.instagram.com/manegeduiksehoef/",
      "https://www.tiktok.com/@manege.duiksehoef"
    ]
  }

  return (
    <html lang="nl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
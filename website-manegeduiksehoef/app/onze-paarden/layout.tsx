import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Onze Paarden | Manege Duikse Hoef',
  description:
    'Maak kennis met de paarden van Manege Duikse Hoef. Betrouwbare manegepaarden voor lessen en buitenritten in Loon op Zand.',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://manegeduiksehoef.nl/onze-paarden',
    title: 'Onze Paarden | Manege Duikse Hoef',
    description:
      'Maak kennis met de paarden van Manege Duikse Hoef. Betrouwbare manegepaarden voor lessen en buitenritten in Loon op Zand.',
    siteName: 'Manege Duikse Hoef',
    images: [
      {
        url: 'https://manegeduiksehoef.nl/images/opengraph-onze-paarden.jpg',
        secureUrl: 'https://manegeduiksehoef.nl/images/opengraph-onze-paarden.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Onze paarden Manege Duikse Hoef',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Onze Paarden | Manege Duikse Hoef',
    description:
      'Maak kennis met de paarden van Manege Duikse Hoef. Betrouwbare manegepaarden voor lessen en buitenritten in Loon op Zand.',
    images: ['https://manegeduiksehoef.nl/images/opengraph-onze-paarden.jpg'],
  },
}

export default function OnzePaardenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

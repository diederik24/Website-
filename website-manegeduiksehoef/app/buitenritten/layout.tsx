import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buitenritten | Manege Duikse Hoef',
  description:
    'Begeleide weekend buitenritten door de bossen rondom Loon op Zand. Groepsritten en privéritten bij Manege Duikse Hoef.',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://manegeduiksehoef.nl/buitenritten',
    title: 'Buitenritten | Manege Duikse Hoef',
    description:
      'Begeleide weekend buitenritten door de bossen rondom Loon op Zand. Groepsritten en privéritten bij Manege Duikse Hoef.',
    siteName: 'Manege Duikse Hoef',
    images: [
      {
        url: 'https://manegeduiksehoef.nl/images/opengraph-buitenritten.jpg',
        secureUrl: 'https://manegeduiksehoef.nl/images/opengraph-buitenritten.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Buitenritten Manege Duikse Hoef',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buitenritten | Manege Duikse Hoef',
    description:
      'Begeleide weekend buitenritten door de bossen rondom Loon op Zand. Groepsritten en privéritten bij Manege Duikse Hoef.',
    images: ['https://manegeduiksehoef.nl/images/opengraph-buitenritten.jpg'],
  },
}

export default function BuitenrittenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

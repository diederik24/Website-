import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lessen | Manege Duikse Hoef',
  description:
    'Privélessen en duo-lessen op aanvraag bij Manege Duikse Hoef. Gediplomeerde instructeurs in Loon op Zand.',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://manegeduiksehoef.nl/lessen',
    title: 'Lessen | Manege Duikse Hoef',
    description:
      'Privélessen en duo-lessen op aanvraag bij Manege Duikse Hoef. Gediplomeerde instructeurs in Loon op Zand.',
    siteName: 'Manege Duikse Hoef',
    images: [
      {
        url: 'https://manegeduiksehoef.nl/images/opengraph-lessen.jpg',
        secureUrl: 'https://manegeduiksehoef.nl/images/opengraph-lessen.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Rijlessen Manege Duikse Hoef',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lessen | Manege Duikse Hoef',
    description:
      'Privélessen en duo-lessen op aanvraag bij Manege Duikse Hoef. Gediplomeerde instructeurs in Loon op Zand.',
    images: ['https://manegeduiksehoef.nl/images/opengraph-lessen.jpg'],
  },
}

export default function LessenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

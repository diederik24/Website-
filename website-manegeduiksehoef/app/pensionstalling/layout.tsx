import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pensionstalling | Manege Duikse Hoef',
  description:
    'Half pension vanaf €420 per maand in Loon op Zand, direct aan het bos. Binnenbak, buitenbak en toegang tot de Drunense Duinen.',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://manegeduiksehoef.nl/pensionstalling',
    title: 'Pensionstalling | Manege Duikse Hoef',
    description:
      'Half pension vanaf €420 per maand in Loon op Zand, direct aan het bos. Binnenbak, buitenbak en toegang tot de Drunense Duinen.',
    siteName: 'Manege Duikse Hoef',
    images: [
      {
        url: 'https://manegeduiksehoef.nl/images/opengraph-pensionstalling.jpg',
        secureUrl: 'https://manegeduiksehoef.nl/images/opengraph-pensionstalling.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Pensionstalling Manege Duikse Hoef',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pensionstalling | Manege Duikse Hoef',
    description:
      'Half pension vanaf €420 per maand in Loon op Zand, direct aan het bos. Binnenbak, buitenbak en toegang tot de Drunense Duinen.',
    images: ['https://manegeduiksehoef.nl/images/opengraph-pensionstalling.jpg'],
  },
}

export default function PensionstallingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

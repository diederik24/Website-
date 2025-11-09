'use client'

import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function AanmeldenPage() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen py-16 md:py-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/google-photos/Binnenbak.jpg"
          alt="Binnenbak Manege Duikse Hoef"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/85 to-pink-100/85" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-xl border border-pink-100 shadow-2xl rounded-[32px] overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white px-8 py-10">
            <button
              onClick={() => router.push('/lessen')}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar Lessen
            </button>
            <h1 className="text-3xl md:text-4xl font-bold">Aanmeldformulier Manegeplan</h1>
            <p className="text-white/80 mt-3 max-w-3xl">
              Vul het formulier zorgvuldig in. Ontvang je geen bevestiging na 48 uur? Neem dan contact met ons op – we helpen je
              graag verder.
            </p>
          </div>
          <iframe
            src="https://app.manegeplan.nl/inschrijven.php?id=78294916"
            title="Inschrijven voor lessen bij Manegeplan"
            className="w-full border-0 min-h-[700px] md:min-h-[820px]"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}


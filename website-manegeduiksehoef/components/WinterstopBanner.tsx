'use client'

import { Snowflake } from 'lucide-react'

/** Aankondigingsbanner: vanaf 7 september t/m 1 april */
export function shouldShowWinterstopBanner(date = new Date()) {
  const y = date.getFullYear()
  const announcementStart = new Date(y, 8, 7) // 7 september
  const winterEnd = new Date(y + 1, 3, 1, 23, 59, 59, 999) // 1 april volgend jaar
  if (date >= announcementStart) return date <= winterEnd
  const prevStart = new Date(y - 1, 8, 7)
  const thisEnd = new Date(y, 3, 1, 23, 59, 59, 999)
  return date >= prevStart && date <= thisEnd
}

export default function WinterstopBanner() {
  if (!shouldShowWinterstopBanner()) return null

  return (
    <section className="relative bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 py-10 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start md:items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 shrink-0">
              <Snowflake className="w-10 h-10 text-cyan-200" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Winterstop Buitenritten</h2>
              <p className="mt-2 text-sm md:text-base text-white/80 leading-relaxed max-w-3xl">
                Vanaf <strong className="text-white">19 oktober</strong> tot en met{' '}
                <strong className="text-white">1 april</strong> zijn onze buitenritten gesloten vanwege
                onvoorspelbare weeromstandigheden. Wil je in deze periode toch graag een buitenrit boeken? Neem
                dan gerust contact met ons op via{' '}
                <a
                  href="mailto:info@manegeduiksehoef.nl"
                  className="text-white font-semibold underline underline-offset-2 hover:text-cyan-200"
                >
                  e-mail (info@manegeduiksehoef.nl)
                </a>{' '}
                om de mogelijkheden te bespreken.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/80 shrink-0">
            Tot en met:&nbsp;
            <span className="font-semibold text-white">1 april</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export type BuitenritOptieId =
  | 'groep-beginnend'
  | 'groep-gemiddeld'
  | 'groep-gevorderd'
  | 'prive-beginnend'
  | 'prive-gemiddeld'
  | 'prive-gevorderd'

export interface BuitenritOptie {
  id: BuitenritOptieId
  type: 'groep' | 'prive'
  niveau: string
  gangen: string
  duur: string
  prijsLabel: string
  prijsNumber: number
  beschrijving: string
}

export const GROEP_OPTIES: BuitenritOptie[] = [
  {
    id: 'groep-beginnend',
    type: 'groep',
    niveau: 'Beginnend',
    gangen: 'Stap / draf',
    duur: '30 / 45 minuten',
    prijsLabel: '€ 35,00',
    prijsNumber: 35,
    beschrijving: 'Ideaal als je rustig kennismaakt met buitenrijden in stap en draf.',
  },
  {
    id: 'groep-gemiddeld',
    type: 'groep',
    niveau: 'Gemiddeld',
    gangen: 'Stap / draf / eventueel galop',
    duur: '1 uur',
    prijsLabel: '€ 40,00',
    prijsNumber: 40,
    beschrijving: 'Voor ruiters met enige ervaring; galop alleen als het past.',
  },
  {
    id: 'groep-gevorderd',
    type: 'groep',
    niveau: 'Gevorderd',
    gangen: 'Stap / draf / galop',
    duur: '1,5 uur',
    prijsLabel: '€ 47,50',
    prijsNumber: 47.5,
    beschrijving: 'Een langere rit met stap, draf en galop door de bossen.',
  },
]

export const PRIVE_OPTIES: BuitenritOptie[] = [
  {
    id: 'prive-beginnend',
    type: 'prive',
    niveau: 'Beginnend',
    gangen: 'Stap / draf',
    duur: '30 / 45 minuten',
    prijsLabel: '€ 40,00',
    prijsNumber: 40,
    beschrijving: 'Persoonlijke begeleiding in stap en draf, op jouw tempo.',
  },
  {
    id: 'prive-gemiddeld',
    type: 'prive',
    niveau: 'Gemiddeld',
    gangen: 'Stap / draf / eventueel galop',
    duur: '1 uur',
    prijsLabel: '€ 55,00',
    prijsNumber: 55,
    beschrijving: 'Privérit met ruimte voor draf en eventueel galop.',
  },
  {
    id: 'prive-gevorderd',
    type: 'prive',
    niveau: 'Gevorderd',
    gangen: 'Stap / draf / galop',
    duur: '1,5 uur',
    prijsLabel: '€ 62,50',
    prijsNumber: 62.5,
    beschrijving: 'Een uitgebreide privérit met stap, draf en galop.',
  },
]

export const ALLE_BUITENRIT_OPTIES: BuitenritOptie[] = [...GROEP_OPTIES, ...PRIVE_OPTIES]

export function getBuitenritOptie(id?: string | null): BuitenritOptie | undefined {
  if (!id) return undefined
  return ALLE_BUITENRIT_OPTIES.find((optie) => optie.id === id)
}

export function formatBuitenritOptieLabel(optie: BuitenritOptie): string {
  const typeLabel = optie.type === 'prive' ? 'Privérit' : 'Groepsrit'
  return `${typeLabel} – ${optie.niveau}`
}

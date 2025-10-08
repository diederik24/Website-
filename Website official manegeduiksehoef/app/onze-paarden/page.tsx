'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, Star, Users, Calendar, Sparkles, Zap, Crown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
// Database niet meer nodig - alle data is al doorgegeven

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOutQuart * end))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref} className="text-3xl font-bold text-gray-900 mb-2">
      {count}{suffix}
    </span>
  )
}

// Paard interface
interface Paard {
  id: number
  naam: string
  ras: string
  leeftijd: string
  geslacht: 'Merrie' | 'Ruin' | 'Hengst'
  kleur: string
  beschrijving: string
  hoofdfoto: string
  foto_urls: string[]
  eigenschappen: string[]
  created_at?: string
  updated_at?: string
}

// Paarden data - alle data is al doorgegeven
const fallbackPaarden = [
  {
    id: 1,
    naam: 'Vina',
    ras: 'IJslander',
    leeftijd: 'Onbekend',
    geslacht: 'Merrie' as const,
    kleur: 'Zwart',
    beschrijving: 'Vina is een lieve merrie die heel erg geliefd is bij onze manege kinderen, ze loopt mee bij de beginners lessen maar ook bij de gemiddeld-gevorderden. Vina zit heel lekker door haar vlakke beweging.',
    hoofdfoto: '/paarden/vina.jpg',
    foto_urls: ['/paarden/vina.jpg'],
    eigenschappen: ['Lief', 'Betrouwbaar', 'Unieke gangen']
  },
  {
    id: 2,
    naam: 'Lotje',
    ras: 'Kruising Welsh en Haflinger',
    leeftijd: 'Onbekend',
    geslacht: 'Merrie' as const,
    kleur: 'Wildkleur bruin',
    beschrijving: 'Lotje is heel lief en houdt van knuffelen en poetsen maar kan soms een beetje ongeduldig zijn met opstappen. Lotje loopt graag door, ze rijdt mee met de gemiddeld-gevorderd lessen.',
    hoofdfoto: '/paarden/lotje.jpg',
    foto_urls: ['/paarden/lotje.jpg'],
    eigenschappen: ['Lief', 'Tempramentje', 'Knuffelkont']
  },
  {
    id: 3,
    naam: 'Lilly',
    ras: 'Kruising Welsh en Haflinger',
    leeftijd: 'Onbekend',
    geslacht: 'Merrie' as const,
    kleur: 'Wildkleur bruin',
      beschrijving: 'Lilly houdt heel erg van knuffelen en poetsen, ze heeft uren geduld. Lilly zit heel lekker met rijden en vooral met doorzitten maar ze kan soms ook een beetje eigenwijs zijn. Lilly loopt mee met de beginners-gemiddeld-gevorderden lessen.',
    hoofdfoto: '/paarden/lily.jpg',
    foto_urls: ['/paarden/lily.jpg'],
    eigenschappen: ['Knuffelkont', 'Betrouwbaar', 'Eigenwijs']
  },
  {
    id: 4,
    naam: 'Boy',
    ras: 'Onbekend',
    leeftijd: 'Onbekend',
    geslacht: 'Ruin' as const,
    kleur: 'Bruin',
    beschrijving: 'Boy kijkt vaak chagrijnig maar hij is super lief. Boy houdt er van om te springen en lekker op zijn gemakje mee te lopen met de dressuur lessen. Boy loopt mee met de gemiddeld-gevorderde en gevorderde lessen.',
    hoofdfoto: '/paarden/boy.jpg',
    foto_urls: ['/paarden/boy.jpg'],
    eigenschappen: ['Lief', 'Eigenwijs', 'Mooi']
  },
  {
    id: 5,
    naam: 'Ginger (Risico)',
    ras: 'Onbekend',
    leeftijd: 'Onbekend',
    geslacht: 'Merrie' as const,
    kleur: 'Vos',
    beschrijving: 'Ginger haar eigen naam is officieel Risico maar ze hebben haar Ginger genoemd door haar mooie kleur. Ginger is een echte allrounder, Ginger kan alles. Zowel springen als dressuurmatig. Ze heeft vroeger ook Eventing gelopen op een hoog niveau. Ginger is ook bij veel kinderen geliefd door haar lieve en betrouwbare karakter. Ginger gaat graag voor je door het vuur. Ginger is geschikt voor alle niveaus.',
    hoofdfoto: '/paarden/ginger.jpg',
    foto_urls: ['/paarden/ginger.jpg'],
    eigenschappen: ['Voorwaarts', 'Betrouwbaar', 'Ervaren']
  },
  {
    id: 6,
    naam: 'Cookie',
    ras: 'Kruising met koudbloed',
    leeftijd: 'Jong',
    geslacht: 'Merrie' as const,
    kleur: 'Vos bont',
    beschrijving: 'Ondanks haar jonge leeftijd leert Cookie heel snel en pakt het werk heel snel en goed op. Ze is bombroof en super lief. Ze houdt van knuffelen en poetsen en gaat ook graag voor je aan het werk in de lessen, zelfs als ze het niet helemaal meer begrijpt blijft ze netjes naar je luisteren. Door haar jonge leeftijd loopt Cookie nu mee in de gemiddeld-gevorderden en de gevorderden lessen mee wat ze heel goed doet.',
    hoofdfoto: '/paarden/cookie.jpg',
    foto_urls: ['/paarden/cookie.jpg'],
    eigenschappen: ['Vrolijk', 'Kinderpony', 'Grappig']
  },
  {
    id: 7,
    naam: 'Uquebelle',
    ras: 'Frans ras',
    leeftijd: 'Onbekend',
    geslacht: 'Ruin' as const,
    kleur: 'Zwart',
    beschrijving: 'Uquebelle is een hele lieve betrouwbare ruin die al lang mee loopt met de manege lessen. Uquebelle heeft veel ervaring in de lessen en op buitenritten. Hij heeft vroeger mee gelopen met de ravelijn show waardoor zijn bijnaam \'trucebelle\' is, omdat hij nog kunstjes kent en ook goed van voltigeren.',
    hoofdfoto: '/paarden/uquebelle.jpg',
    foto_urls: ['/paarden/uquebelle.jpg'],
    eigenschappen: ['Ervaren', 'Sociaal', 'Allrounder']
  },
  {
    id: 8,
    naam: 'Fönix',
    ras: 'IJslander',
    leeftijd: 'Onbekend',
    geslacht: 'Ruin' as const,
    kleur: 'Vos',
    beschrijving: 'Fönix is een heel vrolijk en sprekend paard. Hij is onze nieuwste aanwinst en loopt voornamelijk mee met de buitenritten en in de gevorderde lessen omdat hij nog niet heel ervaren is.',
    hoofdfoto: '/paarden/fonix.jpg',
    foto_urls: ['/paarden/fonix.jpg'],
    eigenschappen: ['Vrolijk', 'Ondeugend', 'Unieke gangen']
  },
  {
    id: 9,
    naam: 'Vatino',
    ras: 'Onbekend',
    leeftijd: 'Onbekend',
    geslacht: 'Ruin' as const,
    kleur: 'Vos',
    beschrijving: 'Vatino is een hele mooie pony die heel fanatiek is in zijn werk. Vatino is een zoon van Ginger, ze hebben samen hoog niveau gelopen in eventing. Vatino is gevoelig met rijden maar een heel fijn rijpaard die zowel mee loopt met de dressuur lessen, springlessen en met de buitenritten. Hij loopt mee met de gemiddeld-gevorderd en met de gevorderde lessen.',
    hoofdfoto: '/paarden/vatino.jpg',
    foto_urls: ['/paarden/vatino.jpg'],
    eigenschappen: ['Spring talent', 'Energiek', 'Vriendelijk']
  },
  {
    id: 10,
    naam: 'Linde',
    ras: 'Welsh cob',
    leeftijd: 'Onbekend',
    geslacht: 'Merrie' as const,
    kleur: 'Bruin',
    beschrijving: 'Linde is een hele lieve en rustige merrie. Ze loopt altijd op haar gemakje mee in de lessen maar doet wel altijd haar best voor je. Linde vind het leuk om mee te gaan op buitenrit. Linde is geschikt voor alle niveau\'s.',
    hoofdfoto: '/paarden/linde.jpg',
    foto_urls: ['/paarden/linde.jpg'],
    eigenschappen: ['Lief', 'Geduldig', 'Allrounder']
  },
  {
    id: 11,
    naam: 'Skittle',
    ras: 'New Forest pony',
    leeftijd: 'Onbekend',
    geslacht: 'Ruin' as const,
    kleur: 'Schimmel',
    beschrijving: 'Skittle is heel lief, rustig en betrouwbaar, hij doet altijd zijn best voor je en geeft je een heel fijn en veilig gevoel. Skittle is een ervaren manege pony die voor alles ingezet kan worden. Hij springt graag.',
    hoofdfoto: '/paarden/skittle.jpg',
    foto_urls: ['/paarden/skittle.jpg'],
    eigenschappen: ['Pluizenbol', 'Ervaren', 'Kinderpony']
  },
  {
    id: 12,
    naam: 'Pietertje',
    ras: 'Kruising met fries',
    leeftijd: 'Onbekend',
    geslacht: 'Ruin' as const,
    kleur: 'Bruin',
    beschrijving: 'Pieter zijn 2e naam is ook wel de grote vriendelijke reus. Pietertje is een groot paard maar heeft een heel klein hartje. Pietertje kan fijn dressuren en loopt ook graag mee met de buitenritten. Hij loopt mee in de gemiddeld-gevorderd en de gevorderde lessen.',
    hoofdfoto: '/paarden/pietertje.jpg',
    foto_urls: ['/paarden/pietertje.jpg'],
    eigenschappen: ['Sociaal', 'Allrounder', 'Rustig']
  },
  {
    id: 13,
    naam: 'Bartje',
    ras: 'Kruising met trekpaard',
    leeftijd: 'Onbekend',
    geslacht: 'Ruin' as const,
    kleur: 'Bruin',
    beschrijving: 'Bartje is de grote vriend van Pietertje en volgt hem graag. Hij heeft een klein hartje van goud, Bartje is heel geduldig maar kan ook soms wat eigenwijs zijn. Hij loopt graag mee met de buitenritten, daar geniet hij volop van.',
    hoofdfoto: '/paarden/bartje.jpg',
    foto_urls: ['/paarden/bartje.jpg'],
    eigenschappen: ['Groot', 'Sociaal', 'Grappig']
  },
  {
    id: 14,
    naam: 'Platini',
    ras: 'KWPN',
    leeftijd: 'Onbekend',
    geslacht: 'Ruin' as const,
    kleur: 'Bruin',
    beschrijving: 'Platini is de oude vertrouwde van stal. Platini is ontzettend lief en kan soms wat eigenwijs zijn omdat hij graag de stal uit wilt. Hij vind het heerlijk om mee te gaan met de buitenritten en om de kinderen te leren paardrijden door zijn ervaringen. Gezien zijn leeftijd loopt Platini nog mee met de beginners lessen of met de privélessen.',
    hoofdfoto: '/paarden/platini.jpg',
    foto_urls: ['/paarden/platini.jpg'],
    eigenschappen: ['Betrouwbaar', 'Ervaren', 'Allrounder']
  },
  {
    id: 15,
    naam: 'Iske',
    ras: 'Fries',
    leeftijd: 'Onbekend',
    geslacht: 'Merrie' as const,
    kleur: 'Zwart',
    beschrijving: 'Iske is een mooie fries die graag mee loopt met de lessen en buitenritten. Iske heeft grote ruime gangen en is heel lief. Ze houdt er van om lekker gekriebeld te worden achter haar oren en om lekker gepoetst te worden. Ze loopt mee met de gemiddeld-gevorderd en de gevorderde lessen.',
    hoofdfoto: '/paarden/iske.jpg',
    foto_urls: ['/paarden/iske.jpg'],
    eigenschappen: ['Mooi', 'Ruime gangen', 'Allrounder']
  },
  {
    id: 16,
    naam: 'Jelle',
    ras: 'Onbekend',
    leeftijd: 'Onbekend',
    geslacht: 'Ruin' as const,
    kleur: 'Schimmel',
    beschrijving: 'Jelle is het bekendste paard van onze manege. Hij loopt al heel lang mee met de lessen en heeft al heel veel kinderen leren paardrijden. Jelle is heel lief maar ook heel eigenwijs, hij doet zelf waar hij zin in heeft, en dat is vaak de hoeken afsnijden. Zijn grote vriend is Hugo. Gezien zijn leeftijd loopt Jelle nog mee met de beginners lessen of met de privélessen.',
    hoofdfoto: '/paarden/jelle.jpg',
    foto_urls: ['/paarden/jelle.jpg'],
    eigenschappen: ['Eigenwijs', 'Lief', 'Grappig']
  },
  {
    id: 17,
    naam: 'Hugo',
    ras: 'Onbekend',
    leeftijd: 'Onbekend',
    geslacht: 'Ruin' as const,
    kleur: 'Bruin',
    beschrijving: 'Hugo is een hele lieve en ervaren ruin die ook al lang mee loopt met de lessen. Zijn grote vriend is Jelle, ze rijden graag samen in de les. Gezien zijn leeftijd loopt Hugo nog mee met de beginners lessen of met de privélessen.',
    hoofdfoto: '/paarden/hugo.jpg',
    foto_urls: ['/paarden/hugo.jpg'],
    eigenschappen: ['Lief', 'Ervaren', 'Betrouwbaar']
  }
]

export default function OnzePaardenPage() {
  const [paarden, setPaarden] = useState<Paard[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  // Load paarden from Supabase - DISABLED
  // useEffect(() => {
  //   loadPaarden()
  // }, [])

  // Load paarden from localStorage (admin updates)
  useEffect(() => {
    const savedPaarden = localStorage.getItem('manege-paarden')
    if (savedPaarden) {
      try {
        const parsedPaarden = JSON.parse(savedPaarden)
        if (parsedPaarden.length > 0) {
          setPaarden(parsedPaarden)
        } else {
          setPaarden(fallbackPaarden)
        }
      } catch (error) {
        console.error('Error parsing saved paarden:', error)
        setPaarden(fallbackPaarden)
      }
    } else {
      setPaarden(fallbackPaarden)
    }
  }, [])

  const loadPaarden = () => {
    // Database niet meer nodig - gebruik direct de fallback data
    setPaarden(fallbackPaarden)
    setLoading(false)
    setError(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Paarden laden...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadPaarden}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            Opnieuw proberen
          </button>
        </div>
      </div>
    )
  }

  // Fallback data als er geen paarden zijn
  const fallbackPaarden = [
    {
      id: 1,
      naam: 'Vina',
      ras: 'IJslander',
      leeftijd: 'Onbekend',
      geslacht: 'Merrie' as const,
      kleur: 'Zwart',
      beschrijving: 'Vina is een lieve merrie die heel erg geliefd is bij onze manege kinderen, ze loopt mee bij de beginners lessen maar ook bij de gemiddeld-gevorderden. Vina zit heel lekker door haar vlakke beweging.',
      hoofdfoto: '/paarden/vina.jpg',
      foto_urls: ['/paarden/vina.jpg'],
      eigenschappen: ['Lief', 'Betrouwbaar', 'Unieke gangen']
    },
    {
      id: 2,
      naam: 'Lotje',
      ras: 'Kruising Welsh en Haflinger',
      leeftijd: 'Onbekend',
      geslacht: 'Merrie' as const,
      kleur: 'Wildkleur bruin',
      beschrijving: 'Lotje is heel lief en houdt van knuffelen en poetsen maar kan soms een beetje ongeduldig zijn met opstappen. Lotje loopt graag door, ze rijdt mee met de gemiddeld-gevorderd lessen.',
      hoofdfoto: '/paarden/lotje.jpg',
      foto_urls: ['/paarden/lotje.jpg'],
      eigenschappen: ['Lief', 'Tempramentje', 'Knuffelkont']
    },
    {
      id: 3,
      naam: 'Lilly',
      ras: 'Kruising Welsh en Haflinger',
      leeftijd: 'Onbekend',
      geslacht: 'Merrie' as const,
      kleur: 'Wildkleur bruin',
      beschrijving: 'Lilly houdt heel erg van knuffelen en poetsen, ze heeft uren geduld. Lilly zit heel lekker met rijden en vooral met doorzitten maar ze kan soms ook een beetje eigenwijs zijn. Lilly loopt mee met de beginners-gemiddeld-gevorderden lessen.',
      hoofdfoto: '/paarden/lily.jpg',
      foto_urls: ['/paarden/lily.jpg'],
      eigenschappen: ['Knuffelkont', 'Betrouwbaar', 'Eigenwijs']
    },
    {
      id: 4,
      naam: 'Boy',
      ras: 'Onbekend',
      leeftijd: 'Onbekend',
      geslacht: 'Ruin' as const,
      kleur: 'Bruin',
      beschrijving: 'Boy kijkt vaak chagrijnig maar hij is super lief. Boy houdt er van om te springen en lekker op zijn gemakje mee te lopen met de dressuur lessen. Boy loopt mee met de gemiddeld-gevorderde en gevorderde lessen.',
      hoofdfoto: '/paarden/boy.jpg',
      foto_urls: ['/paarden/boy.jpg'],
      eigenschappen: ['Lief', 'Eigenwijs', 'Mooi']
    },
    {
      id: 5,
      naam: 'Ginger (Risico)',
      ras: 'Onbekend',
      leeftijd: 'Onbekend',
      geslacht: 'Merrie' as const,
      kleur: 'Vos',
      beschrijving: 'Ginger haar eigen naam is officieel Risico maar ze hebben haar Ginger genoemd door haar mooie kleur. Ginger is een echte allrounder, Ginger kan alles. Zowel springen als dressuurmatig. Ze heeft vroeger ook Eventing gelopen op een hoog niveau. Ginger is ook bij veel kinderen geliefd door haar lieve en betrouwbare karakter. Ginger gaat graag voor je door het vuur. Ginger is geschikt voor alle niveaus.',
      hoofdfoto: '/paarden/ginger.jpg',
      foto_urls: ['/paarden/ginger.jpg'],
      eigenschappen: ['Voorwaarts', 'Betrouwbaar', 'Ervaren']
    },
    {
      id: 6,
      naam: 'Cookie',
      ras: 'Kruising met koudbloed',
      leeftijd: 'Jong',
      geslacht: 'Merrie' as const,
      kleur: 'Vos bont',
      beschrijving: 'Ondanks haar jonge leeftijd leert Cookie heel snel en pakt het werk heel snel en goed op. Ze is bombroof en super lief. Ze houdt van knuffelen en poetsen en gaat ook graag voor je aan het werk in de lessen, zelfs als ze het niet helemaal meer begrijpt blijft ze netjes naar je luisteren. Door haar jonge leeftijd loopt Cookie nu mee in de gemiddeld-gevorderden en de gevorderden lessen mee wat ze heel goed doet.',
      hoofdfoto: '/paarden/cookie.jpg',
      foto_urls: ['/paarden/cookie.jpg'],
      eigenschappen: ['Vrolijk', 'Kinderpony', 'Grappig']
    },
    {
      id: 7,
      naam: 'Uquebelle',
      ras: 'Frans ras',
      leeftijd: 'Onbekend',
      geslacht: 'Ruin' as const,
      kleur: 'Zwart',
      beschrijving: 'Uquebelle is een hele lieve betrouwbare ruin die al lang mee loopt met de manege lessen. Uquebelle heeft veel ervaring in de lessen en op buitenritten. Hij heeft vroeger mee gelopen met de ravelijn show waardoor zijn bijnaam \'trucebelle\' is, omdat hij nog kunstjes kent en ook goed van voltigeren.',
      hoofdfoto: '/paarden/uquebelle.jpg',
      foto_urls: ['/paarden/uquebelle.jpg'],
      eigenschappen: ['Ervaren', 'Sociaal', 'Allrounder']
    },
    {
      id: 8,
      naam: 'Fönix',
      ras: 'IJslander',
      leeftijd: 'Onbekend',
      geslacht: 'Ruin' as const,
      kleur: 'Vos',
      beschrijving: 'Fönix is een heel vrolijk en sprekend paard. Hij is onze nieuwste aanwinst en loopt voornamelijk mee met de buitenritten en in de gevorderde lessen omdat hij nog niet heel ervaren is.',
      hoofdfoto: '/paarden/fonix.jpg',
      foto_urls: ['/paarden/fonix.jpg'],
      eigenschappen: ['Vrolijk', 'Ondeugend', 'Unieke gangen']
    },
    {
      id: 9,
      naam: 'Vatino',
      ras: 'Onbekend',
      leeftijd: 'Onbekend',
      geslacht: 'Ruin' as const,
      kleur: 'Vos',
      beschrijving: 'Vatino is een hele mooie pony die heel fanatiek is in zijn werk. Vatino is een zoon van Ginger, ze hebben samen hoog niveau gelopen in eventing. Vatino is gevoelig met rijden maar een heel fijn rijpaard die zowel mee loopt met de dressuur lessen, springlessen en met de buitenritten. Hij loopt mee met de gemiddeld-gevorderd en met de gevorderde lessen.',
      hoofdfoto: '/paarden/vatino.jpg',
      foto_urls: ['/paarden/vatino.jpg'],
      eigenschappen: ['Spring talent', 'Energiek', 'Vriendelijk']
    },
    {
      id: 10,
      naam: 'Linde',
      ras: 'Welsh cob',
      leeftijd: 'Onbekend',
      geslacht: 'Merrie' as const,
      kleur: 'Bruin',
      beschrijving: 'Linde is een hele lieve en rustige merrie. Ze loopt altijd op haar gemakje mee in de lessen maar doet wel altijd haar best voor je. Linde vind het leuk om mee te gaan op buitenrit. Linde is geschikt voor alle niveau\'s.',
      hoofdfoto: '/paarden/linde.jpg',
      foto_urls: ['/paarden/linde.jpg'],
      eigenschappen: ['Lief', 'Geduldig', 'Allrounder']
    },
    {
      id: 11,
      naam: 'Skittle',
      ras: 'New Forest pony',
      leeftijd: 'Onbekend',
      geslacht: 'Ruin' as const,
      kleur: 'Schimmel',
      beschrijving: 'Skittle is heel lief, rustig en betrouwbaar, hij doet altijd zijn best voor je en geeft je een heel fijn en veilig gevoel. Skittle is een ervaren manege pony die voor alles ingezet kan worden. Hij springt graag.',
      hoofdfoto: '/paarden/skittle.jpg',
      foto_urls: ['/paarden/skittle.jpg'],
      eigenschappen: ['Pluizenbol', 'Ervaren', 'Kinderpony']
    },
    {
      id: 12,
      naam: 'Pietertje',
      ras: 'Kruising met fries',
      leeftijd: 'Onbekend',
      geslacht: 'Ruin' as const,
      kleur: 'Bruin',
      beschrijving: 'Pieter zijn 2e naam is ook wel de grote vriendelijke reus. Pietertje is een groot paard maar heeft een heel klein hartje. Pietertje kan fijn dressuren en loopt ook graag mee met de buitenritten. Hij loopt mee in de gemiddeld-gevorderd en de gevorderde lessen.',
      hoofdfoto: '/paarden/pietertje.jpg',
      foto_urls: ['/paarden/pietertje.jpg'],
      eigenschappen: ['Sociaal', 'Allrounder', 'Rustig']
    },
    {
      id: 13,
      naam: 'Bartje',
      ras: 'Kruising met trekpaard',
      leeftijd: 'Onbekend',
      geslacht: 'Ruin' as const,
      kleur: 'Bruin',
      beschrijving: 'Bartje is de grote vriend van Pietertje en volgt hem graag. Hij heeft een klein hartje van goud, Bartje is heel geduldig maar kan ook soms wat eigenwijs zijn. Hij loopt graag mee met de buitenritten, daar geniet hij volop van.',
      hoofdfoto: '/paarden/bartje.jpg',
      foto_urls: ['/paarden/bartje.jpg'],
      eigenschappen: ['Groot', 'Sociaal', 'Grappig']
    },
    {
      id: 14,
      naam: 'Platini',
      ras: 'KWPN',
      leeftijd: 'Onbekend',
      geslacht: 'Ruin' as const,
      kleur: 'Bruin',
      beschrijving: 'Platini is de oude vertrouwde van stal. Platini is ontzettend lief en kan soms wat eigenwijs zijn omdat hij graag de stal uit wilt. Hij vind het heerlijk om mee te gaan met de buitenritten en om de kinderen te leren paardrijden door zijn ervaringen. Gezien zijn leeftijd loopt Platini nog mee met de beginners lessen of met de privélessen.',
      hoofdfoto: '/paarden/platini.jpg',
      foto_urls: ['/paarden/platini.jpg'],
      eigenschappen: ['Betrouwbaar', 'Ervaren', 'Allrounder']
    },
    {
      id: 15,
      naam: 'Iske',
      ras: 'Fries',
      leeftijd: 'Onbekend',
      geslacht: 'Merrie' as const,
      kleur: 'Zwart',
      beschrijving: 'Iske is een mooie fries die graag mee loopt met de lessen en buitenritten. Iske heeft grote ruime gangen en is heel lief. Ze houdt er van om lekker gekriebeld te worden achter haar oren en om lekker gepoetst te worden. Ze loopt mee met de gemiddeld-gevorderd en de gevorderde lessen.',
      hoofdfoto: '/paarden/iske.jpg',
      foto_urls: ['/paarden/iske.jpg'],
      eigenschappen: ['Mooi', 'Ruime gangen', 'Allrounder']
    },
    {
      id: 16,
      naam: 'Jelle',
      ras: 'Onbekend',
      leeftijd: 'Onbekend',
      geslacht: 'Ruin' as const,
      kleur: 'Schimmel',
      beschrijving: 'Jelle is het bekendste paard van onze manege. Hij loopt al heel lang mee met de lessen en heeft al heel veel kinderen leren paardrijden. Jelle is heel lief maar ook heel eigenwijs, hij doet zelf waar hij zin in heeft, en dat is vaak de hoeken afsnijden. Zijn grote vriend is Hugo. Gezien zijn leeftijd loopt Jelle nog mee met de beginners lessen of met de privélessen.',
      hoofdfoto: '/paarden/jelle.jpg',
      foto_urls: ['/paarden/jelle.jpg'],
      eigenschappen: ['Eigenwijs', 'Lief', 'Grappig']
    },
    {
      id: 17,
      naam: 'Hugo',
      ras: 'Onbekend',
      leeftijd: 'Onbekend',
      geslacht: 'Ruin' as const,
      kleur: 'Bruin',
      beschrijving: 'Hugo is een hele lieve en ervaren ruin die ook al lang mee loopt met de lessen. Zijn grote vriend is Jelle, ze rijden graag samen in de les. Gezien zijn leeftijd loopt Hugo nog mee met de beginners lessen of met de privélessen.',
      hoofdfoto: '/paarden/hugo.jpg',
      foto_urls: ['/paarden/hugo.jpg'],
      eigenschappen: ['Lief', 'Rustig', 'Betrouwbaar']
    }
  ]

  // Use fallback paarden (de nieuwe paarden) - gesorteerd op alfabetische volgorde
  const displayPaarden = fallbackPaarden.sort((a, b) => a.naam.localeCompare(b.naam, 'nl'))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Onze 
            <span className="text-pink-600"> Paarden</span>
          </motion.h1>
          
          {/* Leuke Icons */}
          <motion.div 
            className="flex justify-center items-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-8 h-8 text-pink-500" />
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: [0, -15, 15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Heart className="w-8 h-8 text-red-500" />
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: [0, 20, -20, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Star className="w-8 h-8 text-yellow-500" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <Users className="w-12 h-12 text-pink-600 mx-auto mb-3" />
            <AnimatedCounter end={17} duration={2000} />
            <div className="text-gray-600">Prachtige Paarden</div>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <Star className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <AnimatedCounter end={20} duration={2500} suffix="+" />
            <div className="text-gray-600">Jaar Ervaring</div>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <Heart className="w-12 h-12 text-pink-600 mx-auto mb-3" />
            <AnimatedCounter end={100} duration={3000} suffix="%" />
            <div className="text-gray-600">Passie & Liefde</div>
          </div>
        </motion.div>

        {/* Paarden Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayPaarden.map((paard) => (
            <motion.div
              key={paard.id}
              variants={cardVariants}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Foto */}
              <div className={`relative h-64 overflow-hidden ${(paard.naam === 'Fönix') || (paard.naam === 'Skittle') || (paard.naam === 'Linde') || (paard.naam === 'Cookie') || (paard.naam === 'Jelle') || (paard.naam === 'Uquebelle') || (paard.naam === 'Boy') || (paard.naam === 'Bartje') || (paard.naam === 'Ginger (Risico)') || (paard.naam === 'Hugo') || (paard.naam === 'Iske') || (paard.naam === 'Lilly') || (paard.naam === 'Lotje') || (paard.naam === 'Pietertje') || (paard.naam === 'Platini') || (paard.naam === 'Vatino') || (paard.naam === 'Vina') ? 'bg-black' : ''}`}>
                {(paard.hoofdfoto && paard.hoofdfoto.startsWith('data:')) || (paard.naam === 'Fönix') || (paard.naam === 'Skittle') || (paard.naam === 'Linde') || (paard.naam === 'Cookie') || (paard.naam === 'Jelle') || (paard.naam === 'Uquebelle') || (paard.naam === 'Boy') || (paard.naam === 'Bartje') || (paard.naam === 'Ginger (Risico)') || (paard.naam === 'Hugo') || (paard.naam === 'Iske') || (paard.naam === 'Lilly') || (paard.naam === 'Lotje') || (paard.naam === 'Pietertje') || (paard.naam === 'Platini') || (paard.naam === 'Vatino') || (paard.naam === 'Vina') ? (
                  <img
                    src={paard.hoofdfoto}
                    alt={paard.naam}
                    className={`w-full h-full ${(paard.naam === 'Fönix') || (paard.naam === 'Skittle') || (paard.naam === 'Linde') || (paard.naam === 'Cookie') || (paard.naam === 'Jelle') || (paard.naam === 'Uquebelle') || (paard.naam === 'Boy') || (paard.naam === 'Bartje') || (paard.naam === 'Ginger (Risico)') || (paard.naam === 'Hugo') || (paard.naam === 'Iske') || (paard.naam === 'Lilly') || (paard.naam === 'Lotje') || (paard.naam === 'Pietertje') || (paard.naam === 'Platini') || (paard.naam === 'Vatino') || (paard.naam === 'Vina') ? 'object-contain' : 'object-cover'}`}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-blue-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Heart className="w-16 h-16 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Foto van {paard.naam}</p>
                      <p className="text-xs opacity-75">Wordt binnenkort toegevoegd</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-pink-600 group-hover:text-pink-700 transition-colors">
                    {paard.naam}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {paard.geslacht}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-16">Kleur:</span>
                    <span>{paard.kleur}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">
                  {paard.beschrijving}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {paard.eigenschappen.map((eigenschap, index) => (
                    <motion.span
                      key={index}
                      className="bg-gradient-to-r from-pink-100 to-blue-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {eigenschap}
                    </motion.span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>


        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Klaar om te rijden op deze prachtige paarden?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Of je nu droomt van dressuur, springen, basislessen of rijden op IJslandse paarden – bij ons begint jouw ruiteravontuur.
          </p>
          <motion.a
            href="/lessen"
            className="inline-block bg-gradient-to-r from-pink-600 to-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:from-pink-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Bekijk onze lessen
          </motion.a>
        </motion.div>

      </div>
    </div>
  )
}
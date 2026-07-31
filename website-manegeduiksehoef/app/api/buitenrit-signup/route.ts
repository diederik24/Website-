import { NextRequest, NextResponse } from 'next/server'
import { sendBuitenritSignupEmail, BuitenritSignupData } from '@/lib/buitenrit-email'
import { getBuitenritOptie } from '@/lib/buitenrit-opties'

type RiderInput = { lengte?: string; gewicht?: string }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validatie van de formulier data
    const { name, email, phone, experience, persons, ritOption, arrangement, experienceDetails, notes, riders, selectedDate } = body
    
    if (!name || !email || !phone || !experience || !persons || !ritOption || !selectedDate) {
      return NextResponse.json(
        { error: 'Alle verplichte velden moeten worden ingevuld.' },
        { status: 400 }
      )
    }

    const gekozenOptie = getBuitenritOptie(ritOption)
    if (!gekozenOptie) {
      return NextResponse.json(
        { error: 'Kies een geldige ritoptie.' },
        { status: 400 }
      )
    }

    const personsCount = parseInt(persons, 10)
    const minPersons = gekozenOptie.type === 'prive' ? 1 : 2
    const maxPersons = 6

    if (!Number.isFinite(personsCount) || personsCount < minPersons || personsCount > maxPersons) {
      return NextResponse.json(
        {
          error: gekozenOptie.type === 'prive'
            ? 'Privérit: kies 1 tot 6 personen.'
            : 'Groepsrit: minimaal 2 en maximaal 6 personen.',
        },
        { status: 400 }
      )
    }

    const ridersList: RiderInput[] = Array.isArray(riders) ? riders : []
    if (ridersList.length !== personsCount) {
      return NextResponse.json(
        { error: 'Vul lengte en gewicht in voor iedere ruiter.' },
        { status: 400 }
      )
    }

    const normalizedRiders = ridersList.map((rider, index) => {
      const lengte = String(rider?.lengte || '').trim()
      const gewicht = String(rider?.gewicht || '').trim()
      const lengteNum = parseFloat(lengte)
      const gewichtNum = parseFloat(gewicht)

      if (!lengte || !gewicht || !Number.isFinite(lengteNum) || !Number.isFinite(gewichtNum)) {
        throw new Error(`Lengte en gewicht ontbreken voor ruiter ${index + 1}.`)
      }

      if (lengteNum < 100 || lengteNum > 230) {
        throw new Error(`Lengte van ruiter ${index + 1} moet tussen 100 en 230 cm liggen.`)
      }

      if (gewichtNum < 30 || gewichtNum > 150) {
        throw new Error(`Gewicht van ruiter ${index + 1} moet tussen 30 en 150 kg liggen.`)
      }

      return {
        lengte: `${lengteNum}`,
        gewicht: `${gewichtNum}`,
      }
    })
    
    // E-mail validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Voer een geldig e-mailadres in.' },
        { status: 400 }
      )
    }
    
    // Telefoon validatie
    if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Voer een geldig telefoonnummer in.' },
        { status: 400 }
      )
    }
    
    // Formulier data voorbereiden
    const formData: BuitenritSignupData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      experience: experience.trim(),
      persons: String(personsCount),
      ritOption: gekozenOptie.id,
      arrangement: arrangement || false,
      experienceDetails: experienceDetails?.trim() || '',
      notes: notes?.trim() || '',
      riders: normalizedRiders,
      selectedDate: {
        day: selectedDate.day,
        month: selectedDate.month,
        year: selectedDate.year,
        type: selectedDate.type
      }
    }
    
    // E-mail verzenden
    const result = await sendBuitenritSignupEmail(formData)
    
    return NextResponse.json({
      success: true,
      message: 'Je aanmelding is succesvol verzonden! Wij nemen zo snel mogelijk contact met je op.',
      messageId: result.messageId
    })
    
  } catch (error) {
    console.error('Buitenrit signup error:', error)
    
    // Meer gedetailleerde error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    // Check of het een SMTP configuratie probleem is
    const errorMessage = error instanceof Error ? error.message : 'Er is een onverwachte fout opgetreden.'

    if (
      errorMessage.includes('Lengte') ||
      errorMessage.includes('Gewicht') ||
      errorMessage.includes('lengte') ||
      errorMessage.includes('gewicht')
    ) {
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }
    
    // Geef meer informatieve error terug
    let userFriendlyError = 'Er is een fout opgetreden bij het verzenden van de aanmelding.'
    
    if (errorMessage.includes('SMTP configuratie')) {
      userFriendlyError = 'Email configuratie probleem. Neem contact op met de beheerder.'
    } else if (errorMessage.includes('timeout') || errorMessage.includes('connection')) {
      userFriendlyError = 'Verbindingsprobleem met de email server. Probeer het later opnieuw.'
    }
    
    return NextResponse.json(
      { 
        error: userFriendlyError,
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}

// Handle andere HTTP methoden
export async function GET() {
  return NextResponse.json(
    { error: 'Deze endpoint ondersteunt alleen POST requests.' },
    { status: 405 }
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { sendLessonSignupEmail, LessonSignupData } from '@/lib/lesson-email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validatie van de formulier data
    const { voornaam, achternaam, geboortedatum, adres, postcode, plaats, email, telefoon1, telefoon2, noodNaam, noodTelefoon, aanmeldingType, opmerking } = body
    
    if (!voornaam || !achternaam || !geboortedatum || !adres || !postcode || !plaats || !email || !telefoon1 || !noodNaam || !noodTelefoon || !aanmeldingType) {
      return NextResponse.json(
        { error: 'Alle verplichte velden moeten worden ingevuld.' },
        { status: 400 }
      )
    }
    
    // E-mail validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Voer een geldig e-mailadres in.' },
        { status: 400 }
      )
    }
    
    // Telefoon validatie
    if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(telefoon1)) {
      return NextResponse.json(
        { error: 'Voer een geldig telefoonnummer 1 in.' },
        { status: 400 }
      )
    }
    
    // Telefoon 2 validatie (optioneel)
    if (telefoon2 && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(telefoon2)) {
      return NextResponse.json(
        { error: 'Voer een geldig telefoonnummer 2 in.' },
        { status: 400 }
      )
    }
    
    // Noodtelefoon validatie
    if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(noodTelefoon)) {
      return NextResponse.json(
        { error: 'Voer een geldig noodtelefoonnummer in.' },
        { status: 400 }
      )
    }
    
    // Formulier data voorbereiden
    const formData: LessonSignupData = {
      voornaam: voornaam.trim(),
      achternaam: achternaam.trim(),
      geboortedatum: geboortedatum.trim(),
      adres: adres.trim(),
      postcode: postcode.trim(),
      plaats: plaats.trim(),
      email: email.trim().toLowerCase(),
      telefoon1: telefoon1.trim(),
      telefoon2: telefoon2?.trim() || undefined,
      noodNaam: noodNaam.trim(),
      noodTelefoon: noodTelefoon.trim(),
      aanmeldingType: aanmeldingType.trim(),
      opmerking: opmerking?.trim() || undefined
    }
    
    // E-mail verzenden
    const result = await sendLessonSignupEmail(formData)
    
    return NextResponse.json({
      success: true,
      message: 'Uw aanmelding is succesvol verzonden! Wij nemen zo snel mogelijk contact met u op om de lessen in te plannen.',
      messageId: result.messageId
    })
    
  } catch (error) {
    console.error('Lesson signup form error:', error)
    
    return NextResponse.json(
      { 
        error: error instanceof Error 
          ? error.message 
          : 'Er is een onverwachte fout opgetreden. Probeer het later opnieuw.' 
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

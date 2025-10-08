import { NextRequest, NextResponse } from 'next/server'
import { sendBuitenritSignupEmail, BuitenritSignupData } from '@/lib/buitenrit-email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validatie van de formulier data
    const { name, email, phone, experience, persons, arrangement, experienceDetails, notes, selectedDate } = body
    
    if (!name || !email || !phone || !experience || !persons || !selectedDate) {
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
      persons: persons.trim(),
      arrangement: arrangement || false,
      experienceDetails: experienceDetails?.trim() || '',
      notes: notes?.trim() || '',
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




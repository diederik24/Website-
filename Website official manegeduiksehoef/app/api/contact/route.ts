import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, ContactFormData } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validatie van de formulier data
    const { naam, email, telefoon, onderwerp, bericht } = body
    
    if (!naam || !email || !onderwerp || !bericht) {
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
    
    // Telefoon validatie (optioneel)
    if (telefoon && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(telefoon)) {
      return NextResponse.json(
        { error: 'Voer een geldig telefoonnummer in.' },
        { status: 400 }
      )
    }
    
    // Formulier data voorbereiden
    const formData: ContactFormData = {
      naam: naam.trim(),
      email: email.trim().toLowerCase(),
      telefoon: telefoon?.trim() || undefined,
      onderwerp: onderwerp.trim(),
      bericht: bericht.trim()
    }
    
    // E-mail verzenden
    const result = await sendContactEmail(formData)
    
    return NextResponse.json({
      success: true,
      message: 'Uw bericht is succesvol verzonden! Wij nemen zo snel mogelijk contact met u op.',
      messageId: result.messageId
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    
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





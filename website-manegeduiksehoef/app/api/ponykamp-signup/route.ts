import { NextRequest, NextResponse } from 'next/server'
import { sendPonykampSignupEmail, PonykampSignupData } from '@/lib/ponykamp-email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validatie van de formulier data
    const { childName, childAge, parentName, parentEmail, parentPhone, emergencyContact, allergies, medications, experience, notes } = body
    
    if (!childName || !childAge || !parentName || !parentEmail || !parentPhone) {
      return NextResponse.json(
        { error: 'Alle verplichte velden moeten worden ingevuld.' },
        { status: 400 }
      )
    }
    
    // E-mail validatie
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(parentEmail)) {
      return NextResponse.json(
        { error: 'Voer een geldig e-mailadres in.' },
        { status: 400 }
      )
    }
    
    // Telefoon validatie
    if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(parentPhone)) {
      return NextResponse.json(
        { error: 'Voer een geldig telefoonnummer in.' },
        { status: 400 }
      )
    }

    // Noodcontact validatie (als ingevuld)
    if (emergencyContact && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(emergencyContact)) {
      return NextResponse.json(
        { error: 'Voer een geldig noodcontact telefoonnummer in.' },
        { status: 400 }
      )
    }
    
    // Formulier data voorbereiden
    const formData: PonykampSignupData = {
      childName: childName.trim(),
      childAge: childAge.trim(),
      parentName: parentName.trim(),
      parentEmail: parentEmail.trim().toLowerCase(),
      parentPhone: parentPhone.trim(),
      emergencyContact: emergencyContact?.trim() || undefined,
      allergies: allergies?.trim() || undefined,
      medications: medications?.trim() || undefined,
      experience: experience?.trim() || undefined,
      notes: notes?.trim() || undefined
    }
    
    // E-mail verzenden
    const result = await sendPonykampSignupEmail(formData)
    
    return NextResponse.json({
      success: true,
      message: 'Je aanmelding voor het ponykamp is succesvol verzonden! Wij nemen zo snel mogelijk contact met je op.',
      messageId: result.messageId
    })
    
  } catch (error) {
    console.error('Ponykamp signup error:', error)
    
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




import nodemailer from 'nodemailer'

export interface PonykampSignupData {
  childName: string
  childAge: string
  parentName: string
  parentEmail: string
  parentPhone: string
  emergencyContact?: string
  allergies?: string
  medications?: string
  experience?: string
  notes?: string
}

export async function sendPonykampSignupEmail(formData: PonykampSignupData) {
  // Gmail transporter configuratie
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // contact.manegeduiksehoef@gmail.com
      pass: process.env.GMAIL_APP_PASSWORD // App-specifiek wachtwoord
    }
  })

  // E-mail template
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Stuur naar zichzelf
    replyTo: formData.parentEmail, // Laat antwoorden naar de ouder gaan
    subject: `Ponykamp Aanmelding: ${formData.childName} - ${formData.parentName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🐴 Manege Duikse Hoef</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Nieuwe ponykamp aanmelding</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #374151; margin-top: 0; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            Ponykamp Details
          </h2>
          
          <div style="margin-bottom: 20px; padding: 15px; background: #f0fdf4; border-radius: 10px; border-left: 4px solid #ec4899;">
            <strong style="color: #065f46;">Ponykamp:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 18px; font-weight: bold;">13-15 Oktober 2025</p>
            <strong style="color: #065f46;">Prijs:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px; font-weight: bold;">€175,- voor 3 dagen</p>
          </div>

          <h2 style="color: #374151; margin-top: 30px; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            Gegevens Kind
          </h2>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Naam:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.childName}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Leeftijd:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.childAge} jaar</p>
          </div>

          <h2 style="color: #374151; margin-top: 30px; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            Gegevens Ouder/Verzorger
          </h2>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Naam:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.parentName}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">E-mail:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">
              <a href="mailto:${formData.parentEmail}" style="color: #ec4899; text-decoration: none;">${formData.parentEmail}</a>
            </p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Telefoon:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">
              <a href="tel:${formData.parentPhone}" style="color: #ec4899; text-decoration: none;">${formData.parentPhone}</a>
            </p>
          </div>

          ${formData.emergencyContact ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Noodcontact:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">
              <a href="tel:${formData.emergencyContact}" style="color: #ec4899; text-decoration: none;">${formData.emergencyContact}</a>
            </p>
          </div>
          ` : ''}

          ${formData.allergies ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Allergieën:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px; line-height: 1.6;">${formData.allergies}</p>
          </div>
          ` : ''}

          ${formData.medications ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Medicatie:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px; line-height: 1.6;">${formData.medications}</p>
          </div>
          ` : ''}

          ${formData.experience ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Rijervaring:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.experience}</p>
          </div>
          ` : ''}

          ${formData.notes ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Opmerkingen:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${formData.notes}</p>
          </div>
          ` : ''}
        </div>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; text-align: center; margin-top: 20px;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            Verzonden op: ${new Date().toLocaleString('nl-NL')}<br>
            Via: manegeduiksehoef.nl
          </p>
        </div>
      </div>
    `,
    text: `
Manege Duikse Hoef - Nieuwe ponykamp aanmelding

Ponykamp Details:
- Ponykamp: 13-15 Oktober 2025
- Prijs: €175,- voor 3 dagen

Gegevens Kind:
- Naam: ${formData.childName}
- Leeftijd: ${formData.childAge} jaar

Gegevens Ouder/Verzorger:
- Naam: ${formData.parentName}
- E-mail: ${formData.parentEmail}
- Telefoon: ${formData.parentPhone}
${formData.emergencyContact ? `- Noodcontact: ${formData.emergencyContact}` : ''}

${formData.allergies ? `Allergieën:\n${formData.allergies}\n` : ''}
${formData.medications ? `Medicatie:\n${formData.medications}\n` : ''}
${formData.experience ? `Rijervaring: ${formData.experience}\n` : ''}
${formData.notes ? `Opmerkingen:\n${formData.notes}\n` : ''}

---
Verzonden op: ${new Date().toLocaleString('nl-NL')}
Via: manegeduiksehoef.nl
    `
  }

  try {
    const result = await transporter.sendMail(mailOptions)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    throw new Error('Er is een fout opgetreden bij het verzenden van de aanmelding. Probeer het later opnieuw.')
  }
}




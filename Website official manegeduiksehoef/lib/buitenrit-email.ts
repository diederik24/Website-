import nodemailer from 'nodemailer'

export interface BuitenritSignupData {
  name: string
  email: string
  phone: string
  experience: string
  persons: string
  arrangement: boolean
  experienceDetails?: string
  notes?: string
  selectedDate: {
    day: number
    month: number
    year: number
    type: 'buitenrit' | 'arrangement'
  }
}

export async function sendBuitenritSignupEmail(formData: BuitenritSignupData) {
  // Gmail transporter configuratie
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // contact.manegeduiksehoef@gmail.com
      pass: process.env.GMAIL_APP_PASSWORD // App-specifiek wachtwoord
    }
  })

  const months = [
    'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
    'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
  ]

  const dateString = `${formData.selectedDate.day} ${months[formData.selectedDate.month]} ${formData.selectedDate.year}`
  const timeString = formData.selectedDate.type === 'arrangement' ? '09:15 - 12:00' : '10:00 - 11:30'
  const price = formData.arrangement ? '€62,50' : '€47,50'

  // E-mail template
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Stuur naar zichzelf
    replyTo: formData.email, // Laat antwoorden naar de klant gaan
    subject: `Buitenrit Aanmelding: ${formData.name} - ${dateString}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🐴 Manege Duikse Hoef</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Nieuwe buitenrit aanmelding</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #374151; margin-top: 0; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
            Rit Details
          </h2>
          
          <div style="margin-bottom: 20px; padding: 15px; background: #f0fdf4; border-radius: 10px; border-left: 4px solid #10b981;">
            <strong style="color: #065f46;">Datum:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 18px; font-weight: bold;">${dateString}</p>
            <strong style="color: #065f46;">Tijd:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${timeString}</p>
            <strong style="color: #065f46;">Type:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px; font-weight: bold; color: #10b981;">
              ${formData.selectedDate.type === 'arrangement' ? 'Buitenrit Arrangement' : 'Buitenrit 1,5 uur'}
            </p>
            <strong style="color: #065f46;">Prijs:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px; font-weight: bold;">${price} per persoon</p>
          </div>

          <h2 style="color: #374151; margin-top: 30px; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
            Persoonlijke Gegevens
          </h2>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Naam:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.name}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">E-mail:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">
              <a href="mailto:${formData.email}" style="color: #10b981; text-decoration: none;">${formData.email}</a>
            </p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Telefoon:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">
              <a href="tel:${formData.phone}" style="color: #10b981; text-decoration: none;">${formData.phone}</a>
            </p>
          </div>

          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Ervaring:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.experience}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Aantal personen:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.persons}</p>
          </div>

          ${formData.arrangement ? `
          <div style="margin-bottom: 20px; padding: 15px; background: #faf5ff; border-radius: 10px; border-left: 4px solid #8b5cf6;">
            <strong style="color: #6b21a8;">✨ Arrangement Upgrade:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">Ja - Inclusief koffie, buitenrit en lekkere lunch</p>
          </div>
          ` : ''}

          ${formData.experienceDetails ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Ervaring Details:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${formData.experienceDetails}</p>
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
Manege Duikse Hoef - Nieuwe buitenrit aanmelding

Rit Details:
- Datum: ${dateString}
- Tijd: ${timeString}
- Type: ${formData.selectedDate.type === 'arrangement' ? 'Buitenrit Arrangement' : 'Buitenrit 1,5 uur'}
- Prijs: ${price} per persoon

Persoonlijke Gegevens:
- Naam: ${formData.name}
- E-mail: ${formData.email}
- Telefoon: ${formData.phone}
- Ervaring: ${formData.experience}
- Aantal personen: ${formData.persons}
${formData.arrangement ? '- Arrangement: Ja (koffie + lunch)' : ''}

${formData.experienceDetails ? `Ervaring Details:\n${formData.experienceDetails}\n` : ''}
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

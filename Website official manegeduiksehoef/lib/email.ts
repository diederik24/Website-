import nodemailer from 'nodemailer'

export interface ContactFormData {
  naam: string
  email: string
  telefoon?: string
  onderwerp: string
  bericht: string
}

export async function sendContactEmail(formData: ContactFormData) {
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
    replyTo: formData.email, // Laat antwoorden naar de klant gaan
    subject: `Contactformulier: ${formData.onderwerp} - ${formData.naam}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🐴 Manege Duikse Hoef</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Nieuw contactformulier bericht</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #374151; margin-top: 0; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            Contactgegevens
          </h2>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Naam:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.naam}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">E-mail:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">
              <a href="mailto:${formData.email}" style="color: #ec4899; text-decoration: none;">${formData.email}</a>
            </p>
          </div>
          
          ${formData.telefoon ? `
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Telefoon:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">
              <a href="tel:${formData.telefoon}" style="color: #ec4899; text-decoration: none;">${formData.telefoon}</a>
            </p>
          </div>
          ` : ''}
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Onderwerp:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.onderwerp}</p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <strong style="color: #6b7280;">Bericht:</strong>
            <div style="margin: 10px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #ec4899; border-radius: 5px;">
              <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${formData.bericht}</p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; background-color: #f0f9ff; border-radius: 10px; border: 1px solid #e0f2fe;">
            <p style="margin: 0; color: #0369a1; font-size: 14px;">
              💡 <strong>Tip:</strong> Klik op het e-mailadres of telefoonnummer om direct contact op te nemen.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px;">
          <p>Dit bericht is verzonden via het contactformulier op manegeduiksehoef.nl</p>
          <p>Verzonden op: ${new Date().toLocaleString('nl-NL')}</p>
        </div>
      </div>
    `,
    text: `
Manege Duikse Hoef - Nieuw contactformulier bericht

Contactgegevens:
- Naam: ${formData.naam}
- E-mail: ${formData.email}
${formData.telefoon ? `- Telefoon: ${formData.telefoon}` : ''}
- Onderwerp: ${formData.onderwerp}

Bericht:
${formData.bericht}

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
    throw new Error('Er is een fout opgetreden bij het verzenden van het bericht. Probeer het later opnieuw.')
  }
}

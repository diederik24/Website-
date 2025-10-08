import nodemailer from 'nodemailer'

export interface LessonSignupData {
  voornaam: string
  achternaam: string
  geboortedatum: string
  adres: string
  postcode: string
  plaats: string
  email: string
  telefoon1: string
  telefoon2?: string
  noodNaam: string
  noodTelefoon: string
  aanmeldingType: string
  opmerking?: string
}

export async function sendLessonSignupEmail(formData: LessonSignupData) {
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
    subject: `Lesaanmelding: ${formData.voornaam} ${formData.achternaam}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🐴 Manege Duikse Hoef</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Nieuwe lesaanmelding</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #374151; margin-top: 0; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            Persoonlijke Gegevens
          </h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #6b7280;">Naam:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.voornaam} ${formData.achternaam}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #6b7280;">Geboortedatum:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.geboortedatum}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #6b7280;">Aanmelding type:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px; font-weight: bold; color: #ec4899;">${formData.aanmeldingType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          </div>
          
          <h2 style="color: #374151; margin-top: 30px; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            Adresgegevens
          </h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #6b7280;">Adres:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.adres}</p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #6b7280;">Postcode en Plaats:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.postcode} ${formData.plaats}</p>
          </div>
          
          <h2 style="color: #374151; margin-top: 30px; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            Contactgegevens
          </h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #6b7280;">E-mail:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">
              <a href="mailto:${formData.email}" style="color: #ec4899; text-decoration: none;">${formData.email}</a>
            </p>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #6b7280;">Telefoon 1:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">
              <a href="tel:${formData.telefoon1}" style="color: #ec4899; text-decoration: none;">${formData.telefoon1}</a>
            </p>
          </div>
          
          ${formData.telefoon2 ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #6b7280;">Telefoon 2:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">
              <a href="tel:${formData.telefoon2}" style="color: #ec4899; text-decoration: none;">${formData.telefoon2}</a>
            </p>
          </div>
          ` : ''}
          
          <h2 style="color: #374151; margin-top: 30px; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            Noodcontact
          </h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #6b7280;">Noodcontact naam:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">${formData.noodNaam}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <strong style="color: #6b7280;">Noodcontact telefoon:</strong>
            <p style="margin: 5px 0; color: #374151; font-size: 16px;">
              <a href="tel:${formData.noodTelefoon}" style="color: #ec4899; text-decoration: none;">${formData.noodTelefoon}</a>
            </p>
          </div>
          
          ${formData.opmerking ? `
          <h2 style="color: #374151; margin-top: 30px; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            Opmerkingen
          </h2>
          <div style="margin-bottom: 30px;">
            <div style="margin: 10px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #ec4899; border-radius: 5px;">
              <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${formData.opmerking}</p>
            </div>
          </div>
          ` : ''}
          
          <div style="text-align: center; padding: 20px; background-color: #f0f9ff; border-radius: 10px; border: 1px solid #e0f2fe;">
            <p style="margin: 0; color: #0369a1; font-size: 14px;">
              💡 <strong>Volgende stap:</strong> Neem contact op met ${formData.voornaam} ${formData.achternaam} om de lessen in te plannen.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px;">
          <p>Deze aanmelding is verzonden via het lesaanmeldformulier op manegeduiksehoef.nl</p>
          <p>Verzonden op: ${new Date().toLocaleString('nl-NL')}</p>
        </div>
      </div>
    `,
    text: `
Manege Duikse Hoef - Nieuwe lesaanmelding

Persoonlijke Gegevens:
- Naam: ${formData.voornaam} ${formData.achternaam}
- Geboortedatum: ${formData.geboortedatum}
- Aanmelding type: ${formData.aanmeldingType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

Adresgegevens:
- Adres: ${formData.adres}
- Postcode: ${formData.postcode}
- Plaats: ${formData.plaats}

Contactgegevens:
- E-mail: ${formData.email}
- Telefoon 1: ${formData.telefoon1}
${formData.telefoon2 ? `- Telefoon 2: ${formData.telefoon2}` : ''}

Noodcontact:
- Naam: ${formData.noodNaam}
- Telefoon: ${formData.noodTelefoon}

${formData.opmerking ? `Opmerkingen:
${formData.opmerking}` : ''}

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

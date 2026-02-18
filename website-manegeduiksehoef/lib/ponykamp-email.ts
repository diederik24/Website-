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
  // Strato SMTP transporter configuratie
  const stratoUser = process.env.STRATO_USER
  const stratoPassword = process.env.STRATO_PASSWORD
  const stratoFromEmail = process.env.STRATO_FROM_EMAIL || stratoUser

  if (!stratoUser || !stratoPassword) {
    throw new Error('SMTP configuratie niet gevonden. Zorg dat STRATO_USER en STRATO_PASSWORD zijn ingesteld in environment variables.')
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.strato.com',
    port: 587,
    secure: false, // true voor 465, false voor andere poorten
    auth: {
      user: stratoUser,
      pass: stratoPassword,
    },
    tls: {
      // Voorkomt problemen met zelfondertekende certificaten
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000, // 10 seconden timeout voor verbinding
    greetingTimeout: 10000, // 10 seconden timeout voor greeting
    socketTimeout: 10000, // 10 seconden socket timeout
  })

  // E-mail template
  const mailOptions = {
    from: `"Manege Duikse Hoef" <${stratoFromEmail}>`,
    to: 'diederik24@icloud.com', // TEST: Stuur naar test email
    headers: {
      'List-Unsubscribe': `<mailto:${stratoFromEmail}?subject=unsubscribe>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      'X-Mailer': 'Manege Duikse Hoef System',
    },
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
    console.log(`Email sent successfully: ${result.messageId}`)
    
    // Sluit transporter af
    transporter.close()
    
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    transporter.close()
    throw new Error('Er is een fout opgetreden bij het verzenden van de aanmelding. Probeer het later opnieuw.')
  }
}




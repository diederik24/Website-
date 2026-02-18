const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

// Laad .env.local handmatig
const envPath = path.join(__dirname, '..', '.env.local')
console.log('🔍 Zoeken naar .env.local op:', envPath)
console.log('Bestand bestaat:', fs.existsSync(envPath) ? '✅ Ja' : '❌ Nee')
console.log('')

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8')
  console.log('📄 Inhoud van .env.local:')
  console.log('---')
  envFile.split('\n').forEach((line, index) => {
    const trimmedLine = line.trim()
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const match = trimmedLine.match(/^([^=:#]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim().replace(/^["']|["']$/g, '')
        if (key && value) {
          process.env[key] = value
          console.log(`${index + 1}. ${key}=${key === 'STRATO_PASSWORD' ? '***' : value}`)
        }
      }
    }
  })
  console.log('---')
  console.log('')
} else {
  console.log('⚠️  .env.local bestand niet gevonden!')
  console.log('')
}

console.log('🧪 Strato SMTP Email Test')
console.log('==========================')
console.log('')

// Haal environment variabelen op
const stratoUser = process.env.STRATO_USER
const stratoPassword = process.env.STRATO_PASSWORD
const stratoFromEmail = process.env.STRATO_FROM_EMAIL || stratoUser

// Check configuratie
console.log('📧 Configuratie Check:')
console.log('STRATO_USER:', stratoUser ? '✅ ' + stratoUser : '❌ Niet ingesteld')
if (stratoUser) {
  console.log('  Lengte:', stratoUser.length, 'karakters')
  console.log('  Begint met spatie:', stratoUser.startsWith(' ') ? '⚠️  JA!' : '✅ Nee')
  console.log('  Eindigt met spatie:', stratoUser.endsWith(' ') ? '⚠️  JA!' : '✅ Nee')
}
console.log('STRATO_PASSWORD:', stratoPassword ? '✅ Ingesteld (' + stratoPassword.length + ' karakters)' : '❌ Niet ingesteld')
if (stratoPassword) {
  console.log('  Begint met spatie:', stratoPassword.startsWith(' ') ? '⚠️  JA!' : '✅ Nee')
  console.log('  Eindigt met spatie:', stratoPassword.endsWith(' ') ? '⚠️  JA!' : '✅ Nee')
  console.log('  Eerste karakter:', JSON.stringify(stratoPassword[0]))
  console.log('  Laatste karakter:', JSON.stringify(stratoPassword[stratoPassword.length - 1]))
}
console.log('STRATO_FROM_EMAIL:', stratoFromEmail || 'Niet ingesteld (gebruikt STRATO_USER)')
console.log('')

if (!stratoUser || !stratoPassword) {
  console.log('❌ FOUT: Strato SMTP configuratie ontbreekt!')
  console.log('')
  console.log('Voeg toe aan .env.local:')
  console.log('STRATO_USER=info@manegeduiksehoef.nl')
  console.log('STRATO_PASSWORD=jouw-wachtwoord')
  console.log('STRATO_FROM_EMAIL=info@manegeduiksehoef.nl (optioneel)')
  console.log('')
  process.exit(1)
}

// Test email adres
const testEmail = 'diederik24@icloud.com'

console.log('📬 Test Email Details:')
console.log('Van:', stratoFromEmail)
console.log('Naar:', testEmail)
console.log('')

// Trim whitespace van credentials (voor het geval dat)
const trimmedUser = stratoUser ? stratoUser.trim() : stratoUser
const trimmedPassword = stratoPassword ? stratoPassword.trim() : stratoPassword

console.log('🔐 Authenticatie Details:')
console.log('User (getrimd):', JSON.stringify(trimmedUser))
console.log('Password lengte:', trimmedPassword ? trimmedPassword.length : 0)
console.log('')

// Probeer eerst poort 465 (SSL) - Strato gebruikt soms deze poort
console.log('🔌 Proberen verbinding met Strato SMTP...')
console.log('Poort: 465 (SSL)')
console.log('')

// Maak Strato SMTP transporter - probeer eerst SSL (465)
let transporter = nodemailer.createTransport({
  host: 'smtp.strato.com',
  port: 465,
  secure: true, // SSL voor poort 465
  auth: {
    user: trimmedUser,
    pass: trimmedPassword,
  },
  tls: {
    // Voorkomt problemen met zelfondertekende certificaten
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  debug: true,
  logger: true,
})

// Test email opties
const mailOptions = {
  from: `"Manege Duikse Hoef Test" <${stratoFromEmail}>`,
  to: testEmail,
  subject: '🧪 Test Email - Strato SMTP Configuratie',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🐴 Manege Duikse Hoef</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Test Email via Strato SMTP</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #374151; margin-top: 0; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
          ✅ Email Configuratie Test
        </h2>
        
        <p style="color: #374151; font-size: 16px; line-height: 1.6;">
          Als je deze email ontvangt, betekent dit dat de Strato SMTP configuratie correct werkt!
        </p>
        
        <div style="margin-top: 30px; padding: 15px; background: #f0fdf4; border-radius: 10px; border-left: 4px solid #10b981;">
          <strong style="color: #065f46;">Test Details:</strong>
          <ul style="color: #374151; margin: 10px 0;">
            <li>Van: ${stratoFromEmail}</li>
            <li>Naar: ${testEmail}</li>
            <li>SMTP Server: smtp.strato.com</li>
            <li>Port: 587</li>
            <li>Verzonden op: ${new Date().toLocaleString('nl-NL')}</li>
          </ul>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          Deze test email is automatisch gegenereerd om te controleren of de email configuratie correct werkt.
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px;">
        <p>Verzonden via Strato SMTP</p>
      </div>
    </div>
  `,
  text: `
Manege Duikse Hoef - Test Email

Als je deze email ontvangt, betekent dit dat de Strato SMTP configuratie correct werkt!

Test Details:
- Van: ${stratoFromEmail}
- Naar: ${testEmail}
- SMTP Server: smtp.strato.com
- Port: 587
- Verzonden op: ${new Date().toLocaleString('nl-NL')}

Deze test email is automatisch gegenereerd om te controleren of de email configuratie correct werkt.
  `,
  headers: {
    'List-Unsubscribe': `<mailto:${stratoFromEmail}?subject=unsubscribe>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    'X-Mailer': 'Manege Duikse Hoef Test Script',
  },
}

// Verstuur test email
console.log('📤 Verzenden van test email via poort 465 (SSL)...')
console.log('')

transporter.sendMail(mailOptions)
  .then((info) => {
    console.log('✅ SUCCESS!')
    console.log('')
    console.log('Email succesvol verzonden!')
    console.log('Message ID:', info.messageId)
    console.log('Response:', info.response)
    console.log('')
    console.log('📬 Controleer je inbox op:', testEmail)
    console.log('(Check ook je spam folder als je de email niet ziet)')
    console.log('')
    
    // Sluit transporter
    transporter.close()
    process.exit(0)
  })
  .catch((error) => {
    console.log('❌ FOUT met poort 465!')
    console.log('')
    console.log('Proberen met poort 587 (STARTTLS)...')
    console.log('')
    
    // Probeer opnieuw met poort 587
    transporter = nodemailer.createTransport({
      host: 'smtp.strato.com',
      port: 587,
      secure: false, // STARTTLS voor poort 587
      auth: {
        user: trimmedUser,
        pass: trimmedPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      debug: true,
      logger: true,
    })
    
    return transporter.sendMail(mailOptions)
  })
  .then((info) => {
    console.log('✅ SUCCESS!')
    console.log('')
    console.log('Email succesvol verzonden!')
    console.log('Message ID:', info.messageId)
    console.log('Response:', info.response)
    console.log('')
    console.log('📬 Controleer je inbox op:', testEmail)
    console.log('(Check ook je spam folder als je de email niet ziet)')
    console.log('')
    
    // Sluit transporter
    transporter.close()
    process.exit(0)
  })
  .catch((error) => {
    console.log('❌ FOUT!')
    console.log('')
    console.log('Er is een fout opgetreden bij het verzenden van de email:')
    console.log('')
    console.log('Error Name:', error.name)
    console.log('Error Message:', error.message)
    if (error.code) {
      console.log('Error Code:', error.code)
    }
    if (error.command) {
      console.log('Error Command:', error.command)
    }
    if (error.response) {
      console.log('Error Response:', error.response)
    }
    console.log('')
    console.log('🔍 Troubleshooting:')
    console.log('1. Controleer of STRATO_USER en STRATO_PASSWORD correct zijn ingesteld')
    console.log('2. Log in op je Strato account en controleer of SMTP is ingeschakeld')
    console.log('3. Controleer of het wachtwoord correct is (geen extra spaties)')
    console.log('4. Sommige Strato accounts vereisen mogelijk een app-specifiek wachtwoord')
    console.log('5. Controleer je Strato account instellingen voor SMTP configuratie')
    console.log('')
    
    // Sluit transporter
    transporter.close()
    process.exit(1)
  })

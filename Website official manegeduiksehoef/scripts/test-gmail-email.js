require('dotenv').config({ path: '.env.local' })

const gmailUser = process.env.GMAIL_USER
const gmailPassword = process.env.GMAIL_APP_PASSWORD

console.log('🧪 Gmail Email Test')
console.log('==================')

if (!gmailUser || !gmailPassword) {
  console.log('❌ Gmail configuratie ontbreekt!')
  console.log('')
  console.log('Voeg toe aan .env.local:')
  console.log('GMAIL_USER=jouw-email@gmail.com')
  console.log('GMAIL_APP_PASSWORD=je-app-password')
  console.log('')
  console.log('Run eerst: node scripts/setup-gmail-email.js')
  process.exit(1)
}

console.log('📧 Gmail User:', gmailUser)
console.log('🔑 App Password:', gmailPassword ? '✅ Geconfigureerd' : '❌ Niet geconfigureerd')
console.log('')

const nodemailer = require('nodemailer')

async function testGmailEmail() {
  try {
    console.log('🧪 Testen Gmail email verzending...')
    
    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword
      }
    })

    // Test email
    const mailOptions = {
      from: `"Mee Hestar" <${gmailUser}>`,
      to: gmailUser, // Stuur naar jezelf voor test
      subject: 'Test Email - Mee Hestar Webshop',
      html: `
        <h1>🎉 Gmail Email Test Succesvol!</h1>
        <p>Dit is een test email van de Mee Hestar webshop.</p>
        <p>Tijd: ${new Date().toLocaleString('nl-NL')}</p>
        <p>Als je deze email ontvangt, werkt de Gmail configuratie correct!</p>
      `
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('✅ Test email succesvol verzonden!')
    console.log('Message ID:', result.messageId)
    console.log('')
    console.log('📝 Controleer je inbox (inclusief spam folder)')
    console.log('')
    console.log('🎉 Gmail email service is klaar voor gebruik!')
    console.log('Nu kun je bestellingen plaatsen en emails versturen naar alle klanten.')
    
  } catch (error) {
    console.error('❌ Gmail email fout:', error.message)
    console.log('')
    console.log('🔧 Mogelijke oplossingen:')
    console.log('1. Controleer of 2-Step Verification is aangezet')
    console.log('2. Controleer of het app password correct is')
    console.log('3. Controleer of GMAIL_USER correct is (volledig email adres)')
    console.log('4. Probeer een nieuw app password te genereren')
  }
}

testGmailEmail()

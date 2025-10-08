require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const resendApiKey = process.env.RESEND_API_KEY

console.log('🔍 Email Service Test')
console.log('==================')

console.log('📧 Resend API Key:', resendApiKey ? '✅ Geconfigureerd' : '❌ Niet geconfigureerd')

if (!resendApiKey) {
  console.log('❌ RESEND_API_KEY is niet geconfigureerd in .env.local')
  console.log('Voeg toe: RESEND_API_KEY=your_resend_api_key')
  process.exit(1)
}

const { Resend } = require('resend')
const resend = new Resend(resendApiKey)

async function testEmail() {
  try {
    console.log('🧪 Testen email verzending...')
    
    const { data, error } = await resend.emails.send({
      from: 'Mee Hestar <onboarding@resend.dev>',
      to: ['test@example.com'], // Vervang door je eigen email
      subject: 'Test Email - Mee Hestar Webshop',
      html: `
        <h1>Test Email</h1>
        <p>Dit is een test email van de Mee Hestar webshop.</p>
        <p>Tijd: ${new Date().toLocaleString('nl-NL')}</p>
      `
    })

    if (error) {
      console.error('❌ Email fout:', error)
      return
    }

    console.log('✅ Test email succesvol verzonden!')
    console.log('Email ID:', data?.id)
    console.log('')
    console.log('📝 Controleer je inbox (inclusief spam folder)')
    
  } catch (error) {
    console.error('❌ Onverwachte fout:', error.message)
  }
}

testEmail()

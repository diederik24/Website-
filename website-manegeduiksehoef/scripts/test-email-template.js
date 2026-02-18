// Test script om een template email te versturen (credentials template)
// Gebruik: node scripts/test-email-template.js

// Configuratie
const EMAIL_API_URL = 'https://mailingsmpt-strato.vercel.app';
const EMAIL_API_KEY = 'manege-strato-email-2026-secure-key-99xtif26dpbjjnp9x4hzrh';
const APP_URL = 'https://manege-duikse-hoef.vercel.app';

// Email gegevens - pas deze aan
const EMAIL_TO = 'diederik24@icloud.com';
const CUSTOMER_NAME = 'Diederik Straver';
const CUSTOMER_EMAIL = 'diederik24@icloud.com';
const PASSWORD = 'TEST123'; // Of genereer automatisch

async function testTemplateEmail() {
  try {
    console.log('🧪 Test Template Email API');
    console.log('==========================');
    console.log('');
    console.log(`API URL: ${EMAIL_API_URL}/api/send-template-email`);
    console.log('');

    const emailData = {
      to: EMAIL_TO,
      subject: 'Welkom bij Manege Duikse Hoef - Je inloggegevens',
      template: 'credentials',
      customerName: CUSTOMER_NAME,
      customerEmail: CUSTOMER_EMAIL,
      password: PASSWORD,
      appUrl: APP_URL,
    };

    console.log('📧 Email Details:');
    console.log('  Naar:', emailData.to);
    console.log('  Onderwerp:', emailData.subject);
    console.log('  Template:', emailData.template);
    console.log('  Klant naam:', emailData.customerName);
    console.log('  Klant email:', emailData.customerEmail);
    console.log('  App URL:', emailData.appUrl);
    console.log('');
    console.log('📤 Verzenden...');
    console.log('');

    const response = await fetch(`${EMAIL_API_URL}/api/send-template-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': EMAIL_API_KEY,
      },
      body: JSON.stringify(emailData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ SUCCESS!');
      console.log('');
      console.log('Email succesvol verzonden!');
      console.log('Message ID:', result.messageId);
      console.log('Template:', result.template);
      console.log('Message:', result.message);
      console.log('');
      console.log('📬 Controleer je inbox op:', EMAIL_TO);
      console.log('(Check ook je spam folder als je de email niet ziet)');
      console.log('');
    } else {
      console.log('❌ FOUT!');
      console.log('');
      console.log('Status Code:', response.status);
      console.log('Error:', result.error || result.message || 'Onbekende fout');
      console.log('');
      console.log('Volledige response:', JSON.stringify(result, null, 2));
      console.log('');
    }
  } catch (error) {
    console.log('❌ FOUT!');
    console.log('');
    console.log('Er is een fout opgetreden:');
    console.log('Error:', error.message);
    if (error.stack) {
      console.log('');
      console.log('Stack trace:');
      console.log(error.stack);
    }
    console.log('');
  }
}

testTemplateEmail();

// Test script zonder appUrl om te zien of Strato de email dan accepteert
// Dit helpt ons te bepalen of het probleem de URL is

const EMAIL_API_URL = 'https://mailingsmpt-strato.vercel.app';
const EMAIL_API_KEY = 'manege-strato-email-2026-secure-key-99xtif26dpbjjnp9x4hzrh';

const EMAIL_TO = 'diederik24@icloud.com';
const CUSTOMER_NAME = 'Diederik Straver';
const CUSTOMER_EMAIL = 'diederik24@icloud.com';
const PASSWORD = 'TEST123';

async function testEmailWithoutURL() {
    try {
        console.log('🧪 Test Email ZONDER appUrl');
        console.log('============================');
        console.log('');
        console.log('Dit test of Strato de email accepteert zonder externe URL');
        console.log('');

        const emailData = {
            to: EMAIL_TO,
            subject: 'Test Email - Manege Duikse Hoef',
            template: 'credentials',
            customerName: CUSTOMER_NAME,
            customerEmail: CUSTOMER_EMAIL,
            password: PASSWORD,
            // appUrl wordt NIET meegestuurd
        };

        console.log('📧 Email Details:');
        console.log('  Naar:', emailData.to);
        console.log('  Onderwerp:', emailData.subject);
        console.log('  Template:', emailData.template);
        console.log('  appUrl: NIET INGESTELD (om te testen)');
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
            console.log('Email succesvol verzonden ZONDER appUrl!');
            console.log('Dit betekent dat de URL het probleem was.');
            console.log('');
            console.log('Resultaat:', JSON.stringify(result, null, 2));
            console.log('');
            console.log('📬 Check je inbox op:', EMAIL_TO);
        } else {
            console.log('❌ FOUT!');
            console.log('');
            console.log('Status:', response.status);
            console.log('Error:', result.error || result.message);
            console.log('');
            
            if (result.error && result.error.includes('B-URL')) {
                console.log('⚠️  De fout bevat nog steeds "B-URL" - mogelijk is er nog een andere URL in de template');
            } else if (result.error && result.error.includes('SPAM')) {
                console.log('⚠️  Email wordt nog steeds als SPAM gezien, maar niet vanwege de appUrl');
            }
            
            console.log('');
            console.log('Volledige response:', JSON.stringify(result, null, 2));
        }
    } catch (error) {
        console.log('❌ FOUT!');
        console.log('');
        console.log('Error:', error.message);
    }
}

testEmailWithoutURL();

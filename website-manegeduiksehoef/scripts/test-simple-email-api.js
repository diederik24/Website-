// Test script om een eenvoudige email te versturen via /api/send-email
// Dit gebruikt GEEN template, alleen plain HTML

const EMAIL_API_URL = 'https://mailingsmpt-strato.vercel.app';
const EMAIL_API_KEY = 'manege-strato-email-2026-secure-key-99xtif26dpbjjnp9x4hzrh';

// Email gegevens
const EMAIL_TO = 'diederik24@icloud.com';
const CUSTOMER_EMAIL = 'diederik24@icloud.com';
const PASSWORD = 'TEST123';

async function testSimpleEmail() {
    try {
        console.log('🧪 Test Simple Email API');
        console.log('=========================');
        console.log('');
        console.log(`API URL: ${EMAIL_API_URL}/api/send-email`);
        console.log('');

        const emailData = {
            to: EMAIL_TO,
            subject: 'Welkom bij Manege Duikse Hoef',
            htmlBody: `
                <h2>Welkom!</h2>
                <p>Je inloggegevens:</p>
                <p>Email: ${CUSTOMER_EMAIL}</p>
                <p>Wachtwoord: ${PASSWORD}</p>
                <p>Ga naar: manege-duikse-hoef.vercel.app</p>
            `,
            textBody: `Welkom! Email: ${CUSTOMER_EMAIL}, Wachtwoord: ${PASSWORD}`
        };

        console.log('📧 Email Details:');
        console.log('  Naar:', emailData.to);
        console.log('  Onderwerp:', emailData.subject);
        console.log('  HTML Body:', emailData.htmlBody.substring(0, 100) + '...');
        console.log('');

        console.log('📤 Verzenden...');
        console.log('');

        const response = await fetch(`${EMAIL_API_URL}/api/send-email`, {
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
            console.log('Message:', result.message);
            console.log('');
            console.log('📬 Controleer je inbox op:', EMAIL_TO);
            console.log('(Check ook je spam folder als je de email niet ziet)');
            console.log('');
        } else {
            console.log('❌ FOUT!');
            console.log('');
            console.log('Status:', response.status);
            console.log('Error:', result.error || result.message || 'Onbekende fout');
            console.log('');
            
            if (result.error) {
                console.log('Foutmelding:', result.error);
                console.log('');
                
                if (result.error.includes('B-URL')) {
                    console.log('⚠️  Strato blokkeert nog steeds een URL in de email');
                    console.log('   Mogelijk de "manege-duikse-hoef.vercel.app" tekst in de HTML');
                } else if (result.error.includes('SPAM')) {
                    console.log('⚠️  Email wordt als SPAM gezien door Strato');
                }
            }
            
            console.log('');
            console.log('Volledige response:', JSON.stringify(result, null, 2));
        }
    } catch (error) {
        console.log('❌ FOUT!');
        console.log('');
        console.log('Er is een fout opgetreden:', error.message);
        console.log('');
        if (error.stack) {
            console.log('Stack trace:');
            console.log(error.stack);
        }
    }
}

testSimpleEmail();

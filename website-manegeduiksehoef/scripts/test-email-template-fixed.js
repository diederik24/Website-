// test-email-template-fixed.js
// Test script om een template email te versturen (credentials template)
// GEFIXTE VERSIE - Zorgt dat appUrl altijd wordt meegestuurd

// Configuratie
const EMAIL_API_URL = 'https://mailingsmpt-strato.vercel.app';
const EMAIL_API_KEY = 'manege-strato-email-2026-secure-key-99xtif26dpbjjnp9x4hzrh';
const APP_URL = 'https://manege-duikse-hoef.vercel.app'; // Zorg dat deze URL geldig is!

// Email gegevens - pas deze aan
const EMAIL_TO = 'diederik24@icloud.com';
const CUSTOMER_NAME = 'Diederik Straver';
const CUSTOMER_EMAIL = 'diederik24@icloud.com';
const PASSWORD = 'TEST123';

// Valideer URL formaat
function valideerURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

async function testTemplateEmail() {
    try {
        // Valideer APP_URL eerst
        if (!APP_URL || !valideerURL(APP_URL)) {
            console.error('❌ FOUT: APP_URL is niet geldig!');
            console.error('APP_URL moet een volledige URL zijn, bijvoorbeeld: https://manege-duikse-hoef.vercel.app');
            return;
        }

        console.log('🧪 Test Template Email API (Fixed Version)');
        console.log('==========================================');
        console.log('');
        console.log(`API URL: ${EMAIL_API_URL}/api/send-template-email`);
        console.log(`App URL: ${APP_URL}`);
        console.log('');

        const emailData = {
            to: EMAIL_TO,
            subject: 'Welkom bij Manege Duikse Hoef - Je inloggegevens',
            template: 'credentials',
            customerName: CUSTOMER_NAME,
            customerEmail: CUSTOMER_EMAIL,
            password: PASSWORD,
            appUrl: APP_URL, // Zorg dat deze altijd wordt meegestuurd!
        };

        console.log('📧 Email Details:');
        console.log('  Versturen naar:', emailData.to);
        console.log('  Onderwerp:', emailData.subject);
        console.log('  Template:', emailData.template);
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
            console.log('Resultaat:', JSON.stringify(result, null, 2));
            console.log('');
            console.log('📬 Check je inbox (en spam folder) voor de email!');
            console.log('');
        } else {
            console.log('❌ FOUT!');
            console.log('');
            console.log('Status:', response.status);
            console.log('Error:', result.error || result.message || 'Onbekende fout');
            console.log('');
            
            // Extra debug info
            if (result.error) {
                console.log('Foutmelding:', result.error);
                console.log('');
            }
            
            console.log('Volledige response:', JSON.stringify(result, null, 2));
            console.log('');
        }
    } catch (error) {
        console.log('❌ FOUT!');
        console.log('');
        console.log('Er is een fout opgetreden:', error.message);
        console.log('');
        console.log('Mogelijke oorzaken:');
        console.log('1. API URL is niet bereikbaar');
        console.log('2. API Key is incorrect');
        console.log('3. Network error');
        console.log('4. APP_URL is niet geldig');
        console.log('');
        if (error.stack) {
            console.log('Stack trace:');
            console.log(error.stack);
        }
    }
}

testTemplateEmail();

// Test script voor buitenrit aanmelding email
// Gebruik: node scripts/test-buitenrit-email.js

const EMAIL_API_URL = 'https://mailingsmpt-strato.vercel.app';
const EMAIL_API_KEY = 'manege-strato-email-2026-secure-key-99xtif26dpbjjnp9x4hzrh';

// Buitenrit gegevens
const EMAIL_TO_LIST = ['diederik24@icloud.com', 'info@straverpflanzenexport.nl'];
const NAAM = 'Diederik Straver';
const EMAIL = 'diederik24@icloud.com';
const TELEFOON = '06-12345678';
const ERVARING = 'Enige ervaring (1-2 jaar)';
const AANTAL_PERSONEN = '2';
const DATUM = '5 april 2026';
const TIJD = '10:00 - 11:30';
const BEDRAG = '€47,50';
const TOTAAL_BEDRAG = '€95,00'; // 2 personen x €47,50

// Google Calendar link
const CALENDAR_LINK = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Buitenrit+Manege+Duikse+Hoef&dates=20260405T080000Z/20260405T093000Z&details=Buitenrit+aanmelding+bevestigd%0A%0ADatum%3A+5+april+2026%0ATijd%3A+10%3A00+-+11%3A30%0AAantal+personen%3A+2&location=Duikse+Hoef+6%2C+5175+PG+Loon+op+Zand';

async function testBuitenritEmail() {
    try {
        console.log('🧪 Test Buitenrit Aanmelding Email');
        console.log('===================================');
        console.log('');
        console.log(`API URL: ${EMAIL_API_URL}/api/send-email`);
        console.log('');

        const emailTemplate = {
            subject: `Buitenrit Aanmelding Bevestigd - ${DATUM}`,
            htmlBody: `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buitenrit Aanmelding Bevestigd</title>
    <style>
        /* Basis styling (mobiel - blijft zoals het is) */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .header-gradient {
            background: linear-gradient(135deg, #ec4899, #db2777);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            margin-bottom: 30px;
            position: relative;
        }
        
        .logo-img {
            max-width: 300px;
            height: auto;
            filter: brightness(0) invert(1);
            margin: 0 auto 15px auto;
            display: block;
        }
        
        /* Desktop styling (voor schermen groter dan 600px) */
        @media only screen and (min-width: 601px) {
            body {
                max-width: 800px !important;
                padding: 40px !important;
            }
            
            .container {
                padding: 50px !important;
                border-radius: 20px !important;
                box-shadow: 0 8px 16px rgba(0,0,0,0.15) !important;
            }
            
            .header-gradient {
                padding: 50px 40px !important;
                border-radius: 20px !important;
                margin-bottom: 40px !important;
            }
            
            .logo-img {
                max-width: 400px !important;
                margin-bottom: 25px !important;
            }
            
            .info-box {
                padding: 30px !important;
                margin: 25px 0 !important;
                border-radius: 10px !important;
            }
            
            .info-box h3 {
                font-size: 20px !important;
                margin-bottom: 15px !important;
            }
            
            .info-row {
                margin: 15px 0 !important;
                font-size: 16px !important;
            }
            
            .price-box {
                padding: 35px !important;
                margin: 30px 0 !important;
                border-radius: 10px !important;
            }
            
            .price-amount {
                font-size: 42px !important;
                margin: 15px 0 !important;
            }
            
            .warning-box {
                padding: 25px !important;
                margin: 25px 0 !important;
                border-radius: 10px !important;
            }
            
            body {
                font-size: 16px !important;
            }
            
            h3 {
                font-size: 20px !important;
            }
        }
        
        /* Extra grote schermen (desktop monitors) */
        @media only screen and (min-width: 1200px) {
            body {
                max-width: 900px !important;
            }
            
            .container {
                padding: 60px !important;
            }
            
            .header-gradient {
                padding: 60px 50px !important;
            }
            
            .logo-img {
                max-width: 450px !important;
            }
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #ec4899;
        }
        .header h1 {
            color: #ec4899;
            margin: 0;
            font-size: 28px;
        }
        .success-badge {
            background-color: #ec4899;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
            margin: 10px 0;
            font-weight: bold;
        }
        .info-box {
            background-color: #fdf2f8;
            border-left: 4px solid #ec4899;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .info-box h3 {
            color: #be185d;
            margin-top: 0;
            font-size: 18px;
        }
        .info-row {
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
        }
        .info-label {
            font-weight: bold;
            color: #be185d;
        }
        .info-value {
            color: #333;
        }
        .price-box {
            background-color: #f9fafb;
            border: 2px solid #ec4899;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
            text-align: center;
        }
        .price-amount {
            font-size: 32px;
            font-weight: bold;
            color: #ec4899;
            margin: 10px 0;
        }
        .warning-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .warning-box strong {
            color: #856404;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #999;
            font-size: 12px;
        }
        .button {
            display: inline-block;
            background-color: #10b981;
            color: #ffffff;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header-gradient" style="background: linear-gradient(135deg, #ec4899, #db2777); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px; position: relative;">
            <img src="https://manegeduiksehoef.nl/logo.png" alt="Manege Duikse Hoef" class="logo-img" style="max-width: 300px; height: auto; filter: brightness(0) invert(1); margin: 0 auto 15px auto; display: block;" />
            <div style="background-color: rgba(255,255,255,0.2); color: white; padding: 10px 20px; border-radius: 5px; display: inline-flex; align-items: center; gap: 8px; margin: 15px 0 0 0; font-weight: bold;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Buitenrit aanmelding bevestigd
            </div>
        </div>
        
        <div class="info-box" style="background-color: #fdf2f8; border-left: 4px solid #ec4899; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3 style="display: flex; align-items: center; gap: 8px; color: #be185d; margin-top: 0; font-size: 18px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#be185d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Buitenrit Details
            </h3>
            <div class="info-row" style="margin: 10px 0; display: flex; justify-content: space-between;">
                <span class="info-label" style="font-weight: bold; color: #be185d;">Datum:</span>
                <span class="info-value" style="color: #333;"><strong>${DATUM}</strong></span>
            </div>
            <div class="info-row" style="margin: 10px 0; display: flex; justify-content: space-between;">
                <span class="info-label" style="font-weight: bold; color: #be185d;">Tijd:</span>
                <span class="info-value" style="color: #333;"><strong>${TIJD}</strong></span>
            </div>
            <div class="info-row" style="margin: 10px 0; display: flex; justify-content: space-between;">
                <span class="info-label" style="font-weight: bold; color: #be185d;">Duur:</span>
                <span class="info-value" style="color: #333;">1,5 uur</span>
            </div>
        </div>

        <div class="warning-box" style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <strong style="display: flex; align-items: center; gap: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#856404" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                Belangrijk:
            </strong>
            <p style="margin: 10px 0 0 0;">We verwachten je <strong>15 minuten van tevoren</strong> (om <strong>09:45</strong>) zodat we alles kunnen voorbereiden en je veiligheidsinstructies kunnen geven.</p>
        </div>

        <div class="info-box">
            <h3 style="display: flex; align-items: center; gap: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#be185d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                Jouw Gegevens
            </h3>
            <div class="info-row">
                <span class="info-label">Naam:</span>
                <span class="info-value">${NAAM}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${EMAIL}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Telefoon:</span>
                <span class="info-value">${TELEFOON}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Ervaring:</span>
                <span class="info-value">${ERVARING}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Aantal personen:</span>
                <span class="info-value"><strong>${AANTAL_PERSONEN}</strong></span>
            </div>
        </div>

        <div class="price-box">
            <h3 style="margin-top: 0; color: #333; display: flex; align-items: center; justify-content: center; gap: 8px;">
                € Kostenoverzicht
            </h3>
            <div class="info-row" style="justify-content: center; margin: 10px 0;">
                <span>${AANTAL_PERSONEN} persoon(en) × ${BEDRAG}</span>
            </div>
            <div class="price-amount">${TOTAAL_BEDRAG}</div>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">per persoon</p>
        </div>

        <div class="info-box" style="background-color: #fdf2f8; border-left: 4px solid #ec4899; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3 style="display: flex; align-items: center; gap: 8px; color: #be185d; margin-top: 0; font-size: 18px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#be185d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                Locatie
            </h3>
            <p style="margin: 5px 0;"><strong>Manege Duikse Hoef</strong></p>
            <p style="margin: 5px 0;">Duikse Hoef 6</p>
            <p style="margin: 5px 0;">5175 PG Loon op Zand</p>
            <p style="margin: 10px 0 0 0;">
                <a href="https://www.google.com/maps/search/?api=1&query=Duikse+Hoef+6,+5175+PG+Loon+op+Zand" 
                   style="color: #ec4899; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Bekijk op Google Maps
                </a>
            </p>
        </div>

        <div class="warning-box" style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <strong style="display: flex; align-items: center; gap: 8px; color: #856404;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#856404" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                </svg>
                Wat neem je mee?
            </strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Gesloten schoenen met stevige zool</li>
                <li>Comfortabele kleding</li>
                <li>Eventueel een regenjas (afhankelijk van het weer)</li>
            </ul>
        </div>

        <p style="margin-top: 30px;">
            We kijken er naar uit om samen met jou een mooie buitenrit te maken!
        </p>

        <p>
            Met vriendelijke groet,<br>
            <strong>Manege Duikse Hoef</strong>
        </p>

        <div class="footer">
            <p>Manege Duikse Hoef<br>
            Duikse Hoef 6, 5175 PG Loon op Zand<br>
            <a href="mailto:info@manegeduiksehoef.nl" style="color: #ec4899; text-decoration: none;">info@manegeduiksehoef.nl</a> | +31 620685310</p>
            <p style="margin-top: 10px; font-size: 11px; color: #999;">
                Deze email is automatisch gegenereerd. Voor vragen kun je altijd contact met ons opnemen.
            </p>
        </div>
    </div>
</body>
</html>
            `,
            textBody: `
Buitenrit Aanmelding Bevestigd - Manege Duikse Hoef

Aanmelding Bevestigd

Buitenrit Details:
Datum: ${DATUM}
Tijd: ${TIJD}
Duur: 1,5 uur

Belangrijk: We verwachten je 15 minuten van tevoren (om 09:45) zodat we alles kunnen voorbereiden en je veiligheidsinstructies kunnen geven.

Jouw Gegevens:
Naam: ${NAAM}
Email: ${EMAIL}
Telefoon: ${TELEFOON}
Ervaring: ${ERVARING}
Aantal personen: ${AANTAL_PERSONEN}

Kostenoverzicht:
${AANTAL_PERSONEN} persoon(en) × ${BEDRAG} = ${TOTAAL_BEDRAG} totaal

Locatie:
Manege Duikse Hoef
Duikse Hoef 6
5175 PG Loon op Zand

Wat neem je mee?
- Gesloten schoenen met stevige zool
- Comfortabele kleding
- Eventueel een regenjas (afhankelijk van het weer)

We kijken er naar uit om samen met jou een mooie buitenrit te maken!

Met vriendelijke groet,
Manege Duikse Hoef

---
Manege Duikse Hoef
Duikse Hoef 6, 5175 PG Loon op Zand
info@manegeduiksehoef.nl | +31 620685310
            `
        };

        console.log('📧 Email Details:');
        console.log('  Naar:', EMAIL_TO_LIST.join(', '));
        console.log('  Onderwerp:', emailTemplate.subject);
        console.log('  Datum:', DATUM);
        console.log('  Tijd:', TIJD);
        console.log('  Aantal personen:', AANTAL_PERSONEN);
        console.log('  Totaal bedrag:', TOTAAL_BEDRAG);
        console.log('');

        console.log('📤 Verzenden naar', EMAIL_TO_LIST.length, 'adres(sen)...');
        console.log('');

        let successCount = 0;
        let failCount = 0;

        for (const emailTo of EMAIL_TO_LIST) {
            console.log(`📨 Verzenden naar: ${emailTo}`);
            
            const emailData = {
                ...emailTemplate,
                to: emailTo
            };

            try {
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
                    console.log(`  ✅ Succesvol verzonden naar ${emailTo}`);
                    console.log(`  Message ID: ${result.messageId}`);
                    successCount++;
                } else {
                    console.log(`  ❌ Fout bij verzenden naar ${emailTo}`);
                    console.log(`  Status: ${response.status}`);
                    console.log(`  Error: ${result.error || result.message || 'Onbekende fout'}`);
                    failCount++;
                }
            } catch (error) {
                console.log(`  ❌ Fout bij verzenden naar ${emailTo}`);
                console.log(`  Error: ${error.message}`);
                failCount++;
            }
            console.log('');
        }

        console.log('===================================');
        console.log(`✅ Succesvol verzonden: ${successCount}`);
        console.log(`❌ Mislukt: ${failCount}`);
        console.log('');
        console.log('📬 Controleer je inbox op:', EMAIL_TO_LIST.join(', '));
        console.log('(Check ook je spam folder als je de email niet ziet)');
        console.log('');
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

testBuitenritEmail();

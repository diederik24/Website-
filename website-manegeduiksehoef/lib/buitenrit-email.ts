import { sendEmailViaAPI } from './email-api-client'
import {
  getBuitenritOptie,
  formatBuitenritOptieLabel,
  type BuitenritOptieId,
} from './buitenrit-opties'

export interface BuitenritSignupData {
  name: string
  email: string
  phone: string
  experience: string
  persons: string
  ritOption: BuitenritOptieId
  arrangement: boolean
  experienceDetails?: string
  notes?: string
  riders: { lengte: string; gewicht: string }[]
  selectedDate: {
    day: number
    month: number
    year: number
    type: 'buitenrit' | 'arrangement'
  }
}

export async function sendBuitenritSignupEmail(formData: BuitenritSignupData) {
  // Gebruik externe email API in plaats van direct SMTP

  const months = [
    'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
    'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
  ]

  const gekozenOptie = getBuitenritOptie(formData.ritOption)
  const ritLabel = gekozenOptie ? formatBuitenritOptieLabel(gekozenOptie) : 'Buitenrit'
  const ritDuur = gekozenOptie?.duur || '1,5 uur'
  const ritGangen = gekozenOptie?.gangen || 'Stap / draf / galop'
  const pricePerPerson = gekozenOptie?.prijsLabel.replace(' ', '') || (formData.arrangement ? '€62,50' : '€47,50')
  const priceNumber = gekozenOptie?.prijsNumber ?? (formData.arrangement ? 62.50 : 47.50)

  // Roze kleuren die overeenkomen met het formulier (pink-500 = #ec4899, pink-600 = #db2777)
  const pink500 = '#ec4899'
  const pink600 = '#db2777'
  const pink50 = '#fdf2f8'
  const pink100 = '#fce7f3'
  const pink700 = '#be185d'

  const ridersSummary = (formData.riders || [])
    .map((rider, index) => `Ruiter ${index + 1}: ${rider.lengte} cm / ${rider.gewicht} kg`)
    .join('\n')

  const ridersHtml = (formData.riders || [])
    .map(
      (rider, index) => `
            <div class="info-row" style="margin: 10px 0; display: flex; justify-content: space-between;">
                <span style="font-weight: bold; color: ${pink700};">Ruiter ${index + 1}:</span>
                <span style="color: #333;">${rider.lengte} cm / ${rider.gewicht} kg</span>
            </div>`
    )
    .join('')

  const ridersNotificationHtml = (formData.riders || [])
    .map(
      (rider, index) => `
            <div class="info-row">
                <span class="info-label">Ruiter ${index + 1}:</span>
                <span class="info-value">${rider.lengte} cm / ${rider.gewicht} kg</span>
            </div>`
    )
    .join('')

  const dateString = `${formData.selectedDate.day} ${months[formData.selectedDate.month]} ${formData.selectedDate.year}`
  const timeString = formData.selectedDate.type === 'arrangement' ? '09:15 - 12:00' : ritDuur
  const totalPrice = (parseInt(formData.persons) * priceNumber).toFixed(2).replace('.', ',')
  
  // Bereken aankomsttijd (15 minuten voor de start)
  const startTime = formData.selectedDate.type === 'arrangement' ? '09:15' : '10:00'
  const [hours, minutes] = startTime.split(':').map(Number)
  const arrivalTime = new Date(2000, 0, 1, hours, minutes - 15)
  const arrivalTimeString = `${arrivalTime.getHours().toString().padStart(2, '0')}:${arrivalTime.getMinutes().toString().padStart(2, '0')}`

  // Maak Google Calendar link
  const startDate = new Date(formData.selectedDate.year, formData.selectedDate.month, formData.selectedDate.day)
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const endHour = formData.selectedDate.type === 'arrangement' ? 12 : 11
  const endMinute = formData.selectedDate.type === 'arrangement' ? 0 : 30
  
  // Google Calendar gebruikt UTC tijd, voor Nederland (UTC+1 in winter, UTC+2 in zomer) gebruiken we UTC+1
  const startUTC = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startHour - 1, startMinute))
  const endUTC = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endHour - 1, endMinute))
  
  const formatDate = (date: Date) => {
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    return `${year}${month}${day}T${hours}${minutes}00Z`
  }
  
  const startStr = formatDate(startUTC)
  const endStr = formatDate(endUTC)
  const title = encodeURIComponent(`Buitenrit Manege Duikse Hoef – ${ritLabel}`)
  const details = encodeURIComponent(`Buitenrit aanmelding bevestigd\n\nDatum: ${dateString}\nRit: ${ritLabel}\nGangen: ${ritGangen}\nDuur: ${ritDuur}\nAantal personen: ${formData.persons}\n${ridersSummary}`)
  const location = encodeURIComponent('Duikse Hoef 6, 5175 PG Loon op Zand')
  const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`

  const htmlBody = `
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
        
        .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .header-gradient {
            background: linear-gradient(135deg, ${pink500}, ${pink600});
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
        
        .info-box {
            background-color: ${pink50};
            border-left: 4px solid ${pink500};
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
        }
        
        .info-row {
            margin: 10px 0;
            display: flex;
            justify-content: space-between;
        }
        
        .price-box {
            background-color: #f9fafb;
            border: 2px solid ${pink500};
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
            text-align: center;
        }
        
        .price-amount {
            font-size: 32px;
            font-weight: bold;
            color: ${pink500};
            margin: 10px 0;
        }
        
        .warning-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        
        /* Desktop styling (voor schermen groter dan 600px) */
        @media only screen and (min-width: 601px) {
            body {
                max-width: 800px !important;
                padding: 40px !important;
            }
            
            .email-container {
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
            
            .email-container {
                padding: 60px !important;
            }
            
            .header-gradient {
                padding: 60px 50px !important;
            }
            
            .logo-img {
                max-width: 450px !important;
            }
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
    <div class="email-container" style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div class="header-gradient" style="background: linear-gradient(135deg, ${pink500}, ${pink600}); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px; position: relative;">
            <img src="https://manegeduiksehoef.nl/logo.png" alt="Manege Duikse Hoef" class="logo-img" style="max-width: 300px; height: auto; filter: brightness(0) invert(1); margin: 0 auto 15px auto; display: block;" />
            <div style="background-color: rgba(255,255,255,0.2); color: white; padding: 10px 20px; border-radius: 5px; display: inline-flex; align-items: center; gap: 8px; margin: 15px 0 0 0; font-weight: bold;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Buitenrit aanmelding bevestigd
            </div>
        </div>
        
        <div class="info-box" style="background-color: ${pink50}; border-left: 4px solid ${pink500}; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3 style="color: ${pink700}; margin-top: 0; font-size: 18px; display: flex; align-items: center; gap: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${pink700}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Buitenrit Details
            </h3>
            <div class="info-row" style="margin: 10px 0; display: flex; justify-content: space-between;">
                <span style="font-weight: bold; color: ${pink700};">Datum:</span>
                <span style="color: #333; font-weight: bold; font-size: 18px;">${dateString}</span>
            </div>
            <div class="info-row" style="margin: 10px 0; display: flex; justify-content: space-between;">
                <span style="font-weight: bold; color: ${pink700};">Rit:</span>
                <span style="color: #333; font-weight: bold;">${ritLabel}</span>
            </div>
            <div class="info-row" style="margin: 10px 0; display: flex; justify-content: space-between;">
                <span style="font-weight: bold; color: ${pink700};">Gangen:</span>
                <span style="color: #333;">${ritGangen}</span>
            </div>
            <div class="info-row" style="margin: 10px 0; display: flex; justify-content: space-between;">
                <span style="font-weight: bold; color: ${pink700};">Duur:</span>
                <span style="color: #333;">${ritDuur}</span>
            </div>
        </div>

        <div class="warning-box" style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <strong style="color: #856404; display: flex; align-items: center; gap: 8px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#856404" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                Belangrijk:
            </strong>
            <p style="margin: 10px 0 0 0; color: #856404;">
                We verwachten je <strong>15 minuten van tevoren</strong> (om <strong>${arrivalTimeString}</strong>) zodat we alles kunnen voorbereiden en je veiligheidsinstructies kunnen geven.
            </p>
        </div>

        <div class="info-box" style="background-color: ${pink50}; border-left: 4px solid ${pink500}; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3 style="color: ${pink700}; margin-top: 0; font-size: 18px; display: flex; align-items: center; gap: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${pink700}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                Jouw Gegevens
            </h3>
            <div class="info-row" style="margin: 10px 0; display: flex; justify-content: space-between;">
                <span style="font-weight: bold; color: ${pink700};">Naam:</span>
                <span style="color: #333;">${formData.name}</span>
            </div>
            <div class="info-row" style="margin: 10px 0; display: flex; justify-content: space-between;">
                <span style="font-weight: bold; color: ${pink700};">Email:</span>
                <span style="color: #333;">${formData.email}</span>
            </div>
            <div class="info-row" style="margin: 10px 0; display: flex; justify-content: space-between;">
                <span style="font-weight: bold; color: ${pink700};">Telefoon:</span>
                <span style="color: #333;">${formData.phone}</span>
            </div>
            <div class="info-row" style="margin: 10px 0; display: flex; justify-content: space-between;">
                <span style="font-weight: bold; color: ${pink700};">Ervaring:</span>
                <span style="color: #333;">${formData.experience}</span>
            </div>
            <div class="info-row" style="margin: 10px 0; display: flex; justify-content: space-between;">
                <span style="font-weight: bold; color: ${pink700};">Aantal personen:</span>
                <span style="color: #333; font-weight: bold;">${formData.persons}</span>
            </div>
            ${ridersHtml}
        </div>

        <div class="price-box" style="background-color: #f9fafb; border: 2px solid ${pink500}; padding: 20px; margin: 20px 0; border-radius: 5px; text-align: center;">
            <h3 style="margin-top: 0; color: #333;">€ Kostenoverzicht</h3>
            <div style="margin: 10px 0; color: #666;">
                ${formData.persons} persoon(en) × ${pricePerPerson}
            </div>
            <div class="price-amount" style="font-size: 32px; font-weight: bold; color: ${pink500}; margin: 10px 0;">
                €${totalPrice}
            </div>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">totaal</p>
        </div>

        <div class="info-box" style="background-color: ${pink50}; border-left: 4px solid ${pink500}; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3 style="color: ${pink700}; margin-top: 0; font-size: 18px; display: flex; align-items: center; gap: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${pink700}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                   style="color: ${pink500}; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Bekijk op Google Maps
                </a>
            </p>
        </div>

        <div class="warning-box" style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <strong style="color: #856404; display: flex; align-items: center; gap: 8px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#856404" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                </svg>
                Wat neem je mee?
            </strong>
            <ul style="margin: 10px 0; padding-left: 20px; color: #856404;">
                <li>Gesloten schoenen met stevige zool</li>
                <li>Comfortabele kleding</li>
                <li>Eventueel een regenjas (afhankelijk van het weer)</li>
            </ul>
        </div>

        ${formData.experienceDetails ? `
        <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
            <strong style="color: ${pink700};">Ervaring Details:</strong>
            <p style="margin: 5px 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${formData.experienceDetails}</p>
        </div>
        ` : ''}

        ${formData.notes ? `
        <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
            <strong style="color: ${pink700};">Opmerkingen:</strong>
            <p style="margin: 5px 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${formData.notes}</p>
        </div>
        ` : ''}

        <p style="margin-top: 30px; color: #333;">
            We kijken er naar uit om samen met jou een mooie buitenrit te maken!
        </p>

        <p style="color: #333;">
            Met vriendelijke groet,<br>
            <strong>Manege Duikse Hoef</strong>
        </p>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
            <p>Manege Duikse Hoef<br>
            Duikse Hoef 6, 5175 PG Loon op Zand<br>
            <a href="mailto:info@manegeduiksehoef.nl" style="color: ${pink500}; text-decoration: none;">info@manegeduiksehoef.nl</a> | +31 620685310</p>
        </div>
    </div>
</body>
</html>
  `

  const textBody = `
Buitenrit Aanmelding Bevestigd - Manege Duikse Hoef

✅ Aanmelding Bevestigd

📅 Buitenrit Details:
Datum: ${dateString}
Tijd: ${timeString}
Duur: ${ritDuur}
Rit: ${ritLabel}
Gangen: ${ritGangen}

⏰ Belangrijk: We verwachten je 15 minuten van tevoren (om ${arrivalTimeString}) zodat we alles kunnen voorbereiden en je veiligheidsinstructies kunnen geven.

👤 Jouw Gegevens:
Naam: ${formData.name}
Email: ${formData.email}
Telefoon: ${formData.phone}
Ervaring: ${formData.experience}
Aantal personen: ${formData.persons}
${ridersSummary ? `Lengte & gewicht:\n${ridersSummary}\n` : ''}
💰 Kostenoverzicht:
${formData.persons} persoon(en) × ${pricePerPerson} = €${totalPrice} totaal

📍 Locatie:
Manege Duikse Hoef
Duikse Hoef 6
5175 PG Loon op Zand

📋 Wat neem je mee?
- Gesloten schoenen met stevige zool
- Comfortabele kleding
- Eventueel een regenjas (afhankelijk van het weer)

${formData.experienceDetails ? `Ervaring Details:\n${formData.experienceDetails}\n` : ''}
${formData.notes ? `Opmerkingen:\n${formData.notes}\n` : ''}

We kijken er naar uit om samen met jou een mooie buitenrit te maken!

Met vriendelijke groet,
Manege Duikse Hoef

---
Manege Duikse Hoef
Duikse Hoef 6, 5175 PG Loon op Zand
info@manegeduiksehoef.nl | +31 620685310
  `

  try {
    const notificationEmails = [
      'diederik24@icloud.com',
      'info@manegeduiksehoef.nl'
    ] // Notificatie emails voor aanmeldingen
    
    console.log('Sending buitenrit emails via API...')
    console.log('Confirmation to:', formData.email)
    console.log('Notifications to:', notificationEmails.join(', '))
    
    // Stuur bevestigingsemail naar klant
    const confirmationResult = await sendEmailViaAPI({
      to: formData.email,
      subject: `Buitenrit Aanmelding Bevestigd - ${dateString}`,
      htmlBody,
      textBody,
    })
    
    console.log(`Confirmation email sent: ${confirmationResult.messageId}`)
    
    // Stuur notificatie naar diederik24@icloud.com (administratieve melding)
    const notificationHtml = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 700px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .notification-container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-top: 4px solid #ec4899;
        }
        .header {
            background: linear-gradient(135deg, #ec4899, #db2777);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .header .badge {
            display: inline-block;
            background-color: rgba(255,255,255,0.25);
            padding: 8px 16px;
            border-radius: 20px;
            margin-top: 10px;
            font-size: 14px;
            font-weight: bold;
        }
        .info-section {
            background-color: #f9fafb;
            border-left: 3px solid #ec4899;
            padding: 18px;
            margin: 15px 0;
            border-radius: 5px;
        }
        .info-section h2 {
            margin: 0 0 12px 0;
            font-size: 18px;
            color: #be185d;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: 600;
            color: #6b7280;
            min-width: 140px;
        }
        .info-value {
            color: #111827;
            text-align: right;
        }
        .highlight-box {
            background-color: #fef3c7;
            border: 2px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .highlight-box strong {
            color: #92400e;
            display: block;
            margin-bottom: 8px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="notification-container">
        <div class="header">
            <h1>🔔 Nieuwe Buitenrit Aanmelding</h1>
            <div class="badge">${dateString}</div>
        </div>
        
        <div class="info-section">
            <h2>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Rit Informatie
            </h2>
            <div class="info-row">
                <span class="info-label">Datum:</span>
                <span class="info-value"><strong>${dateString}</strong></span>
            </div>
            <div class="info-row">
                <span class="info-label">Tijd:</span>
                <span class="info-value">${timeString}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Type:</span>
                <span class="info-value"><strong>${ritLabel}</strong></span>
            </div>
            <div class="info-row">
                <span class="info-label">Prijs per persoon:</span>
                <span class="info-value">${pricePerPerson}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Aantal personen:</span>
                <span class="info-value"><strong>${formData.persons}</strong></span>
            </div>
            <div class="info-row">
                <span class="info-label">Totaal bedrag:</span>
                <span class="info-value"><strong style="color: #ec4899; font-size: 18px;">€${totalPrice}</strong></span>
            </div>
        </div>

        <div class="info-section">
            <h2>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                Klantgegevens
            </h2>
            <div class="info-row">
                <span class="info-label">Naam:</span>
                <span class="info-value"><strong>${formData.name}</strong></span>
            </div>
            <div class="info-row">
                <span class="info-label">E-mail:</span>
                <span class="info-value"><a href="mailto:${formData.email}" style="color: #ec4899; text-decoration: none;">${formData.email}</a></span>
            </div>
            <div class="info-row">
                <span class="info-label">Telefoon:</span>
                <span class="info-value"><a href="tel:${formData.phone}" style="color: #ec4899; text-decoration: none;">${formData.phone}</a></span>
            </div>
            <div class="info-row">
                <span class="info-label">Ervaring:</span>
                <span class="info-value">${formData.experience}</span>
            </div>
            ${ridersNotificationHtml}
        </div>

        ${formData.experienceDetails ? `
        <div class="highlight-box">
            <strong>Ervaring Details:</strong>
            <p style="margin: 0; color: #92400e; white-space: pre-wrap;">${formData.experienceDetails}</p>
        </div>
        ` : ''}

        ${formData.notes ? `
        <div class="highlight-box">
            <strong>Opmerkingen van klant:</strong>
            <p style="margin: 0; color: #92400e; white-space: pre-wrap;">${formData.notes}</p>
        </div>
        ` : ''}

        <div class="footer">
            <p>📧 Deze notificatie is automatisch gegenereerd<br>
            Verzonden op: ${new Date().toLocaleString('nl-NL')}<br>
            Via: manegeduiksehoef.nl</p>
        </div>
    </div>
</body>
</html>
    `
    
    const notificationText = `
Manege Duikse Hoef - Nieuwe buitenrit aanmelding

Rit Details:
- Datum: ${dateString}
- Tijd: ${timeString}
- Type: ${ritLabel}
- Gangen: ${ritGangen}
- Duur: ${ritDuur}
- Prijs: ${pricePerPerson} per persoon

Persoonlijke Gegevens:
- Naam: ${formData.name}
- E-mail: ${formData.email}
- Telefoon: ${formData.phone}
- Ervaring: ${formData.experience}
- Aantal personen: ${formData.persons}
${ridersSummary ? `- Lengte & gewicht:\n${ridersSummary.split('\n').map((line) => `  ${line}`).join('\n')}\n` : ''}- Totaal bedrag: €${totalPrice}

${formData.experienceDetails ? `Ervaring Details:\n${formData.experienceDetails}\n` : ''}
${formData.notes ? `Opmerkingen:\n${formData.notes}\n` : ''}

---
Verzonden op: ${new Date().toLocaleString('nl-NL')}
Via: manegeduiksehoef.nl
    `
    
    // Stuur notificatie naar beide adressen
    const notificationResults = await Promise.all(
      notificationEmails.map(async (email) => {
        const result = await sendEmailViaAPI({
          to: email,
          subject: `Buitenrit Aanmelding: ${formData.name} - ${dateString}`,
          htmlBody: notificationHtml,
          textBody: notificationText,
        })
        console.log(`Notification email sent to ${email}: ${result.messageId}`)
        return result
      })
    )
    
    console.log(`All notification emails sent (${notificationResults.length} total)`)
    
    return { success: true, messageId: confirmationResult.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    
    let errorMessage = 'Er is een fout opgetreden bij het verzenden van de aanmelding. Probeer het later opnieuw.'
    
    if (error instanceof Error) {
      errorMessage = error.message
    }
    
    throw new Error(errorMessage)
  }
}

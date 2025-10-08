require('dotenv').config({ path: '.env.local' })

// Import Gmail service
const nodemailer = require('nodemailer')

// Gmail SMTP configuratie
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

async function testOrderEmail() {
  console.log('🧪 Testen order bevestigingsmail...')
  
  try {
    const testOrderData = {
      customerName: 'Diederik Straver',
      customerEmail: 'diederik24@icloud.com',
      orderId: 'TEST-ORDER-001',
      orderDate: new Date().toISOString(),
      items: [
        {
          name: 'Rode Hoodie',
          quantity: 1,
          price: 25.99,
          size: 'M'
        },
        {
          name: 'Roze Hoodie',
          quantity: 1,
          price: 19.99,
          size: 'L'
        }
      ],
      total: 45.98,
      pickupAddress: 'Manege Duikse Hoef',
      estimatedPickupDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      shippingAddress: {
        street: 'Manege Duikse Hoef',
        city: 'Duikse Hoef',
        postalCode: '1234AB',
        country: 'Nederland'
      }
    }
    
    console.log('📝 Test order data:')
    console.log(JSON.stringify(testOrderData, null, 2))
    console.log('')
    
    // Verstuur email direct via Gmail
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: testOrderData.customerEmail,
      subject: `Bestelling bevestigd - Order #${testOrderData.orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Bestelling Bevestigd - Manege Duiksehoef</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #8B4513 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF69B4; }
            .order-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .order-table th { background: #FFB6C1; padding: 12px; text-align: left; border-bottom: 2px solid #FF69B4; color: #333; }
            .order-table td { border-bottom: 1px solid #FFB6C1; }
            .total { font-size: 18px; font-weight: bold; color: #FF1493; text-align: right; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Bedankt voor je bestelling Bij De Manege Duiksehoef!</h1>
              <p>Order #${testOrderData.orderId}</p>
            </div>
            
            <div class="content">
              <p>Hallo ${testOrderData.customerName},</p>
              
              <p>Je bestelling is succesvol ontvangen en wordt voor je klaargemaakt! Hier zijn de details:</p>
              
              <div class="order-details">
                <h3>📋 Bestelling Details</h3>
                <p><strong>Order nummer:</strong> #${testOrderData.orderId}</p>
                <p><strong>Besteldatum:</strong> ${new Date(testOrderData.orderDate).toLocaleDateString('nl-NL')}</p>
                <p><strong>Verwachte afhaaldatum:</strong> ${new Date(testOrderData.estimatedPickupDate).toLocaleDateString('nl-NL')}</p>
              </div>
              
              <h3>🛍️ Bestelde Producten</h3>
              <table class="order-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th style="text-align: center;">Aantal</th>
                    <th style="text-align: right;">Prijs</th>
                  </tr>
                </thead>
                <tbody>
                  ${testOrderData.items.map(item => `
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px solid #FFB6C1;">
                        <strong>${item.name}</strong>
                        ${item.size ? `<br><small style="color: #666;">Maat: ${item.size}</small>` : ''}
                      </td>
                      <td style="padding: 12px; border-bottom: 1px solid #FFB6C1; text-align: center;">${item.quantity}</td>
                      <td style="padding: 12px; border-bottom: 1px solid #FFB6C1; text-align: right;">€${item.price.toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              
              <div class="total">
                Totaal: €${testOrderData.total.toFixed(2)}
              </div>
              
              <div class="order-details">
                <h3>📍 Afhaaladres</h3>
                <p>${testOrderData.pickupAddress}</p>
              </div>
              
              <p><strong>Wat gebeurt er nu?</strong></p>
              <ul>
                <li>✅ Je bestelling wordt voorbereid</li>
                <li>📧 Je ontvangt een email wanneer je bestelling klaar is voor afhaling</li>
                <li>🚗 Je kunt je bestelling afhalen op het aangegeven adres</li>
              </ul>
              
              <p>Heb je vragen over je bestelling? Neem gerust contact met ons op!</p>
              
              <div class="footer">
                <p>Met vriendelijke groet,<br>Het team van Manege Duiksehoef</p>
                <p>📧 ${process.env.GMAIL_USER}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    }

    const result = await transporter.sendMail(mailOptions)
    
    console.log('✅ Order bevestigingsmail succesvol verzonden!')
    console.log('Message ID:', result.messageId)
    console.log('')
    console.log('📧 Controleer je inbox (diederik24@icloud.com)')
    console.log('🎉 Email service werkt correct!')
    
  } catch (error) {
    console.error('❌ Fout bij versturen order email:', error.message)
    console.error('Details:', error)
  }
}

testOrderEmail()
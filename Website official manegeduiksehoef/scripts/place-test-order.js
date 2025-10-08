require('dotenv').config({ path: '.env.local' })
const crypto = require('crypto')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL en Key zijn niet geconfigureerd!')
  console.error('Controleer je .env.local bestand')
  process.exit(1)
}

const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(supabaseUrl, supabaseKey)

async function placeTestOrder() {
  console.log('🛒 Test order plaatsen in database...')
  
  try {
    const testOrder = {
      id: crypto.randomUUID(),
      customername: 'Diederik Straver',
      customeremail: 'diederik24@icloud.com',
      customerphone: '0612345678',
      total: 45.98,
      status: 'pending',
      date: new Date().toISOString().split('T')[0], // Alleen datum
      items: [
        {
          productId: 'hoodie-rood-m',
          name: 'Rode Hoodie',
          quantity: 1,
          price: 25.99,
          size: 'M'
        },
        {
          productId: 'hoodie-roze-l',
          name: 'Roze Hoodie',
          quantity: 1,
          price: 19.99,
          size: 'L'
        }
      ],
      shippingaddress: {
        type: 'pickup',
        name: 'Diederik Straver',
        address: 'Manege Duikse Hoef',
        city: 'Duikse Hoef',
        postalCode: '1234 AB',
        country: 'Nederland',
        instructions: 'Afhaling op locatie - graag bellen voor afspraak'
      }
    }
    
    console.log('📝 Test order data:')
    console.log(JSON.stringify(testOrder, null, 2))
    console.log('')
    
    const { data, error } = await supabase
      .from('orders')
      .insert([testOrder])
      .select()
    
    if (error) {
      console.error('❌ Fout bij plaatsen order:', error.message)
      console.error('Details:', error)
      return
    }
    
    console.log('✅ Test order succesvol geplaatst!')
    console.log('')
    console.log('📋 Order details:')
    console.log(`ID: ${data[0].id}`)
    console.log(`Klant: ${data[0].customerName}`)
    console.log(`Email: ${data[0].customerEmail}`)
    console.log(`Totaal: €${data[0].total}`)
    console.log(`Status: ${data[0].status}`)
    console.log(`Datum: ${data[0].date}`)
    console.log('')
    console.log('🛍️ Items:')
    data[0].items.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.name} (${item.size}) - €${item.price} x${item.quantity}`)
    })
    console.log('')
    console.log('📍 Afleveradres:')
    console.log(`  Type: ${data[0].shippingAddress.type}`)
    console.log(`  Locatie: ${data[0].shippingAddress.address}`)
    console.log(`  Instructies: ${data[0].shippingAddress.instructions}`)
    console.log('')
    console.log('🎉 Order is nu zichtbaar in de admin panel!')
    console.log('Ga naar /admin/orders om de order te bekijken.')
    
  } catch (error) {
    console.error('❌ Onverwachte fout:', error.message)
  }
}

placeTestOrder()

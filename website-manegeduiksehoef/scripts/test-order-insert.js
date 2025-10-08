require('dotenv').config({ path: '.env.local' })
const crypto = require('crypto')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL en Key zijn niet geconfigureerd!')
  process.exit(1)
}

const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(supabaseUrl, supabaseKey)

async function testOrderInsert() {
  console.log('🧪 Testen order insert...')
  
  try {
    const testOrder = {
      id: crypto.randomUUID(),
      customername: 'Test Klant',
      customeremail: 'test@example.com',
      customerphone: '0612345678',
      total: 25.99,
      status: 'pending',
      date: new Date().toISOString(),
      items: [{
        productId: 'test-product',
        name: 'Test Product',
        quantity: 1,
        price: 25.99,
        size: 'M'
      }],
      shippingaddress: {
        type: 'pickup',
        address: 'Manege Duikse Hoef',
        instructions: 'Afhaling op locatie'
      }
    }
    
    console.log('📝 Test order data:', JSON.stringify(testOrder, null, 2))
    
    const { data, error } = await supabase
      .from('orders')
      .insert([testOrder])
      .select()
    
    if (error) {
      console.error('❌ Insert fout:', error.message)
      console.error('Details:', error)
      return
    }
    
    console.log('✅ Test order succesvol opgeslagen!')
    console.log('Opgeslagen data:', JSON.stringify(data[0], null, 2))
    
    // Verwijder test order
    await supabase
      .from('orders')
      .delete()
      .eq('id', testOrder.id)
    
    console.log('✅ Test order verwijderd')
    console.log('')
    console.log('🎉 Orders kunnen nu correct worden opgeslagen!')
    
  } catch (error) {
    console.error('❌ Onverwachte fout:', error.message)
  }
}

testOrderInsert()

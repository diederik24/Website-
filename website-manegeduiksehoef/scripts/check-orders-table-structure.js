require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL en Key zijn niet geconfigureerd!')
  process.exit(1)
}

const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkOrdersTableStructure() {
  console.log('🔍 Controleren orders tabel structuur...')
  
  try {
    // Probeer een eenvoudige query om de structuur te zien
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('❌ Fout bij ophalen orders:', error.message)
      return
    }
    
    if (data && data.length > 0) {
      console.log('✅ Orders tabel structuur:')
      console.log('Kolommen:', Object.keys(data[0]))
      console.log('Voorbeeld data:', JSON.stringify(data[0], null, 2))
    } else {
      console.log('ℹ️ Orders tabel is leeg, maar bestaat wel')
      
      // Probeer een test insert met minimale data
      console.log('🧪 Testen minimale insert...')
      const testData = {
        id: `TEST-${Date.now()}`,
        customer_name: 'Test',
        customer_email: 'test@test.com',
        total: 10.00,
        items: []
      }
      
      const { data: insertData, error: insertError } = await supabase
        .from('orders')
        .insert([testData])
        .select()
      
      if (insertError) {
        console.error('❌ Insert fout:', insertError.message)
        console.log('Mogelijke kolom namen die ontbreken of anders zijn:')
        console.log('- customerEmail (mogelijk customer_email?)')
        console.log('- customerName (mogelijk customer_name?)')
        console.log('- shippingAddress (mogelijk shipping_address?)')
      } else {
        console.log('✅ Test insert succesvol!')
        console.log('Insert data:', insertData[0])
        
        // Verwijder test data
        await supabase
          .from('orders')
          .delete()
          .eq('id', testData.id)
        console.log('✅ Test data verwijderd')
      }
    }
    
  } catch (error) {
    console.error('❌ Onverwachte fout:', error.message)
  }
}

checkOrdersTableStructure()

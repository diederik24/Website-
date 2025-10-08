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

async function checkTableSchema() {
  console.log('🔍 Controleren tabel schema...')
  
  try {
    // Probeer een query met alle mogelijke kolom namen
    console.log('📋 Testen verschillende kolom namen...')
    
    const testQueries = [
      // Test camelCase
      { name: 'camelCase', query: () => supabase.from('orders').select('id, customerName, customerEmail, customerPhone, total, status, date, items, shippingAddress').limit(1) },
      // Test snake_case
      { name: 'snake_case', query: () => supabase.from('orders').select('id, customer_name, customer_email, customer_phone, total, status, date, items, shipping_address').limit(1) },
      // Test alleen basis kolommen
      { name: 'basic', query: () => supabase.from('orders').select('id, total, status').limit(1) },
      // Test alleen id
      { name: 'id_only', query: () => supabase.from('orders').select('id').limit(1) }
    ]
    
    for (const test of testQueries) {
      try {
        console.log(`\n🧪 Testen ${test.name}...`)
        const { data, error } = await test.query()
        
        if (error) {
          console.log(`❌ ${test.name} fout:`, error.message)
        } else {
          console.log(`✅ ${test.name} werkt!`)
          if (data && data.length > 0) {
            console.log('Data:', JSON.stringify(data[0], null, 2))
          }
        }
      } catch (err) {
        console.log(`❌ ${test.name} exception:`, err.message)
      }
    }
    
    // Probeer een eenvoudige insert met alleen id en total
    console.log('\n🧪 Testen minimale insert...')
    const minimalData = {
      id: crypto.randomUUID(),
      total: 10.00
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('orders')
      .insert([minimalData])
      .select()
    
    if (insertError) {
      console.log('❌ Minimale insert fout:', insertError.message)
    } else {
      console.log('✅ Minimale insert succesvol!')
      console.log('Insert data:', insertData[0])
      
      // Verwijder test data
      await supabase
        .from('orders')
        .delete()
        .eq('id', minimalData.id)
      console.log('✅ Test data verwijderd')
    }
    
  } catch (error) {
    console.error('❌ Onverwachte fout:', error.message)
  }
}

checkTableSchema()

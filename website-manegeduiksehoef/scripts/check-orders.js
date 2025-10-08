require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL en Key zijn niet geconfigureerd!')
  process.exit(1)
}

const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkOrders() {
  console.log('📋 Controleren hoeveel orders er nog in de database staan...')
  
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('id, customername, customeremail, total, date')
    
    if (error) {
      console.error('❌ Fout bij ophalen orders:', error.message)
      return
    }
    
    if (!orders || orders.length === 0) {
      console.log('✅ Database is leeg - geen orders gevonden!')
      console.log('🎉 Alle test orders zijn succesvol verwijderd!')
    } else {
      console.log(`📋 Nog ${orders.length} orders in database:`)
      orders.forEach((order, index) => {
        console.log(`${index + 1}. ${order.id} - ${order.customername} - €${order.total} - ${order.date}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Onverwachte fout:', error.message)
  }
}

checkOrders()

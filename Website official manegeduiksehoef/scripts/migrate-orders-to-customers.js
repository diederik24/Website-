const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials niet gevonden in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrateOrdersToCustomers() {
  try {
    console.log('🚀 Start migratie van bestellingen naar klanten...')
    
    // Haal alle bestellingen op
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (ordersError) {
      console.error('❌ Error bij ophalen bestellingen:', ordersError)
      return
    }
    
    console.log(`📦 Gevonden ${orders.length} bestellingen`)
    
    // Haal bestaande klanten op om duplicaten te voorkomen
    const { data: existingCustomers, error: customersError } = await supabase
      .from('customers')
      .select('email')
    
    if (customersError) {
      console.error('❌ Error bij ophalen bestaande klanten:', customersError)
      return
    }
    
    const existingEmails = new Set(existingCustomers.map(c => c.email))
    console.log(`👥 Bestaande klanten: ${existingEmails.size}`)
    
    // Filter unieke klanten uit bestellingen
    const uniqueCustomers = []
    const seenEmails = new Set()
    
    orders.forEach(order => {
      if (order.customeremail && 
          !seenEmails.has(order.customeremail) && 
          !existingEmails.has(order.customeremail)) {
        
        uniqueCustomers.push({
          name: order.customername || 'Onbekende klant',
          email: order.customeremail,
          phone: order.customerphone || null,
          address: order.shippingaddress || null
        })
        
        seenEmails.add(order.customeremail)
      }
    })
    
    console.log(`✨ ${uniqueCustomers.length} nieuwe klanten gevonden om toe te voegen`)
    
    if (uniqueCustomers.length === 0) {
      console.log('✅ Alle klanten uit bestellingen staan al in het klantenbestand!')
      return
    }
    
    // Voeg klanten toe in batches van 100
    const batchSize = 100
    let added = 0
    
    for (let i = 0; i < uniqueCustomers.length; i += batchSize) {
      const batch = uniqueCustomers.slice(i, i + batchSize)
      
      const { data: newCustomers, error: insertError } = await supabase
        .from('customers')
        .insert(batch)
        .select()
      
      if (insertError) {
        console.error(`❌ Error bij toevoegen batch ${Math.floor(i/batchSize) + 1}:`, insertError)
        continue
      }
      
      added += newCustomers.length
      console.log(`✅ Batch ${Math.floor(i/batchSize) + 1}: ${newCustomers.length} klanten toegevoegd`)
    }
    
    console.log(`🎉 Migratie voltooid! ${added} klanten toegevoegd aan klantenbestand`)
    console.log(`📊 Totaal klanten in database: ${existingEmails.size + added}`)
    
  } catch (error) {
    console.error('❌ Onverwachte fout:', error)
  }
}

// Voer migratie uit
migrateOrdersToCustomers()

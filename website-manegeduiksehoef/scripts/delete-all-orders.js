const { createClient } = require('@supabase/supabase-js')

require('dotenv').config({ path: '.env.local' })

// Supabase configuratie
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase environment variables zijn niet geconfigureerd')
  console.error('Zorg dat NEXT_PUBLIC_SUPABASE_URL en NEXT_PUBLIC_SUPABASE_ANON_KEY zijn ingesteld')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function deleteAllOrders() {
  try {
    console.log('🗑️  Alle bestellingen verwijderen uit de database...')
    
    // Eerst kijken hoeveel bestellingen er zijn
    const { data: orders, error: countError } = await supabase
      .from('orders')
      .select('id, customername, total, date')
    
    if (countError) {
      console.error('❌ Fout bij ophalen bestellingen:', countError)
      return
    }
    
    console.log(`📊 Gevonden ${orders.length} bestellingen in de database`)
    
    if (orders.length === 0) {
      console.log('✅ Geen bestellingen gevonden om te verwijderen')
      return
    }
    
    // Toon alle bestellingen die verwijderd gaan worden
    console.log('\n📋 Bestellingen die verwijderd gaan worden:')
    orders.forEach((order, index) => {
      console.log(`${index + 1}. Order #${order.id} - ${order.customername} - €${order.total} - ${order.date}`)
    })
    
    // Verwijder alle bestellingen
    const { error: deleteError } = await supabase
      .from('orders')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Verwijder alles behalve een dummy ID
    
    if (deleteError) {
      console.error('❌ Fout bij verwijderen bestellingen:', deleteError)
      return
    }
    
    console.log(`\n✅ Succesvol ${orders.length} bestellingen verwijderd uit de database!`)
    
    // Verifieer dat alle bestellingen zijn verwijderd
    const { data: remainingOrders, error: verifyError } = await supabase
      .from('orders')
      .select('id')
    
    if (verifyError) {
      console.error('❌ Fout bij verifiëren:', verifyError)
      return
    }
    
    console.log(`🔍 Verificatie: ${remainingOrders.length} bestellingen over in de database`)
    
  } catch (error) {
    console.error('❌ Onverwachte fout:', error)
  }
}

// Voer het script uit
deleteAllOrders()
  .then(() => {
    console.log('\n🎉 Script voltooid!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Script mislukt:', error)
    process.exit(1)
  })

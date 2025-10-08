// Eenvoudig script om alle bestellingen te verwijderen
// Dit script gebruikt de bestaande Supabase configuratie

const { createClient } = require('@supabase/supabase-js')

// Gebruik de publieke URL en anon key (dit werkt voor DELETE operaties als RLS correct is ingesteld)
const supabaseUrl = 'https://your-project.supabase.co' // Vervang door je echte URL
const supabaseKey = 'your-anon-key' // Vervang door je echte anon key

console.log('⚠️  WAARSCHUWING: Dit script zal ALLE bestellingen verwijderen!')
console.log('📝 Zorg dat je de juiste Supabase URL en key hebt ingesteld in dit script')
console.log('🛑 Druk Ctrl+C om te annuleren, of Enter om door te gaan...')

// Wacht op gebruiker input
process.stdin.once('data', async () => {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    console.log('🗑️  Verwijderen van alle bestellingen...')
    
    // Verwijder alle bestellingen
    const { error } = await supabase
      .from('orders')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000')
    
    if (error) {
      console.error('❌ Fout:', error.message)
    } else {
      console.log('✅ Alle bestellingen zijn verwijderd!')
    }
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Script fout:', error.message)
    process.exit(1)
  }
})
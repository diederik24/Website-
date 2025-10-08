require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL en Key zijn niet geconfigureerd!')
  console.error('Maak een .env.local bestand aan met:')
  console.error('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url')
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
  process.exit(1)
}

const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(supabaseUrl, supabaseKey)

async function createOrdersTable() {
  console.log('🚀 Orders tabel setup gestart...')
  
  try {
    // Test database connectie
    console.log('📡 Testen database connectie...')
    const { data: testData, error: testError } = await supabase
      .from('orders')
      .select('count')
      .limit(1)
    
    if (testError && testError.code === 'PGRST116') {
      console.log('❌ Orders tabel bestaat niet. Maak deze aan via Supabase SQL Editor:')
      console.log('')
      console.log('Voer het volgende SQL script uit in je Supabase SQL Editor:')
      console.log('')
      console.log('-- Create orders table')
      console.log('CREATE TABLE orders (')
      console.log('    id VARCHAR(255) PRIMARY KEY,')
      console.log('    customerName VARCHAR(255) NOT NULL,')
      console.log('    customerEmail VARCHAR(255) NOT NULL,')
      console.log('    customerPhone VARCHAR(50),')
      console.log('    total DECIMAL(10,2) NOT NULL,')
      console.log('    status VARCHAR(50) DEFAULT \'pending\',')
      console.log('    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),')
      console.log('    items JSONB NOT NULL,')
      console.log('    shippingAddress JSONB,')
      console.log('    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),')
      console.log('    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()')
      console.log(');')
      console.log('')
      console.log('-- Enable RLS')
      console.log('ALTER TABLE orders ENABLE ROW LEVEL SECURITY;')
      console.log('')
      console.log('-- Create RLS policies')
      console.log('CREATE POLICY "Orders are viewable by everyone" ON orders FOR SELECT USING (true);')
      console.log('CREATE POLICY "Orders are insertable by everyone" ON orders FOR INSERT WITH CHECK (true);')
      console.log('CREATE POLICY "Orders are updatable by everyone" ON orders FOR UPDATE USING (true);')
      console.log('CREATE POLICY "Orders are deletable by everyone" ON orders FOR DELETE USING (true);')
      console.log('')
      console.log('Na het uitvoeren van dit script, voer dit script opnieuw uit om te controleren.')
      return
    }
    
    if (testError) {
      console.error('❌ Fout bij controleren tabel:', testError.message)
      return
    }
    
    console.log('✅ Orders tabel bestaat al!')
    
    // Test of we een order kunnen toevoegen
    console.log('🧪 Testen order toevoegen...')
    const testOrder = {
      id: `TEST-${Date.now()}`,
      customerName: 'Test Klant',
      customerEmail: 'test@example.com',
      total: 25.99,
      items: [{
        productId: 'test',
        name: 'Test Product',
        quantity: 1,
        price: 25.99
      }],
      status: 'pending'
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('orders')
      .insert([testOrder])
      .select()
    
    if (insertError) {
      console.error('❌ Fout bij testen order toevoegen:', insertError.message)
      return
    }
    
    console.log('✅ Test order succesvol toegevoegd:', insertData[0].id)
    
    // Verwijder test order
    await supabase
      .from('orders')
      .delete()
      .eq('id', testOrder.id)
    
    console.log('✅ Test order verwijderd')
    console.log('')
    console.log('🎉 Orders tabel is klaar voor gebruik!')
    console.log('')
    console.log('Nu kun je:')
    console.log('1. Bestellingen plaatsen via de webshop')
    console.log('2. Orders bekijken in /admin/orders')
    console.log('3. Order status updates maken')
    
  } catch (error) {
    console.error('❌ Onverwachte fout:', error.message)
  }
}

createOrdersTable()

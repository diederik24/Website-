const { createClient } = require('@supabase/supabase-js')
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

const supabase = createClient(supabaseUrl, supabaseKey)

// Mock product data
const mockProducts = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Mee Hestar Classic Trui',
    description: 'Onze signature trui met het Mee Hestar logo. Comfortabel, warm en perfect voor elke gelegenheid.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    stocktype: 'inStock',
    stocklevel: 25,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Classic'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Mee Hestar Hoodie',
    description: 'Een stijlvolle hoodie met "Mee Hestar" branding. Ideaal voor koude dagen.',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    stocktype: 'inStock',
    stocklevel: 15,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Hoodies'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Mee Hestar Premium Trui',
    description: 'Onze premium trui van hoogwaardige materialen. Elegant en duurzaam.',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    stocktype: 'orderOnDemand',
    estimateddelivery: '5-7 werkdagen',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Premium'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'Mee Hestar Sweater',
    description: 'Een comfortabele sweater met Mee Hestar design. Perfect voor casual draag.',
    price: 49.00,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop',
    stocktype: 'inStock',
    stocklevel: 30,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Sweaters'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    name: 'Mee Hestar Vest',
    description: 'Een warme vest met Mee Hestar branding. Ideaal voor tussen de seizoenen.',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
    stocktype: 'orderOnDemand',
    estimateddelivery: '3-5 werkdagen',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Vesten'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    name: 'Mee Hestar Comfort Hoodie',
    description: 'Een comfortabele hoodie met Mee Hestar motief. Perfect voor thuis en casual uitjes.',
    price: 59.00,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
    stocktype: 'inStock',
    stocklevel: 20,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Hoodies'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    name: 'Mee Hestar Winter Trui',
    description: 'Onze warmste trui voor de koudste dagen. Stijlvol en isolerend.',
    price: 69.00,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    stocktype: 'preOrder',
    preorderdate: '2025-01-30',
    estimateddelivery: 'Levering vanaf 30 januari 2025',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Winter'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    name: 'Mee Hestar Elegant Vest',
    description: 'Een elegante vest voor formele gelegenheden. Lichtgewicht en stijlvol.',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    stocktype: 'orderOnDemand',
    estimateddelivery: '5-7 werkdagen',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Vesten'
  }
]

async function setupDatabase() {
  console.log('🚀 Database setup gestart...')
  
  try {
    // Test database connectie
    console.log('📡 Testen database connectie...')
    const { data, error } = await supabase.from('products').select('count').limit(1)
    
    if (error) {
      console.error('❌ Database connectie mislukt:', error.message)
      console.log('📋 Zorg ervoor dat:')
      console.log('1. Supabase project is aangemaakt')
      console.log('2. Database tabellen zijn aangemaakt (gebruik schema.sql)')
      console.log('3. Environment variables zijn correct ingesteld')
      return
    }
    
    console.log('✅ Database connectie succesvol!')
    
    // Controleer of er al producten zijn
    const { data: existingProducts, error: fetchError } = await supabase
      .from('products')
      .select('id')
      .limit(1)
    
    if (fetchError) {
      console.error('❌ Fout bij ophalen producten:', fetchError.message)
      return
    }
    
    if (existingProducts && existingProducts.length > 0) {
      console.log('ℹ️ Producten bestaan al, overslaan...')
      return
    }
    
    // Voeg mock producten toe
    console.log('📦 Mock producten toevoegen...')
    const { data: insertedProducts, error: insertError } = await supabase
      .from('products')
      .insert(mockProducts)
      .select()
    
    if (insertError) {
      console.error('❌ Fout bij toevoegen producten:', insertError.message)
      return
    }
    
    console.log(`✅ ${insertedProducts.length} producten succesvol toegevoegd!`)
    console.log('🎉 Database setup voltooid!')
    
  } catch (error) {
    console.error('❌ Onverwachte fout:', error.message)
  }
}

// Run setup
setupDatabase()

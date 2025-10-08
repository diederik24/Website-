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

async function createProductSizesTable() {
  console.log('🚀 Product sizes tabel setup gestart...')
  
  try {
    // Test database connectie
    console.log('📡 Testen database connectie...')
    const { data, error } = await supabase.from('products').select('count').limit(1)
    
    if (error) {
      console.error('❌ Database connectie mislukt:', error.message)
      return
    }
    
    console.log('✅ Database connectie succesvol!')
    
    // Controleer of product_sizes tabel al bestaat
    console.log('🔍 Controleren of product_sizes tabel bestaat...')
    const { data: tableCheck, error: tableError } = await supabase
      .from('product_sizes')
      .select('count')
      .limit(1)
    
    if (tableError && tableError.code === 'PGRST116') {
      console.log('❌ Product_sizes tabel bestaat niet. Maak deze aan via Supabase SQL Editor:')
      console.log('')
      console.log('Voer het volgende SQL script uit in je Supabase SQL Editor:')
      console.log('')
      console.log('-- Add size inventory table for per-size stock management')
      console.log('')
      console.log('-- Create product_sizes table for per-size inventory')
      console.log('CREATE TABLE product_sizes (')
      console.log('    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,')
      console.log('    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,')
      console.log('    size VARCHAR(50) NOT NULL,')
      console.log('    stock_type VARCHAR(20) CHECK (stock_type IN (\'inStock\', \'orderOnDemand\', \'preOrder\')) NOT NULL,')
      console.log('    stock_level INTEGER DEFAULT 0,')
      console.log('    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),')
      console.log('    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),')
      console.log('    UNIQUE(product_id, size)')
      console.log(');')
      console.log('')
      console.log('-- Enable RLS')
      console.log('ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;')
      console.log('')
      console.log('-- RLS policies')
      console.log('CREATE POLICY "Product sizes are viewable by everyone" ON product_sizes FOR SELECT USING (true);')
      console.log('CREATE POLICY "Product sizes are insertable by admin" ON product_sizes FOR INSERT WITH CHECK (true);')
      console.log('CREATE POLICY "Product sizes are updatable by admin" ON product_sizes FOR UPDATE USING (true);')
      console.log('CREATE POLICY "Product sizes are deletable by admin" ON product_sizes FOR DELETE USING (true);')
      console.log('')
      console.log('-- Indexes')
      console.log('CREATE INDEX idx_product_sizes_product_id ON product_sizes(product_id);')
      console.log('CREATE INDEX idx_product_sizes_stock_type ON product_sizes(stock_type);')
      console.log('')
      console.log('-- Trigger for updated_at')
      console.log('CREATE TRIGGER update_product_sizes_updated_at ')
      console.log('    BEFORE UPDATE ON product_sizes ')
      console.log('    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();')
      console.log('')
      console.log('-- Migrate existing data from products.sizes array to product_sizes table')
      console.log('INSERT INTO product_sizes (product_id, size, stock_type, stock_level)')
      console.log('SELECT ')
      console.log('    p.id,')
      console.log('    unnest(p.sizes) as size,')
      console.log('    COALESCE(p."stockType", p.stocktype) as stock_type,')
      console.log('    COALESCE(p."stockLevel", p.stocklevel, 0) as stock_level')
      console.log('FROM products p')
      console.log('WHERE p.sizes IS NOT NULL AND array_length(p.sizes, 1) > 0')
      console.log('ON CONFLICT (product_id, size) DO NOTHING;')
      console.log('')
      console.log('Na het uitvoeren van dit script, voer dit script opnieuw uit om te controleren.')
      return
    }
    
    if (tableError) {
      console.error('❌ Fout bij controleren tabel:', tableError.message)
      return
    }
    
    console.log('✅ Product_sizes tabel bestaat al!')
    
    // Controleer of er data in de tabel staat
    const { data: sizeData, error: sizeError } = await supabase
      .from('product_sizes')
      .select('count')
      .limit(1)
    
    if (sizeError) {
      console.error('❌ Fout bij ophalen product sizes data:', sizeError.message)
      return
    }
    
    console.log('✅ Product_sizes tabel is klaar voor gebruik!')
    console.log('')
    console.log('Nu kun je:')
    console.log('1. Naar /admin/inventory gaan om per-maat voorraad in te stellen')
    console.log('2. Naar /admin/products gaan om nieuwe producten toe te voegen')
    console.log('3. Naar /shop gaan om te zien hoe de beschikbaarheid wordt getoond')
    
  } catch (error) {
    console.error('❌ Onverwachte fout:', error.message)
  }
}

createProductSizesTable()

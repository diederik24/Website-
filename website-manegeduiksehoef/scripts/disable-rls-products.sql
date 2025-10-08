-- Script om RLS tijdelijk uit te schakelen voor products tabel
-- Dit lost het product update probleem op

-- Schakel RLS uit voor products tabel
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- Verwijder bestaande policies
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
DROP POLICY IF EXISTS "Products are insertable by admin" ON products;
DROP POLICY IF EXISTS "Products are updatable by admin" ON products;
DROP POLICY IF EXISTS "Products are deletable by admin" ON products;

-- Toon het resultaat
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'products';

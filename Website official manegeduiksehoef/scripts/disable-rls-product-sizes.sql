-- Script om RLS uit te schakelen voor product_sizes tabel
-- Dit lost het product update probleem op

-- Schakel RLS uit voor product_sizes tabel
ALTER TABLE product_sizes DISABLE ROW LEVEL SECURITY;

-- Verwijder bestaande policies (als die er zijn)
DROP POLICY IF EXISTS "Product sizes are viewable by everyone" ON product_sizes;
DROP POLICY IF EXISTS "Product sizes are insertable by admin" ON product_sizes;
DROP POLICY IF EXISTS "Product sizes are updatable by admin" ON product_sizes;
DROP POLICY IF EXISTS "Product sizes are deletable by admin" ON product_sizes;

-- Toon het resultaat
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'product_sizes';

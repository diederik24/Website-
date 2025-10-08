-- Script om RLS weer in te schakelen voor products tabel
-- Gebruik dit als je RLS weer wilt inschakelen

-- Schakel RLS in voor products tabel
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Herstel policies
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Products are insertable by admin" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Products are updatable by admin" ON products FOR UPDATE USING (true);
CREATE POLICY "Products are deletable by admin" ON products FOR DELETE USING (true);

-- Toon het resultaat
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'products';

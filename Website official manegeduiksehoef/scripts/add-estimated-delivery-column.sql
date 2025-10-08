-- Script om estimatedDelivery kolom toe te voegen aan products tabel
-- Voer dit script uit in je Supabase SQL editor

-- Voeg estimatedDelivery kolom toe als deze nog niet bestaat
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'estimatedDelivery'
    ) THEN
        ALTER TABLE products ADD COLUMN estimatedDelivery VARCHAR(255);
    END IF;
END $$;

-- Toon het resultaat
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'estimatedDelivery';

-- Toon alle kolommen in de products tabel
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

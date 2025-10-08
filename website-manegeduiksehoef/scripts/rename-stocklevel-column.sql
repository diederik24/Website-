-- Script om stocklevel kolom te hernoemen naar stockLevel
-- Voer dit script uit in je Supabase SQL editor

-- Hernoem de kolom van stocklevel naar stockLevel
DO $$ 
BEGIN
    -- Controleer of de kolom bestaat als stocklevel (kleine letters)
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'stocklevel'
    ) THEN
        -- Hernoem de kolom naar camelCase
        ALTER TABLE products RENAME COLUMN stocklevel TO "stockLevel";
        RAISE NOTICE 'Kolom stocklevel hernoemd naar stockLevel';
    ELSE
        RAISE NOTICE 'Kolom stocklevel bestaat niet of is al hernoemd';
    END IF;
END $$;

-- Toon het resultaat
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
AND (column_name = 'stockLevel' OR column_name = 'stocklevel');

-- Toon alle kolommen in de products tabel
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

-- Script om stocktype kolom te hernoemen naar stockType
-- Voer dit script uit in je Supabase SQL editor

-- Hernoem de kolom van stocktype naar stockType
DO $$ 
BEGIN
    -- Controleer of de kolom bestaat als stocktype (kleine letters)
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'stocktype'
    ) THEN
        -- Hernoem de kolom naar camelCase
        ALTER TABLE products RENAME COLUMN stocktype TO "stockType";
        RAISE NOTICE 'Kolom stocktype hernoemd naar stockType';
    ELSE
        RAISE NOTICE 'Kolom stocktype bestaat niet of is al hernoemd';
    END IF;
END $$;

-- Toon het resultaat
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
AND (column_name = 'stockType' OR column_name = 'stocktype');

-- Toon alle kolommen in de products tabel
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

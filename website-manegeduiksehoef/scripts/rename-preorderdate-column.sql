-- Script om preorderdate kolom te hernoemen naar preOrderDate
-- Voer dit script uit in je Supabase SQL editor

-- Hernoem de kolom van preorderdate naar preOrderDate
DO $$ 
BEGIN
    -- Controleer of de kolom bestaat als preorderdate (kleine letters)
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'preorderdate'
    ) THEN
        -- Hernoem de kolom naar camelCase
        ALTER TABLE products RENAME COLUMN preorderdate TO "preOrderDate";
        RAISE NOTICE 'Kolom preorderdate hernoemd naar preOrderDate';
    ELSE
        RAISE NOTICE 'Kolom preorderdate bestaat niet of is al hernoemd';
    END IF;
END $$;

-- Toon het resultaat
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
AND (column_name = 'preOrderDate' OR column_name = 'preorderdate');

-- Toon alle kolommen in de products tabel
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

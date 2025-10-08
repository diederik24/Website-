-- Script om articleCode kolom te controleren en hernoemen
-- Voer dit script uit in je Supabase SQL editor

-- Controleer welke kolommen er zijn met 'article' in de naam
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name ILIKE '%article%'
ORDER BY column_name;

-- Controleer of er een kolom 'articlecode' (kleine letters) bestaat
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'articlecode';

-- Controleer of er een kolom 'articleCode' (camelCase) bestaat
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'articleCode';

-- Hernoem 'articlecode' naar 'articleCode' als deze bestaat
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'articlecode'
    ) AND NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'articleCode'
    ) THEN
        ALTER TABLE products RENAME COLUMN articlecode TO "articleCode";
        RAISE NOTICE 'Kolom hernoemd van articlecode naar articleCode';
    ELSE
        RAISE NOTICE 'Geen hernoeming nodig';
    END IF;
END $$;

-- Toon het eindresultaat
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name ILIKE '%article%'
ORDER BY column_name;

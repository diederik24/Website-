-- Script om estimatedDelivery kolom te controleren en hernoemen
-- Voer dit script uit in je Supabase SQL editor

-- Controleer welke kolommen er zijn met 'estimated' in de naam
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name ILIKE '%estimated%'
ORDER BY column_name;

-- Controleer of er een kolom 'estimateddelivery' (kleine letters) bestaat
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'estimateddelivery';

-- Controleer of er een kolom 'estimatedDelivery' (camelCase) bestaat
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'estimatedDelivery';

-- Hernoem 'estimateddelivery' naar 'estimatedDelivery' als deze bestaat
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'estimateddelivery'
    ) AND NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'estimatedDelivery'
    ) THEN
        ALTER TABLE products RENAME COLUMN estimateddelivery TO "estimatedDelivery";
        RAISE NOTICE 'Kolom hernoemd van estimateddelivery naar estimatedDelivery';
    ELSE
        RAISE NOTICE 'Geen hernoeming nodig';
    END IF;
END $$;

-- Toon het eindresultaat
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name ILIKE '%estimated%'
ORDER BY column_name;

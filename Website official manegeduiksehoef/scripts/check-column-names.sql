-- Script om de exacte kolom namen in de products tabel te controleren
-- Voer dit script uit in je Supabase SQL Editor

-- Toon alle kolommen in de products tabel
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

-- Controleer specifiek de stock gerelateerde kolommen
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name ILIKE '%stock%'
ORDER BY column_name;

-- Toon een voorbeeld product om de structuur te zien
SELECT 
    id,
    name,
    "stockType" as stockType_camelCase,
    stocktype as stocktype_lowercase,
    "stockLevel" as stockLevel_camelCase,
    stocklevel as stocklevel_lowercase,
    sizes
FROM products 
LIMIT 1;

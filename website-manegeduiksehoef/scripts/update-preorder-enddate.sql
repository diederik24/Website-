-- Update script om preOrderEndDate kolom toe te voegen aan products tabel
-- Voer dit script uit in je Supabase SQL editor

-- Voeg preOrderEndDate kolom toe als deze nog niet bestaat
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'preOrderEndDate'
    ) THEN
        ALTER TABLE products ADD COLUMN preOrderEndDate DATE;
    END IF;
END $$;

-- Update bestaande pre-order producten om een standaard einddatum te hebben (30 dagen vanaf nu)
UPDATE products 
SET preOrderEndDate = CURRENT_DATE + INTERVAL '30 days'
WHERE stockType = 'preOrder' 
AND preOrderEndDate IS NULL;

-- Toon het resultaat
SELECT 
    id,
    name,
    stockType,
    preOrderDate,
    preOrderEndDate,
    estimatedDelivery
FROM products 
WHERE stockType = 'preOrder'
ORDER BY created_at DESC;

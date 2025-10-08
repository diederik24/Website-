-- Add size inventory table for per-size stock management
-- Eenvoudige versie met alleen de juiste kolom namen

-- Create product_sizes table for per-size inventory
CREATE TABLE product_sizes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size VARCHAR(50) NOT NULL,
    stock_type VARCHAR(20) CHECK (stock_type IN ('inStock', 'orderOnDemand', 'preOrder')) NOT NULL,
    stock_level INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, size)
);

-- Enable RLS
ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Product sizes are viewable by everyone" ON product_sizes FOR SELECT USING (true);
CREATE POLICY "Product sizes are insertable by admin" ON product_sizes FOR INSERT WITH CHECK (true);
CREATE POLICY "Product sizes are updatable by admin" ON product_sizes FOR UPDATE USING (true);
CREATE POLICY "Product sizes are deletable by admin" ON product_sizes FOR DELETE USING (true);

-- Indexes
CREATE INDEX idx_product_sizes_product_id ON product_sizes(product_id);
CREATE INDEX idx_product_sizes_stock_type ON product_sizes(stock_type);

-- Trigger for updated_at (als de functie bestaat)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column') THEN
        CREATE TRIGGER update_product_sizes_updated_at 
            BEFORE UPDATE ON product_sizes 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Migrate existing data from products.sizes array to product_sizes table
-- Gebruik alleen de juiste kolom namen (stockType en stockLevel)
INSERT INTO product_sizes (product_id, size, stock_type, stock_level)
SELECT 
    p.id,
    unnest(p.sizes) as size,
    p."stockType" as stock_type,
    COALESCE(p."stockLevel", 0) as stock_level
FROM products p
WHERE p.sizes IS NOT NULL AND array_length(p.sizes, 1) > 0
ON CONFLICT (product_id, size) DO NOTHING;

-- Create orders table for Mee Hestar Webshop
-- Voer dit script uit in je Supabase SQL Editor

-- Drop table if exists (voor testing)
DROP TABLE IF EXISTS orders;

-- Create orders table
CREATE TABLE orders (
    id VARCHAR(255) PRIMARY KEY,
    customerName VARCHAR(255) NOT NULL,
    customerEmail VARCHAR(255) NOT NULL,
    customerPhone VARCHAR(50),
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    items JSONB NOT NULL,
    shippingAddress JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Orders are viewable by everyone" ON orders FOR SELECT USING (true);
CREATE POLICY "Orders are insertable by everyone" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Orders are updatable by everyone" ON orders FOR UPDATE USING (true);
CREATE POLICY "Orders are deletable by everyone" ON orders FOR DELETE USING (true);

-- Create indexes for better performance
CREATE INDEX idx_orders_customer_email ON orders(customerEmail);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(date);

-- Insert a test order to verify the table works
INSERT INTO orders (id, customerName, customerEmail, total, items, status) 
VALUES (
    'TEST-001',
    'Test Klant',
    'test@example.com',
    25.99,
    '[{"productId": "test", "name": "Test Product", "quantity": 1, "price": 25.99}]',
    'pending'
);

-- Verify the table was created correctly
SELECT * FROM orders WHERE id = 'TEST-001';

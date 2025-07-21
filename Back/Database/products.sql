CREATE TABLE Products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    image_url TEXT,
    in_stock BOOLEAN DEFAULT TRUE
);
ALTER TABLE products ADD COLUMN category TEXT;

-- Optional: Seed existing products based on names
UPDATE products SET category = 'boys' WHERE name ILIKE '%boys%';
UPDATE products SET category = 'girls' WHERE name ILIKE '%girls%';
ALTER TABLE products ADD COLUMN color TEXT;


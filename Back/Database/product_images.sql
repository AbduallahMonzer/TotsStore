CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE
);
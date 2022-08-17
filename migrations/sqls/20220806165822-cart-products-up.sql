CREATE TABLE cart_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id integer,
    product_id integer
);
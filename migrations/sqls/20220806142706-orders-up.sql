CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    products VARCHAR(500),
    quantities VARCHAR(500),
    user_id integer,
    order_status VARCHAR(10)
);
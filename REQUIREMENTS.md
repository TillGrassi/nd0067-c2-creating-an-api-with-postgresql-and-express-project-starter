# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index '/products' [GET]
- Show '/products/:id' [GET]
- Create [token required] '/products' [POST]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required] '/users' [GET]
- Show [token required] '/users/:id' [GET]
- Create N[token required] '/users' [POST]
- Login '/users/login' [POST]

#### Orders

- Current Order by user (args: user id)[token required] '/orders/:id' [GET]
- add products to cart '/cart' [POST]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id, number
- name, string
- price, number
- [OPTIONAL] category

#### User

- id, number
- firstName, string
- lastName, string
- password, string encrypted

#### Orders

- id , number
- id of each product in the order, number
- quantity of each product in the order, number
- user_id, number
- status of order (active or complete)

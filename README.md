# Storefront Backend Project

## How to start

To setup the project you need to first start the docker container.
Then set up the container by running 'docker-compose up'

To set up the database open a new terminal and create the databases by running
'db-migrate db:create shop' and 'db-migrate db:create test_shop'
then run 'db-migrate up'

or via SQL Query:
CREATE USER user WITH PASSWORD password;

CREATE DATABASE shop;
CREATE DATABASE test_shop;

GRANT ALL PRIVILEGES ON DATABASE shop TO user;
GRANT ALL PRIVILEGES ON DATABASE test_shop TO user;

Then, again in a new terminal, run 'npm install' and 'npm start' to start the server.

The server is running on port 3000 and the database on port 5432:5432.

## Information about this project

The goal for this project was to create a database and api for an online shop with
database tables for products, users and orders and according api endpoints.
This project should be ready to connect the frontend to it and start beta testing.

## Endpoint and Database Testing

To run the tests for each endpoint run 'npm run test' in a seperate terminal.

## Eviroment Variables

As it is not clever to include dotenv files in this repo here are all the variables to get this project running:

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shop
POSTGRES_USER=admin
POSTGRES_PASSWORD=adminpassword
BCRYPT_PASSWORD=supercalifragilisticexpialidocious
SALT_ROUNDS=10
TOKEN_SECRET=uJ2nDNIo234jmado

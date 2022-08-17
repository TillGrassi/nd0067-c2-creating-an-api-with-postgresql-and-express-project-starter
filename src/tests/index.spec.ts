import request from "request";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const testUser = {
    first_name: 'mr',
    last_name: 'test',
    password: 'password123'
}
const token = jwt.sign({ user: testUser }, process.env.TOKEN_SECRET as Secret);

//Products
describe('products api works', () => {
    describe('GET /products returns a list of all products', function() {
        it('returns status 200', function(done) {
            request.get('http://localhost:3000/products', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    })

    describe('POST /products adds a new product', function() {
        it('returns status 200', function(done) {
            const options = {
                url: 'http://localhost:3000/products',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'content-type': 'application/json',
                },
                body: {
                    'name': 'test',
                    'price': '200'
                },
                json: true
            }
            request.post(options, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    })

    describe('GET /products/:id returns a product', function() {
        it('returns status 200', function(done) {
            request.get('http://localhost:3000/products/1', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    })
})

//Users
describe('users api works', () => {
    describe('GET /users returns a list of all users', function() {
        it('returns status 200', function(done) {
            const options = {
                url: 'http://localhost:3000/users',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
            request.get(options, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    })

    describe('POST /users adds a new user', function() {
        it('returns status 200', function(done) {
            const options = {
                url: 'http://localhost:3000/users',
                headers: {
                    'content-type': 'application/json',
                },
                body: {
                    'first_name': 'Till',
                    'last_name': 'Grassmann',
                    'password': 'password123'
                },
                json: true
            }
            request.post(options, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    })

    describe('GET /users/:id returns a user', function() {
        it('returns status 200', function(done) {
            const options = {
                url: 'http://localhost:3000/users/1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
            request.get(options, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    })

    describe('POST /users/login authentication works', function() {
        it('returns status 200', function(done) {
            const options = {
                url: 'http://localhost:3000/users/login',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'content-type': 'application/json',
                },
                body: {
                    'first_name': 'mr',
                    'last_name': 'test',
                    'password': 'password123'
                },
                json: true
            }
            request.post(options, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    })
})

//Orders
describe('orders api works', () => {
    describe('GET /orders/:id returns the orders of that user', function() {
        it('returns status 200', function(done) {
            const options = {
                url: 'http://localhost:3000/orders/1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
            request.get(options, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    })
})

//Cart
describe('cart api works', () => {
    describe('POST /cart adds a product to the cart', function() {
        it('returns status 200', function(done) {
            const options = {
                url: 'http://localhost:3000/cart',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'content-type': 'application/json',
                },
                body: {
                    'id': '1',
                    'product': '1',
                    'quantity': '5'
                },
                json: true
            }
            request.post(options, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    })
})
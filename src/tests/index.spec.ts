import request from "request";

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
            request.post('http://localhost:3000/products', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    })
})
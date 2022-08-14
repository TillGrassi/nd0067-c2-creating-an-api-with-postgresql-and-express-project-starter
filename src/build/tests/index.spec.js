"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
describe('products api works', () => {
    describe('GET /users returns a list of all users', () => {
        it('returns status 200', (done) => {
            request_1.default.get('http://localhost:3000/products', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});

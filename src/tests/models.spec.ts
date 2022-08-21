import jwt, { Secret } from "jsonwebtoken";
import dotenv from 'dotenv';
import { User, Users } from "../models/user";
import { Product, Products } from "../models/product";
import { Order, Orders } from "../models/order";
import { Cart } from "../models/cart";

dotenv.config();
const testUser = {
    first_name: 'mr',
    last_name: 'test',
    password: 'password123'
}
const token = jwt.sign({ user: testUser }, process.env.TOKEN_SECRET as Secret);

//Products
describe('test products model methods', () => {
    const store = new Products();
    describe('test index/create method', () => {
        it('fetches all products', async () => {
            const product = {
                name: "test",
                price: 200
            }
            await store.create(product);
            const products = await store.index();
            expect(products.length).toBeGreaterThan(0);
        })
    })
    describe('test show method', () => {
        it('fetches product', async () => {
            const product = await store.show("1");
            expect(product).toEqual({id: 1, name: "test", price: 200});
        })
    })
})

//Users
describe('test users model methods', () => {
    const store = new Users();
    describe('test create/authenticate method', () => {
        it('creates and authenticates a new user', async () => {
            const user = {
                first_name: "Peter",
                last_name: "Parker",
                password: "MaryJane"
            }
            await store.create(user);
            const login = await store.authenticate(user);
            expect(login?.first_name).toEqual("Peter");
        })
    })
    describe('test index method', () => {
        it('fetches all users', async () => {
            const index = await store.index();
            expect(index.length).toBeGreaterThan(0);
        })
    })
    describe('test show method', () => {
        it('fetches user', async () => {
            const user = await store.show("1");
            expect(user).toBeDefined();
        })
    })
})

//Orders
describe('test orders model method', () => {
    const store = new Orders();
    describe('test show method', () => {
        it('fetches the order', async () => {
            const order = await store.show(1);
            expect(order).toEqual([ ]);
        })
    })
})

//Cart
describe('test cart model method', () => {
    const store = new Cart();
    describe('test addProduct method', () => {
        it('adds a new Product', async () => {
            const add = await store.addProduct(5,1,1)
            expect(add).toBeDefined();
        })
    })
})
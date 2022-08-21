"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importDefault(require("../middleware"));
const product_1 = require("../models/product");
const store = new product_1.Products();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        throw new Error(`Could not show products: ${err}`);
    }
};
const show = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await store.show(id);
        res.json(product);
    }
    catch (err) {
        throw new Error(`Could not show product ${req.params.id}: ${err}`);
    }
};
const create = async (req, res) => {
    try {
        const name = req.body.name;
        const price = parseInt(req.body.price);
        const product = {
            name,
            price
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        throw new Error(`Could not create product ${req.body.name}: ${err}`);
    }
};
const product_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', middleware_1.default, create);
};
exports.default = product_routes;

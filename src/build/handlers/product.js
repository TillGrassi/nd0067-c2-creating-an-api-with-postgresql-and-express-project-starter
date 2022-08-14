"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importDefault(require("../middleware"));
const product_1 = require("../models/product");
const store = new product_1.Products();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const id = req.params.id;
    const product = await store.show(id);
    res.json(product);
};
const create = async (req, res) => {
    const name = req.query.name;
    const price = parseInt(req.query.price);
    const product = {
        name,
        price
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
};
const product_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products?name&price', middleware_1.default, create);
};
exports.default = product_routes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importDefault(require("../middleware"));
const cart_1 = require("../models/cart");
const store = new cart_1.Cart();
const addProduct = async (req, res) => {
    try {
        const orderId = parseInt(req.body.id);
        const product = parseInt(req.body.product);
        const quantity = parseInt(req.body.quantity);
        const addedProduct = await store.addProduct(quantity, orderId, product);
        res.json(addedProduct);
    }
    catch (err) {
        throw new Error(`Could not add product to order: ${err}`);
    }
};
const cart_routes = async (app) => {
    app.post('/cart', middleware_1.default, addProduct);
};
exports.default = cart_routes;

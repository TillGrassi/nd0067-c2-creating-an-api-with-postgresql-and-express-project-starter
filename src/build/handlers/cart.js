"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../models/cart");
const store = new cart_1.Cart();
const addProduct = async (_req, res) => {
    const userId = _req.params.userid;
    const products = _req.query.products;
    const quantities = _req.query.quantities;
    try {
        const addedProduct = await store.addProduct(products, quantities, userId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const cart_routes = async (app) => {
    app.post('/cart/:userid?products&quantities', addProduct);
};
exports.default = cart_routes;

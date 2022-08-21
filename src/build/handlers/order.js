"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importDefault(require("../middleware"));
const order_1 = require("../models/order");
const store = new order_1.Orders();
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const order = await store.show(id);
        res.json(order);
    }
    catch (err) {
        throw new Error(`Could not show the orders: ${err}`);
    }
};
const order_routes = (app) => {
    app.get('/orders/:id', middleware_1.default, show);
};
exports.default = order_routes;

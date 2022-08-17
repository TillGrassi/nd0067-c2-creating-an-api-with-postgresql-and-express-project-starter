"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class Cart {
    async addProduct(quantity, orderId, product) {
        try {
            const sql = 'INSERT INTO cart_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [quantity, orderId, product]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add product ${product} to order ${orderId}: ${err}`);
        }
    }
}
exports.Cart = Cart;

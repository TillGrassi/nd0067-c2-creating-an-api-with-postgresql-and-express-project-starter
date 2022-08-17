"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class Orders {
    async show(id) {
        try {
            const sql = 'SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id WHERE users.id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find orders from user ${id}. Error: ${err}`);
        }
    }
}
exports.Orders = Orders;

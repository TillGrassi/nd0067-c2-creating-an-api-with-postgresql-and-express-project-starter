"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;
class Users {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(b) {
        try {
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';
            const hash = bcrypt_1.default.hashSync(b.password + pepper, parseInt(saltRounds));
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [b.first_name, b.last_name, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not add new user ${b.first_name} ${b.last_name}. Error: ${err}`);
        }
    }
    async authenticate(b) {
        // @ts-ignore
        const conn = await database_1.default.connect();
        const sql = 'SELECT password FROM users WHERE first_name=($1) AND last_name=($2)';
        const result = await conn.query(sql, [b.first_name, b.last_name]);
        if (result.rows.length) {
            const user = result.rows[0];
            console.log(user);
            if (bcrypt_1.default.compareSync(b.password + pepper, user.password)) {
                return user;
            }
        }
        return null;
    }
}
exports.Users = Users;

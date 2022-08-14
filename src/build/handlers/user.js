"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = __importDefault(require("../middleware"));
dotenv_1.default.config();
const store = new user_1.Users();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const id = req.params.id;
    const user = await store.show(id);
    res.json(user);
};
const create = async (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const password = req.body.password;
    const user = {
        first_name,
        last_name,
        password
    };
    try {
        const newUser = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err + user);
    }
};
const authenticate = async (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const password = req.body.password;
    const user = {
        first_name,
        last_name,
        password
    };
    const login = await store.authenticate(user);
    res.json(login);
};
const user_routes = (app) => {
    app.get('/users', middleware_1.default, index);
    app.get('/users/:id', middleware_1.default, show);
    app.post('/users', middleware_1.default, create);
    app.post('/users/login', middleware_1.default, authenticate);
};
exports.default = user_routes;

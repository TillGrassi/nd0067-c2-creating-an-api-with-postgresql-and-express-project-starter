import express, { Request, Response } from 'express';
import { User, Users } from '../models/user';
import  jwt, { Secret }  from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyToken  from '../middleware'

dotenv.config();

const store = new Users();

const index = async (_req: Request, res:Response) => {
    try {
        const users = await store.index();
        res.json(users)
    } catch (err) {
        throw new Error(`Could not show all users: ${err}`)
    }
}

const show = async (req:Request, res:Response) => {
    try {
        const id: string = req.params.id
        const user = await store.show(id)
        res.json(user)
    } catch (err) {
        throw new Error(`Could not show user ${req.params.id}: ${err}`)
    }
}

const create = async (req:Request, res:Response) => {
    try {
        const first_name: string = req.body.first_name as string;
        const last_name: string = req.body.last_name as string;
        const password: string = req.body.password as string;
        const user: User = {
            first_name,
            last_name,
            password
        }
        const newUser = await store.create(user)
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as Secret);
        res.json(token)
    } catch(err) {
        throw new Error(`Could not create user ${req.body.first_name} ${req.body.last_name}: ${err}`)
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const first_name: string = req.body.first_name as string;
        const last_name: string = req.body.last_name as string;
        const password: string = req.body.password as string;
        const user: User = {
            first_name,
            last_name,
            password
        }
        const login = await store.authenticate(user);
        res.json(login);
    } catch (err) {
        throw new Error(`Could not authenticate user ${req.body.first_name} ${req.body.last_name}: ${err}`)
    }
}

const user_routes = (app: express.Application) => {
    app.get('/users', verifyToken, index)
    app.get('/users/:id', verifyToken, show)
    app.post('/users', create)
    app.post('/users/login', verifyToken, authenticate)
}

export default user_routes;
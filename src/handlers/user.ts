import express, { Request, Response } from 'express';
import { User, Users } from '../models/user';
import  jwt, { Secret }  from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyToken  from '../middleware'

dotenv.config();

const store = new Users();

const index = async (_req: Request, res:Response) => {
    const users = await store.index();
    res.json(users)
}

const show = async (req:Request, res:Response) => {
    const id: string = req.params.id
    const user = await store.show(id)
    res.json(user)
}

const create = async (req:Request, res:Response) => {
    const first_name: string = req.body.first_name as string;
    const last_name: string = req.body.last_name as string;
    const password: string = req.body.password as string;
    const user: User = {
        first_name,
        last_name,
        password
    }
    try {
        const newUser = await store.create(user)
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as Secret);
        res.json(token)
    } catch(err: any) {
        res.status(400)
        res.json(err + user)
    }
}

const authenticate = async (req: Request, res: Response) => {
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
}

const user_routes = (app: express.Application) => {
    app.get('/users', verifyToken, index)
    app.get('/users/:id', verifyToken, show)
    app.post('/users', verifyToken, create)
    app.post('/users/login', verifyToken, authenticate)
}

export default user_routes;
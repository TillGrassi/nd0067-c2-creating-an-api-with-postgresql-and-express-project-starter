import express, { Request, Response } from 'express';
import verifyToken from '../middleware';
import { Orders } from '../models/order';

const store = new Orders();

const show = async (req:Request, res:Response) => {
    const id: string = req.params.id
    const order = await store.show(id)
    res.json(order)
}

const order_routes = (app: express.Application) => {
    app.get('/orders/:id', verifyToken, show)
}

export default order_routes;
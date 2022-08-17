import express, { Request, Response } from 'express';
import verifyToken from '../middleware';
import { Orders } from '../models/order';

const store = new Orders();

const show = async (req:Request, res:Response) => {
    try{
        const id: number = parseInt(req.params.id);
        const order = await store.show(id)
        res.json(order)
    } catch (err) {
        throw new Error(`Could not show the orders: ${err}`)
    }
}

const order_routes = (app: express.Application) => {
    app.get('/orders/:id', verifyToken, show)
}

export default order_routes;
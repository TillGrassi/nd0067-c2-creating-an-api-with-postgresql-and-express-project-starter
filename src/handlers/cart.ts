import express, { Request, Response } from 'express';
import verifyToken from '../middleware';
import { Cart } from '../models/cart';

const store = new Cart();

const addProduct = async (req: Request, res: Response) => {
    try{
        const orderId: number = parseInt(req.body.id)
        const product: number = parseInt(req.body.product)
        const quantity: number = parseInt(req.body.quantity)
      
        const addedProduct = await store.addProduct(quantity, orderId, product)
        res.json(addedProduct)
    } catch (err) {
        throw new Error(`Could not add product to order: ${err}`)
    }
}

const cart_routes = async (app: express.Application) => {
    app.post('/cart', verifyToken, addProduct)
}

export default cart_routes
import express, { Request, Response } from 'express';
import { Cart } from '../models/cart';

const store = new Cart();

const addProduct = async (_req: Request, res: Response) => {
    const userId: string = _req.params.userid
    const products: string = _req.query.products as string
    const quantities: string = _req.query.quantities as string
  
    try {
      const addedProduct = await store.addProduct(products, quantities, userId)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
}

const cart_routes = async (app: express.Application) => {
    app.post('/cart/:userid?products&quantities', addProduct)
}

export default cart_routes
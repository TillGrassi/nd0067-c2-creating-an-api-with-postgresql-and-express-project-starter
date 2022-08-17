import  express, { Request, Response } from "express";
import verifyToken from "../middleware";
import { Product, Products } from "../models/product";

const store = new Products();

const index = async (_req:Request, res:Response) => {
    try {
        const products = await store.index();
        res.json(products)
    } catch (err) {
        throw new Error(`Could not show products: ${err}`)
    }
}

const show = async (req:Request, res:Response) => {
    try {
        const id: string = req.params.id
        const product = await store.show(id)
        res.json(product)
    } catch (err) {
        throw new Error(`Could not show product ${req.params.id}: ${err}`)
    }
}

const create = async (req:Request, res:Response) => {
    try {
        const name: string = req.body.name as string;
        const price: number = parseInt(req.body.price as string)
        const product: Product = {
            name,
            price
        }
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch (err) {
        throw new Error(`Could not create product ${req.body.name}: ${err}`)
    }
}

const product_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyToken, create)
}

export default product_routes;
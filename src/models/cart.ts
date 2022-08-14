// @ts-ignore
import client from "../database";
import { Order } from "./order";

export class Cart {
    async addProduct(products: string, quantities: string, userId: string): Promise<Order> {
        try {
          const sql = 'INSERT INTO order_products (products, quantities, user_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await client.connect()
    
          const result = await conn
              .query(sql, [products, quantities, userId])
    
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${products} to order ${userId}: ${err}`)
        }
    }
}
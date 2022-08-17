// @ts-ignore
import client from "../database";
import { Order } from "./order";

export class Cart {
    async addProduct(quantity: number, orderId: number, product: number): Promise<Order> {
        try {
          const sql = 'INSERT INTO cart_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await client.connect()
    
          const result = await conn
              .query(sql, [quantity, orderId, product])
    
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${product} to order ${orderId}: ${err}`)
        }
    }
}
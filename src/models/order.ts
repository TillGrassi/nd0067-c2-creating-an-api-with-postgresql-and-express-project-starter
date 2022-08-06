// @ts-ignore
import client from "../database";

export type Order = {
    id: number,
    products: string,
    quantities: string,
    user_id: string,
    order_status: string
}

export class Orders {
    async show(id: string): Promise<Order[]> {
        try {
        const sql = 'SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id'
        // @ts-ignore
        const conn = await client.connect()
        
        const result = await conn.query(sql, [id])
        
        conn.release()
        
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find orders from user ${id}. Error: ${err}`)
        }
    }
}
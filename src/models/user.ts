// @ts-ignore
import client from "../database";

export type User = {
    id: number,
    first_name: string,
    last_name: string,
    password: string
}

export class Users {
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
      
            const result = await conn.query(sql)
      
            conn.release()
      
            return result.rows 
          } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
          }
    }

    async show(id: string): Promise<User> {
        try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

    async create(b: User): Promise<User> {
        try {
        const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'
        // @ts-ignore
        const conn = await client.connect()
  
        const result = await conn
          .query(sql, [b.first_name, b.last_name, b.password])
  
        const user = result.rows[0]
  
        conn.release()
  
        return user
        } catch (err) {
            throw new Error(`Could not add new user ${b.first_name} ${b.last_name}. Error: ${err}`)
        }
    }
}
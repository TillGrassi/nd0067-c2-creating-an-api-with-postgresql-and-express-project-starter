// @ts-ignore
import client from "../database";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

export type User = {
    id?: number,
    first_name: string,
    last_name: string,
    password: string
}

dotenv.config();
const {
  BCRYPT_PASSWORD,
  SALT_ROUNDS
} = process.env;

const pepper: string = BCRYPT_PASSWORD as string;
const saltRounds: string = SALT_ROUNDS as string;

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
        const hash = bcrypt.hashSync(
            b.password + pepper,
            parseInt(saltRounds)
        )
        // @ts-ignore
        const conn = await client.connect()
  
        const result = await conn
          .query(sql, [b.first_name, b.last_name, hash])
  
        const user = result.rows[0]
  
        conn.release()
  
        return user
        } catch (err) {
            throw new Error(`Could not add new user ${b.first_name} ${b.last_name}. Error: ${err}`)
        }
    }

    async authenticate(b: User): Promise<User | null> {
        // @ts-ignore
        const conn = await client.connect()
        const sql = 'SELECT * FROM users WHERE first_name=($1) AND last_name=($2)'
    
        const result = await conn.query(sql, [b.first_name, b.last_name])
        
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          if (bcrypt.compareSync(b.password+pepper, user.password)) {
            return user
          }
        }
    
        return null
    }
}
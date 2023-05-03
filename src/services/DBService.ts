import knex from 'knex'
import type Conversation from '../entities/Conversation'
import { type Optional } from '../utils'

const {
  DATABASE_HOST = 'localhost',
  DATABASE_PORT = '3306',
  DATABASE_USER = 'h3b1',
  DATABASE_SCHEMA = 'h3b1',
  DATABASE_PASSWORD
} = process.env

class DBService {
  private static instance: DBService | undefined
  private readonly db = knex({
    client: 'mysql',
    connection: {
      host: DATABASE_HOST,
      port: !isNaN(parseInt(DATABASE_PORT)) ? parseInt(DATABASE_PORT) : 3306,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_SCHEMA
    }
  })

  public static getInstance (): DBService {
    if (this.instance === undefined) {
      this.instance = new this()
    }

    return this.instance
  }

  public async getConversations (): Promise<Conversation[]> {
    return await this.db<Conversation>('conversations').select('*')
  }

  public async upsertConversation (conversation: Optional<Conversation, 'id' | 'createdAt'>): Promise<void> {
    await this.db<Conversation>('conversations').upsert(conversation)
  }
}

export default DBService

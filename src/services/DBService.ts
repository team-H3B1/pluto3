import knex from 'knex'
import type Conversation from '../entities/Conversation'
import { type Optional } from '../utils'
import type Alert from '../entities/Alert'
import type Schedule from '../entities/Schedule'

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

  public async getAlerts (): Promise<Alert[]> {
    return await this.db<Alert>('alerts').select('*')
  }

  public async upsertAlert (alert: Optional<Alert, 'id' | 'createdAt'>): Promise<void> {
    await this.db<Alert>('alerts').upsert(alert)
  }

  public async getConversations (): Promise<Conversation[]> {
    return await this.db<Conversation>('conversations').select('*')
  }

  public async upsertConversation (conversation: Optional<Conversation, 'id' | 'createdAt'>): Promise<void> {
    await this.db<Conversation>('conversations').upsert(conversation)
  }

  public async getSchedules (date: string): Promise<Schedule[]> {
    return await this.db<Schedule>('schedules').select('*').where('date', date)
  }

  public async upsertSchedule (schedule: Optional<Schedule, 'id' | 'createdAt'>): Promise<void> {
    await this.db<Schedule>('schedules').upsert(schedule)
  }
}

export default DBService

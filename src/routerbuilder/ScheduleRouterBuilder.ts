import { type Request, type Response, Router } from 'express'
import type RouterBuilder from './RouterBuilder'
import DBService from '../services/DBService'

class ScheduleRouterBuilder implements RouterBuilder {
  private readonly router = Router()
  private readonly dbService = DBService.getInstance()

  constructor () {
    this.router.get('/', this.getSchedule.bind(this))
    this.router.post('/', this.createSchedule.bind(this))
  }

  private getSchedule (req: Request, res: Response): void {
    void (async () => {
      const { date } = req.query
      if (typeof date !== 'string') {
        res.send({ success: false })
        return
      }

      const schedules = await this.dbService.getSchedules(date)
      res.send({ success: true, schedules })
    })()
  }

  private createSchedule (req: Request, res: Response): void {
    void (async () => {
      const { schedule } = req.body
      if (schedule === undefined) {
        res.send({ success: false })
        return
      }

      await this.dbService.upsertSchedule(schedule)
      res.send({ success: true })
    })()
  }

  public build (): Router {
    return this.router
  }
}

export default ScheduleRouterBuilder

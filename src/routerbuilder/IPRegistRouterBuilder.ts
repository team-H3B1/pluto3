import { type Request, type Response, Router } from 'express'
import type RouterBuilder from './RouterBuilder'
import IPRegistrar from '../observables/IPRegistrar'

class IPRegistRouterBuilder implements RouterBuilder {
  private readonly router: Router = Router()
  private readonly ipRegistrar: IPRegistrar = IPRegistrar.getInstance()

  constructor () {
    this.router.post('/', this.saveIP.bind(this))
  }

  private saveIP (req: Request, res: Response): void {
    const { ip } = req.body

    if (typeof ip !== 'string') {
      res.status(400).send({ success: false })
      return
    }

    this.ipRegistrar.pushData(ip)
    res.send({ success: true })
  }

  public build (): Router {
    return this.router
  }
}

export default IPRegistRouterBuilder

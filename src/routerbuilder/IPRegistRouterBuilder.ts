import { type Request, type Response, Router, json } from 'express'
import type RouterBuilder from './RouterBuilder'
import IPRegistrar from '../observables/IPRegistrar'

class IPRegistRouterBuilder implements RouterBuilder {
  private readonly router: Router = Router()
  private readonly ipRegistrar: IPRegistrar = IPRegistrar.getInstance()

  constructor () {
    this.router.use(json())
    this.router.get('/', this.loadIP.bind(this))
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

  private loadIP (_: Request, res: Response): void {
    const ip = this.ipRegistrar.pullData()
    res.send({ success: ip !== undefined, ip })
  }

  public build (): Router {
    return this.router
  }
}

export default IPRegistRouterBuilder

import { type Request, type Response, Router, json } from 'express'
import type RouterBuilder from './RouterBuilder'
import { MjpegProxy } from 'mjpeg-proxy'
import FirebaseService from '../services/FirebaseService'
import DBService from '../services/DBService'
import LoginService from '../services/LoginService'

const {
  AI_BACKEND_URL = 'http://example.com'
} = process.env

class CVScreenRouterBuilder implements RouterBuilder {
  private readonly router = Router()
  private readonly dbService = DBService.getInstance()
  private readonly firebaseService = new FirebaseService()

  constructor () {
    this.router.use(json())
    this.router.get('/cv.jpg', LoginService.blockUnlogined, new MjpegProxy(`${AI_BACKEND_URL}/cv.jpg`).proxyRequest)
    this.router.get('/', LoginService.blockUnlogined, this.getCVAlert.bind(this))
    this.router.post('/', this.sendCVAlert.bind(this))
    this.router.post('/subscribe', LoginService.blockUnlogined, this.subscribeAlert.bind(this))
  }

  private getCVAlert (_: Request, res: Response): void {
    void (async () => {
      const alerts = await this.dbService.getAlerts()
      res.send({ success: true, alerts })
    })()
  }

  private sendCVAlert (req: Request, res: Response): void {
    void (async () => {
      const { message } = req.body

      if (message === undefined) {
        res.send({ success: false })
        return
      }

      await this.firebaseService.sendMessage('안전 경고!', message)
      await this.dbService.addAlert({ message })

      res.send({ success: true })
    })()
  }

  private subscribeAlert (req: Request, res: Response): void {
    void (async () => {
      const { registrationToken } = req.body

      if (registrationToken === undefined) {
        res.send({ success: false })
        return
      }

      await this.firebaseService.subscribe(registrationToken)
      res.send({ success: true })
    })()
  }

  public build (): Router {
    return this.router
  }
}

export default CVScreenRouterBuilder

import { type Request, type Response, Router, json } from 'express'
import type RouterBuilder from './RouterBuilder'
import LoginService from '../services/LoginService'

const {
  ADMIN_USER_ID = 'h3b1',
  ADMIN_USER_PW = 'youshallnotpass'
} = process.env

class LoginRouterBuilder implements RouterBuilder {
  private readonly router = Router()
  private readonly loginService = new LoginService()

  constructor () {
    this.router.use(json())
    this.router.post('/', this.loginUser.bind(this))
  }

  public loginUser (req: Request, res: Response): void {
    const { id, password } = req.body
    if (id !== ADMIN_USER_ID || password !== ADMIN_USER_PW) {
      res.send({ success: false })
      return
    }

    const token = this.loginService.createToken()
    res.send({ success: true, token })
  }

  public build (): Router {
    return this.router
  }
}

export default LoginRouterBuilder

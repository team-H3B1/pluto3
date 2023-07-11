import { type NextFunction, type Request, type Response } from 'express'
import { verify, sign } from 'jsonwebtoken'

const {
  LOGIN_SECRET = 'youshallnotpass'
} = process.env

class LoginService {
  public static blockUnlogined (req: Request, res: Response, next: NextFunction): void {
    const { authorization } = req.headers
    if (typeof authorization !== 'string') {
      res.status(401).send({ success: false, message: 'LOGIN_FIRST' })
      return
    }

    const verify = new this().verifyToken(authorization)
    if (!verify) {
      res.status(403).send({ success: false, message: 'WRONG_TOKEN' })
      return
    }

    next()
  }

  public verifyToken (token: string): boolean {
    try {
      verify(token, LOGIN_SECRET)
      return true
    } catch {
      return false
    }
  }

  public createToken (): string {
    return sign({}, LOGIN_SECRET)
  }
}

export default LoginService

import { Router } from 'express'
import type RouterBuilder from './RouterBuilder'
import { MjpegProxy } from 'mjpeg-proxy'

const {
  AI_BACKEND_URL = 'http://example.com'
} = process.env

class CVScreenRouterBuilder implements RouterBuilder {
  private readonly router = Router()

  constructor () {
    this.router.get('/cv.jpg', new MjpegProxy(`${AI_BACKEND_URL}/cv.jpg`).proxyRequest)
  }

  public build (): Router {
    return this.router
  }
}

export default CVScreenRouterBuilder

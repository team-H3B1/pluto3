import { type Request, type Response, Router } from 'express'
import { readFileSync } from 'fs'
import type RouterBuilder from './RouterBuilder'
import { serveFiles, setup } from 'swagger-ui-express'

class SwaggerRouterBuilder implements RouterBuilder {
  private readonly router = Router()
  private readonly swaggerDocs =
    readFileSync('./openapi.yaml')
      .toString()

  constructor () {
    const swaggerOptions = {
      url: '/_docs/openapi.yaml'
    }

    this.router.get('/openapi.yaml', this.getSwaggerDocs.bind(this))
    this.router.use('/',
      serveFiles(undefined, { swaggerOptions }),
      setup(undefined, { swaggerOptions }))
  }

  private getSwaggerDocs (req: Request, res: Response): void {
    res.setHeader('Content-Type', 'application/vnd.oai.openapi')
    res.send(this.swaggerDocs)
  }

  public build (): Router {
    return this.router
  }
}

export default SwaggerRouterBuilder

import { type Router } from 'express'

interface RouterBuilder {
  build: () => Router
}

export default RouterBuilder

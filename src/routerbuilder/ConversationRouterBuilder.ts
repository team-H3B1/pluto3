import { type Request, type Response, Router } from 'express'
import type RouterBuilder from './RouterBuilder'
import multer, { memoryStorage } from 'multer'
import STTService from '../services/STTService'
import GPTService from '../services/GPTService'

class ConversationRouterBuilder implements RouterBuilder {
  private readonly router = Router()
  private readonly upload = multer({
    storage: memoryStorage()
  })

  private readonly sttService = new STTService()
  private readonly gptService = new GPTService()

  constructor () {
    this.router.post('/', this.upload.single('audio'), this.relayAudio)
  }

  private relayAudio (req: Request, res: Response): void {
    void (async () => {
      if (req.file === undefined) {
        res.send({ success: false })
        return
      }

      const stt = await this.sttService.convertSTT(req.file.buffer)
      const gpt = await this.gptService.ask(stt)

      res.send({ success: true, result: gpt })
    })()
  }

  public build (): Router {
    return this.router
  }
}

export default ConversationRouterBuilder

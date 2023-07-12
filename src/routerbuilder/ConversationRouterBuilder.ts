import { type Request, type Response, Router } from 'express'
import type RouterBuilder from './RouterBuilder'
import multer, { memoryStorage } from 'multer'
import STTService from '../services/STTService'
import GPTService from '../services/GPTService'
import DBService from '../services/DBService'
import LoginService from '../services/LoginService'

class ConversationRouterBuilder implements RouterBuilder {
  private readonly router = Router()
  private readonly upload = multer({
    storage: memoryStorage()
  })

  private readonly sttService = new STTService()
  private readonly gptService = new GPTService()
  private readonly dbService = DBService.getInstance()

  constructor () {
    this.router.get('/', LoginService.blockUnlogined, this.getConversations.bind(this))
    this.router.post('/', this.upload.single('audio'), this.relayAudio.bind(this))
  }

  private getConversations (_: Request, res: Response): void {
    void (async () => {
      const conversations = await this.dbService.getConversations()
      res.send({ success: true, conversations })
    })()
  }

  private relayAudio (req: Request, res: Response): void {
    void (async () => {
      if (req.file === undefined) {
        res.send({ success: false })
        return
      }

      const stt = await this.sttService.convertSTT(req.file.buffer)
      const gpt = await this.gptService.ask(stt)

      await this.dbService.addConversation({
        request: stt,
        response: gpt
      })

      res.send({ success: true, result: gpt })
    })()
  }

  public build (): Router {
    return this.router
  }
}

export default ConversationRouterBuilder

import { Configuration, OpenAIApi } from 'openai'
const {
  OPENAI_API_KEY
} = process.env

class GPTService {
  private readonly client: OpenAIApi

  constructor () {
    this.client = new OpenAIApi(new Configuration({
      apiKey: OPENAI_API_KEY
    }))
  }

  public async ask (prompt: string): Promise<string> {
    return await this.client.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{
        content: prompt,
        role: 'user'
      }]
    }).then((res) => res.data.choices[0].message?.content ?? '')
  }
}

export default GPTService

import { fetch, FormData } from 'undici'

const {
  AI_BACKEND_URL = ''
} = process.env

class STTService {
  public async convertSTT (audioFile: Buffer): Promise<string> {
    const formData = new FormData()
    formData.append('audio', new Blob([audioFile]), 'audio.mp3')

    return await fetch(AI_BACKEND_URL + '/stt', {
      method: 'POST',
      body: formData
    }).then(async (res) => await res.json())
      .then((res: any) => res.result as string)
  }
}

export default STTService

import admin from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'

class FirebaseService {
  private readonly firebase = initializeApp({
    credential: admin.credential.applicationDefault()
  })

  public async sendMessage (title: string, body: string): Promise<void> {
    const messaging = getMessaging(this.firebase)
    await messaging.send({
      notification: {
        title,
        body
      },
      topic: 'main'
    })
  }
}

export default FirebaseService

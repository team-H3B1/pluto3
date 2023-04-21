import express from 'express'

async function run (): Promise<void> {
  const app = express()
  app.listen(3000)
}

void run()

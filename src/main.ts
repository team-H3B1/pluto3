import 'dotenv/config'

import morgan from 'morgan'
import express from 'express'
import IPRegistRouterBuilder from './routerbuilder/IPRegistRouterBuilder'
import ConversationRouterBuilder from './routerbuilder/ConversationRouterBuilder'

const {
  PORT = '3300'
} = process.env
const app = express()

app.use(morgan('combined'))

app.use('/ip', new IPRegistRouterBuilder().build())
app.use('/conversations', new ConversationRouterBuilder().build())

app.listen(PORT, () => {
  console.log('Server is now on http://127.0.0.1:' + PORT)
})

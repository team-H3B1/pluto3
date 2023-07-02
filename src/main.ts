import 'dotenv/config'

import morgan from 'morgan'
import express from 'express'
import IPRegistRouterBuilder from './routerbuilder/IPRegistRouterBuilder'
import ConversationRouterBuilder from './routerbuilder/ConversationRouterBuilder'
import CVScreenRouterBuilder from './routerbuilder/CVScreenRouterBuilder'
import SwaggerRouterBuilder from './routerbuilder/SwaggerRouterBuilder'
import ScheduleRouterBuilder from './routerbuilder/ScheduleRouterBuilder'

const {
  PORT = '3300'
} = process.env
const app = express()

app.use(morgan('combined'))

app.use('/_docs', new SwaggerRouterBuilder().build())
app.use('/ip', new IPRegistRouterBuilder().build())
app.use('/cv', new CVScreenRouterBuilder().build())
app.use('/schedules', new ScheduleRouterBuilder().build())
app.use('/conversations', new ConversationRouterBuilder().build())

app.listen(PORT, () => {
  console.log('Server is now on http://127.0.0.1:' + PORT)
})

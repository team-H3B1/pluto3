import 'dotenv/config'

import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import cookieParser from 'cookie-parser'

import IPRegistRouterBuilder from './routerbuilder/IPRegistRouterBuilder'
import ConversationRouterBuilder from './routerbuilder/ConversationRouterBuilder'
import CVScreenRouterBuilder from './routerbuilder/CVScreenRouterBuilder'
import SwaggerRouterBuilder from './routerbuilder/SwaggerRouterBuilder'
import ScheduleRouterBuilder from './routerbuilder/ScheduleRouterBuilder'
import LoginService from './services/LoginService'
import LoginRouterBuilder from './routerbuilder/LoginRouterBuilder'

const {
  PORT = '3300'
} = process.env
const app = express()

app.use(cors())
app.use(morgan('combined'))
app.use(cookieParser())

app.use('/_docs', new SwaggerRouterBuilder().build())
app.use('/login', new LoginRouterBuilder().build())
app.use('/ip', new IPRegistRouterBuilder().build())
app.use('/cv', new CVScreenRouterBuilder().build())
app.use('/schedules', LoginService.blockUnlogined, new ScheduleRouterBuilder().build())
app.use('/conversations', new ConversationRouterBuilder().build())

app.listen(PORT, () => {
  console.log('Server is now on http://127.0.0.1:' + PORT)
})

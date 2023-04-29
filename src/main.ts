import 'dotenv/config'

import morgan from 'morgan'
import express, { json } from 'express'
import IPRegistRouterBuilder from './routerbuilder/IPRegistRouterBuilder'

const {
  PORT = '3300'
} = process.env
const app = express()

app.use(morgan('combined'))
app.use(json())

app.use('/ip', new IPRegistRouterBuilder().build())

app.listen(PORT, () => {
  console.log('Server is now on http://127.0.0.1:' + PORT)
})

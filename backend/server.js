import express, { json } from 'express'
import { corsMiddleware } from './middleware/cors.js'
import mainRouter from './routes/index.js'
import errorHandler from './middleware/errorHandler.js'
import 'dotenv/config'

const app = express()
app.use(json())

app.use(corsMiddleware())

app.disable('x-powered-by')

app.use('/api/v1', mainRouter)

app.use(errorHandler)

export default app

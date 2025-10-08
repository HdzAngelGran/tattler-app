import express, { json } from 'express'
import { corsMiddleware } from './middleware/cors.js'
import 'dotenv/config'
import db from './db/config.js'

const app = express()
app.use(json())

app.use(corsMiddleware())

app.disable('x-powered-by')

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`)
})

db.connect

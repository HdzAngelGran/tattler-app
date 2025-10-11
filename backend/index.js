import 'dotenv/config'
import db from './db/config.js'
import app from './server.js'

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`)
})

db.connect

import mongoose from 'mongoose'

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

const db = mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('MongoDB connection error: ', err)
  })

export default db

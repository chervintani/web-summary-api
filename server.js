import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import summaryRoutes from './routes/summaryRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI, { dbName: 'website_scraper' })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Could not connect to MongoDB:', err))

app.use('/api/summary', summaryRoutes)

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
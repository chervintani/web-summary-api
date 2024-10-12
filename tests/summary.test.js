import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import Summary from '../models/Summary'

describe('Summary API', () => {
  let summaryId

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'website_scraper' })

    const summary = await Summary.create({
      url: 'http://example.com',
      status: 'completed',
      summary: 'This is a test summary.'
    })
    summaryId = summary._id
  })

  afterAll(async () => {
    await Summary.findByIdAndDelete(summaryId)
    await mongoose.disconnect()
  })

  describe('GET /api/summary/:id', () => {
    it('should return the summary by ID', async () => {
      const res = await request(app).get(`/api/summary/${summaryId}`)
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('summary', 'This is a test summary.')
    }, 10000)

    it('should return 404 if summary not found', async () => {
      const res = await request(app).get('/api/summary/123') // Use an invalid ID
      expect(res.statusCode).toEqual(404)
      expect(res.body).toHaveProperty('message', 'Summary not found')
    }, 10000)
  })
})

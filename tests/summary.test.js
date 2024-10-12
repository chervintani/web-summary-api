import request from 'supertest'
import app from '../server' // Adjust the path as necessary
import mongoose from 'mongoose'
import Summary from '../models/Summary' // Adjust the path as necessary

describe('Summary API', () => {
  let summaryId

  beforeAll(async () => {
    // Connect to the test database (use a separate database for testing)
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'test_database' })

    // Create a summary for testing
    const summary = await Summary.create({
      url: 'http://example.com',
      status: 'completed',
      summary: 'This is a test summary.'
    })
    summaryId = summary._id // Store the ID for use in tests
  })

  afterAll(async () => {
    // Clean up test data and close the connection
    await Summary.deleteMany() // Remove all test data
    await mongoose.disconnect() // Disconnect from the database
  })

  describe('GET /api/summary/:id', () => {
    it('should return the summary by ID', async () => {
      const res = await request(app).get(`/api/summary/${summaryId}`)
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('summary', 'This is a test summary.')
    })

    it('should return 404 if summary not found', async () => {
      const res = await request(app).get('/api/summary/123') // Use an invalid ID
      expect(res.statusCode).toEqual(404)
      expect(res.body).toHaveProperty('message', 'Summary not found')
    })
  })
})

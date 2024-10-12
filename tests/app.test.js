import request from 'supertest'
import app from '../server' // Adjust this path to your Express app

describe('GET /', () => {
  it('should return Hello, World!', async () => {
    const res = await request(app).get('/') // Use the imported app instance
    expect(res.statusCode).toEqual(200)
    expect(res.text).toBe('Hello, World!')
  })
})

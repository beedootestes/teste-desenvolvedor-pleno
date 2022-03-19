import request from 'supertest'
import app from '../../../config/http/app'

describe('Answer Routes', () => {
  test('Should return an list of answer on sucess', async () => {
    await request(app)
      .get('/api/answer')
      .expect(200)
  })
})

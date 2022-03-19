import request from 'supertest'
import app from '../../../config/http/app'

describe('Questions Routes', () => {
  test('Should return an list of questions on sucess', async () => {
    await request(app)
      .get('/api/question')
      .expect(200)
  })
})

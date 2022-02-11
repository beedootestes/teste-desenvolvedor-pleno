import request from 'supertest'
import app from '../config/app'

describe('Add Question', () => {
  test('Should return question success', async () => {
    await request(app)
      .post('/api/add-question')
      .send({ question: 'valid_question' })
      .expect(200)
  })
})

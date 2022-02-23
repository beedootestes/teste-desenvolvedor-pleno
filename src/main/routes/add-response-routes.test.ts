import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Add Question', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const responsesCollection = await MongoHelper.getCollection('responses')
    await responsesCollection.deleteMany({})
  })

  test('Should return response on success', async () => {
    await request(app)
      .post('/api/add-response')
      .send({ response: 'valid_response', id: 'any_valid_question_id' })
      .expect(200)
  })
})

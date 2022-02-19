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
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.insertOne({ id: 'valid_id', question: 'any_question' })
  })

  afterEach(async () => {
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.deleteMany({})
  })

  test('Should return question success', async () => {
    await request(app)
      .post('/api/update-question/valid_id')
      .send({ question: 'valid_question' })
      .expect(200)
  })
})

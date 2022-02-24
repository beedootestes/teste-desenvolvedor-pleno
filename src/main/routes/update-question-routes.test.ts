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
    await questionsCollection.deleteMany({})
    await questionsCollection.insertOne({ id: 'valid_id', question: 'any_question' })
  })

  afterEach(async () => {
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.deleteMany({})
  })

  test('Should return question success', async () => {
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.insertOne({ question: 'Fake question', responses: [] })
    const fakeQuestion = await questionsCollection.findOne({ question: 'Fake question' })

    const id = fakeQuestion?._id.toString().valueOf() ?? 'any_id'
    await request(app)
      .post('/api/update-question/' + id)
      .send({ question: 'valid_question' })
      .expect(200)
  })
})

import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Add Response', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const responsesCollection = await MongoHelper.getCollection('responses')
    await responsesCollection.deleteMany({})
  })

  test('Should return response on success', async () => {
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.insertOne({ question: 'Fake question' })
    const fakeQuestion = await questionsCollection.findOne({ question: 'Fake question' })

    const id = fakeQuestion?._id.toString().valueOf() ?? 'any_id'
    await request(app)
      .post('/api/add-response/' + id)
      .send({ response: 'valid_response' })
      .expect(200)
  })
})

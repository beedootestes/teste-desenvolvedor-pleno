import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('List Responses', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.deleteMany({})
  })

  test('Should return Responses on success', async () => {
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.insertOne({
      question: 'Fake question',
      responses: ['response 1', 'response 2']
    })
    const fakeQuestion = await questionsCollection.findOne({
      question: 'Fake question'
    })

    const id = fakeQuestion?._id.toString().valueOf() ?? 'any_id'
    await request(app)
      .get('/api/list-responses/' + id)
      .send()
      .expect(200)
  })
})

import request from 'supertest'
import { UpdateResponseModel } from '../../domain/usecases/update-response'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Update Response', () => {
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

  test('Should return ok on succes success', async () => {
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.insertOne(
      {
        question: 'Fake question',
        responses: ['old_response']
      })
    const fakeQuestion = await questionsCollection.findOne({ question: 'Fake question' })

    const id = fakeQuestion?._id.toString().valueOf() ?? 'any_id'
    const response: UpdateResponseModel = {
      question_id: id,
      old_response: 'old_response',
      new_response: 'new_response'
    }
    await request(app)
      .post('/api/update-response/' + id)
      .send(response)
      .expect(200)
  })
})

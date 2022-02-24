import { ResponseMongoRepository } from './response'
import { MongoHelper } from './response-protocols'

describe('Response Mongo repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const ResponsesCollection = await MongoHelper.getCollection('responses')
    await ResponsesCollection.deleteMany({})
  })

  const makeSut = (): ResponseMongoRepository => {
    return new ResponseMongoRepository()
  }

  test('Should return a Response on success', async () => {
    const sut = makeSut()
    const response = await sut.add({
      response: 'any_response',
      question_id: 'valid_question_id'
    })
    expect(response).toBeTruthy()
    expect(response.id).toBeTruthy()
    expect(response.response).toBe('any_response')
  })
})

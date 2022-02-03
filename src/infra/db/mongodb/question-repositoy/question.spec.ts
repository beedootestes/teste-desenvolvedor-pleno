import { MongoHelper } from '../helpers/mongo-helper'
import { QuestionMongoRepository } from './question'

describe('Question Mongo repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): QuestionMongoRepository => {
    return new QuestionMongoRepository()
  }

  test('Should return a question on success', async () => {
    const sut = makeSut()
    const question = await sut.add({
      question: 'any_question'
    })
    expect(question).toBeTruthy()
    expect(question.id).toBeTruthy()
    expect(question.question).toBe('any_question')
  })
})

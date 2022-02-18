import { MongoHelper } from './question-protococols'
import { QuestionMongoRepository } from './question'

describe('Question Mongo repository', () => {
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

  test('Should return a List of questions on success', async () => {
    const sut = makeSut()
    await sut.add({
      question: 'any_question'
    })
    const questions = await sut.list()
    console.log(questions)
    expect(questions).toBeTruthy()
    expect(questions[0].id).toBeTruthy()
    expect(questions[0].question).toBe('any_question')
  })
})

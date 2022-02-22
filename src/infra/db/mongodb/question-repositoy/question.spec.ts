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
    expect(questions).toBeTruthy()
    expect(questions[0].id).toBeTruthy()
    expect(questions[0].question).toBe('any_question')
  })

  test('Should return a question when updates is a success', async () => {
    const sut = makeSut()
    const question = await sut.update({
      question: 'any_question',
      id: 'any_id'
    })
    expect(question).toBeTruthy()
    expect(question.id).toBeTruthy()
    expect(question.question).toBe('any_question')
    expect(question.id).toBe('any_id')
  })

  test('Should return a question when get is a success', async () => {
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.insertOne({ question: 'Fake question' })
    const fakeQuestion = await questionsCollection.findOne({ question: 'Fake question' })

    const id = fakeQuestion?._id.toString().valueOf() ?? 'any_id'
    const sut = makeSut()
    const question = await sut.get(id)
    expect(question).toBeTruthy()
  })

  test('Should return null when get does not find question', async () => {
    const id = '55153a8014829a865bbf700d'
    const sut = makeSut()
    const response = await sut.get(id)
    expect(response).toBe(null)
  })

  test('Should return true when deletion is a success', async () => {
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.insertOne({ question: 'Fake question' })
    const fakeQuestion = await questionsCollection.findOne({ question: 'Fake question' })

    const id = fakeQuestion?._id.toString().valueOf() ?? 'any_id'
    const sut = makeSut()
    const response = await sut.delete(id)
    expect(response).toBe(true)
  })

  test('Should return false when deletion is a success', async () => {
    const id = '55153a8014829a865bbf700d'
    const sut = makeSut()
    const response = await sut.delete(id)
    expect(response).toBe(false)
  })
})

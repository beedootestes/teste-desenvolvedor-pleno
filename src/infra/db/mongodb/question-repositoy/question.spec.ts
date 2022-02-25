import { MongoHelper } from './question-protococols'
import { QuestionMongoRepository } from './question'
import { UpdateResponseModel } from '../../../../domain/usecases/update-response'
import { DeleteResponseModel } from '../../../../domain/usecases/delete-response'

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
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.insertOne({ question: 'Fake question' })
    const fakeQuestion = await questionsCollection.findOne({ question: 'Fake question' })

    const id = fakeQuestion?._id.toString().valueOf() ?? 'any_id'
    const sut = makeSut()
    const question = await sut.update({
      question: 'any_question',
      id: id,
      responses: ['any_response_id']
    })
    expect(question).toBeTruthy()
    expect(question.id).toBeTruthy()
    expect(question.question).toBe('any_question')
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

  test('Should return true when addResponse is a success', async () => {
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.insertOne({ question: 'Fake question' })
    const fakeQuestion = await questionsCollection.findOne({ question: 'Fake question' })

    const id = fakeQuestion?._id.toString().valueOf() ?? 'any_id'
    const sut = makeSut()
    const response = await sut.addResponse({ question_id: id, response: 'new_response' })
    expect(response).toBe(true)
  })

  test('Should return a list of ids when listResponses is a success', async () => {
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.insertOne({
      question: 'Fake question',
      responses: ['response 1', 'response 2']
    })
    const fakeQuestion = await questionsCollection.findOne({ question: 'Fake question' })

    const id = fakeQuestion?._id.toString().valueOf() ?? 'any_id'
    const sut = makeSut()
    const responses = await sut.listResponses(id)
    expect(responses).toBeTruthy()
    expect(responses[0]).toBe('response 1')
  })

  test('Should return true when updateResponse is a success', async () => {
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.insertOne(
      {
        question: 'Fake question',
        responses: ['old_response']
      })
    const fakeQuestion = await questionsCollection.findOne({ question: 'Fake question' })

    const id = fakeQuestion?._id.toString().valueOf() ?? 'any_id'
    const inputResponses: UpdateResponseModel = {
      new_response: 'new_response',
      old_response: 'old_response',
      question_id: id
    }
    const sut = makeSut()
    const response = await sut.updateResponse(inputResponses)
    expect(response).toBe(true)
  })

  test('Should return true when deleteResponse is a success', async () => {
    const questionsCollection = await MongoHelper.getCollection('questions')
    await questionsCollection.insertOne(
      {
        question: 'Fake question',
        responses: ['old_response']
      })
    const fakeQuestion = await questionsCollection.findOne({ question: 'Fake question' })

    const id = fakeQuestion?._id.toString().valueOf() ?? 'any_id'
    const inputResponse: DeleteResponseModel = {
      response: 'old_response',
      question_id: id
    }
    const sut = makeSut()
    const response = await sut.deleteResponse(inputResponse)
    expect(response).toBe(true)
  })
})

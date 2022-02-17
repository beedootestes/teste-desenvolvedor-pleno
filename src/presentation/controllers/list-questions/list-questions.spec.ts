import { ListQuestions, HttpRequest, QuestionModel } from './list-questions-protocols'
import { ListQuestionsController } from './list-questions'
import { ok, serverError } from '../../helpers/http-helpers'

describe('ListQuestion Controller', () => {
  const makeFakeListOfQuestions = (): QuestionModel[] => ([{
    id: 'valid_id',
    question: 'valid_question'
  }])

  const makeFakeRequest = (): HttpRequest => ({
    body: {}
  })

  interface SutType {
    sut: ListQuestionsController
    listQuestionsStub: ListQuestions
  }

  const makeSut = (): SutType => {
    const listQuestionsStub = makeListQuestions()
    const sut = new ListQuestionsController(listQuestionsStub)
    return {
      sut,
      listQuestionsStub
    }
  }

  const makeListQuestions = (): ListQuestions => {
    class ListQuestionStub implements ListQuestions {
      async list (): Promise<QuestionModel[]> {
        return await new Promise(resolve => resolve(makeFakeListOfQuestions()))
      }
    }
    return new ListQuestionStub()
  }

  test('Should call list Questions with no values', async () => {
    const { sut, listQuestionsStub } = makeSut()
    const isValidSpy = jest.spyOn(listQuestionsStub, 'list')
    const fakeHttpRequest = makeFakeRequest()
    await sut.handle(fakeHttpRequest)
    expect(isValidSpy).toHaveBeenCalledWith()
  })

  test('Should return 500 if listQuestions throws', async () => {
    const { sut, listQuestionsStub } = makeSut()
    jest.spyOn(listQuestionsStub, 'list').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const fakeHttpRequest = makeFakeRequest()
    let httpResponse
    try {
      httpResponse = await sut.handle(fakeHttpRequest)
    } catch (error) {
      expect(httpResponse).toEqual(serverError(error))
    }
  })

  test('Should return 200 when valid data is provided', async () => {
    const { sut } = makeSut()
    const fakeHttpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse).toEqual(ok(makeFakeListOfQuestions()))
  })
})

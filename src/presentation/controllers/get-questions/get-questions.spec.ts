import { HttpRequest } from './get-questions-protocols'
import { ok, serverError } from '../../helpers/http-helpers'
import { GetQuestions, GetQuestionsResponseModel } from '../../../domain/usecases/get-questions'
import { GetQuestionsController } from './get-questions'

describe('GetQuestion Controller', () => {
  const makeFakeListOfQuestions = (): GetQuestionsResponseModel[] => ([{
    id: 'valid_id',
    question: 'valid_question'
  }])

  const makeFakeRequest = (): HttpRequest => ({
    body: {}
  })

  interface SutType {
    sut: GetQuestionsController
    getQuestionsStub: GetQuestions
  }

  const makeSut = (): SutType => {
    const getQuestionsStub = makeGetQuestions()
    const sut = new GetQuestionsController(getQuestionsStub)
    return {
      sut,
      getQuestionsStub
    }
  }

  const makeGetQuestions = (): GetQuestions => {
    class GetQuestionsStub implements GetQuestions {
      async list (): Promise<GetQuestionsResponseModel[]> {
        return await new Promise(resolve => resolve(makeFakeListOfQuestions()))
      }
    }
    return new GetQuestionsStub()
  }

  test('Should call list Questions with no values', async () => {
    const { sut, getQuestionsStub } = makeSut()
    const isValidSpy = jest.spyOn(getQuestionsStub, 'list')
    const fakeHttpRequest = makeFakeRequest()
    await sut.handle(fakeHttpRequest)
    expect(isValidSpy).toHaveBeenCalledWith()
  })

  test('Should return 500 if listQuestions throws', async () => {
    const { sut, getQuestionsStub } = makeSut()
    jest.spyOn(getQuestionsStub, 'list').mockImplementationOnce(async () => {
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

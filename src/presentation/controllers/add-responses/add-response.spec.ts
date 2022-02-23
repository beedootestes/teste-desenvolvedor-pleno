import { ok } from '../../helpers/http-helpers'
import { AddResponseController } from './add-response'
import { AddResponse, AddResponseModel, HttpRequest, ResponseModel } from './add-response-protocols'

describe('AddResponseController', () => {
  const makeFakeResponse = (): ResponseModel => ({
    id: 'valid_response_id',
    response: 'valid_response',
    questions: ['valid_question_id']
  })

  const makeFakeRequest = (): HttpRequest => ({
    body: {
      response: 'valid_response'
    },
    params: {
      id: 'valid_question_id'
    }
  })

  interface SutType {
    sut: AddResponseController
    addResponseStub: AddResponse
  }

  const makeSut = (): SutType => {
    const addResponseStub = makeAddResponse()
    const sut = new AddResponseController(addResponseStub)
    return {
      sut,
      addResponseStub
    }
  }

  const makeAddResponse = (): AddResponse => {
    class AddResponseStub implements AddResponse {
      async add (response: AddResponseModel): Promise<ResponseModel> {
        const fakeResponse = makeFakeResponse()
        return await new Promise(resolve => resolve(fakeResponse))
      }
    }
    return new AddResponseStub()
  }

  test('Should call addResponse with correct values', async () => {
    const { sut, addResponseStub } = makeSut()
    const isValidSpy = jest.spyOn(addResponseStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith({
      response: 'valid_response',
      id: 'valid_question_id'
    })
  })

  test('Should return 200 if has valid data', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok(makeFakeResponse()))
  })
})

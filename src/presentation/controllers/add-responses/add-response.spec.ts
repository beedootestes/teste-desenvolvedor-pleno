import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { AddResponseController } from './add-response'
import { AddResponse, AddResponseModel, HttpRequest, ResponseModel, Validation } from './add-response-protocols'

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
    validationStub: Validation
  }

  const makeSut = (): SutType => {
    const addResponseStub = makeAddResponse()
    const validationStub = makeValidation()
    const sut = new AddResponseController(addResponseStub, validationStub)
    return {
      sut,
      addResponseStub,
      validationStub
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

  const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return null
      }
    }
    return new ValidationStub()
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

  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const isValidSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith({
      response: 'valid_response',
      id: 'valid_question_id'
    })
  })

  test('Should returns 400 if validators throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should return 500 if addResponse throws', async () => {
    const { sut, addResponseStub } = makeSut()
    jest.spyOn(addResponseStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = makeFakeRequest()
    let httpResponse
    try {
      httpResponse = await sut.handle(httpRequest)
    } catch (error) {
      expect(httpResponse).toEqual(serverError(error))
    }
  })
})

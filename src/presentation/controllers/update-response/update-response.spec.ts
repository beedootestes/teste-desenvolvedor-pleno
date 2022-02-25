import { UpdateResponse, UpdateResponseModel } from '../../../domain/usecases/update-response'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { UpdateResponseController } from './update-resonse'
import { HttpRequest, Validation } from './update-response-protocols'

describe('UpdateResponseController', () => {
  const makeFakeRequest = (): HttpRequest => ({
    body: {
      new_response: 'valid_response',
      old_response: 'old_response'
    },
    params: {
      question_id: 'valid_question_id'
    }
  })

  const makeFakeQuestion = (): UpdateResponseModel => ({
    question_id: 'valid_question_id',
    new_response: 'valid_response',
    old_response: 'old_response'
  })

  interface SutType {
    sut: UpdateResponseController
    updateResponseStub: UpdateResponse
    validationStub: Validation
  }

  const makeSut = (): SutType => {
    const updateResponseStub = makeUpdateResponse()
    const validationStub = makeValidation()
    const sut = new UpdateResponseController(updateResponseStub, validationStub)
    return {
      sut,
      updateResponseStub,
      validationStub
    }
  }

  const makeUpdateResponse = (): UpdateResponse => {
    class UpdateResponseStub implements UpdateResponse {
      async update (response: UpdateResponseModel): Promise<Boolean> {
        return await new Promise(resolve => resolve(true))
      }
    }
    return new UpdateResponseStub()
  }

  const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return null
      }
    }
    return new ValidationStub()
  }

  test('Should call UpdateResponse with correct values', async () => {
    const { sut, updateResponseStub } = makeSut()
    const isValidSpy = jest.spyOn(updateResponseStub, 'update')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(makeFakeQuestion())
  })

  test('Should return 200 if it has valid data', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok(true))
  })

  test('Should return serverError if updateResponses throws', async () => {
    const { sut, updateResponseStub } = makeSut()
    jest.spyOn(updateResponseStub, 'update').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = makeFakeRequest()
    let response
    try {
      response = await sut.handle(httpRequest)
    } catch (error) {
      expect(response).toEqual(serverError(error))
    }
  })

  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const isValidSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(makeFakeQuestion())
  })

  test('Should returns 400 if validators throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})

import { UpdateResponse, UpdateResponseModel } from '../../../domain/usecases/update-response'
import { UpdateResponseController } from './update-resonse'
import { HttpRequest, Validation } from './update-response-protocols'

describe('UpdateResponseController', () => {
  const makeFakeRequest = (): HttpRequest => ({
    body: {
      new_response: 'valid_response'
    },
    params: {
      question_id: 'valid_question_id'
    }
  })

  interface SutType {
    sut: UpdateResponseController
    updateResponseStub: UpdateResponse
    validationStub: Validation
  }

  const makeSut = (): SutType => {
    const updateResponseStub = makeUpdateResponse()
    const validationStub = makeValidation()
    const sut = new UpdateResponseController(updateResponseStub)
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
    expect(isValidSpy).toHaveBeenCalledWith({
      new_response: 'valid_response',
      question_id: 'valid_question_id'
    })
  })
})

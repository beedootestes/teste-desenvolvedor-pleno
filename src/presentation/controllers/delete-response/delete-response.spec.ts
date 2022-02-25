import { ok, serverError } from '../../helpers/http-helpers'
import { DeleteResponseController } from './delete-resonse'
import { DeleteResponse, DeleteResponseModel, HttpRequest, Validation } from './delete-response-protocols'

describe('DeleteResponseController', () => {
  const makeFakeRequest = (): HttpRequest => ({
    body: {
      response: 'old_response'
    },
    params: {
      question_id: 'valid_question_id'
    }
  })

  const makeFakeQuestion = (): DeleteResponseModel => ({
    question_id: 'valid_question_id',
    response: 'old_response'
  })

  interface SutType {
    sut: DeleteResponseController
    deleteResponseStub: DeleteResponse
    validationStub: Validation
  }

  const makeSut = (): SutType => {
    const deleteResponseStub = makeDeleteResponse()
    const validationStub = makeValidation()
    const sut = new DeleteResponseController(deleteResponseStub, validationStub)
    return {
      sut,
      deleteResponseStub,
      validationStub
    }
  }

  const makeDeleteResponse = (): DeleteResponse => {
    class DeleteResponseStub implements DeleteResponse {
      async delete (response: DeleteResponseModel): Promise<Boolean> {
        return await new Promise(resolve => resolve(true))
      }
    }
    return new DeleteResponseStub()
  }

  const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return null
      }
    }
    return new ValidationStub()
  }

  test('Should call DeleteResponse with correct values', async () => {
    const { sut, deleteResponseStub } = makeSut()
    const isValidSpy = jest.spyOn(deleteResponseStub, 'delete')
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
    const { sut, deleteResponseStub } = makeSut()
    jest.spyOn(deleteResponseStub, 'delete').mockImplementationOnce(async () => {
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
})

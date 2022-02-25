import { DeleteQuestion } from '../../../domain/usecases/delete-question'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { DeleteQuestionController } from './delete-question'
import { HttpRequest, Validation } from './delete-question-protocols'

describe('Delete Question Controller', () => {
  const makeFakeRequest = (): HttpRequest => ({
    body: {},
    params: {
      id: 'valid_id'
    }
  })

  interface Sut {
    sut: DeleteQuestionController
    deleteQuestionStub: DeleteQuestion
    validationStub: Validation
  }

  const makeSut = (): Sut => {
    const deleteQuestionStub = makeDeleteQuestion()
    const validationStub = makeValidationStub()
    const sut = new DeleteQuestionController(deleteQuestionStub, validationStub)
    return {
      sut,
      deleteQuestionStub,
      validationStub
    }
  }

  const makeValidationStub = (): Validation => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return null
      }
    }
    return new ValidationStub()
  }

  const makeDeleteQuestion = (): DeleteQuestion => {
    class DeleteQuestionStub implements DeleteQuestion {
      async delete (id: string): Promise<Boolean> {
        return await new Promise(resolve => resolve(true))
      }
    }
    return new DeleteQuestionStub()
  }

  test('Should call deleteQuestion with correct values', async () => {
    const { sut, deleteQuestionStub } = makeSut()
    const isValidSpy = jest.spyOn(deleteQuestionStub, 'delete')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const isValidSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith({ id: 'valid_id' })
  })

  test('Should return 400 when validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => new InvalidParamError('id'))
    const httpRequest = makeFakeRequest()
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new InvalidParamError('id')))
  })

  test('Should return serverError if deleteQuestions throws', async () => {
    const { sut, deleteQuestionStub } = makeSut()
    jest.spyOn(deleteQuestionStub, 'delete').mockImplementationOnce(async () => {
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

  test('Should returns 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(ok(true))
  })
})

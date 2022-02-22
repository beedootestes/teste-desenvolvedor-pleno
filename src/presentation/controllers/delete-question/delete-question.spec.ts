import { DeleteQuestion } from '../../../domain/usecases/delete-question'
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
    const sut = new DeleteQuestionController(deleteQuestionStub)
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
})

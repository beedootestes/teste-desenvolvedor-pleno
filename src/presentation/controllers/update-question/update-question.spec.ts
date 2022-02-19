import { UpdateQuestionController } from './update-question'
import { HttpRequest, QuestionModel, UpdateQuestion, UpdateQuestionModel, Validation } from './update-question-protocols'

describe('Update Question Controller', () => {
  const makeFakeRequest = (): HttpRequest => ({
    body: {
      question: 'valid_question'
    },
    params: {
      id: 'valid_id'
    }
  })

  const makeFakeQuestion = (): QuestionModel => ({
    id: 'valid_id',
    question: 'valid_question'
  })

  interface Sut {
    sut: UpdateQuestionController
    updateQuestionStub: UpdateQuestion
    validationStub: Validation
  }

  const makeSut = (): Sut => {
    const updateQuestionStub = makeupdateQuestion()
    const validationStub = makeValidationStub()
    const sut = new UpdateQuestionController(updateQuestionStub, validationStub)
    return {
      sut,
      updateQuestionStub,
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

  const makeupdateQuestion = (): UpdateQuestion => {
    class UpdateQuestionStub implements UpdateQuestion {
      async update (question: UpdateQuestionModel): Promise<QuestionModel> {
        const fakeQuestion = makeFakeQuestion()
        return await new Promise(resolve => resolve(fakeQuestion))
      }
    }
    return new UpdateQuestionStub()
  }

  test('Should call updateQuestion with correct values', async () => {
    const { sut, updateQuestionStub } = makeSut()
    const isValidSpy = jest.spyOn(updateQuestionStub, 'update')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith({
      id: 'valid_id',
      question: 'valid_question'
    })
  })
})

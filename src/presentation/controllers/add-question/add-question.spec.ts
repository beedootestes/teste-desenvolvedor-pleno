import { AddQuestion, AddQuestionModel, HttpRequest, QuestionModel, Validation } from './add-question-protocols'
import { AddQuestionController } from './add-question'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'

describe('AddQuestion Controller', () => {
  const makeFakeRequest = (): HttpRequest => ({
    body: {
      question: 'valid_question'
    }
  })

  const makeFakeQuestion = (): QuestionModel => ({
    id: 'valid_id',
    question: 'valid_question'
  })

  interface Sut {
    sut: AddQuestionController
    addQuestionStub: AddQuestion
    validationStub: Validation
  }

  const makeSut = (): Sut => {
    const addQuestionStub = makeAddQuestion()
    const validationStub = makeValidationStub()
    const sut = new AddQuestionController(addQuestionStub, validationStub)
    return {
      sut,
      addQuestionStub,
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

  const makeAddQuestion = (): AddQuestion => {
    class AddQuestionStub implements AddQuestion {
      async add (question: AddQuestionModel): Promise<QuestionModel> {
        const fakeQuestion = makeFakeQuestion()
        return await new Promise(resolve => resolve(fakeQuestion))
      }
    }
    return new AddQuestionStub()
  }

  test('Should call addQuestion with correct values', async () => {
    const { sut, addQuestionStub } = makeSut()
    const isValidSpy = jest.spyOn(addQuestionStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith({
      question: 'valid_question'
    })
  })

  test('Should return 500 if addQuestion throws', async () => {
    const { sut, addQuestionStub } = makeSut()
    jest.spyOn(addQuestionStub, 'add').mockImplementationOnce(async () => {
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

  test('Should return 200 if it valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(makeFakeQuestion()))
  })

  test('Should call validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should returns 400 if validators throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})

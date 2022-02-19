import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
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

  test('Should return 500 if updateQuestion throws', async () => {
    const { sut, updateQuestionStub } = makeSut()
    jest.spyOn(updateQuestionStub, 'update').mockImplementationOnce(async () => {
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

  test('Should call validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    expect(validateSpy).toHaveBeenLastCalledWith(httpRequest.params)
    expect(validateSpy).toHaveBeenCalledTimes(2)
  })

  test('Should returns 400 if validators throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should returns 400 if validators throws at param', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(null)
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should return 200 if it valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(makeFakeQuestion()))
  })
})

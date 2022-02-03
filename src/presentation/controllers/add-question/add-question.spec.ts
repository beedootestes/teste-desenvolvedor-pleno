import { AddQuestion, AddQuestionModel, QuestionModel } from './add-question-protocols'
import { AddQuestionController } from './add-question'
import { MissingParamError } from '../../errors/missing-param-error'
import { ok, serverError } from '../../helpers/http-helpers'

describe('AddQuestion Controller', () => {
  interface Sut {
    sut: AddQuestionController
    addQuestionStub: AddQuestion
  }

  const makeSut = (): Sut => {
    const addQuestionStub = makeAddQuestion()
    const sut = new AddQuestionController(addQuestionStub)
    return {
      sut,
      addQuestionStub
    }
  }

  const makeAddQuestion = (): AddQuestion => {
    class AddQuestionStub implements AddQuestion {
      add(question: AddQuestionModel): QuestionModel {
        const fakeQuestion = {
          id: 'valid_id',
          question: 'valid_question'
        }
        return fakeQuestion
      }
    }
    return new AddQuestionStub()
  }

  test('Should return 400 if no question is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('question'))
  })

  test('Should call addQuestion with correct values', () => {
    const { sut, addQuestionStub } = makeSut()
    const isValidSpy = jest.spyOn(addQuestionStub, 'add')
    const httpRequest = {
      body: {
        question: 'valid_question'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('valid_question')
  })

  test('Should return 500 if addQuestion throws', () => {
    const { sut, addQuestionStub } = makeSut()
    jest.spyOn(addQuestionStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        question: 'valid_question'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError())
  })

  test('Should return 200 if it valid data is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        question: 'valid_question'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok())
  })
})

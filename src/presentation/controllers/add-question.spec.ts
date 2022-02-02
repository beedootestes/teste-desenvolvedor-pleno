import { MissingParamError } from '../errors/missing-param-error'
import { AddQuestionController } from './add-question'

describe('AddQuestion Controller', () => {
  const makeSut = (): AddQuestionController => {
    return new AddQuestionController()
  }
  test('Should return 400 if no question is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      body: {}
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('question'))
  })
})

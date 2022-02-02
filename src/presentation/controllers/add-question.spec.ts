import { AddQuestionController } from './add-question'

describe('AddQuestion Controller', () => {
  test('Should return 400 if no question is provided', () => {
    const sut = new AddQuestionController()
    const httpRequest = {
      body: {}
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})

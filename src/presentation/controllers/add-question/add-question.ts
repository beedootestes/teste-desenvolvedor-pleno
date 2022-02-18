import { AddQuestion, Controller, HttpRequest, HttpResponse, Validation } from './add-question-protocols'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'

export class AddQuestionController implements Controller {
  private readonly addQuestion: AddQuestion
  private readonly validation: Validation

  constructor (addQuestion, validation) {
    this.addQuestion = addQuestion
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      if (!httpRequest.body.question) {
        return badRequest(new MissingParamError('question'))
      }
      const question = httpRequest.body
      const result = await this.addQuestion.add(question)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

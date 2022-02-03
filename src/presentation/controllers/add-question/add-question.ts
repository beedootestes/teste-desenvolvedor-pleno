import { AddQuestion, Controller, HttpRequest, HttpResponse } from './add-question-protocols'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'

export class AddQuestionController implements Controller {
  private readonly addQuestion: AddQuestion

  constructor (addQuestion) {
    this.addQuestion = addQuestion
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.question) {
        return badRequest(new MissingParamError('question'))
      }
      const { question } = httpRequest.body
      const result = await this.addQuestion.add(question)
      return ok(result)
    } catch (error) {
      return serverError()
    }
  }
}

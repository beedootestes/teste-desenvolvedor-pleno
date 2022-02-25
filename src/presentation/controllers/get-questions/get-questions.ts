import { Controller, GetQuestions, HttpRequest, HttpResponse } from './get-questions-protocols'
import { ok, serverError } from '../../helpers/http-helpers'

export class GetQuestionsController implements Controller {
  private readonly getQuestions: GetQuestions

  constructor (getQuestions: GetQuestions) {
    this.getQuestions = getQuestions
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.getQuestions.list()
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

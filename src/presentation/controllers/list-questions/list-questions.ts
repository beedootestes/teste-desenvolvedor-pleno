import { Controller, HttpRequest, HttpResponse, ListQuestions } from './list-questions-protocols'
import { ok, serverError } from '../../helpers/http-helpers'

export class ListQuestionsController implements Controller {
  private readonly listQuestions: ListQuestions

  constructor (listQuestions: ListQuestions) {
    this.listQuestions = listQuestions
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.listQuestions.list()
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

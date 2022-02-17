import { ok } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse, ListQuestions } from './list-question-protocols'

export class ListQuestionsController implements Controller {
  private readonly listQuestions: ListQuestions

  constructor (listQuestions: ListQuestions) {
    this.listQuestions = listQuestions
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const result = await this.listQuestions.list()
    return ok(result)
  }
}

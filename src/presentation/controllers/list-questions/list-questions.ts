import { ListQuestions } from '../../../domain/usecases/list-questions'
import { ok } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

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

import { DeleteQuestion } from '../../../domain/usecases/delete-question'
import { Controller, HttpRequest, HttpResponse } from './delete-question-protocols'

export class DeleteQuestionController implements Controller {
  private readonly deleteQuestion: DeleteQuestion

  constructor (deleteQuestion) {
    this.deleteQuestion = deleteQuestion
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const id: string = httpRequest.params.id
    await this.deleteQuestion.delete(id)
    return { body: true, statusCode: 200 }
  }
}

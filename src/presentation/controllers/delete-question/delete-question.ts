import { DeleteQuestion } from '../../../domain/usecases/delete-question'
import { Controller, HttpRequest, HttpResponse, Validation } from './delete-question-protocols'

export class DeleteQuestionController implements Controller {
  private readonly deleteQuestion: DeleteQuestion
  private readonly validation: Validation

  constructor (deleteQuestion: DeleteQuestion, validation: Validation) {
    this.deleteQuestion = deleteQuestion
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const id: string = httpRequest.params.id
    this.validation.validate(httpRequest.params)

    await this.deleteQuestion.delete(id)
    return { body: true, statusCode: 200 }
  }
}

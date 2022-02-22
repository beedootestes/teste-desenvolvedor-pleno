import { DeleteQuestion } from '../../../domain/usecases/delete-question'
import { badRequest } from '../../helpers/http-helpers'
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
    const error = this.validation.validate(httpRequest.params)
    if (error) {
      return badRequest(error)
    }
    await this.deleteQuestion.delete(id)
    return { body: true, statusCode: 200 }
  }
}

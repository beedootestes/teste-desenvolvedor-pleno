import { DeleteQuestion } from '../../../domain/usecases/delete-question'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from './delete-question-protocols'

export class DeleteQuestionController implements Controller {
  private readonly deleteQuestion: DeleteQuestion
  private readonly validation: Validation

  constructor (deleteQuestion: DeleteQuestion, validation: Validation) {
    this.deleteQuestion = deleteQuestion
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id: string = httpRequest.params.id
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const result = await this.deleteQuestion.delete(id)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
import { UpdateQuestion, Controller, HttpRequest, HttpResponse, Validation } from './update-question-protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'

export class UpdateQuestionController implements Controller {
  private readonly updateQuestion: UpdateQuestion
  private readonly validation: Validation

  constructor(updateQuestion, validation) {
    this.updateQuestion = updateQuestion
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validations = { ...httpRequest.body, ...httpRequest.params }
      const error = this.validation.validate(validations)
      if (error) {
        return badRequest(error)
      }

      const question = { ...httpRequest.body, ...httpRequest.params }
      const result = await this.updateQuestion.update(question)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

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
      const question = httpRequest.body.question
      const responses = httpRequest.body.responses || []
      const id = httpRequest.params.id
      const inputValues = { question, responses, id }

      const validations = inputValues
      const error = this.validation.validate(validations)
      if (error) {
        return badRequest(error)
      }

      const result = await this.updateQuestion.update(inputValues)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

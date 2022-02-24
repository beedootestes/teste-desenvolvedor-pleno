import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { AddResponse, Controller, HttpRequest, HttpResponse, Validation } from './add-response-protocols'

export class AddResponseController implements Controller {
  private readonly addResponse: AddResponse
  private readonly validation: Validation

  constructor (addResponse, validation) {
    this.addResponse = addResponse
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({ ...httpRequest.body, ...httpRequest.params })
      if (error) {
        return badRequest(error)
      }
      const response = httpRequest.body
      const questionId = httpRequest.params.question_id
      const result = await this.addResponse.add({ ...response, question_id: questionId })
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

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
      const response = {
        response: httpRequest.body.response,
        question_id: httpRequest.params.question_id
      }

      const error = this.validation.validate(response)
      if (error) {
        return badRequest(error)
      }
      const result = await this.addResponse.add(response)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

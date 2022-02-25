import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { Controller, DeleteResponse, HttpRequest, HttpResponse, Validation } from './delete-response-protocols'

export class DeleteResponseController implements Controller {
  private readonly deleteResponse: DeleteResponse
  private readonly validation: Validation

  constructor (deleteResponse, validation) {
    this.deleteResponse = deleteResponse
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate({ ...httpRequest.params, ...httpRequest.body })
      if (error) {
        return badRequest(error)
      }

      const response = {
        response: httpRequest.body.response,
        question_id: httpRequest.params.question_id
      }
      const result = await this.deleteResponse.delete(response)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

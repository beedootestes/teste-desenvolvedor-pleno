import { ok } from '../../helpers/http-helpers'
import { Controller, DeleteResponse, HttpRequest, HttpResponse, Validation } from './delete-response-protocols'

export class DeleteResponseController implements Controller {
  private readonly DeleteResponse: DeleteResponse
  private readonly validation: Validation

  constructor (DeleteResponse, validation) {
    this.DeleteResponse = DeleteResponse
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const response = {
      response: httpRequest.body.response,
      question_id: httpRequest.params.question_id
    }
    const result = await this.DeleteResponse.delete(response)
    return ok(result)
  }
}

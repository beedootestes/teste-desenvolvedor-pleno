import { UpdateResponse } from '../../../domain/usecases/update-response'
import { ok, serverError } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from './update-response-protocols'

export class UpdateResponseController implements Controller {
  private readonly updateResponse: UpdateResponse

  constructor (updateResponse) {
    this.updateResponse = updateResponse
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const newResponse = {
        new_response: httpRequest.body.new_response,
        question_id: httpRequest.params.question_id
      }
      const result = await this.updateResponse.update(newResponse)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

import { UpdateResponse } from '../../../domain/usecases/update-response'
import { ok } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from './update-response-protocols'

export class UpdateResponseController implements Controller {
  private readonly UpdateResponse: UpdateResponse

  constructor (UpdateResponse) {
    this.UpdateResponse = UpdateResponse
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const newResponse = {
      new_response: httpRequest.body.new_response,
      question_id: httpRequest.params.question_id
    }
    const result = await this.UpdateResponse.update(newResponse)
    return ok(result)
  }
}

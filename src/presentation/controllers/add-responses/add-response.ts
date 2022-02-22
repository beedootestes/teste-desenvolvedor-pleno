import { ok } from '../../helpers/http-helpers'
import { AddResponse, Controller, HttpRequest, HttpResponse } from './add-response-protocols'

export class AddResponseController implements Controller {
  private readonly addResponse: AddResponse

  constructor (addResponse) {
    this.addResponse = addResponse
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const response = httpRequest.body
    const id = httpRequest.params.id
    const result = await this.addResponse.add({ ...response, id: id })
    return ok(result)
  }
}

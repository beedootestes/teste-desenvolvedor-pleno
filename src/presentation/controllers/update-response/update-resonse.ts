import { UpdateResponse } from '../../../domain/usecases/update-response'
import { ok, serverError } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from './update-response-protocols'

export class UpdateResponseController implements Controller {
  private readonly updateResponse: UpdateResponse
  private readonly validation: Validation

  constructor (updateResponse, validation) {
    this.updateResponse = updateResponse
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate({ ...httpRequest.params, ...httpRequest.body })

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

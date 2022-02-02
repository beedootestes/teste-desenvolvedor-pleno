import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helpers'
import { httpRequest, httpResponse } from '../protocols/http'

export class AddQuestionController {
  handle (httpRequest: httpRequest): httpResponse {
    return badRequest(new MissingParamError('question'))
  }
}

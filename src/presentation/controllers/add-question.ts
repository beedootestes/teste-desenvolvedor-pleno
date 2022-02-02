import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helpers'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class AddQuestionController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    return badRequest(new MissingParamError('question'))
  }
}

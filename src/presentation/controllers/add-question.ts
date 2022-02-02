import { AddQuestion } from '../../domain/usecases/add-question'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helpers'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class AddQuestionController implements Controller {
  private readonly addQuestion: AddQuestion

  constructor (addQuestion) {
    this.addQuestion = addQuestion
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.question) {
      return badRequest(new MissingParamError('question'))
    }
    const { question } = httpRequest.body
    this.addQuestion.add(question)
    return {
      statusCode: 200,
      body: 'ok'
    }
  }
}

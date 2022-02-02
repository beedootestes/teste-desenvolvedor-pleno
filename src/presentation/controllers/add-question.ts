import { httpRequest, httpResponse } from '../protocols/http'

export class AddQuestionController {
  handle (httpRequest: httpRequest): httpResponse {
    return {
      statusCode: 400,
      body: new Error('Missing param: question')
    }
  }
}

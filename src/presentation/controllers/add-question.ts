export class AddQuestionController {
  handle(httpRequest: any): any {
    return {
      statusCode: 400,
      body: new Error('Missing param: question')
    }
  }
}

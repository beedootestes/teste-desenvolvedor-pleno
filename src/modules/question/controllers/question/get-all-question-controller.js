import { ok, serverError } from '../../../../config/helpers/http-helper';
import { Question } from '../../models/question'

export default class GetAllQuestionController {
  static async handle(req, res) {
    
    try {
      const questionsData =  await GetAllQuestionController.getAll()
      
      return ok(res,'list of questions',questionsData)      
    }
    catch (error) {
      return serverError(error)
    }

  }

  static async getAll() {
    return await Question.find().select({__v:0});
  }

}

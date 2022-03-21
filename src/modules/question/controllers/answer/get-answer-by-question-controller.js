import { notFound, ok, serverError } from '../../../../config/helpers/http-helper'
import { Answer } from '../../models/answer'

export default class GetAnswerByQuestionController {
  static async handle(req, res) {
    
    const questionId  =  req.params.questionId
    
    if (!questionId) {
      notFound(res)
    }
        
    try {
      const answerData =  await Answer.find({questionId}).select({__v:0})
      return ok(res,'lista de respostas',answerData)
    }
    catch (error) {
      serverError(res,'Não foi possível localizar.')
    }
  }
}

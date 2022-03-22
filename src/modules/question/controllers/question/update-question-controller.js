import { badRequest, ok, serverError } from '../../../../config/helpers/http-helper'
import { isNotValidQuestion } from '../../helpers/question-helper'
import { Question } from '../../models/question'

export default class UpdateQuestionController {
  
  static async handle(req, res) {

    const id = req.params.id
    
    const {question} = req.body

    if (isNotValidQuestion(question)) {
      return badRequest(res,'A questão é obrigatória')      
    }
    
    const questionObj  = {
      question
    }

    try {
      await Question.findByIdAndUpdate(id, questionObj)
      
      return ok(res,'Question updated successfully',{})     
    }
    catch (error) {      
      return serverError(res,error)
    }

  }
}

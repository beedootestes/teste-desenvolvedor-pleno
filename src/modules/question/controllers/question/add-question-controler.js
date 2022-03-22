import { badRequest, createdResource } from '../../../../config/helpers/http-helper'
import { isNotValidQuestion } from '../../helpers/question-helper'

import { Question } from '../../models/question'

export default class AddQuestionController {
  
  static async handle(req, res) {

    const {question} = req.body

    if (isNotValidQuestion(question)) {
      return badRequest(res,'A questão é obrigatória')      
    }
    
    const questionObj  = new Question({
      question
    })

    try {
      const newQuestion =  await questionObj.save()

      return createdResource(res,'Question registered successfully', {
        id: newQuestion.id
      })
    }
    catch (error) {      
      return serverError(res, error)
    }

  }
}
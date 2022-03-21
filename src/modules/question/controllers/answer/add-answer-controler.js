import { Answer } from '../../models/answer'
import {isNotValidAnswer,isNotValidQuestionId} from '../../helpers/answer-helper'
import { badRequest, createdResource, serverError } from '../../../../config/helpers/http-helper'

export default class AddAnswerController { 

  static async handle(req, res) {

    const {answers} = req.body

    // //check questionId
    if (isNotValidQuestionId(answers)) {
      return badRequest(res,'O Código da questão é obrigatória')
    }
    // //check answer
    if (isNotValidAnswer(answers)) {
      return badRequest(res,'A resposta é obrigatória')          
    }
    
    try {
      // insert inside db
      const newAnswers =  await Answer.insertMany(answers)
      
      return createdResource(res,'Answer registered successfully',newAnswers)      
    }
    catch (error) {      
      return serverError(res, error)
    }      
  }
}
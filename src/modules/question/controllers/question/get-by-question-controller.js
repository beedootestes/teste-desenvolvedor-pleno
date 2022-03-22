import { Question } from '../../models/question'
import {serverError,ok} from '../../../../config/helpers/http-helper'

export default class GetByQuestionController {
  static async handle(req, res) {

    const id  =  req.params.id
        
    try {
      const questionData =  await Question.findById(id).select({__v:0})
      
      return ok(res,'question',questionData)      
    }
    catch (error) {
      return serverError(res, error)
    }

  }
}
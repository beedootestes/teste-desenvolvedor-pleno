import { ok, serverError } from '../../../../config/helpers/http-helper'
import { Question } from '../../models/question'

export default class DeleteQuestionController {
  static async handle(req, res) {

    const id  =  req.params.id
        
    try {
      await Question.findByIdAndRemove(id)
      
      return ok(res,'question deleted successfully',{})      
    }
    catch (error) {
      return serverError(error)      
    }

  }
}
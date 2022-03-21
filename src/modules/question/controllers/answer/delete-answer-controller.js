import { ok,serverError, notFound } from '../../../../config/helpers/http-helper'
import { Answer } from '../../models/answer'

export default class DeleteQuestionController {
  static async handle(req, res) {

    const id  =  req.params.id

    if (!id) {
      return notFound(res)
    }
        
    try {
      await Answer.findByIdAndRemove(id)

      return ok(res,'resposta removida com sucesso')      
    }
    catch (error) {
      
      return serverError(res,'Não foi possível remover esta resposta')
    }

  }
}
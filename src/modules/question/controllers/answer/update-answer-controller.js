import { Answer } from '../../models/answer'
import { badRequest, createdResource, notFound, serverError } from '../../../../config/helpers/http-helper'
import { isNotValidAnswer } from '../../helpers/answer-helper'

export default class UpdateAnswerController {
  
  static async handle(req, res) {

    const id = req.params.id

    const {answer} = req.body


    if (!id) {
      return notFound(res)
    }

    
    if (isNotValidAnswer(answer)) {

      return badRequest(res, 'A resposta é obrigatória')
    }
    
    const answerObj  = {
      answer:answer.answer
    }

    try {
      await Answer.findByIdAndUpdate(id, answerObj)
     
      return createdResource(res,'Resposta atualizada com sucesso')
    }
    catch (error) { 

      return serverError(res,'Não foi possível atualizar o registro')
    }

  }
}

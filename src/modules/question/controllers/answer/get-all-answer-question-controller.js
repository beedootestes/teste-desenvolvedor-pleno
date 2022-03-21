import { ok, serverError } from '../../../../config/helpers/http-helper'
import GetAllQuestionController from '../question/get-all-question-controller'
import GetAnswerByQuestionController from './get-answer-by-question-controller'

export default class GetAllAnswerQuestionController {
  static async handle(req, res) {
    
    
    try {
      const listQuestions =  await GetAllQuestionController.getAll()

      const  listAllQuestionAndAnswers = []

      for (const question of listQuestions) {

        const answersList = await  GetAnswerByQuestionController.getAllById(question.id)
        
        listAllQuestionAndAnswers.push({question,answer:answersList})
      }

      return ok(res,'lista de perguntas e respostas',listAllQuestionAndAnswers)
    }
    catch (error) {
      serverError(res,'Não foi possível localizar.')
    }
  }
}

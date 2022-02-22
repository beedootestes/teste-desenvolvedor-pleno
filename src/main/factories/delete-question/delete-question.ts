import { DbDeleteQuestion } from '../../../data/usecases/delete-question/delete-question'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { QuestionMongoRepository } from '../../../infra/db/mongodb/question-repositoy/question'
import { DeleteQuestionController } from '../../../presentation/controllers/delete-question/delete-question'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { makeDeleteQuestionValidation } from './delete-question-validation'

export const makeDeleteQuestionController = (): Controller => {
  const questionMongoRepository = new QuestionMongoRepository()
  const dbDeleteQuestion = new DbDeleteQuestion(questionMongoRepository, questionMongoRepository)
  const deleteQuestionController = new DeleteQuestionController(dbDeleteQuestion, makeDeleteQuestionValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(deleteQuestionController, logMongoRepository)
}

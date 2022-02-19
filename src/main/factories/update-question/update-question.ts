import { DbUpdateQuestion } from '../../../data/usecases/update-question/db-update-question'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { QuestionMongoRepository } from '../../../infra/db/mongodb/question-repositoy/question'
import { UpdateQuestionController } from '../../../presentation/controllers/update-question/update-question'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { makeUpdateQuestionValidation } from './update-question-validation'

export const makeUpdateQuestionController = (): Controller => {
  const questionMongoRepository = new QuestionMongoRepository()
  const dbUpdateQuestion = new DbUpdateQuestion(questionMongoRepository)
  const updateQuestionController = new UpdateQuestionController(dbUpdateQuestion, makeUpdateQuestionValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(updateQuestionController, logMongoRepository)
}

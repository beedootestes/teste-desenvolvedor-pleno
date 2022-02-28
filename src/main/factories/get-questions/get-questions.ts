import { DbGetQuestions } from '../../../data/usecases/get-questions/get-questions'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { QuestionMongoRepository } from '../../../infra/db/mongodb/question-repositoy/question'
import { GetQuestionsController } from '../../../presentation/controllers/get-questions/get-questions'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'

export const makeGetQuestionsController = (): Controller => {
  const questionMongoRepository = new QuestionMongoRepository()
  const dbGetQuestions = new DbGetQuestions(questionMongoRepository)
  const getQuestionsController = new GetQuestionsController(dbGetQuestions)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(getQuestionsController, logMongoRepository)
}

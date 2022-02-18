import { DbListQuestions } from '../../data/usecases/list-question/list-questions'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { QuestionMongoRepository } from '../../infra/db/mongodb/question-repositoy/question'
import { ListQuestionsController } from '../../presentation/controllers/list-questions/list-questions'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'

export const makeListQuestionsController = (): Controller => {
  const questionMongoRepository = new QuestionMongoRepository()
  const dbListQuestions = new DbListQuestions(questionMongoRepository)
  const listQuestionsController = new ListQuestionsController(dbListQuestions)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(listQuestionsController, logMongoRepository)
}

import { DbListResponses } from '../../../data/usecases/list-responses/list-responses'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { QuestionMongoRepository } from '../../../infra/db/mongodb/question-repositoy/question'
import { ListResponsesController } from '../../../presentation/controllers/list-responses/list-responses'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'

export const makeListResponsesController = (): Controller => {
  const questionMongoRepository = new QuestionMongoRepository()
  const dbListResponses = new DbListResponses(questionMongoRepository, questionMongoRepository)
  const listResponsesController = new ListResponsesController(dbListResponses)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(listResponsesController, logMongoRepository)
}

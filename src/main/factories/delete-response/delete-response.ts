import { DbDeleteResponse } from '../../../data/usecases/delete-response/db-delete-response'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { QuestionMongoRepository } from '../../../infra/db/mongodb/question-repositoy/question'
import { DeleteResponseController } from '../../../presentation/controllers/delete-response/delete-resonse'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { makeDeleteResponseValidation } from './delete-response-validation'

export const makeDeleteResponseController = (): Controller => {
  const questionMongoRepository = new QuestionMongoRepository()
  const dbDeleteResponse = new DbDeleteResponse(questionMongoRepository, questionMongoRepository)
  const deleteResponseController = new DeleteResponseController(dbDeleteResponse, makeDeleteResponseValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(deleteResponseController, logMongoRepository)
}

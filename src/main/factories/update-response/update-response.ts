import { DbUpdateResponse } from '../../../data/usecases/update-response/db-update-response'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { QuestionMongoRepository } from '../../../infra/db/mongodb/question-repositoy/question'
import { UpdateResponseController } from '../../../presentation/controllers/update-response/update-resonse'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { makeUpdateResponseValidation } from './update-response-validation'

export const makeUpdateResponseController = (): Controller => {
  const questionMongoRepository = new QuestionMongoRepository()
  const dbUpdateResponse = new DbUpdateResponse(questionMongoRepository, questionMongoRepository)
  const updateResponseController = new UpdateResponseController(dbUpdateResponse, makeUpdateResponseValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(updateResponseController, logMongoRepository)
}

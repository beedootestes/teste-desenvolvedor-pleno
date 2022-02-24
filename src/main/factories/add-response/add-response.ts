import { DbAddResponse } from '../../../data/usecases/add-response/add-response'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { QuestionMongoRepository } from '../../../infra/db/mongodb/question-repositoy/question'
import { ResponseMongoRepository } from '../../../infra/db/mongodb/response-repository/response'
import { AddResponseController } from '../../../presentation/controllers/add-response/add-response'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { makeAddResponseValidation } from './add-response-validation'

export const makeAddResponseController = (): Controller => {
  const responseMongoRepository = new ResponseMongoRepository()
  const questionMongoRepository = new QuestionMongoRepository()
  const dbAddResponse = new DbAddResponse(responseMongoRepository, questionMongoRepository, questionMongoRepository)
  const addResponseController = new AddResponseController(dbAddResponse, makeAddResponseValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(addResponseController, logMongoRepository)
}

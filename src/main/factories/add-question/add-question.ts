import { AddQuestionController } from '../../../presentation/controllers/add-question/add-question'
import { DbAddQuestion } from '../../../data/usecases/add-question/db-add-question'
import { QuestionMongoRepository } from '../../../infra/db/mongodb/question-repositoy/question'
import { LogControllerDecorator } from '../../decorators/log'
import { Controller } from '../../../presentation/protocols'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { makeAddQuestionValidation } from './add-question-validation'

export const makeAddQuestionController = (): Controller => {
  const questionMongoRepository = new QuestionMongoRepository()
  const dbAddQuestion = new DbAddQuestion(questionMongoRepository)
  const addQuestionController = new AddQuestionController(dbAddQuestion, makeAddQuestionValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(addQuestionController, logMongoRepository)
}

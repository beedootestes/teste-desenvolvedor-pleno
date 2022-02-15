import { AddQuestionController } from '../../presentation/controllers/add-question/add-question'
import { DbAddQuestion } from '../../data/usecases/add-question/db-add-question'
import { QuestionMongoRepository } from '../../infra/db/mongodb/question-repositoy/question'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols'

export const makeAddQuestionController = (): Controller => {
  const questionMongoRepository = new QuestionMongoRepository()
  const dbAddQuestion = new DbAddQuestion(questionMongoRepository)
  const addQuestionController = new AddQuestionController(dbAddQuestion)
  return new LogControllerDecorator(addQuestionController)
}

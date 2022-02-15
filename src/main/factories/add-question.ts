import { AddQuestionController } from '../../presentation/controllers/add-question/add-question'
import { DbAddQuestion } from '../../data/usecases/add-question/db-add-question'
import { QuestionMongoRepository } from '../../infra/db/mongodb/question-repositoy/question'

export const makeAddQuestionController = (): AddQuestionController => {
  const questionMongoRepository = new QuestionMongoRepository()
  const dbAddQuestion = new DbAddQuestion(questionMongoRepository)
  return new AddQuestionController(dbAddQuestion)
}

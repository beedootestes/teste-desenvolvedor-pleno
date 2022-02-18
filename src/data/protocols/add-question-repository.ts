import { QuestionModel } from '../../domain/models/question'
import { AddQuestionModel } from '../../domain/usecases/add-question'

export interface AddQuestionRepository {
  add (question: AddQuestionModel): Promise<QuestionModel>
}

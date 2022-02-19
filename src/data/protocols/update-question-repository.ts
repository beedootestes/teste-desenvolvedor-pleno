import { QuestionModel } from '../../domain/models/question'
import { UpdateQuestionModel } from '../../domain/usecases/update-question'

export interface UpdateQuestionRepository {
  update (question: UpdateQuestionModel): Promise<QuestionModel>
}

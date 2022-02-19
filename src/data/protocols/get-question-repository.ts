import { QuestionModel } from '../../domain/models/question'

export interface GetQuestionRepository {
  get (id: string): Promise<QuestionModel>
}

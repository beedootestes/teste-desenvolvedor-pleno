import { QuestionModel } from '../../domain/models/question'

export interface ListQuestionsRepository {
  list (): Promise<QuestionModel[]>
}

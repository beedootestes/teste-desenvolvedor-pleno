import { QuestionModel } from '../models/question'

export interface ListQuestions {
  list (): Promise<QuestionModel[]>
}

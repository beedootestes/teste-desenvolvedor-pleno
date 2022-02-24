import { QuestionModel } from '../models/question'

export interface UpdateQuestionModel {
  question: string
  id: string
  response: string[]
}

export interface UpdateQuestion {
  update (question: UpdateQuestionModel): Promise<QuestionModel>
}

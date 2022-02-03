import { QuestionModel } from '../models/question'

export interface AddQuestionModel{
  question: string
}

export interface AddQuestion {
  async add (question: AddQuestionModel): Promise<QuestionModel>
}

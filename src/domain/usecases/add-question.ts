import { QuestionModel } from '../models/question'

export interface AddQuestionModel{
  question: string
}

export interface AddQuestion {
  add (question: AddQuestionModel): Promise<QuestionModel>
}

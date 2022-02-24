
export interface AddResponseToQuestionModel {
  question_id: string
  response: string
}

export interface AddResponseToQuestionRepository {
  addResponse (response: AddResponseToQuestionModel): Promise<Boolean>
}

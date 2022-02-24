export interface AddResponseModel{
  response: string
  question_id: string
}

export interface AddResponse {
  add (question: AddResponseModel): Promise<Boolean>
}

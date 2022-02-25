export interface DeleteResponseModel{
  response: string
  question_id: string
}

export interface DeleteResponse {
  delete (question: DeleteResponseModel): Promise<Boolean>
}

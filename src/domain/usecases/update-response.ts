export interface UpdateResponseModel{
  new_response: string
  question_id: string
}

export interface UpdateResponse {
  update (question: UpdateResponseModel): Promise<Boolean>
}

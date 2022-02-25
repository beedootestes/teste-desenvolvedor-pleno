
export interface GetQuestionsResponseModel{
  id: string
  question: string
}

export interface GetQuestions {
  list (): Promise<GetQuestionsResponseModel[]>
}

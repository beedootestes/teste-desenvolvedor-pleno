export interface GetQuestionRepository {
  get (id: string): Promise<any>
}

export interface DeleteQuestionRepository {
  delete (id: string): Promise<Boolean>
}

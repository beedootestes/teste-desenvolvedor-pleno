import { GetQuestionsResponseModel } from '../../domain/usecases/get-questions'

export interface GetQuestionsRepository {
  getQuestions (): Promise<GetQuestionsResponseModel[]>
}

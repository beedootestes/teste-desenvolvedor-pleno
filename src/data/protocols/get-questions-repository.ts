import { GetQuestionsResponseModel } from '../../domain/usecases/get-questions'

export interface GetQuestionsRepository {
  list (): Promise<GetQuestionsResponseModel[]>
}

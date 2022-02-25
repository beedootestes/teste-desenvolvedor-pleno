import { GetQuestions, GetQuestionsResponseModel } from '../../../domain/usecases/get-questions'
import { GetQuestionsRepository } from '../../protocols/get-questions-repository'

export class DbGetQuestions implements GetQuestions {
  private readonly getQuestionsRepository: GetQuestionsRepository

  constructor (getQuestionsRepository: GetQuestionsRepository) {
    this.getQuestionsRepository = getQuestionsRepository
  }

  async list (): Promise<GetQuestionsResponseModel[]> {
    return await this.getQuestionsRepository.list()
  }
}

import { ListResponses } from '../../../domain/usecases/list-responses'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { GetQuestionRepository } from '../../protocols/get-question-repository'
import { ListResponsesRepository } from '../../protocols/list-responses-repository'

export class DbListResponses implements ListResponses {
  private readonly listResponsesRepository: ListResponsesRepository
  private readonly getQuestionRepository: GetQuestionRepository

  constructor (
    listResponsesRepository: ListResponsesRepository,
    getQuestionRepository: GetQuestionRepository) {
    this.getQuestionRepository = getQuestionRepository
    this.listResponsesRepository = listResponsesRepository
  }

  async list (id: string): Promise<string[]> {
    const questionExist = await this.getQuestionRepository.get(id)
    if (!questionExist) {
      throw new InvalidParamError('id')
    }
    return await this.listResponsesRepository.listResponses(id)
  }
}

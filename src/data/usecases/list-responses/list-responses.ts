import { ListResponses } from '../../../domain/usecases/list-responses'
import { ListResponsesRepository } from '../../protocols/list-responses-repository'

export class DbListResponses implements ListResponses {
  private readonly listResponsesRepository: ListResponsesRepository

  constructor (listResponsesRepository: ListResponsesRepository) {
    this.listResponsesRepository = listResponsesRepository
  }

  async list (id: string): Promise<string[]> {
    return await this.listResponsesRepository.list(id)
  }
}

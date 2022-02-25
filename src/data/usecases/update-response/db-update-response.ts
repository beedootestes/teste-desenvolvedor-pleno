import { UpdateResponse, UpdateResponseModel } from '../../../domain/usecases/update-response'
import { GetQuestionRepository } from '../../protocols/get-question-repository'
import { UpdateResponseRepository } from '../../protocols/update-response-repository'

export class DbUpdateResponse implements UpdateResponse {
  private readonly updateResponseRepository: UpdateResponseRepository
  private readonly getQuestionRepository: GetQuestionRepository

  constructor (
    updateResponseRepository: UpdateResponseRepository,
    getQuestionRepository: GetQuestionRepository
  ) {
    this.updateResponseRepository = updateResponseRepository
    this.getQuestionRepository = getQuestionRepository
  }

  async update (Response: UpdateResponseModel): Promise<Boolean> {
    return await this.updateResponseRepository.update(Response)
  }
}

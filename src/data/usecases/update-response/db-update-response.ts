import { UpdateResponse, UpdateResponseModel } from '../../../domain/usecases/update-response'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
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

  async update (response: UpdateResponseModel): Promise<Boolean> {
    const questionExist = await this.getQuestionRepository.get(response.question_id)
    if (!questionExist) {
      throw new InvalidParamError('question_id')
    }
    return await this.updateResponseRepository.updateResponse(response)
  }
}

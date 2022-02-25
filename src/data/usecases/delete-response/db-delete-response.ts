import { DeleteResponse, DeleteResponseModel } from '../../../domain/usecases/delete-response'
import { DeleteResponseRepository } from '../../protocols/delete-response-repository'
import { GetQuestionRepository } from '../../protocols/get-question-repository'

export class DbDeleteResponse implements DeleteResponse {
  private readonly deleteResponseRepository: DeleteResponseRepository
  private readonly getQuestionRepository: GetQuestionRepository

  constructor (
    deleteResponseRepository: DeleteResponseRepository,
    getQuestionRepository: GetQuestionRepository
  ) {
    this.deleteResponseRepository = deleteResponseRepository
    this.getQuestionRepository = getQuestionRepository
  }

  async delete (response: DeleteResponseModel): Promise<Boolean> {
    return await this.deleteResponseRepository.deleteResponse(response)
  }
}

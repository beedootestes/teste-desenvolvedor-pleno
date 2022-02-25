import { DeleteResponse, DeleteResponseModel } from '../../../domain/usecases/delete-response'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
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
    const questionExist = await this.getQuestionRepository.get(response.question_id)
    if (!questionExist) {
      throw new InvalidParamError('question_id')
    }
    const isDeleted = await this.deleteResponseRepository.deleteResponse(response)
    if (!isDeleted) {
      throw new Error('deletion failed')
    }
    return true
  }
}

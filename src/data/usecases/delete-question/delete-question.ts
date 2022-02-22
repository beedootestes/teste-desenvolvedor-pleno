import { DeleteQuestion } from '../../../domain/usecases/delete-question'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { DeleteQuestionRepository } from '../../protocols/delete-question-repository'
import { GetQuestionRepository } from '../../protocols/get-question-repository'

export class DbDeleteQuestion implements DeleteQuestion {
  private readonly deleteQuestionRepository: DeleteQuestionRepository
  private readonly getQuestionRepository: GetQuestionRepository

  constructor (deleteQuestionRepository: DeleteQuestionRepository, getQuestionRepository: GetQuestionRepository) {
    this.getQuestionRepository = getQuestionRepository
    this.deleteQuestionRepository = deleteQuestionRepository
  }

  async delete (id: string): Promise<Boolean> {
    const questionExist = await this.getQuestionRepository.get(id)
    if (!questionExist) {
      throw new InvalidParamError('id')
    }
    await this.deleteQuestionRepository.delete(id)
    return true
  }
}

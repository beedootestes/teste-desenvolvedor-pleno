import { DeleteQuestion } from '../../../domain/usecases/delete-question'
import { DeleteQuestionRepository } from '../../protocols/delete-question-repository'
import { GetQuestionRepository } from '../../protocols/get-question-repository'

export class DbDeleteQuestion implements DeleteQuestion {
  private readonly deleteQuestionRepository: DeleteQuestionRepository
  private readonly getQuestionRepository: GetQuestionRepository

  constructor (deleteQuestionRepository: DeleteQuestionRepository, getQuestionRepository: GetQuestionRepository) {
    this.deleteQuestionRepository = deleteQuestionRepository
    this.getQuestionRepository = getQuestionRepository
  }

  async delete (id: string): Promise<Boolean> {
    await this.getQuestionRepository.get(id)
    await this.deleteQuestionRepository.delete(id)
    return true
  }
}

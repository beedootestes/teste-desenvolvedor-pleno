import { DeleteQuestion } from '../../../domain/usecases/delete-question'
import { DeleteQuestionRepository } from '../../protocols/delete-question-repository'

export class DbDeleteQuestion implements DeleteQuestion {
  private readonly deleteQuestionRepository: DeleteQuestionRepository

  constructor (deleteQuestionRepository: DeleteQuestionRepository) {
    this.deleteQuestionRepository = deleteQuestionRepository
  }

  async delete (id: string): Promise<Boolean> {
    await this.deleteQuestionRepository.delete(id)
    return true
  }
}
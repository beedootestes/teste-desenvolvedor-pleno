import { QuestionModel } from '../../../domain/models/question'
import { UpdateQuestion, UpdateQuestionModel } from '../../../domain/usecases/update-question'
import { UpdateQuestionRepository } from '../../protocols/update-question-repository'

export class DbUpdateQuestion implements UpdateQuestion {
  private readonly updateQuestionRepository: UpdateQuestionRepository

  constructor (updateQuestionRepository: UpdateQuestionRepository) {
    this.updateQuestionRepository = updateQuestionRepository
  }

  async update (question: UpdateQuestionModel): Promise<QuestionModel> {
    return await this.updateQuestionRepository.update(question)
  }
}

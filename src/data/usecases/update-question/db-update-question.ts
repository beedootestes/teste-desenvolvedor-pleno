import { QuestionModel } from '../../../domain/models/question'
import { UpdateQuestion, UpdateQuestionModel } from '../../../domain/usecases/update-question'
import { GetQuestionRepository } from '../../protocols/get-question-repository'
import { UpdateQuestionRepository } from '../../protocols/update-question-repository'

export class DbUpdateQuestion implements UpdateQuestion {
  private readonly updateQuestionRepository: UpdateQuestionRepository
  private readonly getQuestionRepository: GetQuestionRepository

  constructor (
    updateQuestionRepository: UpdateQuestionRepository,
    getQuestionRepository: GetQuestionRepository
  ) {
    this.updateQuestionRepository = updateQuestionRepository
    this.getQuestionRepository = getQuestionRepository
  }

  async update (question: UpdateQuestionModel): Promise<QuestionModel> {
    await this.getQuestionRepository.get(question.id)
    return await this.updateQuestionRepository.update(question)
  }
}

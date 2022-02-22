import { QuestionModel } from '../../../domain/models/question'
import { UpdateQuestion, UpdateQuestionModel } from '../../../domain/usecases/update-question'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
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
    const questionExist = await this.getQuestionRepository.get(question.id)
    if (!questionExist) {
      throw new InvalidParamError('id')
    }
    return await this.updateQuestionRepository.update(question)
  }
}

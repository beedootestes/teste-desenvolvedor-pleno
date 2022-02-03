import { QuestionModel } from '../../../domain/models/question'
import { AddQuestion, AddQuestionModel } from '../../../domain/usecases/add-question'
import { AddQuestionRepository } from '../../protocols/add-account-repository'

export class DbAddQuestion implements AddQuestion {
  private readonly addQuestionRepository: AddQuestionRepository

  constructor (addQuestionRepository: AddQuestionRepository) {
    this.addQuestionRepository = addQuestionRepository
  }

  async add (question: AddQuestionModel): Promise<QuestionModel> {
    return await this.addQuestionRepository.add(question)
  }
}

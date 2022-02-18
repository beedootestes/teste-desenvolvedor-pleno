import { QuestionModel } from '../../../domain/models/question'
import { ListQuestions } from '../../../domain/usecases/list-questions'
import { ListQuestionsRepository } from '../../protocols/list-question-repository'

export class DbListQuestions implements ListQuestions {
  private readonly listQuestionsRepository: ListQuestionsRepository

  constructor (listQuestionsRepository: ListQuestionsRepository) {
    this.listQuestionsRepository = listQuestionsRepository
  }

  async list (): Promise<QuestionModel[]> {
    await this.listQuestionsRepository.list()
    return []
  }
}

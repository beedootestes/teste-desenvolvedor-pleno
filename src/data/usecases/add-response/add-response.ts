import { AddResponse, AddResponseModel } from '../../../domain/usecases/add-response'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { AddResponseToQuestionRepository } from '../../protocols/add-response-to-question.repository'
import { GetQuestionRepository } from '../../protocols/get-question-repository'

export class DbAddResponse implements AddResponse {
  private readonly addResponseToQuestionRepository: AddResponseToQuestionRepository
  private readonly getQuestionRepository: GetQuestionRepository

  constructor (
    getQuestionRepository: GetQuestionRepository,
    addResponseToQuestionRepository: AddResponseToQuestionRepository
  ) {
    this.getQuestionRepository = getQuestionRepository
    this.addResponseToQuestionRepository = addResponseToQuestionRepository
  }

  async add (response: AddResponseModel): Promise<Boolean> {
    const questionExist = await this.getQuestionRepository.get(response.question_id)
    if (!questionExist) {
      throw new InvalidParamError('question_id')
    }
    return await this.addResponseToQuestionRepository.addResponse(response)
  }
}

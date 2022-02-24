import { ResponseModel } from '../../../domain/models/response'
import { AddResponse, AddResponseModel } from '../../../domain/usecases/add-response'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { AddResponseRepository } from '../../protocols/add-response-repository'
import { AddResponseToQuestionRepository } from '../../protocols/add-response-to-question.repository'
import { GetQuestionRepository } from '../../protocols/get-question-repository'

export class DbAddResponse implements AddResponse {
  private readonly addResponseRepository: AddResponseRepository
  private readonly addResponseToQuestionRepository: AddResponseToQuestionRepository
  private readonly getQuestionRepository: GetQuestionRepository

  constructor (
    addResponseRepository: AddResponseRepository,
    getQuestionRepository: GetQuestionRepository,
    addResponseToQuestionRepository: AddResponseToQuestionRepository
  ) {
    this.addResponseRepository = addResponseRepository
    this.getQuestionRepository = getQuestionRepository
    this.addResponseToQuestionRepository = addResponseToQuestionRepository
  }

  async add (response: AddResponseModel): Promise<ResponseModel> {
    const questionExist = await this.getQuestionRepository.get(response.question_id)
    if (!questionExist) {
      throw new InvalidParamError('question_id')
    }
    await this.addResponseToQuestionRepository.addResponse(response)
    return await this.addResponseRepository.add(response)
  }
}

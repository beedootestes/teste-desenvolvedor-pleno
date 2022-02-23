import { ResponseModel } from '../../../domain/models/response'
import { AddResponse, AddResponseModel } from '../../../domain/usecases/add-response'
import { AddResponseRepository } from '../../protocols/add-response-repository'
import { GetQuestionRepository } from '../../protocols/get-question-repository'

export class DbAddResponse implements AddResponse {
  private readonly addResponseRepository: AddResponseRepository
  private readonly getQuestionRepository: GetQuestionRepository

  constructor (addResponseRepository: AddResponseRepository, getQuestionRepository: GetQuestionRepository) {
    this.addResponseRepository = addResponseRepository
    this.getQuestionRepository = getQuestionRepository
  }

  async add (response: AddResponseModel): Promise<ResponseModel> {
    await this.getQuestionRepository.get(response.id)
    return await this.addResponseRepository.add(response)
  }
}

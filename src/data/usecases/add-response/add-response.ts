import { ResponseModel } from '../../../domain/models/response'
import { AddResponse, AddResponseModel } from '../../../domain/usecases/add-response'
import { AddResponseRepository } from '../../protocols/add-response-repository'

export class DbAddResponse implements AddResponse {
  private readonly addResponseRepository: AddResponseRepository

  constructor (addResponseRepository: AddResponseRepository) {
    this.addResponseRepository = addResponseRepository
  }

  async add (Response: AddResponseModel): Promise<ResponseModel> {
    return await this.addResponseRepository.add(Response)
  }
}

import { ResponseModel } from '../../domain/models/response'
import { AddResponseModel } from '../../domain/usecases/add-response'

export interface AddResponseRepository {
  add (Response: AddResponseModel): Promise<ResponseModel>
}

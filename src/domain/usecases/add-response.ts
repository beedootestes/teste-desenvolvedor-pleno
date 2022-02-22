import { ResponseModel } from '../models/response'

export interface AddResponseModel{
  response: string
  id: string
}

export interface AddResponse {
  add (question: AddResponseModel): Promise<ResponseModel>
}

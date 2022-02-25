import { UpdateResponseModel } from '../../domain/usecases/update-response'

export interface UpdateResponseRepository {
  updateResponse (Response: UpdateResponseModel): Promise<Boolean>
}

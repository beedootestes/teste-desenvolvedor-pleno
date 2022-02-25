import { UpdateResponseModel } from '../../domain/usecases/update-response'

export interface UpdateResponseRepository {
  updateResponse (response: UpdateResponseModel): Promise<Boolean>
}

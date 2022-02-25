import { UpdateResponseModel } from '../../domain/usecases/update-response'

export interface UpdateResponseRepository {
  update (Response: UpdateResponseModel): Promise<Boolean>
}

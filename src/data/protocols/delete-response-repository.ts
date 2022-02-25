import { DeleteResponseModel } from '../../domain/usecases/delete-response'

export interface DeleteResponseRepository {
  deleteResponse (response: DeleteResponseModel): Promise<Boolean>
}

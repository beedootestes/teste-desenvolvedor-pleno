import { AddResponseModel, AddResponseRepository, MongoHelper, ResponseModel } from './response-protocols'

export class ResponseMongoRepository implements AddResponseRepository {
  async add (responseData: AddResponseModel): Promise<ResponseModel> {
    const responseCollection = await MongoHelper.getCollection('responses')
    const response = {
      response: responseData.response,
      questions: [responseData.question_id]
    }
    const result = await responseCollection.insertOne(response)
    const id = result.insertedId.toString()
    return Object.assign({}, { id: id }, { response: response.response })
  }
}

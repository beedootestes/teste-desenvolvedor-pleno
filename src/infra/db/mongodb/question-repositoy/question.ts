import { AddQuestionRepository } from '../../../../data/protocols/add-account-repository'
import { AddQuestionModel, QuestionModel, MongoHelper } from './question-protococols'

export class QuestionMongoRepository implements AddQuestionRepository {
  async add (questionData: AddQuestionModel): Promise<QuestionModel> {
    const questionCollection = await MongoHelper.getCollection('questions')
    const result = await questionCollection.insertOne(questionData)
    const id = result.insertedId.toString()
    return Object.assign({}, { id: id }, { question: questionData.question })
  }
}

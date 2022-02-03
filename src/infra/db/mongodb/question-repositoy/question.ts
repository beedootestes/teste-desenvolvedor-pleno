import { AddQuestionRepository } from '../../../../data/protocols/add-account-repository'
import { QuestionModel } from '../../../../domain/models/question'
import { AddQuestionModel } from '../../../../domain/usecases/add-question'
import { MongoHelper } from '../helpers/mongo-helper'

export class QuestionMongoRepository implements AddQuestionRepository {
  async add (questionData: AddQuestionModel): Promise<QuestionModel> {
    const questionCollection = MongoHelper.getCollection('questions')
    const result = await questionCollection.insertOne(questionData)
    const id = result.insertedId.toString()

    return Object.assign({}, { id: id }, { question: questionData.question })
  }
}

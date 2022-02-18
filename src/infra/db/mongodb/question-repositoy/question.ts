import { AddQuestionRepository } from '../../../../data/protocols/add-question-repository'
import { ListQuestionsRepository } from '../../../../data/protocols/list-question-repository'
import { AddQuestionModel, QuestionModel, MongoHelper } from './question-protococols'

export class QuestionMongoRepository implements AddQuestionRepository, ListQuestionsRepository {
  async add (questionData: AddQuestionModel): Promise<QuestionModel> {
    const questionCollection = await MongoHelper.getCollection('questions')
    const result = await questionCollection.insertOne(questionData)
    const id = result.insertedId.toString()
    return Object.assign({}, { id: id }, { question: questionData.question })
  }

  async list (): Promise<QuestionModel[]> {
    const questionCollection = await MongoHelper.getCollection('questions')
    const result = await questionCollection.find().toArray()
    const questions = result.map(question => ({
      id: question._id.toString(),
      question: question.question
    }))
    return questions
  }
}

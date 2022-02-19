import { AddQuestionRepository } from '../../../../data/protocols/add-question-repository'
import { ListQuestionsRepository } from '../../../../data/protocols/list-question-repository'
import { UpdateQuestionRepository } from '../../../../data/protocols/update-question-repository'
import { AddQuestionModel, QuestionModel, MongoHelper, UpdateQuestionModel } from './question-protococols'

export class QuestionMongoRepository implements
  AddQuestionRepository,
  ListQuestionsRepository,
  UpdateQuestionRepository {
  async add(questionData: AddQuestionModel): Promise<QuestionModel> {
    const questionCollection = await MongoHelper.getCollection('questions')
    const result = await questionCollection.insertOne(questionData)
    const id = result.insertedId.toString()
    return Object.assign({}, { id: id }, { question: questionData.question })
  }

  async list(): Promise<QuestionModel[]> {
    const questionCollection = await MongoHelper.getCollection('questions')
    const result = await questionCollection.find().toArray()
    const questions = result.map(question => ({
      id: question._id.toString(),
      question: question.question
    }))
    return questions
  }

  async update(questionData: UpdateQuestionModel): Promise<QuestionModel> {
    const questionCollection = await MongoHelper.getCollection('questions')
    const result = await questionCollection.updateOne(
      {
        _id: questionData.id
      }, {
        $set: {
          question: questionData.question
        }
      },
      {
        upsert: true
      }
    )
    const id = result.upsertedId.toString()
    return Object.assign({}, { id: id }, { question: questionData.question })
  }
}

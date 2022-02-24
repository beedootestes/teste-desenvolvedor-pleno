import { ObjectId } from 'mongodb'
import { AddQuestionRepository } from '../../../../data/protocols/add-question-repository'
import { AddResponseToQuestionModel, AddResponseToQuestionRepository } from '../../../../data/protocols/add-response-to-question.repository'
import { DeleteQuestionRepository } from '../../../../data/protocols/delete-question-repository'
import { GetQuestionRepository } from '../../../../data/protocols/get-question-repository'
import { ListQuestionsRepository } from '../../../../data/protocols/list-question-repository'
import { UpdateQuestionRepository } from '../../../../data/protocols/update-question-repository'
import { AddQuestionModel, QuestionModel, MongoHelper, UpdateQuestionModel } from './question-protococols'

export class QuestionMongoRepository implements
  AddQuestionRepository,
  ListQuestionsRepository,
  UpdateQuestionRepository,
  GetQuestionRepository,
  DeleteQuestionRepository,
  AddResponseToQuestionRepository {
  async add (questionData: AddQuestionModel): Promise<QuestionModel> {
    const questionCollection = await MongoHelper.getCollection('questions')
    const result = await questionCollection.insertOne(questionData)
    const id = result.insertedId.toString()
    return Object.assign({}, { id: id }, { question: questionData.question, responses: [] })
  }

  async list (): Promise<QuestionModel[]> {
    const questionCollection = await MongoHelper.getCollection('questions')
    const result = await questionCollection.find().toArray()
    const questions = result.map(question => ({
      id: question._id.toString(),
      question: question.question,
      responses: question.responses
    }))
    return questions
  }

  async update (questionData: UpdateQuestionModel): Promise<QuestionModel> {
    const questionCollection = await MongoHelper.getCollection('questions')
    const result = await questionCollection.updateOne(
      {
        _id: questionData.id
      },
      {
        $set: {
          question: questionData.question
        },
        $push: {
          responses: [questionData.responses[0]]
        }
      },
      {
        upsert: true
      }
    )
    const id = result.upsertedId.toString()
    return Object.assign({}, { id: id }, { question: questionData.question, responses: questionData.responses })
  }

  async get (id: string): Promise<any> {
    const questionCollection = await MongoHelper.getCollection('questions')
    const question = await questionCollection.findOne({ _id: new ObjectId(id) })
    const result = question?._id
      ? Object.assign({}, { id: id }, { question: question.question })
      : question
    return result
  }

  async delete (id: string): Promise<Boolean> {
    const questionCollection = await MongoHelper.getCollection('questions')
    const result = await questionCollection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1 ? result.acknowledged : false
  }

  async addResponse (responseData: AddResponseToQuestionModel): Promise<Boolean> {
    const questionCollection = await MongoHelper.getCollection('questions')
    await questionCollection.updateOne(
      {
        _id: responseData.question_id
      },
      {
        $push: {
          responses: responseData.response
        }
      },
      {
        upsert: true
      }
    )
    return true
  }
}

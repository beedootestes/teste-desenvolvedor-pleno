import { ObjectId } from 'mongodb'
import { AddQuestionRepository } from '../../../../data/protocols/add-question-repository'
import { AddResponseToQuestionModel, AddResponseToQuestionRepository } from '../../../../data/protocols/add-response-to-question.repository'
import { DeleteQuestionRepository } from '../../../../data/protocols/delete-question-repository'
import { DeleteResponseRepository } from '../../../../data/protocols/delete-response-repository'
import { GetQuestionRepository } from '../../../../data/protocols/get-question-repository'
import { ListQuestionsRepository } from '../../../../data/protocols/list-question-repository'
import { ListResponsesRepository } from '../../../../data/protocols/list-responses-repository'
import { UpdateQuestionRepository } from '../../../../data/protocols/update-question-repository'
import { UpdateResponseRepository } from '../../../../data/protocols/update-response-repository'
import { DeleteResponseModel } from '../../../../domain/usecases/delete-response'
import { UpdateResponseModel } from '../../../../domain/usecases/update-response'
import { AddQuestionModel, QuestionModel, MongoHelper, UpdateQuestionModel } from './question-protococols'

export class QuestionMongoRepository implements
  AddQuestionRepository,
  ListQuestionsRepository,
  UpdateQuestionRepository,
  GetQuestionRepository,
  DeleteQuestionRepository,
  AddResponseToQuestionRepository,
  ListResponsesRepository,
  UpdateResponseRepository,
  DeleteResponseRepository {
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
    await questionCollection.updateOne(
      {
        _id: new ObjectId(questionData.id)
      }, {
        $set: {
          question: questionData.question
        }
      }
    )
    return Object.assign({}, { id: questionData.id }, { question: questionData.question, responses: questionData.responses })
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
        _id: new ObjectId(responseData.question_id)
      },
      {
        $push: {
          responses: responseData.response
        }
      },
      {
        upsert: false
      }
    )
    return true
  }

  async listResponses (id: string): Promise<string[]> {
    const questionCollection = await MongoHelper.getCollection('questions')
    const result = await questionCollection.findOne({ _id: new ObjectId(id) })
    return result?.responses
  }

  async updateResponse (response: UpdateResponseModel): Promise<Boolean> {
    const questionCollection = await MongoHelper.getCollection('questions')
    await questionCollection.updateOne(
      {
        _id: new ObjectId(response.question_id)
      }, {
        $pull: { responses: response.old_response }
      }
    )
    await questionCollection.updateOne(
      {
        _id: new ObjectId(response.question_id)
      }, {
        $push: { responses: response.new_response }
      }
    )
    return true
  }

  async deleteResponse (response: DeleteResponseModel): Promise<Boolean> {
    const questionCollection = await MongoHelper.getCollection('questions')
    await questionCollection.updateOne(
      {
        _id: new ObjectId(response.question_id)
      }, {
        $pull: { responses: response.response }
      }
    )
    return true
  }
}

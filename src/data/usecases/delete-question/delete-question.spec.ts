import { QuestionModel } from '../../../domain/models/question'
import { DeleteQuestionRepository } from '../../protocols/delete-question-repository'
import { GetQuestionRepository } from '../../protocols/get-question-repository'
import { DbDeleteQuestion } from './delete-question'

describe('DbDeleteQuestion', () => {
  const makeFakeResponse = (): QuestionModel => ({
    id: 'any_id',
    question: 'updated_question'
  })

  interface Sut {
    sut: DbDeleteQuestion
    deleteQuestionRepositoryStub: DeleteQuestionRepository
    getQuestionRepositoryStub: GetQuestionRepository
  }

  const makeSut = (): Sut => {
    const deleteQuestionRepositoryStub = makeDeleteQuestionRepositoryStub()
    const getQuestionRepositoryStub = makeGetQuestionRepositoryStub()
    const sut = new DbDeleteQuestion(deleteQuestionRepositoryStub, getQuestionRepositoryStub)
    return {
      sut,
      deleteQuestionRepositoryStub,
      getQuestionRepositoryStub
    }
  }

  const makeDeleteQuestionRepositoryStub = (): DeleteQuestionRepository => {
    class DeleteQuestionRepositoryStub implements DeleteQuestionRepository {
      async delete (id: string): Promise<Boolean> {
        return await new Promise(resolve => resolve(true))
      }
    }
    return new DeleteQuestionRepositoryStub()
  }

  const makeGetQuestionRepositoryStub = (): GetQuestionRepository => {
    class GetQuestionRepositoryStub implements GetQuestionRepository {
      async get (id: string): Promise<any> {
        return await new Promise(resolve => resolve(makeFakeResponse()))
      }
    }
    return new GetQuestionRepositoryStub()
  }

  test('Should call DeleteQuestionRepository correctly', async () => {
    const { sut, deleteQuestionRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(deleteQuestionRepositoryStub, 'delete')
    await sut.delete('valid_id')
    expect(updateSpy).toBeCalledWith('valid_id')
  })

  test('Should call GetQuestionRepository correctly', async () => {
    const { sut, getQuestionRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(getQuestionRepositoryStub, 'get')
    await sut.delete('valid_id')
    expect(updateSpy).toBeCalledWith('valid_id')
  })
})

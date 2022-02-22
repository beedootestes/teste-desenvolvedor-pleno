import { QuestionModel } from '../../../domain/models/question'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
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

  test('Should throws if getQuestionRepository returns null', async () => {
    const { sut, getQuestionRepositoryStub } = makeSut()
    jest.spyOn(getQuestionRepositoryStub, 'get').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => resolve(null))
    })

    try {
      await sut.delete('any_id')
    } catch (error) {
      expect(error).toEqual(new InvalidParamError('id'))
    }
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const response = await sut.delete('valid_id')
    expect(response).toBe(true)
  })
})

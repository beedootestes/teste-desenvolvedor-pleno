import { GetQuestionsResponseModel } from '../../../domain/usecases/get-questions'
import { GetQuestionsRepository } from '../../protocols/get-questions-repository'
import { DbGetQuestions } from './get-questions'

describe('DbGetQuestions', () => {
  const makeFakeQuestionsList = (): GetQuestionsResponseModel[] => ([{
    id: 'valid_id',
    question: 'valid_ question'
  }])

  interface SutType {
    sut: DbGetQuestions
    getQuestionsRepositoryStub: GetQuestionsRepository
  }

  const makeSut = (): SutType => {
    const getQuestionsRepositoryStub = makeGetQuestionsRepositoryStub()
    const sut = new DbGetQuestions(getQuestionsRepositoryStub)
    return {
      sut,
      getQuestionsRepositoryStub
    }
  }

  const makeGetQuestionsRepositoryStub = (): GetQuestionsRepository => {
    class GetQuestionsRepositoryStub implements GetQuestionsRepository {
      async list (): Promise<GetQuestionsResponseModel[]> {
        const questionsList: GetQuestionsResponseModel[] = makeFakeQuestionsList()
        return questionsList
      }
    }
    return new GetQuestionsRepositoryStub()
  }

  test('Should call getQuestionsRepository with no values', async () => {
    const { sut, getQuestionsRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(getQuestionsRepositoryStub, 'list')
    await sut.list()
    expect(addSpy).toHaveBeenLastCalledWith()
  })

  test('Should return the list of questions on success', async () => {
    const { sut } = makeSut()
    const result = await sut.list()
    expect(result).toEqual(makeFakeQuestionsList())
  })
})

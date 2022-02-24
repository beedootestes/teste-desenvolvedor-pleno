import { QuestionModel } from '../../../domain/models/question'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { GetQuestionRepository } from '../../protocols/get-question-repository'
import { ListResponsesRepository } from '../../protocols/list-responses-repository'
import { DbListResponses } from './list-responses'

describe('DBAddQuestion', () => {
  const makeFakeResponsesList = (): string[] => (['response 1', 'response 2'])

  const makeFakeResponse = (): QuestionModel => ({
    id: 'any_id',
    question: 'updated_question',
    responses: []
  })
  interface SutType {
    sut: DbListResponses
    listResponsesRepositoryStub: ListResponsesRepository
    getQuestionRepositoryStub: GetQuestionRepository
  }

  const makeSut = (): SutType => {
    const getQuestionRepositoryStub = makeGetQuestionRepositoryStub()
    const listResponsesRepositoryStub = makeListResponsesRepositoryStub()
    const sut = new DbListResponses(listResponsesRepositoryStub, getQuestionRepositoryStub)
    return {
      sut,
      listResponsesRepositoryStub,
      getQuestionRepositoryStub
    }
  }

  const makeListResponsesRepositoryStub = (): ListResponsesRepository => {
    class ListResponsesRepositoryStub implements ListResponsesRepository {
      async list (id: string): Promise<string[]> {
        const ResponsesList: string[] = makeFakeResponsesList()
        return ResponsesList
      }
    }
    return new ListResponsesRepositoryStub()
  }

  const makeGetQuestionRepositoryStub = (): GetQuestionRepository => {
    class GetQuestionRepositoryStub implements GetQuestionRepository {
      async get (id: string): Promise<any> {
        return await new Promise(resolve => resolve(makeFakeResponse()))
      }
    }
    return new GetQuestionRepositoryStub()
  }

  test('Should call listResponsesRepository with no values', async () => {
    const { sut, listResponsesRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(listResponsesRepositoryStub, 'list')
    await sut.list('valid_questio_id')
    expect(addSpy).toHaveBeenLastCalledWith('valid_questio_id')
  })
  test('Should return the list of questions on success', async () => {
    const { sut } = makeSut()
    const result = await sut.list('valid_questio_id')
    expect(result).toEqual(makeFakeResponsesList())
  })

  test('Should call GetQuestionRepository correctly', async () => {
    const { sut, getQuestionRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(getQuestionRepositoryStub, 'get')
    await sut.list('valid_question_id')
    expect(updateSpy).toBeCalledWith('valid_question_id')
  })

  test('Should throws if getQuestionRepository returns null', async () => {
    const { sut, getQuestionRepositoryStub } = makeSut()
    jest.spyOn(getQuestionRepositoryStub, 'get').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => resolve(null))
    })

    try {
      await sut.list('any_id')
    } catch (error) {
      expect(error).toEqual(new InvalidParamError('id'))
    }
  })
})

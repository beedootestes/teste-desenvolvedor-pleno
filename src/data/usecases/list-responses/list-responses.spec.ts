import { ListResponsesRepository } from '../../protocols/list-responses-repository'
import { DbListResponses } from './list-responses'

describe('DBAddQuestion', () => {
  const makeFakeResponsesList = (): string[] => (['response 1', 'response 2'])

  interface SutType {
    sut: DbListResponses
    listResponsesRepositoryStub: ListResponsesRepository
  }

  const makeSut = (): SutType => {
    const listResponsesRepositoryStub = makeListResponsesRepositoryStub()
    const sut = new DbListResponses(listResponsesRepositoryStub)
    return {
      sut,
      listResponsesRepositoryStub
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
})

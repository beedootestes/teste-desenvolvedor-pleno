import { ListResponsesController } from './list-responses'
import { HttpRequest, ListResponses } from './list-responses-protocols'

describe('ListResponses Controller', () => {
  const makeFakeListOfResponses = (): string[] => (['response 1', 'response 2'])

  const makeFakeRequest = (): HttpRequest => ({
    body: {},
    params: {
      id: 'valid_question_id'
    }
  })

  interface SutType {
    sut: ListResponsesController
    listResponsesStub: ListResponses
  }

  const makeSut = (): SutType => {
    const listResponsesStub = MakeListResponses()
    const sut = new ListResponsesController(listResponsesStub)
    return {
      sut,
      listResponsesStub
    }
  }

  const MakeListResponses = (): ListResponses => {
    class ListResponsesStub implements ListResponses {
      async list (id: string): Promise<string[]> {
        return await new Promise(resolve => resolve(makeFakeListOfResponses()))
      }
    }
    return new ListResponsesStub()
  }

  test('Should call list Questions with no values', async () => {
    const { sut, listResponsesStub } = makeSut()
    const isValidSpy = jest.spyOn(listResponsesStub, 'list')
    const fakeHttpRequest = makeFakeRequest()
    await sut.handle(fakeHttpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('valid_question_id')
  })
})

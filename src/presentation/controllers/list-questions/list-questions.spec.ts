import { ListQuestions } from '../../../domain/usecases/list-questions'
import { QuestionModel } from '../../../domain/models/question'
import { ListQuestionsController } from './list-questions'
import { HttpRequest } from '../../protocols/http'

describe('ListQuestion Controller', () => {
  const makeFakeListOfQuestions = (): QuestionModel[] => ([{
    id: 'valid_id',
    question: 'valid_question'
  }])

  const makeFakeRequest = (): HttpRequest => ({
    body: {}
  })

  interface SutType {
    sut: ListQuestionsController
    listQuestionsStub: ListQuestions
  }

  const makeSut = (): SutType => {
    const listQuestionsStub = makeListQuestions()
    const sut = new ListQuestionsController(listQuestionsStub)
    return {
      sut,
      listQuestionsStub
    }
  }

  const makeListQuestions = (): ListQuestions => {
    class ListQuestionStub implements ListQuestions {
      async list (): Promise<QuestionModel[]> {
        return await new Promise(resolve => resolve(makeFakeListOfQuestions()))
      }
    }
    return new ListQuestionStub()
  }

  test('Should call list Questions with no values', async () => {
    const { sut, listQuestionsStub } = makeSut()
    const isValidSpy = jest.spyOn(listQuestionsStub, 'list')
    const fakeHttpRequest = makeFakeRequest()
    await sut.handle(fakeHttpRequest)
    expect(isValidSpy).toHaveBeenCalledWith()
  })
})

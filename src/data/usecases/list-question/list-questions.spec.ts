import { QuestionModel } from '../../../domain/models/question'
import { ListQuestionsRepository } from '../../protocols/list-question-repository'
import { DbListQuestions } from './list-questions'

describe('DBAddQuestion', () => {
  const makeFakeQuestionsList = (): QuestionModel[] => ([{
    id: 'valid_id',
    question: 'valid_ question',
    responses: []
  }])

  interface SutType {
    sut: DbListQuestions
    listQuestionsRepositoryStub: ListQuestionsRepository
  }

  const makeSut = (): SutType => {
    const listQuestionsRepositoryStub = makeListQuestionsRepositoryStub()
    const sut = new DbListQuestions(listQuestionsRepositoryStub)
    return {
      sut,
      listQuestionsRepositoryStub
    }
  }

  const makeListQuestionsRepositoryStub = (): ListQuestionsRepository => {
    class ListQuestionsRepositoryStub implements ListQuestionsRepository {
      async list (): Promise<QuestionModel[]> {
        const questionsList: QuestionModel[] = makeFakeQuestionsList()
        return questionsList
      }
    }
    return new ListQuestionsRepositoryStub()
  }

  test('Should call listQuestionsRepository with no values', async () => {
    const { sut, listQuestionsRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(listQuestionsRepositoryStub, 'list')
    await sut.list()
    expect(addSpy).toHaveBeenLastCalledWith()
  })

  test('Should return the list of questions on success', async () => {
    const { sut } = makeSut()
    const result = await sut.list()
    expect(result).toEqual(makeFakeQuestionsList())
  })
})

import { QuestionModel } from '../../../domain/models/question'
import { AddQuestionModel } from '../../../domain/usecases/add-question'
import { AddQuestionRepository } from '../../protocols/add-account-repository'
import { DbAddQuestion } from './db-add-question'

describe('DBAddQuestion', () => {
  interface Sut {
    sut: DbAddQuestion
    addQuestionRepositoryStub: AddQuestionRepository
  }
  const makeSut = (): Sut => {
    const addQuestionRepositoryStub = makeAddQuestionRepositoryStub()
    const sut = new DbAddQuestion(addQuestionRepositoryStub)
    return {
      sut,
      addQuestionRepositoryStub
    }
  }

  const makeAddQuestionRepositoryStub = (): AddQuestionRepository => {
    class AddQuestionRepositoryStub implements AddQuestionRepository {
      async add (question: AddQuestionModel): Promise<QuestionModel> {
        const fakeQuestion = {
          id: 'valid_id',
          question: 'valid_question'
        }
        return await new Promise(resolve => resolve(fakeQuestion))
      }
    }
    return new AddQuestionRepositoryStub()
  }

  test('Should call addQuestionRepository', async () => {
    const { sut, addQuestionRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addQuestionRepositoryStub, 'add')
    const question = {
      question: 'valid_question'
    }
    await sut.add(question)
    expect(addSpy).toHaveBeenLastCalledWith(question)
  })
})

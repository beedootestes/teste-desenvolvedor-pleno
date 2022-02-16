import { QuestionModel } from '../../../domain/models/question'
import { AddQuestionModel } from '../../../domain/usecases/add-question'
import { AddQuestionRepository } from '../../protocols/add-account-repository'
import { DbAddQuestion } from './db-add-question'

describe('DBAddQuestion', () => {
  const makeFakeQuestion = (): AddQuestionModel => ({
    question: 'valid_question'
  })

  const makeFakeResponse = (): QuestionModel => ({
    id: 'any_id',
    question: 'valid_question'
  })

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
        const fakeQuestion = makeFakeResponse()
        return await new Promise(resolve => resolve(fakeQuestion))
      }
    }
    return new AddQuestionRepositoryStub()
  }

  test('Should call addQuestionRepository', async () => {
    const { sut, addQuestionRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addQuestionRepositoryStub, 'add')
    const question = makeFakeQuestion()
    await sut.add(question)
    expect(addSpy).toHaveBeenLastCalledWith(question)
  })

  test('Should return a question on success', async () => {
    const { sut } = makeSut()
    const question = makeFakeQuestion()
    const result = await sut.add(question)
    expect(result).toEqual(makeFakeResponse())
  })
})

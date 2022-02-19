import { QuestionModel } from '../../../domain/models/question'
import { UpdateQuestionModel } from '../../../domain/usecases/update-question'
import { UpdateQuestionRepository } from '../../protocols/update-question-repository'
import { DbUpdateQuestion } from './db-update-question'

describe('DBupdateQuestion', () => {
  const makeFakeQuestion = (): UpdateQuestionModel => ({
    id: 'valid_id',
    question: 'valid_question'
  })

  const makeFakeResponse = (): QuestionModel => ({
    id: 'any_id',
    question: 'valid_question'
  })

  interface Sut {
    sut: DbUpdateQuestion
    updateQuestionRepositoryStub: UpdateQuestionRepository
  }

  const makeSut = (): Sut => {
    const updateQuestionRepositoryStub = makeupdateQuestionRepositoryStub()
    const sut = new DbUpdateQuestion(updateQuestionRepositoryStub)
    return {
      sut,
      updateQuestionRepositoryStub
    }
  }

  const makeupdateQuestionRepositoryStub = (): UpdateQuestionRepository => {
    class UpdateQuestionRepositoryStub implements UpdateQuestionRepository {
      async update (question: UpdateQuestionModel): Promise<QuestionModel> {
        const fakeQuestion = makeFakeResponse()
        return await new Promise(resolve => resolve(fakeQuestion))
      }
    }
    return new UpdateQuestionRepositoryStub()
  }

  test('Should call updateQuestionRepository', async () => {
    const { sut, updateQuestionRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateQuestionRepositoryStub, 'update')
    const question = makeFakeQuestion()
    await sut.update(question)
    expect(updateSpy).toHaveBeenLastCalledWith(question)
  })
})

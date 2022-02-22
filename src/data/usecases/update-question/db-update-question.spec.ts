import { QuestionModel } from '../../../domain/models/question'
import { UpdateQuestionModel } from '../../../domain/usecases/update-question'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { GetQuestionRepository } from '../../protocols/get-question-repository'
import { UpdateQuestionRepository } from '../../protocols/update-question-repository'
import { DbUpdateQuestion } from './db-update-question'

describe('DBupdateQuestion', () => {
  const makeFakeQuestion = (): UpdateQuestionModel => ({
    id: 'valid_id',
    question: 'valid_question'
  })

  const makeFakeResponse = (): QuestionModel => ({
    id: 'any_id',
    question: 'updated_question'
  })

  interface Sut {
    sut: DbUpdateQuestion
    updateQuestionRepositoryStub: UpdateQuestionRepository
    getQuestionRepositoryStub: GetQuestionRepository
  }

  const makeSut = (): Sut => {
    const updateQuestionRepositoryStub = makeupdateQuestionRepositoryStub()
    const getQuestionRepositoryStub = makeGetQuestionRepositoryStub()
    const sut = new DbUpdateQuestion(updateQuestionRepositoryStub, getQuestionRepositoryStub)
    return {
      sut,
      updateQuestionRepositoryStub,
      getQuestionRepositoryStub
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

  const makeGetQuestionRepositoryStub = (): GetQuestionRepository => {
    class GetQuestionRepositoryStub implements GetQuestionRepository {
      async get (id: string): Promise<any> {
        const fakeQuestion = makeFakeResponse()
        return await new Promise(resolve => resolve(fakeQuestion))
      }
    }
    return new GetQuestionRepositoryStub()
  }

  test('Should call updateQuestionRepository', async () => {
    const { sut, updateQuestionRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateQuestionRepositoryStub, 'update')
    const question = makeFakeQuestion()
    await sut.update(question)
    expect(updateSpy).toHaveBeenLastCalledWith(question)
  })

  test('Should return the updated question on success', async () => {
    const { sut } = makeSut()
    const question = makeFakeQuestion()
    const result = await sut.update(question)
    expect(result).toEqual(makeFakeResponse())
  })

  test('Should call getQuestionRepository', async () => {
    const { sut, getQuestionRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(getQuestionRepositoryStub, 'get')
    const question = makeFakeQuestion()
    await sut.update(question)
    expect(updateSpy).toHaveBeenLastCalledWith(question.id)
  })

  test('Should throws if getQuestionRepository returns null', async () => {
    const { sut, getQuestionRepositoryStub } = makeSut()
    jest.spyOn(getQuestionRepositoryStub, 'get').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => resolve(null))
    })
    const question = makeFakeQuestion()
    try {
      await sut.update(question)
    } catch (error) {
      expect(error).toEqual(new InvalidParamError('id'))
    }
  })
})

import { AddResponseModel } from '../../../domain/usecases/add-response'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { AddResponseToQuestionModel, AddResponseToQuestionRepository } from '../../protocols/add-response-to-question.repository'
import { GetQuestionRepository } from '../../protocols/get-question-repository'
import { DbAddResponse } from './add-response'

describe('DBAddResponse', () => {
  const makeFakeInputResponse = (): AddResponseModel => ({
    response: 'valid_response',
    question_id: 'valid_question_id'
  })

  interface Sut {
    sut: DbAddResponse
    getQuestionRepositoryStub: GetQuestionRepository
    addResponseToQuestionRepositoryStub: AddResponseToQuestionRepository
  }
  const makeSut = (): Sut => {
    const addResponseToQuestionRepositoryStub = makeAddResponseToQuestionRepositoryStub()
    const getQuestionRepositoryStub = makeGetQuestionRepositoryStub()
    const sut = new DbAddResponse(
      getQuestionRepositoryStub,
      addResponseToQuestionRepositoryStub
    )
    return {
      sut,
      getQuestionRepositoryStub,
      addResponseToQuestionRepositoryStub
    }
  }

  const makeAddResponseToQuestionRepositoryStub = (): AddResponseToQuestionRepository => {
    class AddResponseToQuestionRepositoryStub implements AddResponseToQuestionRepository {
      async addResponse (response: AddResponseToQuestionModel): Promise<Boolean> {
        return await new Promise(resolve => resolve(true))
      }
    }
    return new AddResponseToQuestionRepositoryStub()
  }

  const makeGetQuestionRepositoryStub = (): GetQuestionRepository => {
    class GetQuestionRepositoryStub implements GetQuestionRepository {
      async get (id: string): Promise<any> {
        return await new Promise(resolve => resolve(makeFakeInputResponse()))
      }
    }
    return new GetQuestionRepositoryStub()
  }

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const question = makeFakeInputResponse()
    const result = await sut.add(question)
    expect(result).toEqual(true)
  })

  test('Should call GetQuestionRepository correctly', async () => {
    const { sut, getQuestionRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(getQuestionRepositoryStub, 'get')
    const question = makeFakeInputResponse()
    await sut.add(question)
    expect(updateSpy).toBeCalledWith('valid_question_id')
  })

  test('Should throws if getQuestionRepository returns null', async () => {
    expect.assertions(1)
    const { sut, getQuestionRepositoryStub } = makeSut()
    jest.spyOn(getQuestionRepositoryStub, 'get').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => resolve(null))
    })

    try {
      const question = makeFakeInputResponse()
      await sut.add(question)
    } catch (error) {
      expect(error).toEqual(new InvalidParamError('question_id'))
    }
  })

  test('Should call addResponseToQuestionRepository correctly', async () => {
    const { sut, addResponseToQuestionRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addResponseToQuestionRepositoryStub, 'addResponse')
    const response = makeFakeInputResponse()
    await sut.add(response)
    expect(addSpy).toHaveBeenLastCalledWith(response)
  })
})

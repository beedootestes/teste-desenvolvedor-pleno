import { ResponseModel } from '../../../domain/models/response'
import { AddResponseModel } from '../../../domain/usecases/add-response'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { AddResponseRepository } from '../../protocols/add-response-repository'
import { GetQuestionRepository } from '../../protocols/get-question-repository'
import { DbAddResponse } from './add-response'

describe('DBAddResponse', () => {
  const makeFakeInputResponse = (): AddResponseModel => ({
    response: 'valid_response',
    id: 'valid_question_id'
  })

  const makeFakeOutputResponse = (): ResponseModel => ({
    id: 'valid_id',
    response: 'valid_response',
    questions: ['valid_question_id']
  })

  interface Sut {
    sut: DbAddResponse
    addResponseRepositoryStub: AddResponseRepository
    getQuestionRepositoryStub: GetQuestionRepository

  }
  const makeSut = (): Sut => {
    const addResponseRepositoryStub = makeAddResponseRepositoryStub()
    const getQuestionRepositoryStub = makeGetQuestionRepositoryStub()
    const sut = new DbAddResponse(addResponseRepositoryStub, getQuestionRepositoryStub)
    return {
      sut,
      addResponseRepositoryStub,
      getQuestionRepositoryStub
    }
  }

  const makeAddResponseRepositoryStub = (): AddResponseRepository => {
    class AddResponseRepositoryStub implements AddResponseRepository {
      async add (response: AddResponseModel): Promise<ResponseModel> {
        const fakeResponse = makeFakeOutputResponse()
        return await new Promise(resolve => resolve(fakeResponse))
      }
    }
    return new AddResponseRepositoryStub()
  }

  const makeGetQuestionRepositoryStub = (): GetQuestionRepository => {
    class GetQuestionRepositoryStub implements GetQuestionRepository {
      async get (id: string): Promise<any> {
        return await new Promise(resolve => resolve(makeFakeInputResponse()))
      }
    }
    return new GetQuestionRepositoryStub()
  }

  test('Should call AddResponseRepository', async () => {
    const { sut, addResponseRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addResponseRepositoryStub, 'add')
    const response = makeFakeInputResponse()
    await sut.add(response)
    expect(addSpy).toHaveBeenLastCalledWith(response)
  })

  test('Should return a question on success', async () => {
    const { sut } = makeSut()
    const question = makeFakeInputResponse()
    const result = await sut.add(question)
    expect(result).toEqual(makeFakeOutputResponse())
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
      expect(error).toEqual(new InvalidParamError('id'))
    }
  })
})

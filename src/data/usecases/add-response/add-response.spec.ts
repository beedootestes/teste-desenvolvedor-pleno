import { ResponseModel } from '../../../domain/models/response'
import { AddResponseModel } from '../../../domain/usecases/add-response'
import { AddResponseRepository } from '../../protocols/add-response-repository'
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
  }
  const makeSut = (): Sut => {
    const addResponseRepositoryStub = makeAddResponseRepositoryStub()
    const sut = new DbAddResponse(addResponseRepositoryStub)
    return {
      sut,
      addResponseRepositoryStub
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
})

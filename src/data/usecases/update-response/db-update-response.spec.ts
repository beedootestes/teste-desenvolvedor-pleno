import { UpdateResponseModel } from '../../../domain/usecases/update-response'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { GetQuestionRepository } from '../../protocols/get-question-repository'
import { UpdateResponseRepository } from '../../protocols/update-response-repository'
import { DbUpdateResponse } from './db-update-response'

describe('DBupdateResponse', () => {
  const makeFakeResponse = (): UpdateResponseModel => ({
    question_id: 'valid_id',
    new_response: 'new_Response',
    old_response: 'old_response'
  })

  interface Sut {
    sut: DbUpdateResponse
    updateResponseRepositoryStub: UpdateResponseRepository
    getQuestionRepositoryStub: GetQuestionRepository
  }

  const makeSut = (): Sut => {
    const updateResponseRepositoryStub = makeupdateResponseRepositoryStub()
    const getQuestionRepositoryStub = makeGetQuestionRepositoryStub()
    const sut = new DbUpdateResponse(updateResponseRepositoryStub, getQuestionRepositoryStub)
    return {
      sut,
      updateResponseRepositoryStub,
      getQuestionRepositoryStub
    }
  }

  const makeupdateResponseRepositoryStub = (): UpdateResponseRepository => {
    class UpdateResponseRepositoryStub implements UpdateResponseRepository {
      async update (Response: UpdateResponseModel): Promise<Boolean> {
        return await new Promise(resolve => resolve(true))
      }
    }
    return new UpdateResponseRepositoryStub()
  }

  const makeGetQuestionRepositoryStub = (): GetQuestionRepository => {
    class GetQuestionRepositoryStub implements GetQuestionRepository {
      async get (id: string): Promise<any> {
        const fakeResponse = {
          id: 'valid_id',
          question: 'valid_question',
          responses: ['old_response']
        }
        return await new Promise(resolve => resolve(fakeResponse))
      }
    }
    return new GetQuestionRepositoryStub()
  }

  test('Should call updateResponseRepository', async () => {
    const { sut, updateResponseRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateResponseRepositoryStub, 'update')
    const Response = makeFakeResponse()
    await sut.update(Response)
    expect(updateSpy).toHaveBeenLastCalledWith(Response)
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const response = makeFakeResponse()
    const result = await sut.update(response)
    expect(result).toEqual(true)
  })

  test('Should call getQuestionRepository', async () => {
    const { sut, getQuestionRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(getQuestionRepositoryStub, 'get')
    const response = makeFakeResponse()
    await sut.update(response)
    expect(updateSpy).toHaveBeenLastCalledWith(response.question_id)
  })

  test('Should throws if getQuestionRepository returns null', async () => {
    const { sut, getQuestionRepositoryStub } = makeSut()
    jest.spyOn(getQuestionRepositoryStub, 'get').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => resolve(null))
    })
    const response = makeFakeResponse()
    try {
      await sut.update(response)
    } catch (error) {
      expect(error).toEqual(new InvalidParamError('question_id'))
    }
  })
})

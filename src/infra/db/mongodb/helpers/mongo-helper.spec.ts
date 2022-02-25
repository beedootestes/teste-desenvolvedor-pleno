import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL ?? 'mongodb://0.0.0.0:27017/clean-node-api')
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect with mongo when connection downs', async () => {
    const connection = await sut.getCollection('questions')
    expect(connection).toBeTruthy()

    await sut.disconnect()
    expect(connection).toBeTruthy()
  })
})

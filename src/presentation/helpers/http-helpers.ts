import { HttpResponse } from '../protocols/http'
import { ServerError } from '../errors/server-error'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const ok = (): HttpResponse => ({
  statusCode: 200,
  body: 'ok'
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

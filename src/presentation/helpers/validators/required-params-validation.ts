import { MissingParamError } from '../../errors/missing-param-error'
import { Validation } from './validation'

export class RequiredParamsValidation implements Validation {
  private readonly paramName: string

  constructor (paramName: string) {
    this.paramName = paramName
  }

  validate (input: any): Error | null {
    if (!input[this.paramName]) {
      return new MissingParamError(this.paramName)
    }
    return null
  }
}

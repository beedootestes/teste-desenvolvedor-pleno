import { RequiredParamsValidation } from '../../../presentation/helpers/validators/required-params-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'

export const makeDeleteQuestionValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredParamsValidation(field))
  }
  return new ValidationComposite(validations)
}

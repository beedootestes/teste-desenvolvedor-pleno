import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { RequiredParamsValidation } from '../../../presentation/helpers/validators/required-params-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'

export const makeUpdateQuestionValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['question']) {
    validations.push(new RequiredFieldValidation(field))
  }
  for (const param of ['id']) {
    validations.push(new RequiredParamsValidation(param))
  }
  return new ValidationComposite(validations)
}

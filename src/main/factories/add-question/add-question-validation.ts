import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'

export const makeAddQuestionValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['question']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
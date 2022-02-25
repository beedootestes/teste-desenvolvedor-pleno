import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { RequiredParamsValidation } from '../../../presentation/helpers/validators/required-params-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'

export const makeDeleteResponseValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['response', 'question_id']) {
    if (field === 'question_id') {
      validations.push(new RequiredParamsValidation(field))
    }
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}

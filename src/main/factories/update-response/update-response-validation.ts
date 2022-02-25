import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { RequiredParamsValidation } from '../../../presentation/helpers/validators/required-params-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'

export const makeUpdateResponseValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['old_response', 'question_id', 'new_response']) {
    if (field === 'question_id') {
      validations.push(new RequiredParamsValidation(field))
    }
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}

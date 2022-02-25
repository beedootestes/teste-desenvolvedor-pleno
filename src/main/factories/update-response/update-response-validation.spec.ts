import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { RequiredParamsValidation } from '../../../presentation/helpers/validators/required-params-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { makeUpdateResponseValidation } from './update-response-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('Add Question Validation', () => {
  test('Should call validationComposite with all validations', () => {
    makeUpdateResponseValidation()
    const validations: Validation[] = []
    for (const field of ['old_response', 'question_id', 'new_response']) {
      if (field === 'question_id') {
        validations.push(new RequiredParamsValidation(field))
      }
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

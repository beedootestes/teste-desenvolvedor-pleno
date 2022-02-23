import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { makeAddResponseValidation } from './add-response-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('Add Question Validation', () => {
  test('Should call validationComposite with all validations', () => {
    makeAddResponseValidation()
    const validations: Validation[] = []
    for (const field of ['response', 'id']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { RequiredParamsValidation } from '../../../presentation/helpers/validators/required-params-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { makeUpdateQuestionValidation } from './update-question-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('Add Question Validation', () => {
  test('Should call validationComposite with all validations', () => {
    makeUpdateQuestionValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'id']) {
      if (field === 'id') {
        validations.push(new RequiredParamsValidation(field))
      }
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

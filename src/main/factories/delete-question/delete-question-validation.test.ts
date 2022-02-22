import { RequiredParamsValidation } from '../../../presentation/helpers/validators/required-params-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { makeDeleteQuestionValidation } from './delete-question-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('Add Question Validation', () => {
  test('Should call validationComposite with all validations', () => {
    makeDeleteQuestionValidation()
    const validations: Validation[] = []
    for (const field of ['id']) {
      validations.push(new RequiredParamsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

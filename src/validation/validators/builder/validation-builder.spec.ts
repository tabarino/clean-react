import { faker } from '@faker-js/faker';
import { RequiredFieldValidation } from '@/validation/validators';
import { ValidationBuilder } from './validation-builder';

describe('Validation Builder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = ValidationBuilder.field(fieldName).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });
});

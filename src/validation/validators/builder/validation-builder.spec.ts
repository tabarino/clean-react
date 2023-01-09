import { faker } from '@faker-js/faker';
import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators';
import { ValidationBuilder } from './validation-builder';

describe('Validation Builder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = ValidationBuilder.field(fieldName).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  test('Should return EmailValidation', () => {
    const fieldName = faker.database.column();
    const validations = ValidationBuilder.field(fieldName).email().build();
    expect(validations).toEqual([new EmailValidation(fieldName)]);
  });

  test('Should return MinLengthValidation', () => {
    const fieldName = faker.database.column();
    const validations = ValidationBuilder.field(fieldName).min(5).build();
    expect(validations).toEqual([new MinLengthValidation(fieldName, 5)]);
  });
});

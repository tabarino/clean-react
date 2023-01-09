import { faker } from '@faker-js/faker';
import { FieldValidationSpy } from '@/validation/mocks';
import { FieldValidation } from '@/validation/protocols';
import { ValidationComposite } from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
};

const makeSut = (validators: FieldValidation[]): SutTypes => {
  const sut = new ValidationComposite(validators);
  return { sut };
};

describe('Validation Composite', () => {
  test('Should return error if any validation fails', () => {
    const field = faker.database.column();
    const fieldValidationSpy = new FieldValidationSpy(field);
    const fieldValidationSpy2 = new FieldValidationSpy(field);
    fieldValidationSpy2.error = new Error('error_message');
    const { sut } = makeSut([fieldValidationSpy, fieldValidationSpy2]);
    const error = sut.validate(field, faker.random.word());
    expect(error).toEqual('error_message');
  });

  test('Should return first error message if first validation fails', () => {
    const field = faker.database.column();
    const fieldValidationSpy = new FieldValidationSpy(field);
    fieldValidationSpy.error = new Error('first_error_message');
    const fieldValidationSpy2 = new FieldValidationSpy(field);
    fieldValidationSpy2.error = new Error('second_error_message');
    const { sut } = makeSut([fieldValidationSpy, fieldValidationSpy2]);
    const error = sut.validate(field, faker.random.word());
    expect(error).toEqual('first_error_message');
  });
});

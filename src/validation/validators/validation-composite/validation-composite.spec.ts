import { faker } from '@faker-js/faker';
import { FieldValidationSpy } from '@/validation/mocks';
import { FieldValidation } from '@/validation/protocols';
import { ValidationComposite } from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidation[];
};

const makeSut = (field: string): SutTypes => {
  const fieldValidationsSpy = [new FieldValidationSpy(field), new FieldValidationSpy(field)];
  const sut = new ValidationComposite(fieldValidationsSpy);
  return { sut, fieldValidationsSpy };
};

describe('Validation Composite', () => {
  test('Should return error if any validation fails', () => {
    const field = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(field);
    (fieldValidationsSpy[1] as FieldValidationSpy).error = new Error('error_message');
    const error = sut.validate(field, faker.random.word());
    expect(error).toEqual('error_message');
  });

  test('Should return first error message if first validation fails', () => {
    const field = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(field);
    (fieldValidationsSpy[0] as FieldValidationSpy).error = new Error('first_error_message');
    (fieldValidationsSpy[1] as FieldValidationSpy).error = new Error('second_error_message');
    const error = sut.validate(field, faker.random.word());
    expect(error).toEqual('first_error_message');
  });
});

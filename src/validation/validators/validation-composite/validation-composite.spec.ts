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
    const errorMessage = faker.random.words();
    (fieldValidationsSpy[1] as FieldValidationSpy).error = new Error(errorMessage);
    const error = sut.validate(field, faker.random.word());
    expect(error).toEqual(errorMessage);
  });

  test('Should return first error message if first validation fails', () => {
    const field = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(field);
    const errorMessage1 = faker.random.words();
    const errorMessage2 = faker.random.words();
    (fieldValidationsSpy[0] as FieldValidationSpy).error = new Error(errorMessage1);
    (fieldValidationsSpy[1] as FieldValidationSpy).error = new Error(errorMessage2);
    const error = sut.validate(field, faker.random.word());
    expect(error).toEqual(errorMessage1);
  });

  test('Should return falsy if field is valid', () => {
    const field = faker.database.column();
    const { sut } = makeSut(field);
    const error = sut.validate(field, faker.random.word());
    expect(error).toBeFalsy();
  });
});

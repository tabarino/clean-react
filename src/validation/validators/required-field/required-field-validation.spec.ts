import { faker } from '@faker-js/faker';
import { RequiredFieldError } from '@/validation/errors';
import { RequiredFieldValidation } from './required-field-validation';

type SutTypes = {
  sut: RequiredFieldValidation;
};

const makeSut = (field: string): SutTypes => {
  const sut = new RequiredFieldValidation(field);
  return { sut };
};

describe('Required Field Validation', () => {
  test('Should return error if field is empty', () => {
    const { sut } = makeSut(faker.database.column());
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should return falsy if field is not empty', () => {
    const { sut } = makeSut(faker.database.column());
    const error = sut.validate(faker.random.word());
    expect(error).toBeFalsy();
  });
});

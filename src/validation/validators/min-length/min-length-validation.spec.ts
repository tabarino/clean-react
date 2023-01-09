import { faker } from '@faker-js/faker';
import { InvalidFieldError } from '@/validation/errors';
import { MinLengthValidation } from './min-length-validation';

type SutTypes = {
  sut: MinLengthValidation;
};

const makeSut = (field: string, minLength: number): SutTypes => {
  const sut = new MinLengthValidation(field, minLength);
  return { sut };
};

describe('MinLength Validation', () => {
  test('Should return error if value is invalid', () => {
    const { sut } = makeSut(faker.database.column(), 5);
    const error = sut.validate(faker.random.alphaNumeric(3));
    expect(error).toEqual(new InvalidFieldError());
  });
});

import { faker } from '@faker-js/faker';
import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from './email-validation';

type SutTypes = {
  sut: EmailValidation;
};

const makeSut = (field: string): SutTypes => {
  const sut = new EmailValidation(field);
  return { sut };
};

describe('Email Validation', () => {
  test('Should return error if email is invalid', () => {
    const { sut } = makeSut(faker.database.column());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if email is empty', () => {
    const { sut } = makeSut(faker.database.column());
    const error = sut.validate('');
    expect(error).toBeFalsy();
  });

  test('Should return falsy if email is valid', () => {
    const { sut } = makeSut(faker.database.column());
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});

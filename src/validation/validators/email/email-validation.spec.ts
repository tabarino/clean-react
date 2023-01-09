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
    const { sut } = makeSut('email');
    const error = sut.validate('');
    expect(error).toEqual(new InvalidFieldError());
  });
});

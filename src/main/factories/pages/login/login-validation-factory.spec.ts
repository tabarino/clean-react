import { ValidationBuilder, ValidationComposite } from '@/validation/validators';
import { makeLoginValidation } from './login-validation-factory';

describe('Login Validation Factory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation();
    expect(composite).toEqual(
      new ValidationComposite([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
      ]),
    );
  });
});

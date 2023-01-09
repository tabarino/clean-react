import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class EmailValidation implements FieldValidation {
  constructor(public readonly field: string) {}

  validate(value: string): Error | null {
    return new InvalidFieldError();
  }
}
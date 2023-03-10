import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class MinLengthValidation implements FieldValidation {
  constructor(public readonly field: string, private readonly minLength: number) {}

  validate(value: string): Error | null {
    return value.length >= this.minLength ? null : new InvalidFieldError();
  }
}

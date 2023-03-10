import { RequiredFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class RequiredFieldValidation implements FieldValidation {
  constructor(public readonly field: string) {}

  validate(value: string): Error | null {
    return value ? null : new RequiredFieldError();
  }
}

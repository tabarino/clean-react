import { FieldValidation } from '@/validation/protocols';

export class FieldValidationSpy implements FieldValidation {
  error: Error | null = null;

  constructor(public readonly field: string) {}

  validate(value: string): Error | null {
    return this.error;
  }
}

import { Validation } from '@/presentation/protocols/validation';
import { FieldValidation } from '@/validation/protocols';

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}

  validate(fieldName: string, fieldValue: string): string {
    const filteredValidators = this.validators.filter((validator) => validator.field === fieldName);

    for (const filteredValidator of filteredValidators) {
      const error = filteredValidator.validate(fieldValue);
      if (error) {
        return error.message;
      }
    }

    return '';
  }
}

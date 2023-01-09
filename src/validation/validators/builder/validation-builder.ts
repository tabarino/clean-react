import { FieldValidation } from '@/validation/protocols';
import { EmailValidation, RequiredFieldValidation } from '@/validation/validators';

export class ValidationBuilder {
  private constructor(private readonly fieldName: string, private readonly validations: FieldValidation[]) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName));
    return this;
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}

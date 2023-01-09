export class RequiredFieldError extends Error {
  constructor() {
    super('Mandatory Field');
    this.name = 'RequiredFieldError';
  }
}

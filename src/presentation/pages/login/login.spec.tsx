import React from 'react';
import { faker } from '@faker-js/faker';
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { AuthenticationSpy, ValidationSpy } from '@/presentation/mocks';
import Login from './login';
import { InvalidCredentialsError } from '@/domain/errors';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  validationSpy.errorMessage = params?.validationError || '';
  const sut = render(<Login validation={validationSpy} authentication={authenticationSpy} />);
  return {
    sut,
    validationSpy,
    authenticationSpy,
  };
};

const populateEmailField = (sut: RenderResult, email: string = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (sut: RenderResult, password: string = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, { target: { value: password } });
};

const simulateValidSubmit = (
  sut: RenderResult,
  email: string = faker.internet.email(),
  password: string = faker.internet.password(),
): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const submitButton = sut.getByTestId('submit');
  fireEvent.click(submitButton);
};

const simulateFieldStatus = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Success');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('Should not render spinner and error on start', () => {
    const { sut } = makeSut();
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
  });

  test('Should render with button disabled on start', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test('Should render email input as mandatory', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    simulateFieldStatus(sut, 'email', validationError);
  });

  test('Should render password input as mandatory', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    simulateFieldStatus(sut, 'password', validationError);
  });

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut();
    const email = faker.internet.email();
    populateEmailField(sut, email);
    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  });

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();
    const password = faker.internet.password();
    populatePasswordField(sut, password);
    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(password);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    simulateFieldStatus(sut, 'email', validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    simulateFieldStatus(sut, 'password', validationError);
  });

  test('Should show valid email state if Validation suceeds', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    simulateFieldStatus(sut, 'email');
  });

  test('Should show valid password state if Validation suceeds', () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    simulateFieldStatus(sut, 'password');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test('Should show spinner on submit', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('Should call authentication only once', () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call authentication if form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    populateEmailField(sut);
    fireEvent.submit(sut.getByTestId('form'));
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should show error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error));
    simulateValidSubmit(sut);
    await waitFor(() => sut.getByTestId('error-message'));
    const errorMessage = sut.getByTestId('error-message');
    expect(errorMessage.textContent).toBe(error.message);
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(1);
  });
});

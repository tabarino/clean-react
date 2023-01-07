import React from 'react';
import { faker } from '@faker-js/faker';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import { AuthenticationSpy, ValidationSpy } from '@/presentation/mocks';
import Login from './login';

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
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should render password input as mandatory', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut();
    const email = faker.internet.email();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  });

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();
    const password = faker.internet.password();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });
    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(password);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show valid email state if Validation suceeds', () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Success');
    expect(emailStatus.textContent).toBe('🟢');
  });

  test('Should show valid password state if Validation suceeds', () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Success');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test('Should show spinner on submit', () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    const submitButton = sut.getByTestId('submit');
    fireEvent.click(submitButton);
    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();
    const emailInput = sut.getByTestId('email');
    const email = faker.internet.email();
    const password = faker.internet.password();
    fireEvent.input(emailInput, { target: { value: email } });
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });
    const submitButton = sut.getByTestId('submit');
    fireEvent.click(submitButton);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });
});

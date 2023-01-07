import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import { ValidationSpy } from '@/presentation/mocks';
import Login from './login';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);
  return {
    sut,
    validationSpy,
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
    const { sut } = makeSut();
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test('Should render email input as mandatory', () => {
    const { sut } = makeSut();
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Mandatory');
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should render password input as mandatory', () => {
    const { sut } = makeSut();
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Mandatory');
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: 'any_email' } });
    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe('any_email');
  });

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: 'any_password' } });
    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe('any_password');
  });
});

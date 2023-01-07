import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Login from './login';

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<Login />);
  return {
    sut,
  };
};

describe('Login Component', () => {
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

  test('Should render inputs as mandatory', () => {
    const { sut } = makeSut();
    const emailStatus = sut.getByTestId('email-status');
    const passwordStatus = sut.getByTestId('password-status');
    expect(emailStatus.title).toBe('Mandatory');
    expect(emailStatus.textContent).toBe('🔴');
    expect(passwordStatus.title).toBe('Mandatory');
    expect(passwordStatus.textContent).toBe('🔴');
  });
});

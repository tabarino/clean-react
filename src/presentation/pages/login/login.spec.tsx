import React from 'react';
import { render } from '@testing-library/react';
import Login from './login';

describe('Login Component', () => {
  test('Should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />);
    const errorWrap = getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
  });

  test('Should render with button disabled on start', () => {
    const { getByTestId } = render(<Login />);
    const submitButton = getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test('Should render inputs as mandatory', () => {
    const { getByTestId } = render(<Login />);
    const emailStatus = getByTestId('email-status');
    const passwordStatus = getByTestId('password-status');
    expect(emailStatus.title).toBe('Mandatory');
    expect(emailStatus.textContent).toBe('🔴');
    expect(passwordStatus.title).toBe('Mandatory');
    expect(passwordStatus.textContent).toBe('🔴');
  });
});

import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import FormContext from '@/presentation/contexts/form/form-context';
import Input from './input';

const makeSut = (): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: { error: {} } }}>
      <Input type="field_type" name="field" />
    </FormContext.Provider>
  );
};

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const { getByTestId } = makeSut();
    const input = getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});

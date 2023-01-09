import React from 'react';
import { faker } from '@faker-js/faker';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import FormContext from '@/presentation/contexts/form/form-context';
import Input from './input';

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: { error: {} } }}>
      <Input type="field_type" name={fieldName} />
    </FormContext.Provider>,
  );
};

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column();
    const { getByTestId } = makeSut(field);
    const input = getByTestId(field) as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column();
    const { getByTestId } = makeSut(field);
    const input = getByTestId(field) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBe(false);
  });
});

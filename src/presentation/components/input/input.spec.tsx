import React from 'react';
import { render } from '@testing-library/react';
import FormContext from '@/presentation/contexts/form/form-context';
import Input from './input';

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const { getByTestId } = render(
      <FormContext.Provider value={{ state: { error: {} } }}>
        <Input type="field_type" name="field" />
      </FormContext.Provider>
    );
    const input = getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});

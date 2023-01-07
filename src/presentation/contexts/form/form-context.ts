import { createContext } from 'react';

export type FormStateProps = {
  isLoading: boolean;
  errorMessage: string;
};

const defaultFormState: FormStateProps = {
  isLoading: false,
  errorMessage: '',
};

export default createContext<FormStateProps>(defaultFormState);

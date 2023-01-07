import { createContext } from 'react';

export type FormStateProps = {
  isLoading: boolean;
  errorMessage: string;
  error: any;
};

export const formInitialState: FormStateProps = {
  isLoading: false,
  errorMessage: '',
  error: {},
};

export default createContext<FormStateProps>(formInitialState);

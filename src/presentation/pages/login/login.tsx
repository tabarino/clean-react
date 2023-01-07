import React, { useEffect, useState } from 'react';
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components';
import FormContext from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import styles from './login-styles.scss';

type Props = {
  validation: Validation;
};

const Login: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    errorMessage: '',
    error: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        error: {
          email: validation.validate('email', state.email),
          password: prevState.error.password,
        },
      };
    });
  }, [state.email]);

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        error: {
          email: prevState.error.email,
          password: validation.validate('password', state.password),
        },
      };
    });
  }, [state.password]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });
  }

  return (
    <div className={styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <button
            data-testid="submit"
            className={styles.submit}
            type="submit"
            disabled={!!state.error.email || !!state.error.password}>
            Login
          </button>
          <span className={styles.link}>Create Account</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;

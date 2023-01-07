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
      email: 'Mandatory',
      password: 'Mandatory',
    },
  });

  useEffect(() => {
    validation.validate('email', state.email);
  }, [state.email]);

  useEffect(() => {
    validation.validate('password', state.password);
  }, [state.password]);

  return (
    <div className={styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <button data-testid="submit" className={styles.submit} type="submit" disabled>
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

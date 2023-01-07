import React, { useState } from 'react';
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components';
import FormContext, { FormStateProps } from '@/presentation/contexts/form/form-context';
import styles from './login-styles.scss';

const Login: React.FC = () => {
  const [state] = useState<FormStateProps>({
    isLoading: false,
    errorMessage: '',
  });

  return (
    <div className={styles.login}>
      <LoginHeader />
      <FormContext.Provider value={state}>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <button className={styles.submit} type="submit">
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

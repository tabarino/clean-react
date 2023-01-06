import React from 'react';
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components';
import styles from './login-styles.scss';

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />
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
      <Footer />
    </div>
  );
};

export default Login;

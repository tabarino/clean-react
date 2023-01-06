import React from 'react';
import Footer from '@/presentation/components/footer/footer';
import Input from '@/presentation/components/input/input';
import LoginHeader from '@/presentation/components/login-header/login-header';
import Spinner from '@/presentation/components/spinner/spinner';
import styles from './login-styles.scss';

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />
      <form className={styles.form}>
        <h2>Login</h2>
        <Input type="email" name='email' placeholder='Email' />
        <Input type="password" name='password' placeholder='Password' />
        <button className={styles.submit} type='submit'>Login</button>
        <span className={styles.link}>Create Account</span>
        <div className={styles.errorWrap}>
          <Spinner className={styles.spinner} />
          <span className={styles.error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Login;

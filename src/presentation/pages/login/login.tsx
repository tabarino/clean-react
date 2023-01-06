import React from 'react';
import Footer from '@/presentation/components/footer/footer';
import LoginHeader from '@/presentation/components/login-header/login-header';
import Spinner from '@/presentation/components/spinner/spinner';
import styles from './login-styles.scss';

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />
      <form className={styles.form}>
        <h2>Login</h2>
        <div className={styles.inputWrap}>
          <input type="email" name='email' placeholder='Email' />
          <span className={styles.status}>🔴</span>
        </div>
        <div className={styles.inputWrap}>
          <input type="password" name='password' placeholder='Password' />
          <span className={styles.status}>🔴</span>
        </div>
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

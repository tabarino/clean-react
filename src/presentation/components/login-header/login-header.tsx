import React, { memo } from 'react';
import Logo from '@/presentation/components/logo/logo';
import styles from './login-header-styles.scss';

const LoginHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Surveys for Developers</h1>
    </header>
  );
};

export default memo(LoginHeader);

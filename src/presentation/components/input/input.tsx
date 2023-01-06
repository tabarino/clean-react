import React from 'react';
import styles from './input-styles.scss';

type Props = {
  type: string;
  name: string;
  placeholder?: string;
};

const Input: React.FC<Props> = ({ type, name, placeholder }) => {
  return (
    <div className={styles.inputWrap}>
      <input type={type} name={name} placeholder={placeholder} />
      <span className={styles.status}>🔴</span>
    </div>
  );
};

export default Input;

import React from 'react';
import styles from './input-styles.scss';

type Props = {
  type: string;
  name: string;
  placeholder?: string;
};

const Input: React.FC<Props> = ({ type, name, placeholder }) => {
  function enableInput(event: React.FocusEvent<HTMLInputElement>): void {
    event.target.readOnly = false;
  }

  return (
    <div className={styles.inputWrap}>
      <input type={type} name={name} placeholder={placeholder} readOnly onFocus={enableInput} />
      <span className={styles.status}>🔴</span>
    </div>
  );
};

export default Input;

import React, { useContext } from 'react';
import styles from './input-styles.scss';
import FormContext from '@/presentation/contexts/form/form-context';

type Props = {
  type: string;
  name: string;
  placeholder?: string;
};

const Input: React.FC<Props> = ({ type, name, placeholder }) => {
  const { error } = useContext(FormContext);

  function enableInput(event: React.FocusEvent<HTMLInputElement>): void {
    event.target.readOnly = false;
  }

  function getTitle(): string {
    return error[name];
  }

  function getStatus(): string {
    return '🔴';
  }

  return (
    <div className={styles.inputWrap}>
      <input type={type} name={name} placeholder={placeholder} readOnly onFocus={enableInput} />
      <span data-testid={`${name}-status`} className={styles.status} title={getTitle()}>
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;

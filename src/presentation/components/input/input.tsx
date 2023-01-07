import React, { useContext } from 'react';
import styles from './input-styles.scss';
import FormContext from '@/presentation/contexts/form/form-context';

type Props = {
  type: string;
  name: string;
  placeholder?: string;
};

const Input: React.FC<Props> = ({ type, name, placeholder }) => {
  const { state, setState } = useContext(FormContext);
  const { error } = state;

  function enableInput(event: React.FocusEvent<HTMLInputElement>): void {
    event.target.readOnly = false;
  }

  function handleChange(event: React.FocusEvent<HTMLInputElement>): void {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }

  function getTitle(): string {
    return error[name] || 'Success';
  }

  function getStatus(): string {
    return error[name] ? '🔴' : '🟢';
  }

  return (
    <div className={styles.inputWrap}>
      <input
        data-testid={name}
        type={type}
        name={name}
        placeholder={placeholder}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <span data-testid={`${name}-status`} className={styles.status} title={getTitle()}>
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;

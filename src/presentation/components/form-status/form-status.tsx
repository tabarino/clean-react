import React, { useContext } from 'react';
import { Spinner } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import styles from './form-status-styles.scss';

const FormStatus: React.FC = () => {
  const { state } = useContext(Context);
  const { isLoading, errorMessage } = state;

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {errorMessage && (
        <span data-testid="error-message" className={styles.error}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormStatus;

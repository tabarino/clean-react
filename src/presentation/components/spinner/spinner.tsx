import React from 'react';
import styles from './spinner-styles.scss';

type Props = {
  className?: string;
};

const Spinner: React.FC<Props> = ({ className }) => {
  return (
    <div className={[styles.spinner, className].join(' ')}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;

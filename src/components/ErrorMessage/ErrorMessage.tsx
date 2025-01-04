import React from 'react';
import css from './ErrorMessage.module.css';

type ErrorProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorProps> = ({ message }) => {
  return <div className={css.error}>{message}</div>;
};

export default ErrorMessage;

import React from 'react';
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory';
import { Login } from '@/presentation/pages';
import { makeLoginValidation } from './login-validation-factory';

const LoginFactory: React.FC = () => {
  return <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} />;
};

export default LoginFactory;

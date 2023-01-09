import React from 'react';
import { Login } from '@/presentation/pages';
import { RemoteAuthentication } from '@/data/usecases';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { ValidationBuilder, ValidationComposite } from '@/validation/validators';

const LoginFactory: React.FC = () => {
  const url = 'http://localhost:3000/api/login';
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);
  const validationComposite = new ValidationComposite([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ]);

  return <Login authentication={remoteAuthentication} validation={validationComposite} />;
};

export default LoginFactory;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '@/presentation/components';
import '@/presentation/styles/global.scss';
import LoginFactory from './factories/pages/login/login-factory';

const main = ReactDOM.createRoot(document.getElementById('main') as HTMLElement);
main.render(
  <React.StrictMode>
    <Router MakeLogin={LoginFactory} />
  </React.StrictMode>,
);

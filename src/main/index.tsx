import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from '@/presentation/pages/login/login';

const main = ReactDOM.createRoot(document.getElementById('main') as HTMLElement);
main.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
);

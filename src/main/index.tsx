import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '@/presentation/components';

const main = ReactDOM.createRoot(document.getElementById('main') as HTMLElement);
main.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);

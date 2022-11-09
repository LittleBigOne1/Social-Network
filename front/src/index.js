import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);

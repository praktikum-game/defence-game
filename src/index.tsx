import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';

import { App } from './components/App';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./serviceWorkers.ts')
      .then((reg) => {
        console.log(`Registration succeeded. Scope is ${reg.scope}`);
      })
      .catch((error) => {
        console.log(`Registration failed with ${error}`);
      });
  });
}

ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>,
  document.querySelector('#root'),
);

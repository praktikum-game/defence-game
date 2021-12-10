import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';

import { SsrHomePage } from 'pages/SsrHomePage/SsrHomePage';
import { ErrorBoundary } from './components/ErrorBoundary';

// import { store } from './store';

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./serviceWorker.js')
      .then((reg) => {
        console.log(`Registration succeeded. Scope is ${reg.scope}`);
      })
      .catch((error) => {
        console.log(`Registration failed with ${error}`);
      });
  });
}

ReactDOM.hydrate(
  <BrowserRouter>
    <ErrorBoundary>
      <SsrHomePage />
    </ErrorBoundary>
  </BrowserRouter>,

  document.querySelector('#root'),
);

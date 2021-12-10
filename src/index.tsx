import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { SsrHomePage } from './pages/SsrHomePage/SsrHomePage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { configureStore } from './store';

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

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
console.log(state);
const store = configureStore(state);

ReactDOM.hydrate(
  <Provider store={store}>
    <ErrorBoundary>
      <SsrHomePage />
    </ErrorBoundary>
  </Provider>,
  document.querySelector('#root'),
);

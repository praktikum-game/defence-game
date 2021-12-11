import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ErrorBoundary } from './components/ErrorBoundary';
import { configureStore } from './store';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'components/App';

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
const store = configureStore(state);

console.log(window);
if (window.Worker && window.Notification) {
  const notificationWorker = new Worker('./notificationWorker.js', { name: 'notificationWorker' });
  notificationWorker.postMessage('');
}

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);

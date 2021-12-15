import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ErrorBoundary } from './components/ErrorBoundary';
import { configureStore } from './store';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'components/App';
import { STORAGE_LEADER_KEY } from 'consts';

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

if (window.Worker && window.Notification) {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      const notificationWorker = new Worker('./notificationWorker.js', {
        name: 'notificationWorker',
      });

      notificationWorker.addEventListener('message', (e) => {
        localStorage.setItem(STORAGE_LEADER_KEY, e.data);
      });

      notificationWorker.postMessage(localStorage.getItem(STORAGE_LEADER_KEY) || undefined);
    }
  });
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

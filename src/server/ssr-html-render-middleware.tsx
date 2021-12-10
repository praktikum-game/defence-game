import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { Request, Response } from 'express';
import { Provider } from 'react-redux';

import assets from './assets.json';
import vendorsAssets from './vendors-assets.json';
import { SsrHomePage } from '../pages/SsrHomePage/SsrHomePage';
import { configureStore } from '../store';
import { renderObject } from './utilities/renderObject';
import { Store } from 'redux';
import { ErrorBoundary } from 'components/ErrorBoundary';

function getHtmlString(reactJsxString: string, store?: Store) {
  const html = renderToStaticMarkup(
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Doctors vs Viruses</title>
        <link href={assets.main.css} rel="stylesheet" />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${renderObject(store?.getState())}`,
          }}
        />
        <div id="root" dangerouslySetInnerHTML={{ __html: reactJsxString }} />
        <script src={`/vendors/${vendorsAssets.vendors.js}`}></script>
        <script src={assets.main.js}></script>
      </body>
    </html>,
  );
  return `<!DOCTYPE html>${html}`;
}

const ssrHtmlRenderMiddleware = (req: Request, res: Response) => {
  const store = configureStore();
  const rootJsx = (
    <Provider store={store}>
      <ErrorBoundary>
        <SsrHomePage />
      </ErrorBoundary>
    </Provider>
  );
  const reactHtml = renderToString(rootJsx);
  res.status(200).send(getHtmlString(reactHtml, store));
};

export { ssrHtmlRenderMiddleware };

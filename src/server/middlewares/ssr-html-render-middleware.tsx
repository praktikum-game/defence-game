import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { Request, Response } from 'express';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { Store } from 'redux';

import { readFileSync } from 'fs';
import { configureStore } from '../../store';
import { renderObject } from '../utilities/renderObject';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { App } from '../../components/App';
import { userService } from 'server/db/services';
import { getHistory } from 'utilities/history';

function getHtmlString(
  reactJsxString: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assets: { vendorsAssets: any; mainAssets: any },
  nonce: string,
  store?: Store,
) {
  const html = renderToStaticMarkup(
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Doctors vs Viruses</title>
        <link href={assets.mainAssets.main.css} rel="stylesheet" type="text/css" />
      </head>
      <body>
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${renderObject(store?.getState())}`,
          }}
        />
        <div id="root" dangerouslySetInnerHTML={{ __html: reactJsxString }} />
        <script nonce={nonce} src={`/vendors/${assets.vendorsAssets.vendors.js}`}></script>
        <script nonce={nonce} src={assets.mainAssets.main.js}></script>
      </body>
    </html>,
  );

  return `<!DOCTYPE html>${html}`;
}

const ssrHtmlRenderMiddleware = () => {
  const vendorsAssets = JSON.parse(readFileSync('dist/vendors-assets.json', { encoding: 'utf-8' }));
  const mainAssets = JSON.parse(readFileSync('dist/client-assets.json', { encoding: 'utf-8' }));

  return async (req: Request, res: Response) => {
    const store = configureStore();
    if (res.locals.user === undefined) {
      store.getState().user.data = null;
      store.getState().theme.theme = 'light';
    } else {
      store.getState().user.data = res.locals.user;
      try {
        store.getState().theme.theme =
          (await userService.getUserThemeName(res.locals.user.id)) || 'light';
      } catch (e: unknown) {
        store.getState().theme.theme = 'light';
      }
    }
    getHistory([req.url]);

    const rootJsx = (
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </StaticRouter>
      </Provider>
    );
    const reactHtml = renderToString(rootJsx);
    res
      .status(200)
      .send(getHtmlString(reactHtml, { vendorsAssets, mainAssets }, res.locals.nonce, store));
  };
};

export { ssrHtmlRenderMiddleware };

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
import { HttpStatus } from 'server/http-statuses';
import { getUserDataSsr } from 'server/utilities/getUserData';

function getHtmlString(
  reactJsxString: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assets: { vendorsAssets: any; mainAssets: any },
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
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${renderObject(store?.getState())}`,
          }}
        />
        <div id="root" dangerouslySetInnerHTML={{ __html: reactJsxString }} />
        <script src={`/vendors/${assets.vendorsAssets.vendors.js}`}></script>
        <script src={assets.mainAssets.main.js}></script>
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
    try {
      const { data, status } = await getUserDataSsr(req.headers.cookie);
      if (status === HttpStatus.OK) {
        store.getState().user.data = data;
        store.getState().theme.theme = (await userService.getUserThemeName(data.id)) || 'light';
      }
    } catch (e: unknown) {
      store.getState().user.data = null;
      store.getState().theme.theme = 'light';
    }

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
    res.status(200).send(getHtmlString(reactHtml, { vendorsAssets, mainAssets }, store));
  };
};

export { ssrHtmlRenderMiddleware };

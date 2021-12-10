import { renderToString } from 'react-dom/server';
import React from 'react';
import { Request, Response } from 'express';

import assets from './assets.json';
import vendorsAssets from './vendors-assets.json';
import { SsrHomePage } from '../src/pages/SsrHomePage/SsrHomePage';

function getHtmlString(reactJsxString: string) {
  return `
  <!DOCTYPE html>
  <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>So good</title>
        <link href="${assets.main.css}" rel="stylesheet">
    </head>
    <body>
        <div id="root">${reactJsxString}</div>
        <script src="/vendors/${vendorsAssets.vendors.js}"></script>
        <script src="${assets.main.js}"></script>
    </body>
  </html>
`;
}

const ssrHtmlRenderMiddleware = (req: Request, res: Response) => {
  const rootJsx = <SsrHomePage />;
  const reactHtml = renderToString(rootJsx);
  res.status(200).send(getHtmlString(reactHtml));
};

export { ssrHtmlRenderMiddleware };

import React from 'react';
import { hydrate } from 'react-dom';
import { Helmet } from 'react-helmet'; //Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
import { hot } from 'react-hot-loader/root';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from 'client/components/AppRoutes';

const Bundle = () => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Helmet>

      <AppRoutes />
    </>
  );
};

export const DesktopBundle = hot(Bundle);

export default (data: {}) => {
  hydrate(
    <BrowserRouter>
      <DesktopBundle />
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

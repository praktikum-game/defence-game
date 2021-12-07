import { OAuthSsrPage } from 'client/pages/OAuthSsrPage/OAuthSsrPage';
import React from 'react';
import { hydrate } from 'react-dom';
import { Helmet } from 'react-helmet'; //Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
import { hot } from 'react-hot-loader/root';
import { BrowserRouter } from 'react-router-dom';

// import Core from 'client/pages/core';
import { Props } from './types';

const Bundle: Props = (props) => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Helmet>

      <OAuthSsrPage />
    </>
  );
};

export const DesktopBundle = hot(Bundle);

export default (data: {}) => {
  hydrate(
    <BrowserRouter>
      <DesktopBundle data={data} />
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

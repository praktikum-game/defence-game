import { config } from 'dotenv';
//@ts-ignore
import flow from 'lodash.flow';
import { join } from 'path';
import webpack from 'webpack';

import { WEBPACK_ROOT_DIR } from '../assets/dir';
import { initServerConfig, loadAssets, loadScripts, loadStyles } from '../settings';

config();

// eslint-disable-next-line
const cfg = require('../../lib/cfg').default;

function getConfig(lang: string): webpack.Configuration {
  return flow([
    initServerConfig({
      entry: {
        app: join(WEBPACK_ROOT_DIR, 'client', 'bundles', 'index.ts'),
      },
      lang,
    }),
    loadScripts({ isSSR: true }),
    loadStyles({ isSSR: true }),
    loadAssets({ isCopyStatic: true }),
  ])({});
}

export default cfg.langs.map(getConfig);

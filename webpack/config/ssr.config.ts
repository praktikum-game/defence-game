import { config as envConfig } from 'dotenv';
import flow from 'lodash.flow';
import { join } from 'path';
import { Configuration } from 'webpack';

import { ROOT_DIR_FROM_WEBPACK } from '../assets/dir';
import { initServerConfig, loadAssets, loadScripts, loadStyles } from '../settings';

envConfig();

const cfg = require('../../lib/cfg').default;

function getConfig(lang: string): Configuration {
  return flow([
    initServerConfig({
      entry: {
        app: join(ROOT_DIR_FROM_WEBPACK, 'client', 'bundles', 'index.ts'),
      },
      lang,
    }),
    loadScripts({ isSSR: true }),
    loadStyles({ isSSR: true }),
    loadAssets({ isCopyStatic: true }),
  ])({});
}

export default cfg.langs.map(getConfig);

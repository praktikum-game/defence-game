import { config } from 'dotenv';
import flow from 'lodash.flow';
import { Configuration } from 'webpack';

import { initClientConfig, loadAssets, loadScripts, loadStyles } from '../settings';

config();

// eslint-disable-next-line
const cfg = require('../../lib/cfg').default; // ?? почему так

function getConfig(lang: string, index: number): Configuration {
  return flow([
    initClientConfig({ lang, index }),
    loadScripts({ isSSR: false }),
    loadStyles({ isSSR: false }),
    loadAssets({ isCopyStatic: false }),
  ])({});
}

/* 
здесь хитро мапится функция на каждый язык. 
Причем внутри функции lodash.flow каждому следующему элемету подается 
результат предыдущего https://lodash.com/docs/4.17.15#flow

*/
export const clientConfig = cfg.langs.map(getConfig);

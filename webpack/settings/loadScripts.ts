import { Configuration } from 'webpack';
import { typescript } from '../loaders';

interface Options {
  isSSR: boolean;
}

export const loadScripts =
  ({ isSSR }: Options) =>
  (webpackConfig: Configuration) => {
    // ------------------------------------
    // TypeScript
    // ------------------------------------
    webpackConfig.module?.rules?.push(!isSSR ? typescript.client : typescript.ssr);

    return webpackConfig;
  };

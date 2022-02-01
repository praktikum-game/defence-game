import { AppState } from './store';

export {};

declare global {
  interface Window {
    __PRELOADED_STATE__?: AppState;
  }
  const OAUTH_REDIRECT_URL: string;
  const OAUTH_CLIENT_ID: string;
}

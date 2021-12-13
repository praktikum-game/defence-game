import { AppState } from './store';

export {};

declare module '*png' {
  export default string;
}

declare module '*svg' {
  export default string;
}

declare global {
  interface Window {
    __PRELOADED_STATE__?: AppState;
  }
}

import { useCallback, useEffect } from 'react';

export const useFullscreen = (fullscreenHandler: () => void) => {
  const eventListener = useCallback((e: Event) => {
    const event: KeyboardEvent = e as KeyboardEvent;
    if (event.key === 'f') {
      fullscreenHandler();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', eventListener);
    return () => window.removeEventListener('keydown', eventListener);
  }, []);
};

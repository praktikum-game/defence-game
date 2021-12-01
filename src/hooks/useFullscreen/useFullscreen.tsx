import React, { useCallback, useState } from 'react';
import { UseFullscreenReturnValue } from './types';

export const useFullscreen = (
  elRef: React.MutableRefObject<HTMLDivElement | null>,
): UseFullscreenReturnValue => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      if (elRef.current) {
        elRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, [elRef]);

  return { isFullscreen, toggleFullscreen };
};

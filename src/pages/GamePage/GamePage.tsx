import React, { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import Game from '../../game/Game';

export const GamePage: FC = () => {
  const [game, setGame] = useState<Game | undefined>();
  const [running, setRunning] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current);

      setGame(g);
    }
  }, []);

  const handleStartGame = useCallback(() => {
    if (game) {
      game.run();
      setRunning(true);
    }
  }, [game]);

  return (
    <Fragment>
      <Button onClick={handleStartGame} text="Начать игру" view="primary" disabled={running} />

      <canvas ref={canvasRef} height={500} width={1200}></canvas>
    </Fragment>
  );
};

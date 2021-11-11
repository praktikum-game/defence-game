import React, { FC, useEffect, useRef } from 'react';
import Game from '../../game/Game';

const GamePage: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      const game = new Game(ctx);
      game.run();
    }
  }, []);
  return (
    <canvas ref={canvasRef} style={{ backgroundColor: 'gray' }} height={500} width={1200}></canvas>
  );
};

export default GamePage;

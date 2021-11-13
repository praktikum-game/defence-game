import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import Game from '../../game/Game';

export const GamePage = (): JSX.Element => {
  const [game, setGame] = useState<Game | undefined>();
  const [running, setRunning] = useState<boolean>(false);
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleLoose = useCallback(() => {
    alert('LoOOOOOOse!');
    setRunning(false);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, handleLoose);
      setGame(g);
    }
  }, [handleLoose]);

  const handleStartGame = useCallback(() => {
    if (game) {
      game.run();
      setRunning(true);
    }
  }, [game]);

  const handleCloseModal = useCallback(() => {
    setModalIsVisible(false);
  }, []);

  return (
    <Fragment>
      <Modal visible={modalIsVisible}>
        <Button text="Закрыть" onClick={handleCloseModal} />
      </Modal>
      <Button onClick={handleStartGame} text="Начать игру" view="primary" disabled={running} />

      <canvas ref={canvasRef} height={500} width={1200}></canvas>
    </Fragment>
  );
};

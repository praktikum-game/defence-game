import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EndGameStatus } from '../../game/types';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Game } from '../../game/Game';

export const GamePage = () => {
  const navigate = useNavigate();
  const [runButtonIsDisabled, setRunButtonIsDisabled] = useState(false);
  const [infoModalIsVisible, setInfoModalIsVisible] = useState(true);
  const [loseModalIsVisible, setLoseModalIsVisible] = useState(false);
  const [winModalIsVisible, setWinModalIsVisible] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(null);

  const handleGameEnd = useCallback((status: EndGameStatus) => {
    switch (status) {
      case 'lose':
        setLoseModalIsVisible(true);
        break;

      case 'win':
        setWinModalIsVisible(true);
        break;

      default:
        break;
    }

    setRunButtonIsDisabled(false);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      // @ts-ignore
      gameRef.current = new Game(canvasRef.current, handleGameEnd);
    }
  }, [handleGameEnd]);

  const handleStartGame = useCallback(() => {
    if (gameRef.current) {
      gameRef.current.run();
      setRunButtonIsDisabled(true);
    }
  }, []);

  const handleCloseInfoModal = useCallback(() => {
    setInfoModalIsVisible(false);
  }, []);

  const handleReplayClick = useCallback(() => {
    setLoseModalIsVisible(false);
    setWinModalIsVisible(false);
    setWinModalIsVisible(false);
  }, []);

  const handleRedirectToHomeClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Fragment>
      <Modal visible={infoModalIsVisible}>
        <p>Для начала поставьте 3 банкомата</p>
        <Button text="Вперед!" onClick={handleCloseInfoModal} />
      </Modal>

      <Modal visible={loseModalIsVisible}>
        <p>К сожалению, Вы проиграли. Повторить?</p>
        <Button text="Это произошло случайно, в бой!" view="primary" onClick={handleReplayClick} />
        <Button text="Домой" view="secondary" onClick={handleRedirectToHomeClick} />
      </Modal>

      <Modal visible={winModalIsVisible}>
        <p>Ура, победа!</p>
        <Button text="Еще разок" view="primary" onClick={handleReplayClick} />
        <Button text="Домой" view="secondary" onClick={handleRedirectToHomeClick} />
      </Modal>

      <Button
        onClick={handleStartGame}
        text="Начать игру"
        view="primary"
        disabled={runButtonIsDisabled}
      />

      <canvas ref={canvasRef} height="768" width="1024"></canvas>
    </Fragment>
  );
};

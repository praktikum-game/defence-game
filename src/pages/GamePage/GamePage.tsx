import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EndGameStatus } from '../../game/types';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Game } from '../../game/Game';

export const GamePage = () => {
  const navigate = useNavigate();
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
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      // @ts-ignore
      gameRef.current = new Game(canvasRef.current, handleGameEnd);
    }
  }, [handleGameEnd]);

  const handleStartGame = useCallback((lvl?: number) => {
    if (gameRef.current) {
      gameRef.current.run(lvl);
    }
  }, []);

  const handleCloseInfoModal = useCallback(() => {
    setInfoModalIsVisible(false);
  }, []);

  const handleCloseModals = useCallback(() => {
    setLoseModalIsVisible(false);
    setWinModalIsVisible(false);
  }, []);

  const handleRedirectToHomeClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Fragment>
      <Modal visible={infoModalIsVisible}>
        <p>Освободи мир от вирусов! </p>
        <Button
          text="Начать игру!"
          onClick={() => {
            handleCloseInfoModal();
            handleStartGame();
          }}
        />
      </Modal>

      <Modal visible={loseModalIsVisible}>
        <p>К сожалению, Вы проиграли. Повторить?</p>
        <Button
          text="Это произошло случайно, в бой!"
          view="primary"
          onClick={() => {
            handleCloseModals();
            handleStartGame();
          }}
        />
        <Button text="Домой" view="secondary" onClick={handleRedirectToHomeClick} />
      </Modal>

      <Modal visible={winModalIsVisible}>
        <p>Ура, победа!</p>
        <Button
          text="Вперёд на следующий уровень!"
          view="primary"
          onClick={() => {
            handleCloseModals();
            handleStartGame(+1);
          }}
        />
        <Button text="Домой" view="secondary" onClick={handleRedirectToHomeClick} />
      </Modal>

      <canvas ref={canvasRef} height="200" width="200"></canvas>
    </Fragment>
  );
};

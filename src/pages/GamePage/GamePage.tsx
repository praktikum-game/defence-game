import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EndGameStatus } from '../../game/types';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Game } from '../../game/Game';
import { useFullscreen } from '../../hooks/useFullscreen';

import './game-page.css';
import { useAuth } from '../../hooks/useAuth';
import { Title } from '../../components/Title';

export const GamePage = () => {
  useAuth(false);
  const navigate = useNavigate();
  const [infoModalIsVisible, setInfoModalIsVisible] = useState(true);
  const [loseModalIsVisible, setLoseModalIsVisible] = useState(false);
  const [winModalIsVisible, setWinModalIsVisible] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<Game | null>(null);
  const gameContainerElementRef = useRef<HTMLDivElement | null>(null);

  const { isFullscreen, toggleFullscreen } = useFullscreen(gameContainerElementRef);

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
      gameRef.current = new Game(canvasRef.current, handleGameEnd);
    }
  }, [handleGameEnd]);

  useEffect(() => {
    const eventListener = (e: Event) => {
      const event: KeyboardEvent = e as KeyboardEvent;
      if (event.key.toLocaleLowerCase() === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', eventListener);
    return () => window.removeEventListener('keydown', eventListener);
  }, []);

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
    <div className="game-page">
      <Modal visible={infoModalIsVisible}>
        <Title headingLevel={3} className="modal__title">
          Освободи мир от вирусов!{' '}
        </Title>
        <div className="modal__buttons">
          <Button
            text="Начать игру!"
            onClick={() => {
              handleCloseInfoModal();
              handleStartGame();
            }}
          />
        </div>
      </Modal>

      <Modal visible={loseModalIsVisible}>
        <Title headingLevel={3} className="modal__title">
          К сожалению, Вы проиграли. Повторить?
        </Title>
        <div className="modal__buttons">
          <Button
            text="Это произошло случайно, в бой!"
            view="primary"
            onClick={() => {
              handleCloseModals();
              handleStartGame();
            }}
          />
          <Button text="Домой" view="secondary" onClick={handleRedirectToHomeClick} />
        </div>
      </Modal>

      <Modal visible={winModalIsVisible}>
        <Title headingLevel={3} className="modal__title">
          Ура, победа!
        </Title>
        <div className="modal__buttons">
          <Button
            text="Вперёд на следующий уровень!"
            view="primary"
            onClick={() => {
              handleCloseModals();
              handleStartGame(+1);
            }}
          />
          <Button text="Домой" view="secondary" onClick={handleRedirectToHomeClick} />
        </div>
      </Modal>
      <div className={isFullscreen ? 'game-container' : ''} ref={gameContainerElementRef}>
        <canvas ref={canvasRef} height="200" width="200"></canvas>
      </div>
    </div>
  );
};

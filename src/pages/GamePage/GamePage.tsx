import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EndGameStatus } from '../../game/types';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Game } from '../../game/Game';
import { useFullscreen } from '../../hooks/useFullscreen';
import { Title } from '../../components/Title';
import block from 'bem-cn';

import './game-page.css';
import { localLeaderboardAPI } from 'api/leaderboard';
import { useSelector } from 'react-redux';
import { AppState } from 'store';

const b = block('game-container');

export const GamePage = () => {
  const user = useSelector((state: AppState) => state.user.data);

  const navigate = useNavigate();
  const [infoModalIsVisible, setInfoModalIsVisible] = useState(true);
  const [loseModalIsVisible, setLoseModalIsVisible] = useState(false);
  const [winModalIsVisible, setWinModalIsVisible] = useState(false);
  const [gameScore, setGameScore] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<Game | null>(null);
  const gameContainerElementRef = useRef<HTMLDivElement | null>(null);

  const { isFullscreen, toggleFullscreen } = useFullscreen(gameContainerElementRef);

  const handleGameEnd = useCallback(
    (status: EndGameStatus, score: number) => {
      switch (status) {
        case 'lose':
          setGameScore(score);
          setLoseModalIsVisible(true);
          break;

        case 'win':
          setGameScore(score);
          setWinModalIsVisible(true);
          break;

        default:
          break;
      }
      if (user) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { id, login, display_name } = user;
        localLeaderboardAPI.upsertUserToLeaderboard({ id, login, username: display_name, score });
      }
    },
    [user],
  );

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
  }, [toggleFullscreen]);

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
      <div className={b({ fullscreen: isFullscreen })} ref={gameContainerElementRef}>
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
            К сожалению, Вы проиграли (очки: {gameScore}). Повторить?
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
            Ура, победа (очки: {gameScore})!
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
        <canvas
          className={b('game', { fullscreen: isFullscreen })}
          ref={canvasRef}
          height="200"
          width="200"
        ></canvas>
      </div>
    </div>
  );
};

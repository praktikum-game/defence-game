import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EndGameStatus } from '../../game/types';
import { FIELD_HEIGHT, FIELD_WIDTH } from '../../game/consts';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { Game } from '../../game/Game';
import { useFullscreen } from '../../hooks/useFullscreen';
import './game-page.css';

export const GamePage = (): JSX.Element => {
  const navigate = useNavigate();
  const [runButtonIsDisabled, setRunButtonIsDisabled] = useState<boolean>(false);
  const [infoModalIsVisible, setInfoModalIsVisible] = useState<boolean>(true);
  const [loseModalIsVisible, setLoseModalIsVisible] = useState<boolean>(false);
  const [winModalIsVisible, setWinModalIsVisible] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameRef = useRef<Game | null>(null);
  const gameContainerElementRef = useRef<HTMLDivElement | null>(null);

  const handleFullscreenToggle = useCallback(() => {
    if (!document.fullscreenElement) {
      gameContainerElementRef.current?.requestFullscreen();
    } else {
      // eslint-disable-next-line no-lonely-if
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);

  useFullscreen(handleFullscreenToggle);

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
      gameRef.current = new Game(canvasRef.current, handleGameEnd);
    }
  }, [handleGameEnd]);

  const handleStartGame = useCallback(() => {
    if (gameRef.current) {
      gameRef.current?.run();
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
    <>
      <Modal visible={infoModalIsVisible}>
        <p>Для начала игры расставьте защитников и нажмите "Начать игру"</p>
        <Button text="Понятно" onClick={handleCloseInfoModal} />
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
      <div className="game-container" ref={gameContainerElementRef}>
        <Button
          onClick={handleStartGame}
          text="Начать игру"
          view="primary"
          disabled={runButtonIsDisabled}
        />

        <canvas ref={canvasRef} height={FIELD_HEIGHT} width={FIELD_WIDTH}></canvas>
      </div>
    </>
  );
};

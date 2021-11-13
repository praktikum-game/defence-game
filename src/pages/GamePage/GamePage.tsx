import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import Game from '../../game/Game';

export const GamePage = (): JSX.Element => {
  const [game, setGame] = useState<Game | undefined>();
  const [runButtonIsDiabled, setRunButtonIsDiabled] = useState<boolean>(false);
  const [infoModalIsVisible, setInfoModalIsVisible] = useState<boolean>(true);
  const [loseModalIsVisible, setLoseModalIsVisible] = useState<boolean>(false);
  const [winModalIsVisible, setWinModalIsVisible] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleLose = useCallback(() => {
    setLoseModalIsVisible(true);
    setRunButtonIsDiabled(false);
  }, []);

  const handleWin = useCallback(() => {
    setWinModalIsVisible(true);
    setRunButtonIsDiabled(false);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, handleLose, handleWin);
      setGame(g);
    }
  }, [handleLose, handleWin]);

  const handleStartGame = useCallback(() => {
    if (game) {
      game.run();
      setRunButtonIsDiabled(true);
    }
  }, [game]);

  const handleCloseInfoModal = useCallback(() => {
    setInfoModalIsVisible(false);
  }, []);

  const handleReplayClick = useCallback(() => {
    setLoseModalIsVisible(false);
    setWinModalIsVisible(false);
    setWinModalIsVisible(false);
  }, []);

  const handleRedirectToHomeClick = useCallback(() => {
    alert('redirect');
  }, []);

  return (
    <Fragment>
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

      <Button
        onClick={handleStartGame}
        text="Начать игру"
        view="primary"
        disabled={runButtonIsDiabled}
      />

      <canvas ref={canvasRef} height={500} width={1200}></canvas>
    </Fragment>
  );
};

import React from "react";
import PropTypes from "prop-types";

import TicTacToeGameField from "./TicTacToeGameField.jsx";
import RestartBtn from "./RestartBtn.jsx";

import Setting from "./settings/Setting.jsx";
import Popup from "./popup.jsx";

import usePopup from "./hooks/usePopup.jsx";

import checkWinCondition, { substract2dField, isStalemate } from "../js/ticTacToeWinCondition";

import ticTacToeInitialStateLoader from "../js/ticTacToeInitialStateLoader";

import playCircleDrawSound, { playLinesDrawSound } from "../js/audio/AudioPlayer";
import useVolumeSounds from "./hooks/audio/useVolumeSounds.jsx";
import useVolumeMusic from "./hooks/audio/useVolumeMusic.jsx";
import useSounds from "./hooks/audio/useSounds.jsx";
import useMusic from "./hooks/audio/useMusic.jsx";

import useStepStack from "./hooks/stepStack/useStepStack.jsx";
import useStepStackIterator from "./hooks/stepStack/useStepStackIterator.jsx";

import {
  CELL_CLICK_RESPONSE_GAME_END,
  CELL_CLICK_RESPONSE_FIELD_NOT_EMPTY,
  CELL_CLICK_RESPONSE_OK,
  CELL_CLICK_RESPONSE_GAME_IN_HISTORY_MODE,

  HISTORY_MODE_UNDO,
  HISTORY_MODE_REDO,
} from "../js/constants";

function TicTacToeGame(props) {
  const [fieldSize, setFieldSize] = React.useState(ticTacToeInitialStateLoader.loadFieldSize());
  const [winLineLength, setWinLineLength] = React.useState(ticTacToeInitialStateLoader.loadWinLineLength(fieldSize));
  const [gameField, setGameField] = React.useState(ticTacToeInitialStateLoader.loadGameField(fieldSize));
  const [curUser, setCurUser] = React.useState(ticTacToeInitialStateLoader.loadCurUser());
  const [gameWinner, setGameWinner] = React.useState(ticTacToeInitialStateLoader.loadGameWinner());
  const [setOfFields, createSetOfField] = React.useState(substract2dField(gameField, fieldSize, winLineLength));
  const [winLine, setWinLine] = React.useState(ticTacToeInitialStateLoader.loadWinLine());

  const { isShow, togglePopup } = usePopup(!!gameWinner);
  const { volumeSounds, updateVolumeSounds } = useVolumeSounds();
  const { volumeMusic, updateVolumeMusic } = useVolumeMusic();
  const { isSoundsActive, toggleSounds } = useSounds();
  const { isMusicActive, toggleMusic } = useMusic();

  const { stepStack, updateStepStack } = useStepStack();
  const { iter, makeOperation, setIter } = useStepStackIterator(stepStack, gameField, setGameField);

  function updateState(newValue, setStateCallback, localStorageVarName) {
    setStateCallback(newValue);
    if (localStorageVarName) {
      window.localStorage.setItem(localStorageVarName, newValue);
    }
  }

  function updateFieldSize(newValue) {
    updateState(newValue, setFieldSize, "fieldSize");
  }

  function updateWinLineLength(newWinLineLength) {
    updateState(newWinLineLength, setWinLineLength, "winLineLength");
  }

  function updateGameField(newGameField) {
    updateState(newGameField, setGameField, "gameField");
  }

  function updateCurUser(newCurUserVal) {
    updateState(newCurUserVal, setCurUser, "curUser");
  }

  function updateGameWinner(newValue) {
    updateState(newValue, setGameWinner, "gameWinner");
  }

  function updateWinLine(newValue) {
    if (newValue === null) {
      window.localStorage.removeItem("winLine");
      setWinLine(null);
    } else {
      updateState(newValue, setWinLine, "winLine");
    }
  }

  function restartGame() {
    const newGameField = new Array(fieldSize ** 2).fill("");
    updateGameField(newGameField);
    updateCurUser(0);
    updateGameWinner("");
    updateWinLine(null);
    updateStepStack();
    setIter(0);
  }

  function changeCurUser() {
    if (curUser === 0) {
      updateCurUser(1);
    } else {
      updateCurUser(0);
    }
  }

  function cellClickHandle(id) {
    if (gameWinner !== "") {
      return CELL_CLICK_RESPONSE_GAME_END;
    }
    if (gameField[id] !== "") {
      return CELL_CLICK_RESPONSE_FIELD_NOT_EMPTY;
    }

    if (iter !== stepStack.length) {
      return CELL_CLICK_RESPONSE_GAME_IN_HISTORY_MODE;
    }

    let mark;
    if (curUser === 0) {
      mark = "O";
      playCircleDrawSound(volumeSounds, isSoundsActive);
    } else {
      mark = "X";
      playLinesDrawSound(volumeSounds, isSoundsActive);
    }
    const newGameField = [...gameField];
    newGameField[id] = mark;

    updateGameField(newGameField);
    updateStepStack(id, mark);
    setIter(iter + 1);
    changeCurUser();
    const isGameWin = checkWinCondition(newGameField, updateGameWinner, setOfFields, id, updateWinLine);
    if (isGameWin) {
      togglePopup();
    }
    return CELL_CLICK_RESPONSE_OK;
  }

  React.useEffect(() => {
    if (!gameWinner) {
      if (isStalemate(gameField)) {
        console.log("stalemate in tic tac toe");
      }
    }
  });

  function cellClickHandleOnline() {
    throw new Error("cellClickHandleOnline not implement");
  }

  function handleFieldSize(nFieldSize, nWinLineLength = winLineLength) {
    const newFieldSize = parseInt(nFieldSize, 10);
    let newWinLineLength = nWinLineLength;
    if (newFieldSize < newWinLineLength) {
      newWinLineLength = newFieldSize;
    }
    const newGameField = new Array(newFieldSize ** 2).fill("");
    const newSetOfFields = substract2dField(newGameField, newFieldSize, newWinLineLength);

    updateFieldSize(newFieldSize);
    updateWinLineLength(newWinLineLength);

    updateGameField(newGameField);
    updateCurUser(0);
    updateGameWinner("");
    createSetOfField(newSetOfFields);
    updateWinLine(null);

    updateStepStack();
    setIter(0);
  }

  function handleWinLineLength(nWinLineLength) {
    const newWinLineLength = parseInt(nWinLineLength, 10);
    if (newWinLineLength > fieldSize) {
      return;
    }
    updateWinLineLength(newWinLineLength);
    handleFieldSize(fieldSize, newWinLineLength);
  }

  return (
    <div>
      <TicTacToeGameField
        cellClickHandle={props.isOnlineGame ? cellClickHandleOnline : cellClickHandle}
        gameField={gameField}
        winLine={winLine}
      />
      <RestartBtn
        clickHandler={restartGame} />
      <Setting
        fieldSizeHandler={handleFieldSize}
        fieldSize={fieldSize}
        winLineHandler={handleWinLineLength}
        winLineLength={winLineLength}

        volumeSounds={volumeSounds}
        updateVolumeSounds={updateVolumeSounds}

        volumeMusic={volumeMusic}
        updateVolumeMusic={updateVolumeMusic}

        isSoundsActive={isSoundsActive}
        toggleSounds={toggleSounds}

        isMusicActive={isMusicActive}
        toggleMusic={toggleMusic}
      />
      <Popup
        gameWinner={gameWinner}
        isShow={isShow}
        hide={togglePopup}
        restart={restartGame}
      />

      <div>
        <button onClick={() => makeOperation(HISTORY_MODE_UNDO)}>undo</button>
        <button onClick={() => makeOperation(HISTORY_MODE_REDO)}>redo</button>
      </div>
    </div>
  );
}

TicTacToeGame.propTypes = {
  isOnlineGame: PropTypes.bool,
};

TicTacToeGameField.defaultProps = {
  isOnlineGame: false,
};

export default TicTacToeGame;

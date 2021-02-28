import React from "react";

import TicTacToeGameField from "./TicTacToeGameField.jsx";
import RestartBtn from "./RestartBtn.jsx";

import Setting from "./settings/ticTacToe/Setting.jsx";

import checkWinCondition, { substract2dField, isStalemate } from "../js/ticTacToeWinCondition";

import { default as initialStateLoader } from  "../js/ticTacToeInitialStateLoader";

import {
  CELL_CLICK_RESPONSE_GAME_END,
  CELL_CLICK_RESPONSE_FIELD_NOT_EMPTY,
  CELL_CLICK_RESPONSE_OK
} from "../js/constants";

function TicTacToeGame(props) {
  const [fieldSize, setFieldSize] = React.useState(initialStateLoader.loadFieldSize());
  const [winLineLength, setWinLineLength] = React.useState(initialStateLoader.loadWinLineLength(fieldSize));
  const [gameField, setGameField] = React.useState(initialStateLoader.loadGameField(fieldSize));
  const [curUser, setCurUser] = React.useState(initialStateLoader.loadCurUser());
  const [gameWinner, setGameWinner] = React.useState(initialStateLoader.loadGameWinner());
  const [setOfFields, createSetOfField] = React.useState(substract2dField(gameField, fieldSize, winLineLength));
  const [winLine, setWinLine] = React.useState(initialStateLoader.loadWinLine());

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
    updateGameField(newGameField)
    updateCurUser(0);
    updateGameWinner("");
    updateWinLine(null);
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

    let mark;
    if (curUser === 0) {
      mark = "O";
    } else {
      mark = "X";
    }
    const newGameField = [...gameField];
    newGameField[id] = mark;

    updateGameField(newGameField);
    changeCurUser();
    checkWinCondition(newGameField, updateGameWinner, setOfFields, id, updateWinLine);
    return CELL_CLICK_RESPONSE_OK;
  };

  React.useEffect(() => {
    if (!gameWinner) {
      if (isStalemate(gameField)) {
        console.log("stalemate in tic tac toe");
      }
    }
  });

  function cellClickHandleOnline() {
    throw new Error("cellClickHandleOnline not implement");
  };

  function handleFieldSize(newFieldSize, newWinLineLength = winLineLength) {
    newFieldSize = parseInt(newFieldSize, 10);
    if (newFieldSize < newWinLineLength) {
      newWinLineLength = newFieldSize;
    }
    const newGameField = new Array(newFieldSize ** 2).fill("");
    const newSetOfFields = substract2dField(newGameField, newFieldSize, newWinLineLength);

    updateFieldSize(newFieldSize);
    updateWinLineLength(newWinLineLength);

    updateGameField(newGameField);
    updateCurUser(0)
    updateGameWinner("");
    createSetOfField(newSetOfFields);
    updateWinLine(null);
  }

  function handleWinLineLength(newWinLineLength) {
    newWinLineLength = parseInt(newWinLineLength);
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
        winLineLength={winLineLength} />
    </div>
  );
}

export default TicTacToeGame; 

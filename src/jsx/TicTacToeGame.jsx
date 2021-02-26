import React from "react";

import TicTacToeGameField from "./TicTacToeGameField.jsx";
import RestartBtn from "./RestartBtn.jsx";

import Setting from "./settings/ticTacToe/Setting.jsx";

import checkWinCondition, { substract2dField, isStalemate } from "../js/ticTacToeWinCondition";

import {
  BASIC_FIELD_SIZE,
  CELL_CLICK_RESPONSE_GAME_END,
  CELL_CLICK_RESPONSE_FIELD_NOT_EMPTY,
  CELL_CLICK_RESPONSE_OK
} from "../js/constants";

function TicTacToeGame(props) {
  function loadFieldSizeInitialState() {
    const localFieldSize = parseInt(window.localStorage.getItem("fieldSize"), 10);
    return localFieldSize || BASIC_FIELD_SIZE;
  }

  function loadWinLineLengthInitialState() {
    const localWinLineLength = parseInt(window.localStorage.getItem("winLineLength"), 10);
    if (localWinLineLength && localWinLineLength > fieldSize) {
      return fieldSize;
    }
    return localWinLineLength || BASIC_FIELD_SIZE;
  }

  function loadGameFieldInitialState() {
    const localGameField = window.localStorage.getItem("gameField");
    return (localGameField && localGameField.split(",")) || new Array(fieldSize ** 2).fill("");
  }

  function loadCurUserInitialState() {
    return parseInt(window.localStorage.getItem("curUser"), 10) || 0;
  }

  function loadGameWinnerInnitialState() {
    return window.localStorage.getItem("gameWinner") || "";
  }

  function loadSetOfFieldsInitialState() {
    return substract2dField(gameField, fieldSize, winLineLength);
  }

  function loadWinLineInitialState() {
    const localWinLine = window.localStorage.getItem("winLine");
    return (localWinLine && localWinLine.split(",").map((el) => parseInt(el, 10))) || null;
  }

  const [fieldSize, setFieldSize] = React.useState(loadFieldSizeInitialState());
  const [winLineLength, setWinLineLength] = React.useState(loadWinLineLengthInitialState());
  const [gameField, setGameField] = React.useState(loadGameFieldInitialState());
  const [curUser, setCurUser] = React.useState(loadCurUserInitialState);
  const [gameWinner, setGameWinner] = React.useState(loadGameWinnerInnitialState());
  const [setOfFields, createSetOfField] = React.useState(loadSetOfFieldsInitialState());
  const [winLine, setWinLine] = React.useState(loadWinLineInitialState());

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

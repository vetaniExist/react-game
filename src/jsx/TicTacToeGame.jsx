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
  const [fieldSize, setFieldSize] = React.useState(BASIC_FIELD_SIZE);
  const [winLineLength, setWinLineLength] = React.useState(BASIC_FIELD_SIZE);
  const [gameField, updateGameField] = React.useState(new Array(fieldSize ** 2).fill(""));
  const [curUser, setCurUser] = React.useState(0);
  const [gameWinner, setGameWinner] = React.useState("");
  const [setOfFields, createSetOfField] = React.useState(substract2dField(gameField, fieldSize));
  const [winLine, setWinLine] = React.useState(null);

  function restartGame() {
    updateGameField(new Array(fieldSize ** 2).fill(""));
    setCurUser(0);
    setGameWinner("");
    setWinLine(null);
  }

  function changeCurUser() {
    if (curUser === 0) {
      setCurUser(1);
    } else {
      setCurUser(0);
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
    checkWinCondition(newGameField, setGameWinner, setOfFields, id, setWinLine);
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

  function handleFieldSize(newFieldSize, newWinLienLength = winLineLength) {
    newFieldSize = parseInt(newFieldSize);
    const newGameField = new Array(newFieldSize ** 2).fill("");
    const newSetOfFields = substract2dField(newGameField, newFieldSize, newWinLienLength);

    setFieldSize(parseInt(newFieldSize, 10));
    updateGameField(newGameField);
    setCurUser(0);
    setGameWinner("");
    createSetOfField(newSetOfFields);
    setWinLine(null);
  }

  function handleWinLineLength(newWinLineLength) {
    newWinLineLength = parseInt(newWinLineLength);
    if (newWinLineLength > fieldSize) {
      return;
    }
    setWinLineLength(newWinLineLength);
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

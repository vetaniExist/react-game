import React from "react";

import TicTacToeGameField from "./TicTacToeGameField.jsx";
import RestartBtn from "./RestartBtn.jsx";

import Setting from "./settings/ticTacToe/Setting.jsx";

import checkWinCondition, { substract2dField } from "../js/ticTacToeWinCondition";

import { BASIC_FIELD_SIZE } from "../js/constants";

function TicTacToeGame(props) {
  const [fieldSize, setFieldSize] = React.useState(BASIC_FIELD_SIZE);
  const [winLineLength, setWinLineLength] = React.useState(BASIC_FIELD_SIZE);
  const [gameField, updateGameField] = React.useState(new Array(fieldSize ** 2).fill(""));
  const [curUser, setCurUser] = React.useState(0);
  const [gameWinner, setGameWinner] = React.useState("");
  const [setOfFields, createSetOfField] = React.useState(substract2dField(gameField, fieldSize));
  const [lastCellClicked, setLastCellClicked] = React.useState(-1);

  function restartGame() {
    updateGameField(new Array(fieldSize ** 2).fill(""));
    setCurUser(0);
    setGameWinner("");
    setLastCellClicked(-1);
  }

  function changeCurUser() {
    if (curUser === 0) {
      setCurUser(1);
    } else {
      setCurUser(0);
    }
  }

  function cellClickHandle(id) {
    if (gameWinner !== "" || gameField[id] !== "") {
      return;
    }
    setLastCellClicked(id);
    let mark;
    if (curUser === 0) {
      mark = "O";
    } else {
      mark = "X";
    }
    updateGameField(olfField => {
      olfField[id] = mark;
      return [...olfField];
    });
    changeCurUser();

  };

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
    setLastCellClicked(-1);
  }

  function handleWinLineLength(newWinLineLength) {
    newWinLineLength = parseInt(newWinLineLength);
    if (newWinLineLength > fieldSize) {
      return;
    }
    setWinLineLength(newWinLineLength);
    handleFieldSize(fieldSize, newWinLineLength);
  }

  React.useEffect(() => {
    checkWinCondition(gameField, setGameWinner, setOfFields, lastCellClicked);

  });

  return (
    <div>
      <TicTacToeGameField
        cellClickHandle={props.isOnlineGame ? cellClickHandleOnline : cellClickHandle}
        gameField={gameField}
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

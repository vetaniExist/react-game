import React from "react";

import TicTacToeGameField from "./TicTacToeGameField.jsx";
import RestartBtn from "./RestartBtn.jsx";

import checkWinCondition, { substract2dField } from "../js/ticTacToeWinCondition";

function TicTacToeGame(props) {
  const [gameField, updateGameField] = React.useState(new Array(props.fieldSize ** 2).fill(""));
  const [curUser, setCurUser] = React.useState(0);
  const [gameWinner, setGameWinner] = React.useState("");
  const [setOfFields, createSetOfField] = React.useState(substract2dField(gameField, props.fieldSize));
  const [lastCellClicked, setLastCellClicked] = React.useState(-1);

  function restartGame() {
    updateGameField(new Array(props.fieldSize ** 2).fill(""));
    setCurUser(0);
    setGameWinner("");
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
    </div>
  );
}

export default TicTacToeGame; 

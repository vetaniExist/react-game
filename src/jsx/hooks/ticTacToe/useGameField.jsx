import { useState } from "react";
import { LOCAL_STORAGE_APP_SIGNATURE } from "../../../js/constants";

const LOCAL_STORAGE_GAMEFIELD_NAME = LOCAL_STORAGE_APP_SIGNATURE.concat("gameField");

function loadGameFieldInitialState(fieldSize) {
  if (!fieldSize) {
    throw new Error("ticTacToeInitialStateLoader.loadGameField : can't get gameField");
  }
  const localGameField = window.localStorage.getItem(LOCAL_STORAGE_GAMEFIELD_NAME);
  return (localGameField && localGameField.split(",")) || new Array(fieldSize ** 2).fill("");
}

function storeGameFieldInLocalStorage(gameField) {
  window.localStorage.setItem(LOCAL_STORAGE_GAMEFIELD_NAME, gameField);
}

function useGameField(fieldSize) {
  if (!fieldSize) {
    throw new Error(" useGameField hook: fieldSize not given");
  }

  if (!Number.isInteger(fieldSize)) {
    throw new Error("useGameField hook: fieldSize must be integer");
  }

  const [gameField, setGameField] = useState(loadGameFieldInitialState(fieldSize));

  function restartGameField() {
    const newGameField = new Array(fieldSize ** 2).fill("");
    setGameField(newGameField);
    storeGameFieldInLocalStorage(newGameField);
    return newGameField;
  }

  function updateGameField(index = null, value) {
    if (index === null) {
      return restartGameField();
    }

    const newGameField = [...gameField];
    newGameField[index] = value;
    setGameField(newGameField);
    storeGameFieldInLocalStorage(newGameField);
    return newGameField;
  }

  return {
    gameField,
    updateGameField,
  };
}

export default useGameField;

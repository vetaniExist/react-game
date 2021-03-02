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

  function restartGameField(restore) {
    const newGameField = new Array(fieldSize ** 2).fill("");
    setGameField(newGameField);
    console.log("restore val restart ", restore);
    if (restore) {
      console.log("we here");
      storeGameFieldInLocalStorage(newGameField);
    }
    return newGameField;
  }

  function updateGameField(index = null, value, restore = true) {
    if (index === null) {
      return restartGameField(restore);
    }

    const newGameField = [...gameField];
    newGameField[index] = value;
    setGameField(newGameField);
    console.log("restore val", restore);
    if (restore) {
      console.log("restore");
      storeGameFieldInLocalStorage(newGameField);
    }
    console.log("updateGameField");
    console.log(gameField);
    return newGameField;
  }

  return {
    gameField,
    updateGameField,
  };
}

export default useGameField;

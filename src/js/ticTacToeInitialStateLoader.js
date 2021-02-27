import { BASIC_FIELD_SIZE } from "./constants";

function loadFieldSizeInitialState() {
  const localFieldSize = parseInt(window.localStorage.getItem("fieldSize"), 10);
  return localFieldSize || BASIC_FIELD_SIZE;
}

function loadWinLineLengthInitialState(fieldSize) {
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

function loadWinLineInitialState() {
  const localWinLine = window.localStorage.getItem("winLine");
  return (localWinLine && localWinLine.split(",").map((el) => parseInt(el, 10))) || null;
}

const ticTacToeInitialStateLoader = {};

ticTacToeInitialStateLoader.loadFieldSize = loadFieldSizeInitialState;
ticTacToeInitialStateLoader.loadWinLineLength = loadWinLineLengthInitialState;
ticTacToeInitialStateLoader.loadGameField = loadGameFieldInitialState;
ticTacToeInitialStateLoader.loadCurUser = loadCurUserInitialState;
ticTacToeInitialStateLoader.loadGameWinner = loadGameWinnerInnitialState;
ticTacToeInitialStateLoader.loadWinLine = loadWinLineInitialState;

export default ticTacToeInitialStateLoader;

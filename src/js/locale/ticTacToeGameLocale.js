import {
  ENGLISH_LANGUAGE,
  RUSSIAN_LANGUAGE,
} from "../constants";

function printStalemateMessage(lang) {
  switch (lang) {
    case ENGLISH_LANGUAGE: {
      console.log("stalemate in tic tac toe");
      break;
    }
    case RUSSIAN_LANGUAGE: {
      console.log("ничья");
      break;
    }
    default: {
      break;
    }
  }
}

function printUndo(lang) {
  switch (lang) {
    case ENGLISH_LANGUAGE: {
      return "undo";
    }
    case RUSSIAN_LANGUAGE: {
      return "назад"
    }
    default: {
      return "";
    }
  }
}

function printRedo(lang) {
  switch (lang) {
    case ENGLISH_LANGUAGE: {
      return "redo";
    }
    case RUSSIAN_LANGUAGE: {
      return "вперед"
    }
    default: {
      return "";
    }
  }
}

const titTacToeLocale = {};
titTacToeLocale.stalemate = printStalemateMessage;
titTacToeLocale.undo = printUndo;
titTacToeLocale.redo = printRedo;

export default titTacToeLocale;
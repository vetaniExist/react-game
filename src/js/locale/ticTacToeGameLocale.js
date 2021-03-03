import {
  ENGLISH_LANGUAGE,
  RUSSIAN_LANGUAGE,
} from "../constants";

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
titTacToeLocale.undo = printUndo;
titTacToeLocale.redo = printRedo;

export default titTacToeLocale;
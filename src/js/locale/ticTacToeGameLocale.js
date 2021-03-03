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
      return "назад";
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
      return "вперед";
    }
    default: {
      return "";
    }
  }
}

function printShowRecordsTable(lang) {
  switch (lang) {
    case ENGLISH_LANGUAGE: {
      return "show records table";
    }
    case RUSSIAN_LANGUAGE: {
      return "показать таблицу рекордов";
    }
    default: {
      return "";
    }
  }
}

const titTacToeLocale = {};
titTacToeLocale.undo = printUndo;
titTacToeLocale.redo = printRedo;
titTacToeLocale.showRecordsTable = printShowRecordsTable;

export default titTacToeLocale;

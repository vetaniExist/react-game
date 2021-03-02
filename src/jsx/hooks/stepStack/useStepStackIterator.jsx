import { useState } from "react";

import {
  HISTORY_MODE_UNDO,
  HISTORY_MODE_REDO,
} from "../../../js/constants";

function useStepStackIterator(stepStack, gameField, updateGameField) {
  if (!stepStack) {
    throw new Error("useStepStackIterator: stepStack not given");
  }
  if (!gameField) {
    throw new Error("useStepStackIterator: gameField not given");
  }
  if (!updateGameField) {
    throw new Error("useStepStackIterator: updateGameField not given");
  }

  const [iter, setIter] = useState(stepStack.length);

  function undoOperation() {
    if (iter > 0) {
      const idx = stepStack[iter - 1].index;
      const newField = [...gameField];
      newField[idx] = "";
      updateGameField(newField);
      setIter(iter - 1);
    }
  }

  function redoOperation() {
    if (iter < stepStack.length) {
      const idx = stepStack[iter].index;
      const newField = [...gameField];
      newField[idx] = stepStack[iter].mark;
      updateGameField(newField);
      setIter(iter + 1);
    }
  }

  function makeOperation(operationType) {
    switch (operationType) {
      case HISTORY_MODE_UNDO: {
        undoOperation();
        break;
      }
      case HISTORY_MODE_REDO: {
        redoOperation();
        break;
      }
      default: {
        throw new Error("useStepStackIterator: unexpected operation");
      }
    }
  }

  return {
    iter,
    makeOperation,
    setIter,
  };
}

export default useStepStackIterator;

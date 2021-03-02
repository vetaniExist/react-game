import { useState } from "react";

function useStepStackIterator(stepStack, updateGameField) {
  if (!stepStack) {
    throw new Error("useStepStackIterator: stepStack not given");
  }
  if (!updateGameField) {
    throw new Error("useStepStackIterator: updateGameField not given");
  }

  const [iter, setIter] = useState(stepStack.length);

  function makeOperation(operationType) {
    switch (operationType) {
      case "undo": {
        console.log("undo operation");
        console.log(iter);
        if (iter > 0) {
          console.log(stepStack[iter - 1]);
          console.log(stepStack[iter - 1].index);
          updateGameField(stepStack[iter - 1].index, "", false);
          setIter(iter - 1);
        }
        break;
      }
      case "redo": {
        console.log("redo operation");
        if (iter < stepStack.length) {
          updateGameField(stepStack[iter].index, stepStack[iter].mark, false);
          setIter(iter + 1);
        }
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

import { useState } from "react";

function useStepStack() {
  const [stepStack, setStepStack] = useState([]);

  function updateStepStack(index = null, mark) {
    if (index === null) {
      setStepStack([]);
      return;
    }
    const step = {
      index,
      mark
    };
    setStepStack([...stepStack, step]);
  }

  return {
    stepStack,
    updateStepStack,
  };
}

export default useStepStack;

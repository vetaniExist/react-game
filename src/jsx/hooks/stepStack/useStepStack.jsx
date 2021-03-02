import { useState } from "react";

import { LOCAL_STORAGE_APP_SIGNATURE } from "../../../js/constants";

const LOCAL_STORAGE_STEP_STACK_NAME = LOCAL_STORAGE_APP_SIGNATURE.concat("isMusicActive");

function loadInitState() {
  const locaStepStack = window.localStorage.getItem(LOCAL_STORAGE_STEP_STACK_NAME);
  const localStepStackArray = JSON.parse(locaStepStack);
  return localStepStackArray || [];
}

function storeStepStackInLocalStorage(stack) {
  window.localStorage.setItem(LOCAL_STORAGE_STEP_STACK_NAME, JSON.stringify(stack));
}

function useStepStack() {
  const [stepStack, setStepStack] = useState(loadInitState());

  function updateStepStack(index = null, mark) {
    if (index === null) {
      setStepStack([]);
      return;
    }
    const step = {
      index,
      mark,
    };
    const newStackVal = [...stepStack, step];
    storeStepStackInLocalStorage(newStackVal);
    setStepStack(newStackVal);
  }

  return {
    stepStack,
    updateStepStack,
  };
}

export default useStepStack;

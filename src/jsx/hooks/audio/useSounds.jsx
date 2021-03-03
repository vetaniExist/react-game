import { useState } from "react";

import { LOCAL_STORAGE_APP_SIGNATURE } from "../../../js/constants";

const LOCAL_STORAGE_SOUND_NAME = LOCAL_STORAGE_APP_SIGNATURE.concat("isSoundActive");

function loadInitState() {
  const localIsSound = window.localStorage.getItem(LOCAL_STORAGE_SOUND_NAME);
  const localIsSoundBool = localIsSound ? localIsSound === "true" : true;
  return localIsSoundBool;
}

function storeIsSoundInLocalStorage(isSound) {
  window.localStorage.setItem(LOCAL_STORAGE_SOUND_NAME, isSound);
}

function useSounds() {
  loadInitState();
  const [isSoundsActive, setIsSoundsActive] = useState(loadInitState());

  function toggleSounds() {
    storeIsSoundInLocalStorage(!isSoundsActive);
    setIsSoundsActive(!isSoundsActive);
  }

  return {
    isSoundsActive,
    toggleSounds,
  };
}

export default useSounds;

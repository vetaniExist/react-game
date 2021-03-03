import { useState } from "react";

import { LOCAL_STORAGE_APP_SIGNATURE } from "../../../js/constants";
import { toggleBackgroundMusic } from "../../../js/audio/AudioPlayer";

const LOCAL_STORAGE_MUSIC_NAME = LOCAL_STORAGE_APP_SIGNATURE.concat("isMusicActive");

function loadInitState() {
  const localIsMusic = window.localStorage.getItem(LOCAL_STORAGE_MUSIC_NAME);
  const localIsMusicBool = localIsMusic ? localIsMusic === "true" : true;
  return localIsMusicBool;
}

function storeIsMusicInLocalStorage(isMusic) {
  window.localStorage.setItem(LOCAL_STORAGE_MUSIC_NAME, isMusic);
}

function useMusic() {
  const [isMusicActive, setIsMusicActive] = useState(loadInitState());
  toggleBackgroundMusic(!isMusicActive);

  function toggleMusic() {
    toggleBackgroundMusic(!isMusicActive);
    storeIsMusicInLocalStorage(!isMusicActive);
    setIsMusicActive(!isMusicActive);
  }

  return {
    isMusicActive,
    toggleMusic,
  };
}

export default useMusic;

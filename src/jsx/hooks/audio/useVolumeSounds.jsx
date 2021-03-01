import { useState } from "react";

import { AUDIO_SOUND_START_VAL, LOCAL_STORAGE_APP_SIGNATURE } from "../../../js/constants";

const LOCAL_STORAGE_VOLUME_NAME = LOCAL_STORAGE_APP_SIGNATURE.concat("volumeSound");

function loadInitStateFromLocalStorage() {
  const localVolume = parseFloat(window.localStorage.getItem(LOCAL_STORAGE_VOLUME_NAME));
  return localVolume || AUDIO_SOUND_START_VAL;
}

function storeVolumeInLocalStorage(volume) {
  window.localStorage.setItem(LOCAL_STORAGE_VOLUME_NAME, volume);
}

function useVolumeSounds() {
  const [volumeSounds, setIsVolume] = useState(loadInitStateFromLocalStorage());

  function updateVolumeSounds(nVolume) {
    const newVolume = parseFloat(nVolume);
    setIsVolume(newVolume);
    storeVolumeInLocalStorage(newVolume);
  }

  return {
    volumeSounds,
    updateVolumeSounds,
  };
}

export default useVolumeSounds;

import { useState } from "react";

import { AUDIO_SOUND_START_VAL, LOCAL_STORAGE_APP_SIGNATURE } from "../../../js/constants";
import { updateBackgroundSongVolume } from "../../../js/audio/AudioPlayer";

const LOCAL_STORAGE_VOLUME_NAME = LOCAL_STORAGE_APP_SIGNATURE.concat("volumeMusic");

function loadInitStateFromLocalStorage() {
  const localVolume = parseFloat(window.localStorage.getItem(LOCAL_STORAGE_VOLUME_NAME));
  return localVolume || AUDIO_SOUND_START_VAL;
}

function storeVolumeInLocalStorage(volume) {
  window.localStorage.setItem(LOCAL_STORAGE_VOLUME_NAME, volume);
}

function useVolumeMusic() {
  const [volumeMusic, setVolumeMusic] = useState(loadInitStateFromLocalStorage());

  function updateVolumeMusic(nVolume) {
    const newVolume = parseFloat(nVolume);
    setVolumeMusic(newVolume);
    updateBackgroundSongVolume(newVolume);
    storeVolumeInLocalStorage(newVolume);
  }

  return {
    volumeMusic,
    updateVolumeMusic,
  };
}

export default useVolumeMusic;

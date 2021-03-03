import React from "react";
import PropTypes from "prop-types";

import VolumeRangeInput from "./VolumeRangeInput.jsx";

import {
  DEFAULT_LANGUAGE,
  ENGLISH_LANGUAGE,
  RUSSIAN_LANGUAGE,
} from "../../../js/constants";

function AudioSetting(props) {
  function printTextForSoundsSetting() {
    switch (props.curLang) {
      case ENGLISH_LANGUAGE: {
        return "Volume sounds:";
      }
      case RUSSIAN_LANGUAGE: {
        return "Громкость звуков";
      }
      default: {
        return "";
      }
    }
  }

  function printTextForMusicSetting() {
    switch (props.curLang) {
      case ENGLISH_LANGUAGE: {
        return "Volume music:";
      }
      case RUSSIAN_LANGUAGE: {
        return "Громкость музыки";
      }
      default: {
        return "";
      }
    }
  }

  function printUseSoundsText() {
    switch (props.curLang) {
      case ENGLISH_LANGUAGE: {
        return "use sounds:";
      }
      case RUSSIAN_LANGUAGE: {
        return "Включить звук";
      }
      default: {
        return "";
      }
    }
  }

  function printUseMusicText() {
    switch (props.curLang) {
      case ENGLISH_LANGUAGE: {
        return "use music:";
      }
      case RUSSIAN_LANGUAGE: {
        return "Включить музыку";
      }
      default: {
        return "";
      }
    }
  }

  return (
    <div>
      <VolumeRangeInput
        text={printTextForSoundsSetting()}
        volume={props.volumeSounds}
        updateVolume={props.updateVolumeSounds} />

      <VolumeRangeInput
        text={printTextForMusicSetting()}
        volume={props.volumeMusic}
        updateVolume={props.updateVolumeMusic} />

      <div>
        {printUseSoundsText()}
        <input
          type="checkbox"
          checked={props.isSoundsActive}
          onChange={() => props.toggleSounds()} />
      </div>

      <div>
        {printUseMusicText()}
        <input
          type="checkbox"
          checked={props.isMusicActive}
          onChange={() => props.toggleMusic()}
        />
      </div>

    </div>
  );
}

AudioSetting.propTypes = {
  updateVolumeSounds: PropTypes.func.isRequired,
  volumeSounds: PropTypes.number.isRequired,

  volumeMusic: PropTypes.number.isRequired,
  updateVolumeMusic: PropTypes.func.isRequired,

  isSoundsActive: PropTypes.bool.isRequired,
  toggleSounds: PropTypes.func.isRequired,

  isMusicActive: PropTypes.bool.isRequired,
  toggleMusic: PropTypes.func.isRequired,

  curLang: PropTypes.string.isRequired,
};

AudioSetting.defaultProps = {
  curLang: DEFAULT_LANGUAGE,
};

export default AudioSetting;

import React from "react";
import PropTypes from "prop-types";

import { AUDIO_SOUND_MIN_VAL, AUDIO_SOUND_MAX_VAL, AUDIO_SOUND_STEP } from "../../js/constants";

function AudioSetting(props) {
  return (
    <div>
      <div>
        Volume sounds:
        <input type="range"
          min={AUDIO_SOUND_MIN_VAL}
          max={AUDIO_SOUND_MAX_VAL}
          step={AUDIO_SOUND_STEP}
          value={props.volumeSounds}
          onChange={(event) => props.updateVolumeSounds(parseFloat(event.target.value))} />
        {props.volumeSounds * 100} %
      </div>

      <div>
        Volume music:
        <input type="range"
          min={AUDIO_SOUND_MIN_VAL}
          max={AUDIO_SOUND_MAX_VAL}
          step={AUDIO_SOUND_STEP}
          value={props.volumeMusic}
          onChange={(event) => props.updateVolumeMusic(parseFloat(event.target.value))} />
        {props.volumeMusic * 100} %
      </div>

      <div>
        use sounds:
        <input
          type="checkbox"
          checked={props.isSoundsActive}
          onChange={() => props.toggleSounds()} />
      </div>

      <div>
        use music:
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
};

export default AudioSetting;

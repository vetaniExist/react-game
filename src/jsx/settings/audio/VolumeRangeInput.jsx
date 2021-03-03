import React from "react";
import PropTypes from "prop-types";

import { AUDIO_SOUND_MIN_VAL, AUDIO_SOUND_MAX_VAL, AUDIO_SOUND_STEP } from "../../../js/constants";

function VolumeRangeInput(props) {
  return (
    <div>
      {props.text}
      <input type="range"
        min={AUDIO_SOUND_MIN_VAL}
        max={AUDIO_SOUND_MAX_VAL}
        step={AUDIO_SOUND_STEP}
        value={props.volume}
        onChange={(event) => props.updateVolume(parseFloat(event.target.value))} />
      {props.volume * 100} %
    </div>
  );
}

VolumeRangeInput.propTypes = {
  text: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
  updateVolume: PropTypes.func.isRequired,
};

export default VolumeRangeInput;

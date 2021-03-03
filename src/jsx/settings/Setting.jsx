import React from "react";
import PropTypes from "prop-types";

import FieldSize from "./ticTacToe/FieldSize.jsx";
import WinLineLength from "./ticTacToe/WinLineLength.jsx";
import AudioSetting from "./audio/AudioSetting.jsx";
import LanguageSettings from "./LanguageSettings.jsx";

function Setting(props) {
  return (
    <div>
      <FieldSize
        fieldSizeHandler={props.fieldSizeHandler}
        fieldSizeValue={props.fieldSize}
        curLang={props.curLang} />
      <br />
      <WinLineLength
        winLineHandler={props.winLineHandler}
        winLineLength={props.winLineLength}
        fieldSizeValue={props.fieldSize}
        curLang={props.curLang} />
      <AudioSetting
        updateVolumeSounds={props.updateVolumeSounds}
        volumeSounds={props.volumeSounds}

        volumeMusic={props.volumeMusic}
        updateVolumeMusic={props.updateVolumeMusic}

        isSoundsActive={props.isSoundsActive}
        toggleSounds={props.toggleSounds}

        isMusicActive={props.isMusicActive}
        toggleMusic={props.toggleMusic}

        curLang={props.curLang}
      />
      <LanguageSettings
        curLang={props.curLang}
        updateLanguage={props.updateLanguage} />
    </div>);
}

Setting.propTypes = {
  fieldSizeHandler: PropTypes.func.isRequired,
  fieldSize: PropTypes.number.isRequired,

  winLineHandler: PropTypes.func.isRequired,
  winLineLength: PropTypes.number.isRequired,

  updateVolumeSounds: PropTypes.func.isRequired,
  volumeSounds: PropTypes.number.isRequired,

  volumeMusic: PropTypes.number.isRequired,
  updateVolumeMusic: PropTypes.func.isRequired,

  isSoundsActive: PropTypes.bool.isRequired,
  toggleSounds: PropTypes.func.isRequired,

  isMusicActive: PropTypes.bool.isRequired,
  toggleMusic: PropTypes.func.isRequired,

  curLang: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
};

export default Setting;

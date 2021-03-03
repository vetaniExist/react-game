import React from "react";
import PropTypes from "prop-types";

import {
  BASIC_FIELD_SIZE,
  DEFAULT_LANGUAGE,
  ENGLISH_LANGUAGE,
  RUSSIAN_LANGUAGE,
} from "../../../js/constants";

function printWinLineSizeText(lang) {
  switch (lang) {
    case ENGLISH_LANGUAGE: {
      return "Win line size";
    }
    case RUSSIAN_LANGUAGE: {
      return "Размер победной линии";
    }
    default: {
      return "";
    }
  }
}

function WinLineLength(props) {
  return (
    <label>
      {printWinLineSizeText(props.curLang)} {props.winLineLength}
      <input type="range"
        onChange={(event) => props.winLineHandler(event.target.value)}
        min={BASIC_FIELD_SIZE}
        max={props.fieldSizeValue}
        step={1}
        value={props.winLineLength}
      />
      {props.fieldSizeValue}
    </label>
  );
}

WinLineLength.propTypes = {
  winLineLength: PropTypes.number.isRequired,
  winLineHandler: PropTypes.func.isRequired,
  fieldSizeValue: PropTypes.number.isRequired,
  curLang: PropTypes.string,
};

WinLineLength.defaultProps = {
  curLang: DEFAULT_LANGUAGE,
};

export default WinLineLength;

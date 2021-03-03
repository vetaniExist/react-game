import React from "react";
import PropTypes from "prop-types";

import {
  BASIC_FIELD_SIZE,
  MAX_FIELD_SIZE,
  DEFAULT_LANGUAGE,
  ENGLISH_LANGUAGE,
  RUSSIAN_LANGUAGE,
} from "../../../js/constants";

function printFieldSizeText(lang) {
  switch (lang) {
    case ENGLISH_LANGUAGE: {
      return "Field size";
    }
    case RUSSIAN_LANGUAGE: {
      return "Размер поля";
    }
    default: {
      return "";
    }
  }
}

function FieldSize(props) {
  return (
    <label>
      {printFieldSizeText(props.curLang)} {props.fieldSizeValue}
      <input type="range"
        onChange={(event) => props.fieldSizeHandler(event.target.value)}
        min={BASIC_FIELD_SIZE}
        max={MAX_FIELD_SIZE}
        step={1}
        value={props.fieldSizeValue}
      />
    </label>
  );
}

FieldSize.propTypes = {
  fieldSizeHandler: PropTypes.func.isRequired,
  fieldSizeValue: PropTypes.number.isRequired,

  curLang: PropTypes.string,
};

FieldSize.defaultProps = {
  curLang: DEFAULT_LANGUAGE,
};

export default FieldSize;

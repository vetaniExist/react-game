import React from "react";
import PropTypes from "prop-types";

import { BASIC_FIELD_SIZE, MAX_FIELD_SIZE } from "../../../js/constants";

function FieldSize(props) {
  return (
    <label>
      Field Size {props.fieldSizeValue}
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
};

export default FieldSize;

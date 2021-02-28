import React from "react";
import PropTypes from "prop-types";

import { BASIC_FIELD_SIZE } from "../../../js/constants";

function WinLineLength(props) {
  return (
    <label>
      win line size {props.winLineLength}
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
};

export default WinLineLength;

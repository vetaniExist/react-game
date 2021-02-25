import React from "react";

import { BASIC_FIELD_SIZE } from "../../../js/constants";

export default function WinLineLength(props) {
  return (
    <label>
      win line size {props.winLineLength}
      <input type="range"
        onChange={event => {
          props.winLineHandler(event.target.value)
        }}
        min={BASIC_FIELD_SIZE}
        max={props.fieldSizeValue}
        step={1}
        value={props.winLineLength}
      />
      {props.fieldSizeValue}
    </label>
  );
}
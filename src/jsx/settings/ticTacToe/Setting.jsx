import React from "react";

import FieldSize from "./FieldSize.jsx";

export default function Setting(props) {
  return (
    <div>
      <FieldSize
        fieldSizeHandler={props.fieldSizeHandler}
        fieldSizeValue={props.fieldSize} />
    </div>);
}
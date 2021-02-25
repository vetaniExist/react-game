import React from "react";

import FieldSize from "./FieldSize.jsx";
import WinLineLength from "./WinLineLength.jsx";

export default function Setting(props) {
  return (
    <div>
      <FieldSize
        fieldSizeHandler={props.fieldSizeHandler}
        fieldSizeValue={props.fieldSize} />
      <br />
      <WinLineLength
        winLineHandler={props.winLineHandler}
        winLineLength={props.winLineLength}
        fieldSizeValue={props.fieldSize} />
    </div>);
}
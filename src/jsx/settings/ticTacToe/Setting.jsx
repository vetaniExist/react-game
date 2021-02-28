import React from "react";
import PropTypes from "prop-types";

import FieldSize from "./FieldSize.jsx";
import WinLineLength from "./WinLineLength.jsx";

function Setting(props) {
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

Setting.propTypes = {
  fieldSizeHandler: PropTypes.func.isRequired,
  fieldSize: PropTypes.number.isRequired,
  winLineHandler: PropTypes.func.isRequired,
  winLineLength: PropTypes.number.isRequired,
};

export default Setting;

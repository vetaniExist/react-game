import React from "react";
import PropTypes from "prop-types";

import {
  ERROR_CLICK_ANIMATION_TIME,
  CELL_CLICK_RESPONSE_GAME_END,
  CELL_CLICK_RESPONSE_FIELD_NOT_EMPTY,
  CELL_CLICK_RESPONSE_GAME_IN_HISTORY_MODE,
} from "../js/constants";

function Cell(props) {
  function checkError(event, cellClickCode) {
    switch (cellClickCode) {
      case CELL_CLICK_RESPONSE_GAME_IN_HISTORY_MODE:
      case CELL_CLICK_RESPONSE_GAME_END: {
        event.target.parentNode.classList.add("error");
        setTimeout(() => {
          event.target.parentNode.classList.remove("error");
        }, ERROR_CLICK_ANIMATION_TIME);
        break;
      }
      case CELL_CLICK_RESPONSE_FIELD_NOT_EMPTY: {
        event.target.classList.add("error");
        setTimeout(() => {
          event.target.classList.remove("error");
        }, ERROR_CLICK_ANIMATION_TIME);
        break;
      }
      default: {
        break;
      }
    }
  }

  function configurateStyle() {
    const style = {};
    if (props.mark) {
      style.fontSize = "24px";
    }
    if (props.itWinCell) {
      style.backgroundColor = "green";
      style.transition = "0.5s";
    }
    return style;
  }
  return (
    <div className="ttt-div" style={configurateStyle()}
      onClick={(event) => {
        checkError(event, props.clickHandler(props.ID));
      }}>
      {props.mark}
    </div>
  );
}

Cell.propTypes = {
  mark: PropTypes.string.isRequired,
  itWinCell: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
  ID: PropTypes.number.isRequired,
};

export default Cell;

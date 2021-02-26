import React from "react";

import {
  ERROR_CLICK_ANIMATION_TIME,
  CELL_CLICK_RESPONSE_GAME_END,
  CELL_CLICK_RESPONSE_FIELD_NOT_EMPTY
} from "../js/constants";

export default function Cell(props) {
  function checkError(event, cellClickCode) {
    switch (cellClickCode) {
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
      onClick={event => {
        checkError(event, props.clickHandler(props.ID));

      }}>
      {props.mark}
    </div>
  );
}


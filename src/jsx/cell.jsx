import React from "react";

export default function Cell(props) {
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
        const gameFieldDiv = event.target.parentNode;
        props.clickHandler(props.ID, gameFieldDiv)
      }}>
      {props.mark}
    </div>
  );
}


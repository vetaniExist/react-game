import React from "react";

export default function Cell(props) {
  return (
    <div className="ttt-div"
      onClick={event => props.clickHandler(props.ID)}>
      {props.mark}
    </div>
  );
}


import React from "react";

export default function RestartBtn(props) {
  return (
    <button onClick = {event => props.clickHandler()}>
      Restart
    </button>)
}

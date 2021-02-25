import React from "react";

import Cell from "./cell.jsx";

function configurateGameFieldStyle(fieldSize) {
  return {
    gridTemplateRows: `repeat(${fieldSize}, 5vh`,
    gridTemplateColumns: `repeat(${fieldSize}, 5vw`,
  }
}

export default function TicTacToeGameField(props) {
  return (
    <div className="ttt-gameField" style={configurateGameFieldStyle(props.gameField.length ** (1 / 2))}>
      {
        props.gameField.map((el, index) => <Cell key={index}
          clickHandler={props.cellClickHandle}
          ID={index}
          mark={props.gameField[index]}
          itWinCell={props.winLine && props.winLine.indexOf(index) !== -1}/>)
      }
    </div>
  );
}

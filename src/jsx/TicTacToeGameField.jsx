import React from "react";
import PropTypes from "prop-types";

import Cell from "./cell.jsx";

function configurateGameFieldStyle(fieldSize) {
  return {
    gridTemplateRows: `repeat(${fieldSize}, 5vh`,
    gridTemplateColumns: `repeat(${fieldSize}, 5vw`,
  };
}

function TicTacToeGameField(props) {
  function checkCellWinProperty(index) {
    return (props.winLine && props.winLine.indexOf(index) !== -1) || false;
  }

  return (
    <div className="ttt-gameField" style={configurateGameFieldStyle(props.gameField.length ** (1 / 2))}>
      {
        props.gameField.map((el, index) => <Cell key={index}
          clickHandler={props.cellClickHandle}
          ID={index}
          mark={props.gameField[index]}
          itWinCell={checkCellWinProperty(index)} />)
      }
    </div>
  );
}

TicTacToeGameField.propTypes = {
  winLine: PropTypes.array,
  gameField: PropTypes.array.isRequired,
  cellClickHandle: PropTypes.func.isRequired,
};

TicTacToeGameField.defaultProps = {
  winLine: null,
};

export default TicTacToeGameField;

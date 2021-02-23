
import React from "react";
import ReactDOM from "react-dom";

import "../css/tic-tac-toe.css";

import TicTacToeGame from "./TicTacToeGame.jsx";

ReactDOM.render(
    <TicTacToeGame 
    fieldSize = {5}
    isOnlineGame ={false}/>,
    document.getElementById("app")
)


import React from "react";
import ReactDOM from "react-dom";

import "../css/tic-tac-toe.css";

import TicTacToeGame from "./TicTacToeGame.jsx";

ReactDOM.render(
    <TicTacToeGame 
    isOnlineGame ={false}/>,
    document.getElementById("app")
)

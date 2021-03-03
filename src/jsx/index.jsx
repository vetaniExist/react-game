import React from "react";
import ReactDOM from "react-dom";

import "../css/normalize.css";
import "../css/tic-tac-toe.css";

import TicTacToeGame from "./TicTacToeGame.jsx";

const app = document.getElementById("app");

ReactDOM.render(
  <TicTacToeGame
    isOnlineGame={false}
  />,
  app,
);

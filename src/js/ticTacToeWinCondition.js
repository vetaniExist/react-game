function logWinner(winnerFieldMark) {
  console.log("find game winner. Winner is ", winnerFieldMark);
}

function checkHorizontals(field2D, setGameWinner) {
  for (let i = 0; i < field2D.length; i += 1) {
    if (field2D[i][0] !== "" && field2D[i].every((el) => el === field2D[i][0])) {
      logWinner(field2D[i][0]);
      setGameWinner(field2D[i][0]);
      return field2D[i][0];
    }
  }
  return false;
}

function checkVerticals(field2D, setGameWinner) {
  for (let i = 0; i < field2D[0].length; i += 1) {
    if (field2D[0][i] !== "" && field2D.every((el) => el[i] === field2D[0][i])) {
      logWinner(field2D[0][i]);
      setGameWinner(field2D[0][i]);
      return field2D[0][i];
    }
  }
  return false;
}

function checkDiagonals(field2D, setGameWinner) {
  if (field2D[0][0] !== "" && field2D[0][0] === field2D[1][1] && field2D[0][0] === field2D[2][2]) {
    logWinner(field2D[0][0]);
    setGameWinner(field2D[0][0]);
    return field2D[0][0];
  }

  if (field2D[0][2] !== "" && field2D[0][2] === field2D[1][1] && field2D[0][2] === field2D[2][0]) {
    logWinner(field2D[0][2]);
    setGameWinner(field2D[0][2]);
    return field2D[0][2];
  }

  return false;
}

export default function checkWinCondition(fieldSize, gameField, setGameWinner) {
  const field2D = new Array(fieldSize);
  let f = 0;
  for (let i = 0; i < fieldSize; i += 1) {
    field2D[i] = [];
    for (let j = 0; j < fieldSize; j += 1) {
      field2D[i][j] = gameField[f];
      f += 1;
    }
  }
  if (!checkHorizontals(field2D, setGameWinner)) {
    if (!checkVerticals(field2D, setGameWinner)) {
      checkDiagonals(field2D, setGameWinner);
    }
  }
}

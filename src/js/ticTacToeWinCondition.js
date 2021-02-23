function logWinner(winnerFieldMark) {
  console.log("find game winner. Winner is ", winnerFieldMark);
}

function configurateField2D(fieldSize, gameField) {
  const field2D = new Array(fieldSize);
  let f = 0;
  for (let i = 0; i < fieldSize; i += 1) {
    field2D[i] = [];
    for (let j = 0; j < fieldSize; j += 1) {
      field2D[i][j] = {
        idx: f,
        val: gameField[f],
      };
      f += 1;
    }
  }
  return field2D;
}

export function substract2dField(gameField, fieldSize, subFieldsSize = 3) {
  const field2D = configurateField2D(fieldSize, gameField);
  if (fieldSize === 3) {
    const res = [];
    res.push(field2D.map((row) => row.map((cell) => cell.idx)));
    return res;
  }

  const delta = fieldSize - subFieldsSize;
  const subFields = [];
  let x = 0;
  let y = 0;
  // go down
  for (let d = 0; d <= delta; d += 1) {
    // go right
    for (let ix = 0; ix <= delta; ix += 1) {
      subFields[y] = [];
      for (let i = d; i < d + subFieldsSize; i += 1) {
        subFields[y][x] = [];
        for (let j = ix; j < ix + subFieldsSize; j += 1) {
          subFields[y][x].push(field2D[i][j].idx);
        }
        x += 1;
      }
      x = 0;
      y += 1;
    }
  }
  return subFields;
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

function configurateField2DUsingArrayOfID(idField2D, gameField) {
  return idField2D.map((row) => row.map((el) => gameField[el]));
}

function findArrayOfFieldsThatIntoClickArea(setOfFields, clickID) {
  const filteredFields = setOfFields
    .filter((fieldArray) => fieldArray
      .filter((row) => row.indexOf(clickID) !== -1).length);
  return filteredFields;
}

export default function checkWinCondition(gameField, setGameWinner, setOfFields, clickID) {
  if (clickID === -1) {
    return;
  }
  const arrayOfFields = findArrayOfFieldsThatIntoClickArea(setOfFields, clickID);
  for (let i = 0; i < arrayOfFields.length; i += 1) {
    const field2D = configurateField2DUsingArrayOfID(arrayOfFields[i], gameField);
    if (!checkHorizontals(field2D, setGameWinner)) {
      if (!checkVerticals(field2D, setGameWinner)) {
        if (checkDiagonals(field2D, setGameWinner)) {
          return;
        }
      } else {
        return;
      }
    } else {
      return;
    }
  }
}

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

function checkHorizontals(field2D, setGameWinner, idField, setWinLine) {
  for (let i = 0; i < field2D.length; i += 1) {
    if (field2D[i][0] !== "" && field2D[i].every((el) => el === field2D[i][0])) {
      logWinner(field2D[i][0]);
      setGameWinner(field2D[i][0]);
      setWinLine(idField[i]);
      return field2D[i][0];
    }
  }
  return false;
}

function checkVerticals(field2D, setGameWinner, idField, setWinLine) {
  for (let i = 0; i < field2D[0].length; i += 1) {
    if (field2D[0][i] !== "" && field2D.every((el) => el[i] === field2D[0][i])) {
      logWinner(field2D[0][i]);
      setGameWinner(field2D[0][i]);

      const winLine = idField.reduce((acc, row) => [...acc, row[i]], []);
      setWinLine(winLine);

      return field2D[0][i];
    }
  }
  return false;
}

function checkDiagonals(field2D, setGameWinner, idField, setWinLine) {
  const leftToRightDiagonal = field2D[0][0] !== "" && field2D.every((el, idx) => el[idx] === field2D[0][0]);
  if (leftToRightDiagonal) {
    logWinner(field2D[0][0]);
    setGameWinner(field2D[0][0]);

    const winLine = idField.reduce((acc, row, idx) => [...acc, row[idx]], []);
    setWinLine(winLine);

    return field2D[0][0];
  }

  const lastCellIndex = field2D.length - 1;
  const rightToLeftDiagonal = field2D[0][lastCellIndex] !== ""
    && field2D.every((el, idx) => el[lastCellIndex - idx] === field2D[0][lastCellIndex]);

  if (rightToLeftDiagonal) {
    logWinner(field2D[0][lastCellIndex]);
    setGameWinner(field2D[0][lastCellIndex]);

    const winLine = idField.reduce((acc, row, idx) => [...acc, row[lastCellIndex - idx]], []);
    setWinLine(winLine);

    return field2D[0][lastCellIndex];
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

export default function checkWinCondition(gameField, setGameWinner, setOfFields, clickID, setWinLine) {
  if (clickID === -1) {
    return;
  }
  const arrayOfFields = findArrayOfFieldsThatIntoClickArea(setOfFields, clickID);
  for (let i = 0; i < arrayOfFields.length; i += 1) {
    const field2D = configurateField2DUsingArrayOfID(arrayOfFields[i], gameField);
    if (!checkHorizontals(field2D, setGameWinner, arrayOfFields[i], setWinLine)) {
      if (!checkVerticals(field2D, setGameWinner, arrayOfFields[i], setWinLine)) {
        if (checkDiagonals(field2D, setGameWinner, arrayOfFields[i], setWinLine)) {
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

export function isStalemate(field) {
  return field.filter((el) => el === "").length === 0;
}

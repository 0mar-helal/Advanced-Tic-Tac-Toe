import { players } from "./constants";

const reduceOpacity = (boardRefs) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const value = boardRefs[i][j].current.firstChild;
      if (value && !value.classList.contains("winner-animate"))
        boardRefs[i][j].current.firstChild.style.cssText = "opacity:0.5;";
    }
  }
};

export const isGameOver = (board, boardRefs) => {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== null &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      setTimeout(() => {
        for (let j = 0; j < 3; j++)
          boardRefs[i][j].current.firstChild.classList.add("winner-animate");
        reduceOpacity(boardRefs);
      }, 200);
      if (board[i][0] === players.X) {
        return "X";
      } else return "O";
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] !== null &&
      board[0][j] === board[1][j] &&
      board[1][j] === board[2][j]
    ) {
      setTimeout(() => {
        for (let i = 0; i < 3; i++)
          boardRefs[i][j].current.firstChild.classList.add("winner-animate");
        reduceOpacity(boardRefs);
      }, 200);
      if (board[0][j] === players.X) {
        return "X";
      } else return "O";
    }
  }

  // Check diagonals
  if (
    board[0][0] !== null &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i === j) {
            boardRefs[i][j].current.firstChild.classList.add("winner-animate");
          }
        }
      }
      reduceOpacity(boardRefs);
    }, 200);
    if (board[0][0] === players.X) {
      return "X";
    } else return "O";
  }
  if (
    board[0][2] !== null &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i + j === 2) {
            boardRefs[i][j].current.firstChild.classList.add("winner-animate");
          }
        }
      }
      reduceOpacity(boardRefs);
    }, 200);

    if (board[0][2] === players.X) {
      return "X";
    } else return "O";
  }

  // Check if the board is full
  let isFull = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === null) {
        isFull = false;
        break;
      }
    }
    if (!isFull) {
      return null;
    }
  }

  return "T";
};

export const editElement = (setGrid, rowIndex, columnIndex, newValue) => {
  setGrid((prevGrid) => {
    const newGrid = [...prevGrid];
    const newRow = [...newGrid[rowIndex]];
    newRow[columnIndex] = newValue;
    newGrid[rowIndex] = newRow;
    return newGrid;
  });
};

export const EndGame = (setBoard, setIsClickable, setCountGames, setCount) => {
  setCountGames((prev) => prev + 1);
  setCount(0);
  setIsClickable(false);
  setTimeout(() => {
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setIsClickable(true);
  }, 2000);
};

export const evaluateBoard = (board) => {
  // Check rows for a win
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== null &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      if (board[i][0] === players.X) {
        return 1;
      } else {
        return -1;
      }
    }
  }

  // Check columns for a win
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] !== null &&
      board[0][j] === board[1][j] &&
      board[1][j] === board[2][j]
    ) {
      if (board[0][j] === players.X) {
        return 1;
      } else {
        return -1;
      }
    }
  }

  // Check diagonals for a win
  if (
    board[0][0] !== null &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    if (board[0][0] === players.X) {
      return 1;
    } else {
      return -1;
    }
  }
  if (
    board[0][2] !== null &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    if (board[0][2] === players.X) {
      return 1;
    } else {
      return -1;
    }
  }
  // Check if the board is full
  let isFull = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === null) {
        isFull = false;
        break;
      }
    }
    if (!isFull) {
      return null;
    }
  }

  // It's a tie
  return 0;
};
export const isGameOverForMinimax = (board) => {
  // Check rows for a win
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== null &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return true;
    }
  }

  // Check columns for a win
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] !== null &&
      board[0][j] === board[1][j] &&
      board[1][j] === board[2][j]
    ) {
      return true;
    }
  }

  // Check diagonals for a win
  if (
    board[0][0] !== null &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return true;
  }
  if (
    board[0][2] !== null &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return true;
  }
  // Check if the board is full
  let isFull = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === null) {
        isFull = false;
        break;
      }
    }
    if (!isFull) {
      return false;
    }
  }

  // It's a tie
  return true;
};

export const minimax = (isMaximizing, board, depth) => {
  if (isGameOverForMinimax(board) || depth === 0) {
    return evaluateBoard(board);
  }

  if (isMaximizing) {
    let bestScore = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          board[i][j] = players.X;
          let score = minimax(false, board, depth - 1);
          board[i][j] = null;
          bestScore = Math.max(bestScore, score);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          board[i][j] = players.O;
          let score = minimax(true, board, depth - 1);
          board[i][j] = null;
          bestScore = Math.min(bestScore, score);
        }
      }
    }
    return bestScore;
  }
};

export const makeMove = (board, setBoard, depth) => {
  let bestScore = Number.MIN_SAFE_INTEGER;
  let bestMoveRow, bestMoveCol;
  if (evaluateBoard(board)) {
    return 0;
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === null) {
        board[i][j] = players.X;
        let score = minimax(false, board, depth);
        board[i][j] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMoveRow = i;
          bestMoveCol = j;
        }
      }
    }
  }
  bestMoveRow !== undefined &&
    bestMoveCol !== undefined &&
    editElement(setBoard, bestMoveRow, bestMoveCol, players.X);
};

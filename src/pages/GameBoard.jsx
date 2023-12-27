/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { depth, hoverPlayers, players } from "../utils/constants";
import { EndGame, editElement, isGameOver, makeMove } from "../utils/functions";
import { DataContainer } from "../context/AppContext";
import { Link } from "react-router-dom";
import { TbReload } from "react-icons/tb";

const GameBoard = () => {
  const { gameType, gameLevel } = useContext(DataContainer);
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const boardRefs = [
    [useRef(null), useRef(null), useRef(null)],
    [useRef(null), useRef(null), useRef(null)],
    [useRef(null), useRef(null), useRef(null)],
  ];
  const [count, setCount] = useState(0);

  const [countGames, setCountGames] = useState(0);

  const [isClickable, setIsClickable] = useState(true);
  const [hoverState, setHoverState] = useState(
    Array(board.length).fill(Array(board[0].length).fill(false))
  );

  const [isComputerTurn, setIsComputerTurn] = useState(false);

  const [Score1, setScore1] = useState(0);
  const [Score2, setScore2] = useState(0);

  const handleClickFor2Player = (i, j) => {
    let choosePlayer;
    if (countGames % 2 === 0) {
      choosePlayer = count % 2 === 0 ? players.X : players.O;
    } else {
      choosePlayer = count % 2 === 0 ? players.O : players.X;
    }
    editElement(setBoard, i, j, choosePlayer);
    setCount(count + 1);
  };

  const handleClickForComputer = (i, j) => {
    editElement(setBoard, i, j, players.O);
    setIsComputerTurn(!isComputerTurn);
  };
  const handleMouseEnter = (i, j) => {
    const updatedHoverState = hoverState.map((row) => row.map(() => false));
    updatedHoverState[i][j] = true;
    setHoverState(updatedHoverState);
  };
  const handleMouseLeave = (i, j) => {
    const updatedHoverState = hoverState.map((row) =>
      row.map((square) => square)
    );
    updatedHoverState[i][j] = false;
    setHoverState(updatedHoverState);
  };

  const getHoverPlayer = () => {
    let choosePlayer;
    if (gameType === "computer") {
      choosePlayer = hoverPlayers.O;
    } else {
      if (countGames % 2 === 0) {
        choosePlayer = count % 2 === 0 ? hoverPlayers.X : hoverPlayers.O;
      } else {
        choosePlayer = count % 2 === 0 ? hoverPlayers.O : hoverPlayers.X;
      }
    }
    return choosePlayer;
  };

  const handleIncreaseScore = (winner) => {
    if (gameType === "computer") {
      winner === "X" ? setScore2(Score2 + 1) : setScore1(Score1 + 1);
    } else {
      winner === "X" ? setScore1(Score1 + 1) : setScore2(Score2 + 1);
    }
  };

  //For first move every game
  useEffect(() => {
    if (gameType === "computer" && countGames % 2 === 0 && isClickable) {
      makeMove(board, setBoard, depth[gameLevel]);
    }
  }, [countGames, isClickable]);

  //For each change in isComputerTurn
  useEffect(() => {
    if (gameType === "computer") {
      setTimeout(() => {
        isClickable && makeMove(board, setBoard, depth[gameLevel]);
      }, 300);
    }
  }, [isComputerTurn]);

  // for every change in board
  useEffect(() => {
    const gameOverResult = isGameOver(board, boardRefs);
    if (gameOverResult === "X") {
      EndGame(setBoard, setIsClickable, setCountGames, setCount);
      handleIncreaseScore("X");
    } else if (gameOverResult === "O") {
      EndGame(setBoard, setIsClickable, setCountGames, setCount);
      handleIncreaseScore("O");
    } else if (gameOverResult === "T") {
      EndGame(setBoard, setIsClickable, setCountGames, setCount);
    }
  }, [board]);

  return (
    <div className="max-w-2xl flex flex-col gap-12">
      <div className="flex gap-2 justify-center items-center text-white text-sm font-bold">
        <div className="flex justify-center items-center gap-4">
          {gameType === "computer" ? "You" : "Player 1"}
          <span className="text-xl font-bold">{Score1}</span>
        </div>
        <div className="flex justify-center items-center gap-4">
          <span className="text-xl font-bold">{Score2}</span>
          {gameType === "computer" ? "Computer" : "Player 2"}
        </div>
      </div>
      <ul className="w-full bg-white grid grid-cols-3 gap-1">
        {board.map((row, i) => {
          return row.map((sqaure, j) => (
            <li
              ref={boardRefs[i][j]}
              onMouseEnter={() => handleMouseEnter(i, j)}
              onMouseLeave={() => handleMouseLeave(i, j)}
              onClick={() =>
                isClickable
                  ? gameType === "computer"
                    ? board[i][j] === null && handleClickForComputer(i, j)
                    : board[i][j] === null && handleClickFor2Player(i, j)
                  : null
              }
              key={j}
              className="bg-black h-[100px] w-[100px] sm:w-[140px] sm:h-[130px] flex justify-center items-center text-white font-bold"
            >
              {hoverState[i][j] && sqaure === null ? getHoverPlayer() : null}
              {sqaure}
            </li>
          ));
        })}
      </ul>
      <div className="flex justify-center items-center">
        <Link
          className="flex items-center justify-center gap-3 text-lg sm:text-xl rounded-full py-2 px-4 sm:py-4 sm:px-6 border-2 border-white border-solid bg-black shadow-white text-white hover:bg-white hover:text-black transition-all"
          to="/"
        >
          <TbReload />
          again
        </Link>
      </div>
    </div>
  );
};

export default GameBoard;

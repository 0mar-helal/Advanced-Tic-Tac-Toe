/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
const StartBoard = () => {
  return (
    <div className="max-w-2xl px-6 flex flex-col gap-5 justify-center items-center text-center text-white">
      <h1 className="text-4xl sm:text-5xl ">Tic Tac Toe Game</h1>
      <p className="text-sm sm:text-lg font-mono">
        Tic-tac-toe is a game in which two players take turns in drawing either
        an 'X' or 'O' in one square of a grid consisting of nine squares. The
        winner is the first player to get three of the same symbols in a row.
      </p>
      <Link
        to="/game/type"
        className="text-lg sm:text-xl rounded-full py-2 px-4 sm:py-4 sm:px-6 border-2 border-white border-solid bg-black shadow-white text-white hover:bg-white hover:text-black transition-all"
      >
        Let's Play
      </Link>
    </div>
  );
};

export default StartBoard;

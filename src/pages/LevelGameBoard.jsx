import { useContext } from "react";
import { DataContainer } from "../context/AppContext";
import { Link } from "react-router-dom";

const LevelGameBoard = () => {
  const { setGameLevel } = useContext(DataContainer);

  return (
    <div className="max-w-2xl flex flex-col gap-5 justify-center items-center text-center text-white">
      <h1 className="text-5xl mb-6">Choose Game Level</h1>
      <div className="flex flex-col gap-4 justify-around w-full">
        <Link
          to="/game/begin"
          onClick={() => setGameLevel("easy")}
          className="text-2xl rounded py-3 px-4 border-2 border-white border-solid bg-black shadow-white text-white hover:bg-white hover:text-black transition-all"
        >
          Easy
        </Link>
        <Link
          to="/game/begin"
          onClick={() => setGameLevel("medium")}
          className="text-2xl rounded py-3 px-4 border-2 border-white border-solid bg-black shadow-white text-white hover:bg-white hover:text-black transition-all"
        >
          Medium
        </Link>
        <Link
          to="/game/begin"
          onClick={() => setGameLevel("hard")}
          className="text-2xl rounded py-4 px-6 border-2 border-white border-solid bg-black shadow-white text-white hover:bg-white hover:text-black transition-all"
        >
          Hard
        </Link>
      </div>
    </div>
  );
};

export default LevelGameBoard;

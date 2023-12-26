import { useContext } from "react";
import { DataContainer } from "../context/AppContext";
import { Link } from "react-router-dom";

const TypeGameBoard = () => {
  const { setGameType } = useContext(DataContainer);
  return (
    <div className="max-w-2xl flex flex-col gap-5 justify-center items-center text-center text-white">
      <h1 className="text-5xl mb-6">Choose Game Type</h1>
      <div className="flex gap-2 justify-around w-full">
        <Link
          to="/game/begin"
          onClick={() => setGameType("2 player")}
          className="text-xl rounded py-3 px-4 border-2 border-white border-solid bg-black shadow-white text-white hover:bg-white hover:text-black transition-all"
        >
          2 Player
        </Link>
        <Link
          to="/game/level"
          onClick={() => setGameType("computer")}
          className="text-xl rounded py-4 px-6 border-2 border-white border-solid bg-black shadow-white text-white hover:bg-white hover:text-black transition-all"
        >
          Vs Computer
        </Link>
      </div>
    </div>
  );
};

export default TypeGameBoard;

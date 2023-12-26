import { Route, Routes } from "react-router-dom";
import StartBoard from "./pages/StartBoard";
import TypeGameBoard from "./pages/TypeGameBoard";
import AppContext from "./context/AppContext";
import LevelGameBoard from "./pages/LevelGameBoard";
import GameBoard from "./pages/GameBoard";

function App() {
  return (
    <AppContext>
      <Routes>
        <Route path="/" element={<StartBoard />} />
        <Route path="/game/type" element={<TypeGameBoard />} />
        <Route path="/game/level" element={<LevelGameBoard />} />
        <Route path="/game/begin" element={<GameBoard />} />
      </Routes>
    </AppContext>
  );
}

export default App;

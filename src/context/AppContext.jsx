/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const DataContainer = createContext();

const AppContext = ({ children }) => {
  const [gameType, setGameType] = useState("");
  const [gameLevel, setGameLevel] = useState("");

  return (
    <DataContainer.Provider
      value={{
        gameType,
        setGameType,
        gameLevel,
        setGameLevel,
      }}
    >
      {children}
    </DataContainer.Provider>
  );
};

export default AppContext;

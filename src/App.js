import React, { useState } from "react";
import "./App.scss";
import Canvas from "./Components/Canvas/Canvas";
import TitleScreen from "./Components/TitleScreen/TitleScreen/TitleScreen";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div>
      {gameStarted === false && <TitleScreen onStartGame={handleStartGame} />}
      {gameStarted === true && <Canvas />}
    </div>
  );
};

export default App;

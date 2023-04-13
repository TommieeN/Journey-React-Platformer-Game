import React, { useState } from "react";
import Canvas from "./Components/Canvas/Canvas";
import "./App.scss"
import TitleScreen from "./Components/TitleScreen/TitleScreen/TitleScreen";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div autoFocus>
      {gameStarted === false && <TitleScreen onStartGame={handleStartGame} />}
      {gameStarted === true && <Canvas />}   
    </div>
  );
};

export default App;

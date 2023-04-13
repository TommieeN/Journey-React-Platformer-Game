import React from "react";
import MusicBtn from "../../MusicBtn/MusicBtn";
import "./TitleScreen.scss";

function TitleScreen({ onStartGame }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onStartGame();
    }
  };

  return (
    <div className="title-screen" onKeyDown={handleKeyDown} tabIndex="0">
      <div className="title-screen__container">
        <h1>Journey</h1>
        <div className="title-screen__text-container">
          <p className="title-screen__text">Press Enter to Start Game</p>
        </div>
        <MusicBtn />
      </div>
    </div>
  );
}

export default TitleScreen;

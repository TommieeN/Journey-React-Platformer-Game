import React, { useState } from "react";
import TitleTheme from "../../Assets/Music/Decisive-Battle.wav";
import "./MusicBtn.scss";

const MusicBtn = () => {
  const [audio] = useState(new Audio(TitleTheme));
  const [audioOn, setAudioOn] = useState(false);

  const handleButtonClick = () => {
    if (audioOn) {
      audio.pause();
      setAudioOn(false);
    } else {
      audio.play();
      setAudioOn(true);
    }
  };

  audio.loop = true;

  return (
    <button className="btn" onClick={handleButtonClick}>
      {audioOn ? "Music On" : "Music Off"}
    </button>
  );
};

export default MusicBtn;

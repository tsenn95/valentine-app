import { useState, useRef } from "react";
import "./App.css";

import askingVideo from "./assets/asking-video.mp4"; 
import happyVideo from "./assets/accepting-video.mp4";
import bgMusic from "./assets/bg-music.mp3";
import happyMusic from "./assets/happy-music.mp3";
import noSound from "./assets/no-sound.mp3";

const phrases = [
  "No", "Are you sure?", "Really sure?", "Pookie please?", 
  "Don't do this to me", "I'm gonna cry...", "You're breaking my heart ;("
];

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  
  // Audio Refs
  const bgAudioRef = useRef(null);
  const happyAudioRef = useRef(null);
  const noAudioRef = useRef(null);

  const yesButtonSize = noCount * 20 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    
    // Play the main BG music if it hasn't started (browser bypass)
    if (bgAudioRef.current) bgAudioRef.current.play();

    // Play "No" sound effect from the start every time
    if (noAudioRef.current) {
      noAudioRef.current.currentTime = 0;
      noAudioRef.current.play();
    }
  };

  const handleYesClick = () => {
    setYesPressed(true);
    
    // Stop background music and "No" sounds
    if (bgAudioRef.current) bgAudioRef.current.pause();
    if (noAudioRef.current) noAudioRef.current.pause();

    // Play happy music
    if (happyAudioRef.current) {
      happyAudioRef.current.play();
    }
  };

  return (
    <div className="valentine-container">
      {/* Hidden Audio Elements */}
      <audio ref={bgAudioRef} src={bgMusic} loop />
      <audio ref={happyAudioRef} src={happyMusic} loop />
      <audio ref={noAudioRef} src={noSound} />

      {yesPressed ? (
        <>
          <video key="happy" autoPlay loop muted playsInline className="video-player">
            <source src={happyVideo} type="video/mp4" />
          </video>
          <div className="text-container">Ok yay!!! ❤️</div>
        </>
      ) : (
        <>
          <video key="asking" autoPlay loop muted playsInline className="video-player">
            <source src={askingVideo} type="video/mp4" />
          </video>
          <div className="text-container">Will you be my Valentine?</div>
          <div className="btn-container">
            <button
              className="yes-button"
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick}
            >
              Yes
            </button>
            <button onClick={handleNoClick} className="no-button">
              {noCount === 0 ? "No" : phrases[Math.min(noCount, phrases.length - 1)]}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;